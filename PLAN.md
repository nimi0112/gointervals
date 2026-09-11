# Go Intervals — build plan

Static Astro site, deployed to Cloudflare Pages. Free browser timers, no login, no server.
This document is the contract for the build. Sections: routes, architecture, components,
data files, dependencies, design tokens, decisions, build order.

## 1. Routes

### Timer pages (each hydrates one island)

| Route        | Mode                                                                                                                                                                | Island config     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `/`          | Home. Interval timer is the hero, then a section per mode, then "why this one", then FAQ                                                                            | `mode: interval`  |
| `/stopwatch` | Stopwatch with laps (split + total)                                                                                                                                 | `mode: stopwatch` |
| `/timer`     | Countdown with presets 1/3/5/10/15/20/30/45/60 min + custom                                                                                                         | `mode: countdown` |
| `/interval`  | Interval / HIIT. Work, rest, rounds, sets, rest between sets, prep. Named presets saved locally. Built-in presets include long "beep every N minutes" ones (see §7) | `mode: interval`  |
| `/tabata`    | Tabata, prefilled 20/10 × 8                                                                                                                                         | `mode: tabata`    |
| `/emom`      | EMOM, configurable total minutes and interval length                                                                                                                | `mode: emom`      |
| `/pomodoro`  | Pomodoro 25/5, long break every 4, editable. Session count persists                                                                                                 | `mode: pomodoro`  |

### Programmatic pages (generated from `src/data/*.ts` via `getStaticPaths`)

| Pattern                          | Count                                                                                            | Source                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------ |
| `/timer/[n]-minutes`             | 20 (1,2,3,4,5,6,7,8,9,10,12,15,20,25,30,40,45,50,60,90)                                          | `src/data/countdowns.ts` |
| `/timer/[n]-seconds`             | 7 (10,15,20,30,45,60,90)                                                                         | `src/data/countdowns.ts` |
| `/tabata/[work]-[rest]-[rounds]` | 5 (20-10-8, 30-15-8, 40-20-8, 45-15-10, 60-30-6)                                                 | `src/data/tabatas.ts`    |
| `/interval/[slug]`               | 5 (7-minute-workout, boxing-rounds-3-1, running-intervals-1-1, sprint-30-90, kettlebell-emom-10) | `src/data/workouts.ts`   |

Every data entry carries: slug, H1, title, description, hand-written intro (2–3 paragraphs, specific to that duration/workout), timer config, 3–4 FAQ pairs, related slugs. No templated copy with numbers swapped in.

### Content and utility pages

| Route                                                                                     | Notes                                                                                                                |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `/blog`                                                                                   | Index with tags, dates, reading time                                                                                 |
| `/blog/[slug]`                                                                            | 10 posts, Content Collections, Article + BreadcrumbList JSON-LD                                                      |
| `/blog/tag/[tag]`                                                                         | Tag archives                                                                                                         |
| `/rss.xml`                                                                                | `@astrojs/rss`                                                                                                       |
| `/about`                                                                                  | Who made it, why, no tracking beyond GA4, "Clear my data" button (tiny inline script)                                |
| `/404`                                                                                    | Real page, links to every timer                                                                                      |
| `/og/[...slug].png`                                                                       | Build-time OG image per page (satori + resvg)                                                                        |
| `/sitemap-index.xml`                                                                      | `@astrojs/sitemap` with `lastmod`                                                                                    |
| `/robots.txt`, `/llms.txt`, `/humans.txt`, `/manifest.webmanifest`, `/sw.js`, `/_headers` | Static in `public/` (`sw.js` is copied as-is; precache list is route-based, not hash-based, so no build step needed) |

## 2. Architecture

