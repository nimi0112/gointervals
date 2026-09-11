import { test, expect, type Page } from '@playwright/test';

/** Astro removes the `ssr` attribute once the island has hydrated. Nothing is interactive before that. */
async function open(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await page.locator('astro-island:not([ssr])').first().waitFor();
}

test.describe('countdown', () => {
  test('counts down from a mocked clock without drift', async ({ page }) => {
    await page.clock.install({ time: new Date('2026-09-11T10:00:00Z') });
    await open(page, '/timer/5-minutes');
    const digits = page.getByRole('timer');
    await expect(digits).toHaveText('05:00');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(61_000);
    await expect(digits).toHaveText('03:59');
    // "sleep" for two minutes in one jump: position must be exact
    await page.clock.fastForward(120_000);
    await expect(digits).toHaveText('01:59');
    await expect(page).toHaveTitle(/1:59/);
  });

  test('space toggles, R resets, Esc pauses', async ({ page }) => {
    await page.clock.install();
    await open(page, '/timer/1-minute');
    await page.locator('h1').click();
    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
    await page.clock.fastForward(2000);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Resume' })).toBeVisible();
    await page.keyboard.press('r');
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByRole('timer')).toHaveText('01:00');
  });

  test('finishes and reports done', async ({ page }) => {
    await page.clock.install();
    await open(page, '/timer/10-seconds');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(11_000);
    await expect(page.getByRole('button', { name: 'Done' })).toBeVisible();
    await expect(page.getByRole('timer')).toHaveText('00:00');
  });
});

test.describe('interval', () => {
  test('moves through prep, work and rest phases', async ({ page }) => {
    await page.clock.install();
    await open(page, '/tabata/20-10-8');
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.locator('.timer__phase')).toHaveText('Get ready');
    await page.clock.fastForward(10_500);
    await expect(page.locator('.timer__phase')).toHaveText('Work 1/8');
    await page.clock.fastForward(20_000);
    await expect(page.locator('.timer__phase')).toHaveText('Rest 1/8');
    await page.clock.fastForward(10_000);
    await expect(page.locator('.timer__phase')).toHaveText('Work 2/8');
  });

  test('saved preset survives a reload', async ({ page }) => {
    await open(page, '/interval');
    await page.getByLabel('Rounds').fill('4');
    await page.getByRole('button', { name: 'Save current as preset' }).click();
    await page.getByLabel('Preset name').fill('My four');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.locator('.chip--preset', { hasText: 'My four' })).toBeVisible();
    await page.reload();
    await expect(page.locator('.chip--preset', { hasText: 'My four' })).toBeVisible();
    await expect(page.getByLabel('Rounds')).toHaveValue('4');
    await page.getByRole('button', { name: 'Delete preset My four' }).click();
    await expect(page.locator('.chip--preset', { hasText: 'My four' })).toHaveCount(0);
  });

  test('beep every 10 minutes preset is first and loads', async ({ page }) => {
    await open(page, '/');
    const first = page.locator('.presets__list .chip').first();
    await expect(first).toContainText('Beep every 10 min for 30 min');
    await first.click();
    await expect(page.getByRole('timer')).toHaveText('10:00');
    await expect(page.locator('.timer__meta')).toContainText('30 min total left');
  });
});

test.describe('stopwatch', () => {
  test('laps record split and total', async ({ page }) => {
    await page.clock.install();
    await open(page, '/stopwatch');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(10_000);
    await page.keyboard.press('l');
    await page.clock.fastForward(12_000);
    await page.getByRole('button', { name: 'Lap' }).click();
    const rows = page.locator('.laps tbody tr');
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText('00:12.0');
    await expect(rows.nth(0)).toContainText('00:22.0');
    await expect(rows.nth(1)).toContainText('fastest');
  });
});

test('clear my data removes gi: keys', async ({ page }) => {
  await open(page, '/pomodoro');
  await page.evaluate(() => localStorage.setItem('gi:test', '1'));
  await page.goto('/about');
  await page.getByRole('button', { name: 'Clear my data' }).click();
  await expect(page.locator('#clear-status')).toContainText('Cleared');
  expect(await page.evaluate(() => localStorage.getItem('gi:test'))).toBeNull();
});
