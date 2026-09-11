# Go Intervals

Free browser timers at [gointervals.com](https://gointervals.com): interval/HIIT, countdown, stopwatch, Tabata, EMOM and Pomodoro. No login, no ads, no server. Timing is derived from timestamps so it never drifts, the screen stays on while a timer runs, and the site works offline after the first visit.

## Run it

```bash
cp .env.example .env      # add your GA4 measurement ID, or leave it blank
npm install
npm run dev               # http://localhost:4321
```

## Verify it

```bash
npm run lint
npm run typecheck
npm test                  # unit tests (engine, storage)
npm run build && npm run check:build
npm run test:e2e          # Playwright, needs `npx playwright install chromium` once
```

## Deploy

Static output in `dist/`. On Cloudflare Pages: build command `npm run build`, output directory `dist`, set `PUBLIC_SITE_URL` and `PUBLIC_GA_MEASUREMENT_ID` as environment variables. `public/_headers` supplies caching and security headers.

## Layout

- `src/engine` pure timer logic, no DOM
- `src/platform` browser adapters (audio, wake lock, storage, analytics)
- `src/islands` the Preact timer UI, only loaded on timer pages
- `src/data` programmatic page content
- `src/content/blog` posts
- `AGENTS.md` the rules for working on this repo

MIT licensed.
