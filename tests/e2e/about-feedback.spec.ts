import { test, expect, type Page } from '@playwright/test';

const ADDRESS = 'nimishnandwana@gmail.com';
const MAILTO = `mailto:${ADDRESS}?subject=gointervals%20feedback`;

const email = (page: Page) => page.locator('main .about__feedback a.about__email');

/** Intercept the click so the test never hands a mailto: URL to the OS. */
async function armMailtoGuard(page: Page) {
  await page.evaluate(() => {
    (window as unknown as { __mailto: string[] }).__mailto = [];
    document.addEventListener(
      'click',
      (e) => {
        const a = (e.target as Element).closest('a');
        if (a && a.protocol === 'mailto:') {
          e.preventDefault();
          (window as unknown as { __mailto: string[] }).__mailto.push(a.href);
        }
      },
      true,
    );
  });
}

test('feedback section sits after the author links and before the footer', async ({ page }) => {
  await page.goto('/about');
  const order = await page
    .locator('main .about__links, main .about__feedback, main .about__data, footer')
    .evaluateAll((els) => els.map((e) => e.className || e.tagName.toLowerCase()));
  expect(order).toEqual(['about__links', 'about__feedback', 'about__data', 'ftr wrap']);
  await expect(page.locator('footer a')).toHaveText(['Timers', 'About']);
});

test('feedback copy is exactly the agreed text', async ({ page }) => {
  await page.goto('/about');
  const section = page.locator('main .about__feedback');
  await expect(section.getByRole('heading', { level: 2 })).toHaveText('Feedback');
  await expect(section.locator('p').nth(0)).toHaveText(
    'Something not working, or an idea to share? Send Nimish a note.',
  );
  await expect(email(page)).toHaveText(ADDRESS);
  await expect(section.locator('p.about__hint')).toHaveText(
    'Opens your email app. For a bug, include the timer, device and what happened.',
  );
  await expect(section).toHaveAttribute('aria-labelledby', 'feedback-heading');
  const words = (await page.locator('main').innerText()).trim().split(/\s+/).length;
  expect(words).toBeLessThan(150);
});

test('the address is a native mailto anchor and clicking it does not leave the page', async ({
  page,
}) => {
  await page.goto('/about');
  const link = email(page);
  await expect(link).toHaveAttribute('href', MAILTO);
  await expect(link).not.toHaveAttribute('target', /.+/);
  await expect(link).not.toHaveAttribute('onclick', /.+/);
  await armMailtoGuard(page);
  await link.click();
  expect(await page.evaluate(() => (window as unknown as { __mailto: string[] }).__mailto)).toEqual(
    [MAILTO],
  );
  expect(page.url()).toContain('/about');
  await expect(page.getByText('sent', { exact: false })).toHaveCount(0);
});

test('the address is selectable text with a permanent accent underline', async ({ page }) => {
  await page.goto('/about');
  const link = email(page);
  const style = await link.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      userSelect: cs.userSelect,
      decoration: cs.textDecorationLine,
      color: cs.color,
      decorationColor: cs.textDecorationColor,
    };
  });
  expect(style.userSelect).not.toBe('none');
  expect(style.decoration).toContain('underline');
  expect(style.color).toBe('rgb(53, 91, 70)');
  expect(['rgb(53, 91, 70)', 'currentcolor']).toContain(style.decorationColor);
  expect(await link.evaluate((el) => el.textContent?.trim())).toBe(ADDRESS);
});

test('the address is reachable by keyboard with a visible focus ring', async ({ page }) => {
  await page.goto('/about');
  await page.locator('a[href="https://x.com/nimish_nandwana"]').focus();
  await page.keyboard.press('Tab');
  const link = email(page);
  await expect(link).toBeFocused();
  const outline = await link.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { style: cs.outlineStyle, width: cs.outlineWidth, color: cs.outlineColor };
  });
  expect(outline.style).toBe('solid');
  expect(outline.width).toBe('2px');
  expect(outline.color).toBe('rgb(53, 91, 70)');
});

for (const width of [320, 375, 1280]) {
  test(`at ${width}px the address is a 44px target and nothing overflows`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/about');
    const link = email(page);
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
}

test('at 375px and 200% zoom the feedback block stays inside the viewport', async ({ page }) => {
  // The site header is outside this task's scope, so measure the section, not the document.
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/about');
  await page.evaluate(() => {
    (document.documentElement.style as unknown as { zoom: string }).zoom = '2';
  });
  const link = email(page);
  await expect(link).toBeVisible();
  const { right, width } = await page.locator('main .about__feedback').evaluate((el) => ({
    right: Math.max(
      ...[el, ...el.querySelectorAll('*')].map((n) => n.getBoundingClientRect().right),
    ),
    width: document.documentElement.clientWidth,
  }));
  expect(right).toBeLessThanOrEqual(width);
  const box = await link.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
});
