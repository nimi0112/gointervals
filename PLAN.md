# gointervals — build plan

Static Astro site, deployed to Cloudflare Pages. Five free browser timers, no login, no server.
This document is the contract for the build and the record of why things are the way they are.
The design source of truth is `goIntervals.pen`, kept locally and read through Pencil.

## 1. Routes

### Timer pages (each hydrates one island)

| Route         | Mode         | Setup fields                                                    |
| ------------- | ------------ | --------------------------------------------------------------- |
| `/interval`   | `interval`   | Work (s), Rest (s), Rounds. Default 1800 / 300 / 8              |
| `/meditation` | `meditation` | Session length (min), Bell every (min), three bell chips        |
| `/tabata`     | `tabata`     | None. Fixed 20 / 10 / 8, 04:00                                  |
| `/emom`       | `emom`       | Interval length (s), Total minutes. Default 60 / 10             |
| `/pomodoro`   | `pomodoro`   | Focus, Short break, Long break (min), Focus sessions. 25/5/15/4 |

### Preset pages (generated from `src/data/*.ts` via `getStaticPaths`)

| Pattern              | Source                    | Notes                                                            |
| -------------------- | ------------------------- | ---------------------------------------------------------------- |
| `/tabata/[w-r-n]`    | `src/data/tabatas.ts`     | 20-10-8 is `tabata`; every other variant is an `interval` config |
| `/interval/[slug]`   | `workouts.ts`, `beeps.ts` | Named workouts and "beep every N" (rest 0)                       |
| `/pomodoro/[slug]`   | `pomodoros.ts`            | 50-10, 52-17, 90-20, 15-5                                        |
| `/meditation/[slug]` | `meditations.ts`          | 5, 10, 20, 30, 45 minutes and 1 hour                             |

Every entry carries slug, H1, title, description, hand-written intro, config, 3–4 FAQs and related paths. Preset pages open with the page's config and do not read or write saved settings.

### Content and utility pages

| Route                                                                                                                          | Notes                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `/`                                                                                                                            | Header, intro, five timer rows, guide, FAQ, ready-made links, article link. No island |
| `/about`                                                                                                                       | Under 150 words, source/author/X links, Clear my data                                 |
| `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/rss.xml`                                                                         | Content Collections, Article (Person author) + BreadcrumbList JSON-LD                 |
| `/404`                                                                                                                         | One line and a home link, real 404, noindex                                           |
| `/og/[...slug].png`                                                                                                            | Build-time social card per page (satori + resvg)                                      |
| `/sitemap-index.xml`, `/robots.txt`, `/llms.txt`, `/humans.txt`, `/manifest.webmanifest`, `/sw.js`, `/_headers`, `/_redirects` | Static or generated                                                                   |

Removed on 2026-09-15 with 301s in `public/_redirects`: `/stopwatch`, `/timer`, `/timer/*`, and the old article slug `/blog/meditation-timer-with-interval-bells`.

## 2. Architecture

```
src/
  engine/                 pure TS, zero DOM, unit-tested with an injected clock
    clock.ts              Clock interface + real + fake
    schedule.ts           config -> Segment[] for interval, tabata, emom, pomodoro, meditation
    timer.ts              createTimer(segments, clock): timestamp-driven state machine
    validate.ts           field limits, parseField (never coerces), coerceStored
    format.ts             mm:ss with ceiling (130:00, never hours), human durations
    describe.ts           summaryFor (setup line), describeConfig (prose)
    presets.ts            defaultConfigs, TABATA
  platform/               browser adapters, feature-detected
    storage.ts            localStorage wrapper, gi: prefix, clearAll()
    audio.ts              oscillator beeps and one soft bell; unlockAudio() reports success
    wakelock.ts           navigator.wakeLock + inline video fallback (frozen)
    install.ts            earned install prompt decision matrix
    analytics.ts          gtag wrapper, no-op without PUBLIC_GA_MEASUREMENT_ID
    title.ts, keyboard.ts (Space / R / Esc)
  islands/                Preact, loaded on timer pages only
    Timer.tsx             the one island: settings, confirmations, progress, nav
    copy.ts               every on-screen string from config + snapshot (pure, tested)
    fields.ts             text drafts <-> config, stepping, bounds (pure, tested)
    useEngine.ts          rAF + interval + visibilitychange ticking
    parts/                Icon, Stepper, Progress, Settings, ShellNav, InstallPrompt
  components/             Astro, zero JS: Header, Footer, Breadcrumbs, Section, Faq, Related, PostList, ProgrammaticTimer, Head, Analytics
  layouts/                Base (header optional), TimerPage (island first, guide after), Post
  lib/                    seo.ts (JSON-LD), og.ts (social card), pages.ts, site.ts, icons.ts, readingTime.ts
  data/, content/blog/, styles/ (tokens, base, timer)
scripts/                  check-build.mjs, stamp-sw.mjs, gen-icons.mjs
tests/unit, tests/e2e
```

