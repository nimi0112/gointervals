import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/interval',
  '/timer',
  '/stopwatch',
  '/tabata',
  '/emom',
  '/pomodoro',
  '/timer/5-minutes',
  '/timer/30-seconds',
  '/tabata/20-10-8',
  '/interval/7-minute-workout',
  '/blog',
  '/blog/what-is-a-tabata-timer',
  '/blog/tag/tabata',
  '/about',
];

for (const route of routes) {
  test(`${route} loads with an h1 and a canonical`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /gointervals\.com/);
  });
}

test('404 page is served for unknown routes', async ({ page }) => {
  const res = await page.goto('/this-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Nothing here');
  await expect(page.locator('main a[href="/interval"]')).toBeVisible();
});

test('robots, sitemap, llms and rss are served', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('User-agent: GPTBot');
  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
  const s0 = await request.get('/sitemap-0.xml');
  expect(await s0.text()).toContain('/timer/5-minutes');
  expect((await request.get('/llms.txt')).status()).toBe(200);
  const rss = await request.get('/rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<item>');
});

test('content pages ship no framework JS', async ({ page }) => {
  await page.goto('/blog/what-is-a-tabata-timer');
  const scripts = await page.locator('script[src]').count();
  expect(scripts).toBe(0);
});

test('blog post is readable with JavaScript disabled', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/blog/what-is-a-tabata-timer');
  await expect(page.locator('h1')).toContainText(/tabata/i);
  await expect(page.locator('article h2').first()).toBeVisible();
  await ctx.close();
});