```
src/
  engine/                 pure TS, zero DOM, 100% unit-tested
    clock.ts              Clock interface { now(): number } + real + fake
    schedule.ts           mode config -> Segment[] (interval, tabata, emom, pomodoro, countdown)
    timer.ts              createTimer(schedule, clock): state machine driven by timestamps
    stopwatch.ts          createStopwatch(clock) with laps
    presets.ts            serialise/parse preset objects, slug helpers
    format.ts             ms -> "mm:ss", "h:mm:ss", tabular strings
  platform/               browser adapters, thin, each guarded with feature detection
    storage.ts            localStorage wrapper, try/catch, namespaced keys, clearAll()
    audio.ts              Web Audio beeps (work/rest/last3/done), unlock on gesture, mute persisted
    wakelock.ts           navigator.wakeLock + NoSleep video fallback, re-request on visibilitychange
    fullscreen.ts         request/exit, Esc handling
    analytics.ts          gtag wrapper, no-op if PUBLIC_GA_MEASUREMENT_ID missing
    title.ts              document.title updater
    keyboard.ts           Space / R / L / Esc bindings
  islands/                Preact, only loaded on timer pages
    Timer.tsx             one island, takes { mode, initialConfig, presets }
    parts/                Digits, Ring, Controls, Settings*, LapList, PresetBar, PhaseBadge
  components/             Astro, zero JS
    Head.astro            title/description/canonical/OG/Twitter/JSON-LD
    Nav.astro, Footer.astro, Breadcrumbs.astro, Faq.astro, Section.astro (numbered), RelatedTimers.astro, PostCard.astro
  layouts/                Base.astro, TimerPage.astro, Post.astro
  pages/                  routes above
  data/                   countdowns.ts, tabatas.ts, workouts.ts, faqs.ts, related.ts
  content/blog/*.md       10 posts
  styles/                 tokens.css, base.css, timer.css
  lib/                    seo.ts (JSON-LD builders), og.ts (satori template), readingTime.ts
scripts/
  check-build.mjs         walks dist/, fails on missing title/description/canonical/JSON-LD or dead internal link
tests/
  unit/                   Vitest against src/engine and src/platform/storage
  e2e/                    Playwright
```

### Timer engine, in one paragraph