### Timer engine, in one paragraph

Every mode compiles to a `Segment[]` (`{ phase, ms, round, rounds, set, sets, label }`). The timer stores `startedAt`, `pausedAt`, `accumulatedPausedMs` and derives everything from `clock.now()`. `tick()` returns every boundary crossed since the last tick, so a phone that slept through three phase changes lands on the right one and the island plays one catch-up tone. Nothing counts ticks. The island keeps the last valid config, a text draft per field, and a `confirm` state for the shared stop/reset/leave question.

### Persistence keys (`gi:` prefix)

`gi:settings:<mode>` last valid config per mode (validated on load, Tabata must be exactly 20/10/8), `gi:history` last 50 completed sessions, `gi:muted`, `gi:vibrate`, `gi:pwa` install prompt state. Clear my data removes every `gi:*` key.

## 3. Component tree (timer page)

```
TimerPage.astro (no site header)
├─ <main>
│  ├─ <Timer client:load config=…/>            ← the only JS on the page
│  │  ├─ digits (role=timer) → phase icon + word → context → live region
│  │  ├─ Settings (idle) | Progress (running, paused, done)
│  │  ├─ quiet space: guidance, InstallPrompt after completion
│  │  ├─ keyboard hints (desktop) → primary → quiet secondary
│  │  └─ ShellNav: ← Timers · About · Sound, utility line
│  └─ .guide: Breadcrumbs, h1, lede, sections, Faq, Related
└─ Footer (Timers / About)
```

## 4. Dependencies

| Package                            | Why                                                         |
| ---------------------------------- | ----------------------------------------------------------- |
| `astro`                            | The framework. `output: 'static'`.                          |
| `@astrojs/preact` + `preact`       | Smallest island runtime; only loaded on timer routes.       |
| `@astrojs/sitemap`, `@astrojs/rss` | Sitemap with lastmod, blog RSS.                             |
| `satori` + `@resvg/resvg-js`       | Build-time social cards. Nothing ships to the client.       |
| `@fontsource-variable/dm-sans`     | UI face, self-hosted latin woff2 copied to `public/fonts/`. |
| `@fontsource-variable/azeret-mono` | Digits face, tabular numerals, self-hosted.                 |

Dev: `typescript`, `vitest`, `@playwright/test`, `eslint` + `typescript-eslint` + `eslint-plugin-astro`, `prettier` + `prettier-plugin-astro`, `node-html-parser` (check-build), `@astrojs/check`.

`@emnapi/runtime` and `@emnapi/core` are listed explicitly (dev) only so the lock file carries a top-level copy: the wasm fallbacks of `sharp` and `satteri` need them, npm on macOS never writes those platform-skipped entries, and `npm ci` on Linux then refuses the lock.

Not used, on purpose: Tailwind, Partytown, vite-plugin-pwa, any icon library (lucide paths are inlined), any animation library.

## 5. Design tokens

Porcelain & Ink: paper `#F7F8F5`, ink `#202722`, muted `#58615A`, line `#D6DDD5`, accent `#355B46` (forest), soft `#EBEFE9`, disabled `#E1E5DE`. DM Sans for UI, Azeret Mono for every number. Timer digits 98px at 375 and 208px at 1280; radius 8 on controls; 1px ink control boundaries; 2px accent focus ring with a 2px paper gap; 120ms feedback, 200ms progress, 0ms under reduced motion. Full detail in `AGENTS.md`.

## 6. SEO plan

