# AGENTS.md

Rules for anyone (human or agent) changing gointervals.com. Read fully before touching code. `PLAN.md` explains why things are the way they are; this file says what to keep. The design source of truth is `goIntervals.pen` (Pencil): read it through the Pencil MCP tools, never with Read or Grep, and never modify it.

## What this is

A static Astro site of five browser timers: Interval, Meditation, Tabata, EMOM, Pomodoro. No server, no auth, no dark mode. Each timer page hydrates one Preact island; every other page ships zero client JavaScript beyond the GA4 loader and the small inline script in `Base.astro`.

## Design system: Porcelain & Ink

### Palette

| Token        | Hex       | Use                                                                          |
| ------------ | --------- | ---------------------------------------------------------------------------- |
| `--paper`    | `#F7F8F5` | The only background                                                          |
| `--ink`      | `#202722` | Text, control boundaries (1px strokes on steppers, secondary buttons, chips) |
| `--muted`    | `#58615A` | Secondary text, context lines, units                                         |
| `--line`     | `#D6DDD5` | Dividers, progress track. Grouping only                                      |
| `--accent`   | `#355B46` | Forest: primary button, focus ring, wordmark, links, progress fill           |
| `--soft`     | `#EBEFE9` | Selected surface: chip fill, stepper buttons, the first home row             |
| `--disabled` | `#E1E5DE` | Unavailable controls. Ink text on it, never opacity                          |

The accent is the one coloured surface. It may cover the primary button and the progress fill and nothing larger. No gradients, no shadows, no second accent.

### Type

- UI: DM Sans, variable, self-hosted latin subset at `public/fonts/dm-sans-latin.woff2`, `font-display: swap`, metric-matched fallback in `tokens.css`.
- Every number: Azeret Mono, `public/fonts/azeret-mono-latin.woff2`, `font-display: optional` (the digits are the LCP element on timer pages; they paint once and never re-fire), always `font-variant-numeric: tabular-nums`.
- Scale: T1 timer 98px at 375 / 208px at 1280, weight 500; T2 heading 36/1.2; T3 section 22/1.3; T4 UI 16/1.4; T5 label 13/1.4. Phase word 24/28, weight 500. Blog H1 48/600, H2 28/600, body 18/1.65.
- Headings weight 500 (blog 600), sentence case. No all-caps labels except the one home eyebrow in the digits face.
- Static TTF instances for satori live in `src/assets/fonts/` (build time only; satori cannot parse variable fonts).

### Spacing, shape, motion

- Space: 4, 8, 12, 16, 24, 32, 48, 64. Gutters 20px at 375, 64px at 1280, content max 1152px.
- Radius: 0 on structure, 8px on controls and rows. Targets at least 44×44.
- Focus: 2px accent outline with a 2px paper gap. Never hidden.
- Motion: feedback 120ms ease-out, progress 200ms linear, everything 0ms under `prefers-reduced-motion`. No pulsing, ticking, entrance or digit animation.

### Components (canvas → code)

Primary button `.btn--primary` (72px on the timer, 60px elsewhere), secondary `.btn`, quiet `.btn--quiet`, chip `.chip` with explicit "· On / · Off" text and `aria-pressed`, `Stepper` (− / editable number / +), `Progress` (6px track, details row), `ShellNav` (← Timers · About · Sound, utility line), home rows `.row`, content header `Header.astro`, footer Timers / About only. Icons are inline lucide paths in `src/lib/icons.ts`; no icon library.

### Banned

Dark mode or any `prefers-color-scheme` rule, gradients, glassmorphism, drop shadows, hero cards, feature grids, illustrations, emoji in UI, marketing copy on timer pages, hidden SEO copy, modal overlays, fullscreen mode, a stopwatch or countdown mode.

## Timer page order

DOM and visual order at every width, nothing above the digits except the safe-area inset:

1. Digits (`role="timer"`)
2. Phase word + icon
3. Context line
4. Settings (setup) or progress (running, paused, done)
5. Quiet space with state guidance
6. Desktop keyboard hints (≥720px with hover)
7. Primary action, then the quiet secondary
8. Subordinate nav: ← Timers · About · Sound chip; utility footer line
9. The guide: the page's single `<h1>`, lede, sections, FAQ, related links
10. Site footer

The island (`src/islands/Timer.tsx`) owns 1–8, including the nav, so it can ask before you leave a running session. Timer pages render no site header.

## Timer behaviour invariants

Live in `src/engine` (pure TypeScript, injected clock) and `src/islands`. Changing any of these needs a test change first (`tests/unit`, `tests/e2e`).

1. Position is derived from `clock.now() - startedAt - pausedTotal`. Nothing counts ticks. `requestAnimationFrame` and `setInterval` only trigger re-reads of the clock; `visibilitychange` to visible ticks at once.
2. Every mode compiles to a `Segment[]`; zero-length segments are dropped. Interval includes the rest after the last round. Tabata is the fixed 20/10/8 (04:00) and only that; stored values that differ are discarded. EMOM has ceil(total/interval) blocks with the last one capped. Pomodoro is one finite cycle: F SB F SB … F LB Done, never restarting. Meditation's clock is the whole session; interval bells split it and the remainder is the last block.
3. `tick()` returns every boundary crossed since the last tick, in order. More than one boundary plays a single catch-up tone, never a burst. Meditation plays one soft bell for everything, no warning ticks, and a bell coinciding with the end plays only the end cue.
4. Limits: interval work 1–3600 s, rest 0–3600 s, rounds 1–99; EMOM interval 15–300 s, minutes 1–99; Pomodoro minutes 1–180, sessions 1–12; meditation session 1–180 min, bell 1 min to the session length. Typed input is never coerced: invalid text stays visible with a specific inline error, `aria-describedby`, and a disabled Start. Steppers move by 1, clamp, disable at a bound and repeat after a 400ms hold.
5. Keyboard: Space start/pause/resume, Esc stop, R reset. Space and R are ignored inside fields and with modifiers; Space yields to a focused button. Stop, reset and navigating away during a running or paused session go through the shared full-panel confirmation (not a modal: announce, move focus to Keep going, restore focus on cancel). Confirming returns to setup with values kept. No confirmation from setup or Done. R in setup restores the preview to the last valid settings.
6. Done shows 00:00, the check icon, the completion count, full progress and the total, with exactly two actions: Run again and Change settings.
7. Audio needs a start gesture. A blocked or missing context shows "Sound blocked. Tap On to retry." in the utility line and the timer keeps running. Beeps are oscillators; no audio files. The sound chip persists.
8. Wake lock is requested when status becomes `running` and released otherwise, with re-acquisition on `visibilitychange`. `src/platform/wakelock.ts` is frozen; do not edit it.
9. Settings persist per mode in `gi:settings:<mode>` and are validated on load; anything malformed falls back to the defaults with a quiet notice.
10. `document.title` shows the remaining time and phase while running or paused and is restored on reset.

## Installable app

The site is a PWA and must stay one. `public/manifest.webmanifest`, `public/sw.js`, the icons in `public/icons/`, and the registration in `Base.astro` are the whole of it.

- The service worker's `VERSION` is the literal `__BUILD_VERSION__`; `scripts/stamp-sw.mjs` replaces it during `npm run build`. Never edit `dist/sw.js` by hand.
- The worker never calls `skipWaiting()` on its own. `Base.astro` posts `SKIP_WAITING` only when `window.__giSessionActive` is false (the island sets it and dispatches `gi:session-idle`). An update must never interrupt a running or paused session.
- `PRECACHE` lists the five timers, home, about and 404; `check:build` fails if a precached route is not built.
- Icons come from `npm run icons` (`scripts/gen-icons.mjs`) from `public/favicon.svg`, which is the ring mark from the canvas icon master. The maskable icon is a separately padded file.
- `manifest.id` is stable. Changing it orphans every installed copy.
- The install prompt is earned: it appears only after a completed session (`src/platform/install.ts`). Do not add a second surface or a prompt on load.

