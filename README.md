# Go Intervals

[![CI](https://github.com/nimi0112/gointervals/actions/workflows/ci.yml/badge.svg)](https://github.com/nimi0112/gointervals/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/licence-MIT-0f7a4f)](LICENSE)
[![Lighthouse 100](https://img.shields.io/badge/lighthouse-100%2F100%2F100%2F100-0f7a4f)](#verify-it)

Free, open source browser timers at [gointervals.com](https://gointervals.com): interval/HIIT, countdown, stopwatch, Tabata, EMOM, Pomodoro and a single-bell meditation timer. No login, no ads, no server, no dark mode.

What makes it different:

- **It does not drift.** Every timer derives its position from timestamps, never from counting ticks. Sleep the phone through three rounds and it wakes up on the right one, then plays a catch-up tone.
- **The screen stays on** through the Screen Wake Lock API, with a silent-video fallback for browsers without it.
- **Beeps are generated**, not downloaded. Distinct tones for work, rest, the last three seconds and the finish.
- **It works offline** after the first visit. A service worker precaches every timer route.
- **"Beep every N minutes"** is a first-class preset: 10 minute blocks for 30 minutes, or any shape you like.
- **Zero JavaScript on content pages.** The blog, about and 404 pages are plain HTML. Only the timer hydrates.

## Run it

```bash
git clone https://github.com/nimi0112/gointervals
cd gointervals
cp .env.example .env      # add a GA4 measurement ID, or leave it blank to disable analytics
npm install
npm run dev               # http://localhost:4321
```

## Verify it

```bash
npm run lint
npm run typecheck
npm test                  # Vitest: engine, schedule, stopwatch, presets, storage
npm run build
npm run check:build       # every page has title/description/canonical/JSON-LD, no dead links
npx playwright install chromium   # once
npm run test:e2e          # Playwright on desktop and mobile
```

Lighthouse on mobile scores 100 / 100 / 100 / 100 on the home page, every timer page and the blog.

## Deploy to Cloudflare Pages

Either connect the repo in the Cloudflare dashboard:

| Setting                | Value                                                                     |
| ---------------------- | ------------------------------------------------------------------------- |
| Framework preset       | Astro                                                                     |
| Build command          | `npm run build`                                                           |
| Build output directory | `dist`                                                                    |
| Node version           | 22 (read from `.node-version`)                                            |
| Environment variables  | `PUBLIC_SITE_URL=https://gointervals.com`, `PUBLIC_GA_MEASUREMENT_ID=G-…` |

Or deploy from your machine with Wrangler, after `npx wrangler login`:

```bash
npm run deploy
```

`public/_headers` ships the caching and security headers, including a Content Security Policy that allows GA4 and nothing else. Custom domain, HTTPS and the www redirect are configured in the Cloudflare dashboard.

After the first deploy: submit `https://gointervals.com/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.

## Layout

```
src/engine      pure timer logic, injectable clock, no DOM
src/platform    browser adapters: audio, wake lock, storage, analytics, keyboard
src/islands     the Preact timer UI, loaded only on timer pages
src/data        programmatic page content (countdowns, tabatas, workouts)
src/content     blog posts
scripts         build check, icon generation
tests           unit (Vitest) and e2e (Playwright)
AGENTS.md       the rules: design tokens, voice, engine invariants, SEO checklist
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md). Bug reports, preset page requests and feature ideas each have an issue template.

MIT licensed. Made by one person who got tired of a 20 minute EMOM ending 40 seconds late.