Every mode except stopwatch compiles to a `Segment[]` (`{ phase: 'prep'|'work'|'rest'|'setrest'|'focus'|'break'|'longbreak', ms, round, set, label }`). The timer stores `startedAt`, `pausedAt`, `accumulatedPausedMs`, and derives everything else from `clock.now()`. `tick(now)` returns `{ segmentIndex, remainingMs, elapsedMs, events[] }` where `events` is every boundary crossed since the last tick, so a phone that slept through three phase changes returns three events and the audio layer plays the missed beeps (collapsed into one "catch-up" sound so it isn't a machine gun). Nothing counts ticks; `requestAnimationFrame` only drives rendering, and a 250ms `setInterval` fallback keeps the title updating when the tab is in the background.

### Persistence keys (`gi:` prefix)

`gi:settings:<mode>` last config per mode, `gi:presets:interval` named presets, `gi:history` last 50 completed sessions, `gi:pomodoro:sessions`, `gi:muted`, `gi:vibrate`. "Clear my data" removes every `gi:*` key.

## 3. Component tree (timer page)

```
TimerPage.astro
├─ Head.astro (SEO)
├─ Nav.astro
├─ Breadcrumbs.astro
├─ <main>
│  ├─ h1 + one-line intro (server rendered, above the island so LCP is text)
│  ├─ <Timer client:load mode=… config=…/>          ← the only JS on the page
│  │  ├─ PhaseBadge   (live region, aria-live="polite")
│  │  ├─ Digits       (monospace, tabular-nums, scales with viewport)
│  │  ├─ Ring         (SVG progress, respects reduced motion)
│  │  ├─ Controls     (Start/Pause dominant, Reset, Lap, Fullscreen, Mute)
│  │  ├─ Settings     (mode-specific form; collapses while running)
│  │  ├─ PresetBar    (built-in + saved presets; interval only)
│  │  └─ LapList      (stopwatch only)
│  ├─ Section 01…0n   (numbered SEO copy, "how to use", "when to use")
│  ├─ Faq.astro       (+ FAQPage JSON-LD)
│  └─ RelatedTimers.astro + related posts
└─ Footer.astro (Clear my data lives in /about, footer links there)
```

Content pages (blog, about, 404) use `Base.astro` and ship zero client JS beyond the deferred GA4 snippet.

## 4. Dependencies

Runtime / build:

| Package                                    | Why                                                                                                                                                                                            |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `astro`                                    | The framework. `output: 'static'`.                                                                                                                                                             |
| `@astrojs/preact` + `preact`               | Smallest island runtime (~4 kB). Only loaded on the 7 timer routes + programmatic pages. Vanilla DOM would work but settings forms, presets and lap lists get messy without a component model. |
| `@astrojs/sitemap`                         | Sitemap with lastmod, required by brief.                                                                                                                                                       |
| `@astrojs/rss`                             | Blog RSS, required by brief.                                                                                                                                                                   |
| `satori` + `@resvg/resvg-js`               | Build-time per-page OG PNGs. Runs only in `getStaticPaths` endpoints, nothing ships to client.                                                                                                 |
| `@fontsource-variable/bricolage-grotesque` | Display/sans, self-hosted, latin subset, woff2.                                                                                                                                                |
| `@fontsource-variable/jetbrains-mono`      | Digits and mono accents, tabular figures.                                                                                                                                                      |

Dev only:

| Package                                              | Why                                            |
| ---------------------------------------------------- | ---------------------------------------------- |
| `typescript` (strict)                                | Required.                                      |
| `vitest`                                             | Unit tests for engine + storage.               |
| `@playwright/test`                                   | E2E.                                           |
| `eslint`, `typescript-eslint`, `eslint-plugin-astro` | Lint.                                          |
| `prettier`, `prettier-plugin-astro`                  | Format.                                        |
| `node-html-parser`                                   | For `scripts/check-build.mjs` to read `dist/`. |

Not used, on purpose: Tailwind (design system is ~40 tokens, plain CSS custom properties are tighter and smaller), Partytown (a deferred `gtag` script is enough and simpler), `vite-plugin-pwa` (a 60-line hand-written service worker does the job), any icon library (the six icons needed are inline SVG), any animation library.

## 5. Design tokens

**Accent: `#0f7a4f`, "pitch green".** Reason: it reads as sport (turf, pitch, track infield) without being a gym-brand neon, it is nowhere near default Tailwind blue/purple or the warm terracotta that generated sites default to, and it passes AA on white for text (≈5.5:1) so the running-timer state and focus rings can use it un-tinted. Allowed uses: running-timer digits and ring, heading underline, tags, focus rings, the one primary button while running. Never as a background wash, never a gradient, never more than a few percent of a screen.

| Token                                | Value                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `--ink`                              | `#0a0a0a`                                                                                         |
| `--grey-900 / 700 / 500 / 300 / 100` | `#262626 / #525252 / #6a6a6a / #d4d4d4 / #f4f4f4`                                                 |
| `--paper`                            | `#ffffff`                                                                                         |
| `--accent`                           | `#0f7a4f`                                                                                         |
| `--accent-soft`                      | `#e6f2ec` (only for tag backgrounds and the ring track)                                           |
| Type                                 | Bricolage Grotesque (display + body), JetBrains Mono (digits, section numbers, kbd hints)         |
| Scale                                | 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64, timer digits `clamp(72px, 22vw, 240px)`                    |
| Spacing                              | 4-based: 4 8 12 16 24 32 48 64 96                                                                 |
| Radius                               | 4px on controls, 0 on layout blocks, `999px` only on the phase badge. Nothing else rounded.       |
| Motion                               | Ring progress and phase colour only. 150ms ease-out. All disabled under `prefers-reduced-motion`. |

Layout: left-aligned, max-width 68ch for prose, timer column centred. Section headers are numbered in mono (`01`, `02`) because the SEO sections on each page are an actual sequence (set up → run → what happens after).

Voice: dry, direct, short. "Beeps when it matters. Keeps the screen on. Works on the plane." Not "Unleash your best workout."

## 6. SEO plan

- `Head.astro` takes `{ title, description, path, type, jsonLd[] }`; every page passes all four. Canonical from `PUBLIC_SITE_URL`.
- OG image per page at `/og/<slug>.png`: page title in Bricolage on white, accent underline, mono "gointervals.com".
- JSON-LD: `WebSite` + `Organization` on home; `WebApplication` sitewide; `SoftwareApplication` on each timer page; `FAQPage` where an FAQ exists; `Article` + `BreadcrumbList` on posts; `BreadcrumbList` on every non-home page.
- `robots.txt`: `Allow: /` for `*`, plus explicit blocks for GPTBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot, Bytespider, Applebot-Extended, all allowed.
- `llms.txt` lists every route with one line each.
- `_headers`: CSP allowing self + googletagmanager + google-analytics, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, long cache on `/_astro/*`, no-cache on `sw.js`.
- Fonts preloaded, `font-display: swap`, size-adjust fallback metrics to keep CLS at 0.
- Internal links: `src/data/related.ts` maps every timer route to related timers and posts; every post frontmatter names its `timer` route.

## 7. Interval presets (top feature)

Built-in presets shown on `/interval` and the home hero, ahead of the user's saved ones:

| Name                         | Config                          |
| ---------------------------- | ------------------------------- |
| Beep every 10 min for 30 min | work 10:00, rest 0, rounds 3    |
| Beep every 5 min for 30 min  | work 5:00, rest 0, rounds 6     |
| Beep every 15 min for 60 min | work 15:00, rest 0, rounds 4    |
| Beep every 1 min for 20 min  | work 1:00, rest 0, rounds 20    |
| Classic HIIT 40/20 × 10      | work 40s, rest 20s, rounds 10   |
| Run/walk 1:1 × 10            | work 1:00, rest 1:00, rounds 10 |
| Boxing 3/1 × 12              | work 3:00, rest 1:00, rounds 12 |

Engine supports `rest: 0` (segments with 0ms are skipped) so "beep every N minutes" is a normal interval, no special mode.

## 8. Analytics

`PUBLIC_GA_MEASUREMENT_ID` and `PUBLIC_SITE_URL` in `.env`. GA4 loaded as `<script defer>` after first paint, only if the ID is set; otherwise one `console.warn` in dev. Events: `timer_start`, `timer_pause`, `timer_resume`, `timer_reset`, `timer_complete`, `preset_saved`, `preset_loaded`, `fullscreen_enter`, `mute_toggle`, `pwa_install` with `mode`, `duration_seconds`, `rounds`. No view transitions, so no SPA pageview handling needed.

`.env` content you need to fill in (I will create the file with these keys):

```
PUBLIC_SITE_URL=https://gointervals.com
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   # your GA4 measurement ID from admin → data streams
```

## 9. Tests and CI

- Vitest: schedule building for all modes, elapsed after simulated 40-minute sleep, missed-boundary events, pause/resume maths, lap split/total, preset round-trip, storage with a throwing `localStorage`, format helpers.
- Playwright: every route returns 200 and has an h1; countdown counts down with `page.clock`; Space/R/Esc shortcuts; saved interval preset survives reload; 404; robots/sitemap/llms served; JS-disabled render of a blog post still shows content.
- `scripts/check-build.mjs` runs after build in CI.
- GitHub Actions: lint → typecheck → unit → build → check-build → Playwright.

## 10. Decisions

- **Preact over vanilla DOM for the island.** Cost is 4 kB on timer pages only. Content pages ship no framework.
- **Plain CSS over Tailwind.** Fewer deps, no purge config, tokens live in one file.
- **Deferred gtag over Partytown.** Simpler, and a deferred script after first paint does not affect LCP.
- **Hand-written service worker.** Cache-first for `/_astro/*` (hashed), network-first with cache fallback for HTML. All timer routes precached on install so they work offline even if not visited.
- **No view transitions.** They would add the Astro client router to every page, which violates "no JS on content pages".
- **One `Timer` island for all modes** rather than seven components. Modes differ only in the schedule builder and the settings form.
- **"Beep every N minutes" is an interval preset with rest 0**, not a separate mode. Keeps the engine small and the URL structure flat.
- **Pomodoro long break every 4 is a `set` of 4 rounds with `setrest` = long break.** Same engine path as interval sets.
- **`/timer/[n]-seconds` and `-minutes` reuse the countdown island** with `autoStart: false`; the user still taps Start (autoplaying audio without a gesture is blocked on iOS anyway).
- **OG font.** Satori needs TTF/OTF, fontsource ships woff2, so a single static Bricolage TTF lives in `src/assets/fonts/` for build-time use only.
- **Lighthouse audit** runs with the `lighthouse` CLI via `npx` against `astro preview`, not added as a dependency.
- **Blog post lengths** 500–900 words each; primary keyword in slug, H1 and first sentence.

- **`/timer/1-minute` is singular.** The brief's pattern is `[n]-minutes`, but "1 minutes timer" is not a phrase anyone searches. Every other n is plural.
- **Progress is a thin bar, not a ring.** A 3px accent line under the digits reads better at 360px than a ring around 22vw digits, and it keeps the accent under a few percent of the screen.
- **"Clear my data" lives on `/about`**, linked from every footer, rather than in the timer chrome.
- **Long `<title>`s drop the site suffix.** Blog and workout titles keep their full keyword phrase; the " – Go Intervals" suffix is only appended when the result stays within 65 characters.
- **Static TTFs for OG images.** Satori's font parser fails on the variable Bricolage/JetBrains files, so `src/assets/fonts/` holds static 700/500 instances from Google Fonts, used at build time only.

## 11. Build order

1. Scaffold, tokens, lint/format/tsconfig, AGENTS.md skeleton
2. Engine + platform storage with Vitest (tests first)
3. Timer island, styles, all seven timer pages
4. Programmatic pages + data files + related links
5. Blog (10 posts, index, tags, RSS)
6. SEO: Head, JSON-LD, OG images, robots/llms/humans/_headers/sitemap, check-build script
7. Analytics
8. PWA (manifest, SW, icons)
9. Playwright, GitHub Actions
10. Lighthouse audit, handoff, `npm run preview` left running for review
