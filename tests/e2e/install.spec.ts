import { test, expect, type Page } from '@playwright/test';

async function open(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await page.locator('astro-island:not([ssr])').first().waitFor();
}

/**
 * Chromium does not fire beforeinstallprompt under automation, so we dispatch a
 * stand-in with the same shape. Everything downstream is the real code path.
 */
async function offerInstall(page: Page, outcome = 'accepted'): Promise<void> {
  await page.evaluate((o) => {
    const e = new Event('beforeinstallprompt') as Event & {
      prompt?: () => Promise<void>;
      userChoice?: Promise<{ outcome: string }>;
    };
    e.prompt = () => Promise.resolve();
    e.userChoice = Promise.resolve({ outcome: o });
    window.dispatchEvent(e);
  }, outcome);
}

/**
 * Fire beforeinstallprompt during page load, before the island hydrates. The
 * browser really does this, and the event only fires once, so it has to be
 * caught outside the island or the offer is lost for the whole page view.
 */
async function offerInstallBeforeHydration(page: Page, path: string): Promise<void> {
  await page.addInitScript(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const e = new Event('beforeinstallprompt') as Event & {
        prompt?: () => Promise<void>;
        userChoice?: Promise<{ outcome: string }>;
      };
      e.prompt = () => Promise.resolve();
      e.userChoice = Promise.resolve({ outcome: 'accepted' });
      window.dispatchEvent(e);
    });
  });
  await open(page, path);
}

const prompt = (page: Page) => page.getByText('Add it to the home screen.');

test.describe('install prompt', () => {
  test('stays hidden until a timer has actually been completed', async ({ page }) => {
    await page.clock.install();
    await open(page, '/timer/10-seconds');
    await offerInstall(page);

    // Installable, but nothing earned yet.
    await expect(prompt(page)).toBeHidden();

    await page.getByRole('button', { name: 'Start' }).click();
    await expect(prompt(page)).toBeHidden();

    await page.clock.fastForward(11_000);
    await expect(prompt(page)).toBeVisible();
  });

  test('dismissing hides it and it stays gone on the next visit', async ({ page }) => {
    await page.clock.install();
    await open(page, '/timer/10-seconds');
    await offerInstall(page);
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(11_000);
    await expect(prompt(page)).toBeVisible();

    await page.getByRole('button', { name: 'Not now' }).click();
    await expect(prompt(page)).toBeHidden();

    // Reload, complete another timer: the snooze still holds.
    await open(page, '/timer/10-seconds');
    await offerInstall(page);
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
    await page.clock.fastForward(11_000);
    await expect(page.getByRole('timer')).toHaveText('00:00');
    await expect(prompt(page)).toBeHidden();

    // The second dismissal is the permanent one.
    const stored = await page.evaluate(() => localStorage.getItem('gi:pwa'));
    expect(stored).toContain('"dismissCount":1');
  });

  test('survives beforeinstallprompt firing before the island hydrates', async ({ page }) => {
    await page.clock.install();
    await offerInstallBeforeHydration(page, '/timer/10-seconds');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(11_000);
    // The event fired long before the island mounted; it must still be offered.
    await expect(prompt(page)).toBeVisible();
  });

  test('never appears when the browser cannot install', async ({ page }) => {
    await page.clock.install();
    await open(page, '/timer/10-seconds');
    // No beforeinstallprompt offered at all.
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(11_000);
    await expect(prompt(page)).toBeHidden();
  });

  test('accepting removes it permanently', async ({ page }) => {
    await page.clock.install();
    await open(page, '/timer/10-seconds');
    await offerInstall(page);
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(11_000);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(prompt(page)).toBeHidden();

    const stored = await page.evaluate(() => localStorage.getItem('gi:pwa'));
    expect(stored).toContain('"installed":true');
  });
});

test.describe('install prompt on iOS', () => {
  // Safari never fires beforeinstallprompt, so the only path is instructions.
  test.use({
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });

  test('shows manual steps and no Add button, without any install event', async ({ page }) => {
    await page.clock.install();
    await open(page, '/timer/10-seconds');
    await expect(prompt(page)).toBeHidden();

    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(11_000);

    await expect(prompt(page)).toBeVisible();
    await expect(page.getByText('Add to Home Screen')).toBeVisible();
    // Nothing to tap: iOS has no programmatic install.
    await expect(page.getByRole('button', { name: 'Add', exact: true })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Not now' })).toBeVisible();
  });
});

test.describe('pwa assets', () => {
  test('manifest and service worker are served and linked', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      'href',
      '/manifest.webmanifest',
    );

    const manifest = await request.get('/manifest.webmanifest');
    expect(manifest.ok()).toBe(true);
    const json = await manifest.json();
    expect(json.id).toBeTruthy();
    expect(json.display).toBe('standalone');

    for (const icon of json.icons) {
      const res = await request.get(icon.src);
      expect(res.ok(), `${icon.src} should be served`).toBe(true);
    }

    const sw = await request.get('/sw.js');
    expect(sw.ok()).toBe(true);
    expect(await sw.text()).not.toContain('__BUILD_VERSION__');
  });

  test('the service worker registers and controls the page', async ({ page }) => {
    await page.goto('/');
    const ok = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return Boolean(reg.active);
    });
    expect(ok).toBe(true);
  });
});