## Voice

Dry, direct, short sentences, written by a person who uses the thing. Sentence case. No exclamation marks. Buttons say what happens: Start, Pause, Resume, End session, Keep going, Run again, Change settings. Errors say what is wrong and the bound: "Work must be at least 1 second."

## SEO checklist for every new page

- [ ] Unique `<title>` under 70 characters with the suffix and a description of 120–160 characters, passed to `Base`/`TimerPage`.
- [ ] Canonical, OG and Twitter tags come from `Head.astro`. The OG image is rendered by `src/lib/og.ts` in the social-card layout; list the page in `src/lib/pages.ts` unless it is a post or a data entry.
- [ ] Exactly one visible `<h1>` with the primary keyword. On timer pages it lives in the guide below the shell.
- [ ] JSON-LD: `SoftwareApplication` for timers, `Article` (Person author) for posts, `FAQPage` only where visible Q&As exist, `BreadcrumbList` on every non-home page, `HowTo` on preset pages. Builders in `src/lib/seo.ts`.
- [ ] Links to at least two related timers and, where one exists, the relevant post. Add the reverse link.
- [ ] Copy is specific to the page. No templated copy with a number swapped in.
- [ ] `npm run build && npm run check:build` passes: missing metadata, dead internal links and images without dimensions fail it.
- [ ] No new client JS on a content page. Header and footer stay Timers / About.
- [ ] Removed URLs get a 301 in `public/_redirects`.

## Commands

| Command                           | What                                             |
| --------------------------------- | ------------------------------------------------ |
| `npm run dev`                     | Dev server                                       |
| `npm run build`                   | Static build to `dist/` (also renders OG images) |
| `npm run preview`                 | Serve `dist/`                                    |
| `npm test`                        | Vitest unit tests                                |
| `npm run test:e2e`                | Playwright against `astro preview`               |
| `npm run lint` / `npm run format` | ESLint / Prettier                                |
| `npm run typecheck`               | `astro check`                                    |
| `npm run check:build`             | SEO, dead-link and PWA audit of `dist/`          |
| `npm run icons`                   | Regenerate PNG icons from `public/favicon.svg`   |

### Adding a preset page

1. Add an entry to `src/data/tabatas.ts`, `workouts.ts`, `beeps.ts`, `pomodoros.ts` or `meditations.ts` with hand-written intro paragraphs and 3–4 FAQs. Configs use the engine types in `src/engine/schedule.ts`; Tabata variants other than 20/10/8 are `interval` configs.
2. Add it to `related` on two or three neighbours. Build; the route, OG image and sitemap entry follow.

### Adding a blog post

1. Create `src/content/blog/<slug>.md` with the frontmatter in `src/content.config.ts`. The author defaults to the site author.
2. Body 500–900 words, no leading H1, keyword in the first sentence, link the timer at least twice, end with a "Try it" line. Every link is a real anchor with a visible underline.
3. Add it to `relatedPosts` in `src/data/related.ts` or to a data entry's `related`.

## Do not

- Do not add dark mode, a theme toggle, or any `prefers-color-scheme` rule.
- Do not add auth, accounts, server endpoints, or `output: 'server'`.
- Do not use cookies. `localStorage` only, through `src/platform/storage.ts`.
- Do not add a dependency without a one-line reason in `PLAN.md` under Dependencies.
- Do not add client JS to content pages. Home, blog, about and 404 are JS-free.
- Do not add third-party scripts other than GA4 and Cloudflare Web Analytics.
- Do not ship audio files, icon fonts, or an animation library.
- Do not count ticks in anything time-related.
- Do not put anything above the digits on a timer page, or a header on one.
- Do not bring back the stopwatch, the countdown, laps, fullscreen, presets or the Pomodoro session counter.