- `Head.astro` takes `{ title, description, path, type, jsonLd[] }`. Canonical from `PUBLIC_SITE_URL`. Title suffix ` · gointervals` when it fits 65 characters.
- Social card per page at `/og/<slug>.png` in the canvas layout: wordmark, title, kicker, a clock reading, domain line.
- JSON-LD: `WebSite` + `Organization` + `FAQPage` + `ItemList` on home; `WebApplication` sitewide with a Person author; `SoftwareApplication` on each timer page; `HowTo` on preset pages; `Article` (Person author) + `BreadcrumbList` on posts; `BreadcrumbList` on every non-home page; `Person` on About.
- `robots.txt` allows everyone including AI crawlers. `llms.txt` lists every route and the limits of each timer.
- `_headers`: CSP allowing self + GA + Cloudflare Insights, long cache on `/_astro/*` and `/fonts/*`, no-cache on `sw.js`.
- Fonts preloaded, metric-matched fallbacks for CLS 0.
- Internal links: `src/data/related.ts` maps every timer route to related timers and posts; every post names its `timer`; home links to ready-made pages and the meditation guide.

## 7. Analytics

`PUBLIC_GA_MEASUREMENT_ID` and `PUBLIC_SITE_URL` in `.env`. GA4 loaded deferred after first paint, only if the ID is set. Events: `timer_start`, `timer_pause`, `timer_resume`, `timer_stop_confirmed`, `timer_reset_confirmed`, `timer_complete`, `timer_run_again`, `timer_change_settings`, `invalid_input`, `audio_toggle`, `audio_unavailable`, `wakelock_failed` (only the unsupported case is observable), `nav_away_during_session`, `blog_read` (end of article scrolled into view), `outbound_click`, and the `pwa_*` install funnel. Timer events carry `mode` and the configured values. No cookies of our own; About says so honestly.

## 8. Tests and CI

- Vitest: schedule building for every mode (final rest, fixed Tabata, capped EMOM, finite Pomodoro, meditation remainder and bell counts), timer position after a simulated sleep, missed-boundary events, pause/resume maths, validation and stored-config coercion, field drafts and stepping, on-screen copy per state, keyboard handling, storage with a throwing `localStorage`, install prompt matrix, manifest and service worker rules.
- Playwright (desktop Chrome and Pixel 7): every route returns 200 with one h1; interval, Tabata, EMOM, Pomodoro and meditation flows with `page.clock`; pause/resume; stop and reset confirmations; navigation-away confirmation; invalid input; steppers and bounds; keys ignored in fields; persistence and corrupt-storage fallback; blocked audio notice; long-sleep catch-up; 93+ minute display; sound chip; install prompt; 404; redirects file; no framework JS on content pages; JS-disabled blog.
- `scripts/check-build.mjs` after build: metadata, dead links, images, PWA integrity.

## 9. Decisions

- **Five timers, no stopwatch or countdown.** A stopwatch is a different product; a countdown is an interval with one round and no rest. Their URLs 301 to the closest survivor.
- **Guide below the shell, not above.** Nothing may sit above the digits, and a page still needs one visible H1 and its SEO copy, so the H1-led guide follows the subordinate nav and precedes the site footer.
- **The island owns the subordinate nav.** It is the only way to ask before you leave a running session, and the sound chip lives in that row.
- **Final rest is included.** A session ends on a rest, so the last sound is the finish, not a work beep, and the total matches the summary.
- **Tabata is fixed.** It is the fewest-settings path; variants are interval configs on their own pages.
- **Pomodoro is one finite cycle** with no persistent session counter. Run again starts a fresh cycle.
- **Meditation clock is the whole session.** Interval bells never restart the clock or turn a sit into rounds. Interval, start and end bells are independent; global mute overrides all.
- **Typed input is never coerced.** Errors say the bound. Start goes unavailable until fixed.
- **Confirmations are full-panel, not modals.** The digits stay, the question replaces the phase word, focus moves and is restored.
- **Service worker never activates under a session.** `skipWaiting` only on a message the page sends when idle.
- **Static TTFs for social cards.** Satori cannot parse the variable fonts, so static DM Sans 500/600 and Azeret Mono 500 instances live in `src/assets/fonts/` for build time only.
- **Space yields to a focused button.** The system focus rule says Space activates buttons; the global shortcut only acts when nothing focusable would.
- **Article author is a Person.** Nimish Nandwana, linked to https://nimishnandwana.com, on every post.

## 10. Build order (2026-09-15 redesign)

1. Fonts and tokens
2. Engine schedule, format, validation (tests first)
3. Platform: audio unlock result, keyboard, analytics, storage
4. Base styles, header, footer, shared components
5. Island: copy, fields, parts, state machine, timer CSS
6. Pages: timer layout, home, about, 404, blog, post
7. Content: article, retargeted posts, redirects, service worker, manifest, icons, social card
8. Preset data on the new engine types
9. Unit and e2e tests, screenshot comparison against the canvas at 375 and 1280
10. AGENTS.md and PLAN.md
