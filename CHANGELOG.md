# Changelog

All notable changes to this project are documented here. Format follows Keep a Changelog; versions follow SemVer.

## [Unreleased]

### Changed

- Visual pass: lighter digit weight, calmer phase labels, more room around the timer, softer body text, a fade on the scrolling nav, larger digits on phones, and time-unit captions everywhere a bare number appeared.
- Settings moved above the presets; a live plain-English summary describes the current configuration.
- Open source messaging on the home, about and footer, MIT licence in JSON-LD.

### Added

- GitHub issue templates (bug, feature, preset page), PR template, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`.
- `.node-version` and an `npm run deploy` script for Cloudflare Pages via Wrangler.

## [0.1.0] - 2026-09-11

### Added

- Timer engine: timestamp-based, segment schedule, missed-event catch-up, injectable clock, full unit coverage.
- Timers: interval/HIIT (with saved presets and "beep every N minutes" built-ins), countdown, stopwatch with laps, Tabata, EMOM, Pomodoro with persistent session count.
- Platform: Web Audio beeps, screen wake lock with video fallback, fullscreen, tab-title countdown, keyboard shortcuts, localStorage wrapper with "Clear my data".
- Programmatic pages: 27 countdown lengths, 5 Tabata variants, 5 named workouts, each with unique copy and FAQ.
- Blog: 10 posts, index, tags, reading time, RSS.
- SEO: per-page titles, descriptions, canonicals, OG/Twitter tags, build-time OG images, JSON-LD (WebSite, Organization, WebApplication, SoftwareApplication, FAQPage, Article, BreadcrumbList), sitemap, robots.txt allowing AI crawlers, llms.txt, humans.txt, 404.
- PWA: manifest, service worker precaching all timer routes.
- Analytics: GA4 via `PUBLIC_GA_MEASUREMENT_ID`, custom events, disabled when unset.
- Tests: Vitest unit, Playwright e2e, build check script, GitHub Actions.
