import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/interval',
  '/meditation',
  '/tabata',
  '/emom',
  '/pomodoro',
  '/meditation/30-minutes',
  '/tabata/20-10-8',
  '/tabata/30-15-8',
  '/interval/7-minute-workout',
  '/interval/beep-every-10-minutes',
  '/pomodoro/50-10',
  '/blog',
  '/blog/meditation-timer-interval-bells',
  '/blog/what-is-a-tabata-timer',
  '/blog/tag/tabata',
  '/about',
];

for (const route of routes) {
  test(`${route} loads with one h1 and a canonical`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /gointervals\.com/);
  });
}

test('the removed timers are gone from the build and covered by redirects', async ({ request }) => {
  for (const gone of ['/stopwatch', '/timer', '/timer/5-minutes']) {
    expect((await request.get(gone)).status()).toBe(404);
  }
  // astro preview does not apply _redirects; the file itself is what Cloudflare reads.
  const redirects = await request.get('/_redirects');
  expect(redirects.status()).toBe(200);
  const text = await redirects.text();
  expect(text).toMatch(/^\/stopwatch\s+\/interval\s+301$/m);
  expect(text).toMatch(/^\/timer\/\*\s+\/interval\s+301$/m);
  expect(text).toMatch(
    /^\/blog\/meditation-timer-with-interval-bells\s+\/blog\/meditation-timer-interval-bells\s+301$/m,
  );
});

test('404 page is a real 404 with one line and a home link', async ({ page }) => {
  const res = await page.goto('/this-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('This page drifted away.');
  await expect(page.getByRole('link', { name: 'Back to timers' })).toHaveAttribute('href', '/');
});

test('robots, sitemap, llms, humans and rss are served', async ({ request }) => {
  expect((await request.get('/robots.txt')).status()).toBe(200);
  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
  const s0 = await request.get('/sitemap-0.xml');
  const xml = await s0.text();
  expect(xml).toContain('/blog/meditation-timer-interval-bells');
  expect(xml).not.toContain('<loc>https://gointervals.com/stopwatch</loc>');
  expect(xml).not.toContain('<loc>https://gointervals.com/timer');
  const llms = await request.get('/llms.txt');
  expect(llms.status()).toBe(200);
  expect(await llms.text()).toContain('/meditation');
  expect((await request.get('/humans.txt')).status()).toBe(200);
  const rss = await request.get('/rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<item>');
});

test('header and footer navigation are Timers and About only', async ({ page }) => {
  await page.goto('/about');
  const header = page.locator('header nav a');
  await expect(header).toHaveText(['Timers', 'About']);
  await expect(page.locator('header nav a[aria-current="page"]')).toHaveText('About');
  await expect(page.locator('footer a')).toHaveText(['Timers', 'About']);
});

test('home lists the five timers in order and links whole rows', async ({ page }) => {
  await page.goto('/');
  const rows = page.locator('.home__timers .row');
  await expect(rows.locator('.row__name')).toHaveText([
    'Interval',
    'Meditation',
    'Tabata',
    'EMOM',
    'Pomodoro',
  ]);
  await expect(rows.nth(1)).toHaveAttribute('href', '/meditation');
  await expect(page.getByRole('link', { name: 'Read the meditation timer guide' })).toBeVisible();
  await expect(page.locator('astro-island')).toHaveCount(0);
});

test('about has the source, author and X links, under 150 words', async ({ page }) => {
  await page.goto('/about');
  await expect(
    page.locator('a[href="https://github.com/nimi0112/gointervals"]').first(),
  ).toBeVisible();
  await expect(page.locator('a[href="https://nimishnandwana.com"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://x.com/nimish_nandwana"]').first()).toBeVisible();
  const words = (await page.locator('main').innerText()).trim().split(/\s+/).length;
  expect(words).toBeLessThan(150);
});

test('content pages ship no framework JS', async ({ page }) => {
  await page.goto('/blog/meditation-timer-interval-bells');
  const own = await page.locator('script[src^="/"]').count();
  expect(own).toBe(0);
  const srcs = await page
    .locator('script[src]')
    .evaluateAll((els) => els.map((e) => (e as HTMLScriptElement).src));
  expect(srcs.filter((s) => !s.startsWith('https://www.googletagmanager.com/'))).toEqual([]);
});

test('the article carries its author and links to the timers', async ({ page }) => {
  await page.goto('/blog/meditation-timer-interval-bells');
  await expect(page.locator('h1')).toHaveText('How to use a meditation timer with interval bells');
  await expect(page.locator('a[rel~="author"]')).toHaveText('Nimish Nandwana');
  expect(await page.locator('article a[href="/meditation"]').count()).toBeGreaterThanOrEqual(2);
  await expect(page.locator('article a[href="/interval"]')).toHaveCount(1);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const article = ld.map((t) => JSON.parse(t)).find((o) => o['@type'] === 'Article');
  expect(article?.author).toMatchObject({ '@type': 'Person', name: 'Nimish Nandwana' });
});

test('blog post is readable with JavaScript disabled', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/blog/what-is-a-tabata-timer');
  await expect(page.locator('h1')).toContainText(/tabata/i);
  await expect(page.locator('article h2').first()).toBeVisible();
  await ctx.close();
});
