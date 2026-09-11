# AGENTS.md

Rules for anyone (human or agent) changing gointervals.com. Read fully before touching code. `PLAN.md` explains why things are the way they are; this file says what to keep.

## What this is

A static Astro site of browser timers. No server, no auth, no dark mode. Timer UI is one Preact island; every other page ships zero client JavaScript beyond the GA4 loader.

## Design system

### Palette

| Token           | Hex       | Use                                                                       |
| --------------- | --------- | ------------------------------------------------------------------------- |
| `--ink`         | `#0a0a0a` | Text, primary button, borders that matter                                 |
| `--grey-900`    | `#262626` | Primary button hover                                                      |
| `--grey-700`    | `#525252` | Secondary text, rest-phase digits                                         |
| `--grey-500`    | `#6a6a6a` | Meta text, paused digits, placeholders                                    |
| `--grey-300`    | `#d4d4d4` | Rules, input borders                                                      |
| `--grey-100`    | `#f4f4f4` | Hover backgrounds, progress track                                         |
| `--paper`       | `#ffffff` | Background. The only background.                                          |
| `--accent`      | `#0f7a4f` | "Pitch green". See below.                                                 |
| `--accent-soft` | `#e6f2ec` | Tag backgrounds, active chip background, heading underline. Nothing else. |

**The accent may be used for:** running-timer digits during a work phase, the progress bar fill, focus rings, the active chip border/text, tag text, the heading underline (`.u`), the brand dot, section numbers, the fastest lap. **It may not be used for:** backgrounds larger than a tag, buttons at rest, body text, gradients, illustrations. If the accent covers more than a few percent of a screen, it is wrong.

### Type

- Display and body: Bricolage Grotesque, variable, self-hosted latin subset at `public/fonts/bricolage-latin.woff2`, `font-display: swap`, metric-matched fallback in `tokens.css`.
- Digits, section numbers, kbd, meta: JetBrains Mono, same files treatment but `font-display: optional`. The digits are the LCP element on every timer page, so they must paint once and never re-fire; on a slow first visit they may render in the metric-matched Menlo/Consolas fallback, and the service worker caches the file for every later view. Always `font-variant-numeric: tabular-nums`.
- Scale (rem): 0.875, 1, 1.125, 1.375, 1.75, 2.25, 3, 4. Timer digits `clamp(4.5rem, 22vw, 15rem)`, scaled down automatically for 7 and 9 character displays.
- Headings: weight 600-700, letter-spacing -0.02 to -0.035em, `text-wrap: balance`. Sentence case. No all-caps labels. No single-word colour accents inside headlines.
- Measure: 68ch for prose. Left aligned. The timer column is centred and capped at 560px.

### Spacing, radius, motion

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96. Use the tokens.
- Radius: 4px on controls and inputs. 0 on layout blocks. 999px only on the brand dot. Nothing else is rounded.
- Motion: colour transitions and the progress bar only, 150ms ease-out. No entrance animations, no hover lifts, no parallax. Everything is disabled under `prefers-reduced-motion`.
- Structure over decoration: 1px rules and numbered sections carry hierarchy. Sections are numbered only where the content is a sequence.

### Banned patterns

Gradient blobs, glassmorphism, purple-to-blue or any gradients, floating cards with drop shadows, three-column icon-in-circle feature grids, stock illustrations, sparkle icons, emoji in UI, rounded-everything, "Powered by AI" badges, tracked-out all-caps eyebrow labels, arrows appended to link text, dark mode, `prefers-color-scheme` handling of any kind, hero copy like "The ultimate timer for everything".

## Voice

Dry, direct, short sentences, written by a person who uses the thing. Gen Z indie-app, not a content farm, not a corporation. Sentence case everywhere. No exclamation marks. Say what it does.

Good:

- "Beeps when it matters. Keeps the screen on. Works on the plane."
- "Thirty seconds is about as long as an actual sprint lasts before it becomes a hard run."
- "Set Rest to 0 for a timer that just beeps every N minutes."

Bad:

- "Unleash your full potential with the ultimate interval timer!"
- "Whether you're a beginner or a seasoned athlete, we've got you covered."
- "Our cutting-edge, AI-powered solution revolutionises the way you train."

Buttons say what happens: "Start", "Pause", "Resume", "Save current as preset", "Clear my data". Errors explain and point to a fix. Empty states invite an action.

## Timer engine invariants

Live in `src/engine`. Pure TypeScript, no DOM, fully unit tested with an injected clock.

1. Position is derived from `clock.now() - startedAt - pausedTotal`. Nothing counts ticks. `requestAnimationFrame` and `setInterval` only trigger re-reads of the clock.
2. Every mode except stopwatch compiles to a `Segment[]`. Zero-length segments are dropped at build time. "Beep every N minutes" is an interval with `rest: 0`, not a mode. Meditation is its own mode only because its sound design differs: one soft bell for every event, no warning ticks, no catch-up tone.
3. `tick()` returns every boundary crossed since the last tick, in order. The UI plays one catch-up tone when more than one segment boundary was crossed, so a phone that slept never fires a burst of beeps.
4. `visibilitychange` to visible triggers an immediate `tick()`.
5. Wake lock is requested when status becomes `running` and released otherwise, with re-acquisition on `visibilitychange`. The video fallback is inline, no dependency.
6. `unlockAudio()` is called from every start/toggle gesture. Beeps are oscillators. No audio files.
7. `document.title` shows the remaining time while running or paused and is restored on reset.
8. Keyboard: Space toggle, R reset, L lap, Esc pause/stop and leave fullscreen. Ignored while typing in a field.

Changing any of these needs a test change in `tests/unit` first.

## SEO checklist for every new page

- [ ] Unique `<title>` under 70 characters (with the site suffix) and a description of 120-155 characters, passed to `Base`/`TimerPage` via props.
- [ ] Canonical, OG and Twitter tags come from `Head.astro`; do not hand-write them.
- [ ] The page is listed in `src/lib/pages.ts` so it gets an OG image, or is a blog post / data entry (those are picked up automatically).
- [ ] Exactly one `<h1>`, containing the primary keyword. Keyword in the first paragraph.
- [ ] JSON-LD: `SoftwareApplication` for timers, `Article` for posts, `FAQPage` where a FAQ exists, `BreadcrumbList` on every non-home page. Use the builders in `src/lib/seo.ts`.
- [ ] Breadcrumbs rendered on every non-home page.
- [ ] Links to at least two related timers and, where one exists, the relevant blog post. Add the reverse link too.
- [ ] Copy is specific to the page. If it could be swapped with another page by changing a number, rewrite it.
- [ ] `npm run build && npm run check:build` passes: it fails on missing title/description/canonical/JSON-LD/h1, dead internal links and images without dimensions.
- [ ] No new client JS on a content page.

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
| `npm run check:build`             | SEO and dead-link audit of `dist/`               |
| `node scripts/gen-icons.mjs`      | Regenerate PNG icons from `public/favicon.svg`   |

### Adding a programmatic page

1. Add an entry to the right file in `src/data/`: `countdowns.ts` (lengths), `uses.ts` (purpose pages under `/timer/`), `tabatas.ts`, `workouts.ts`, `beeps.ts` (repeating beeps under `/interval/`), `pomodoros.ts`, or `meditations.ts`. Every field is required, including hand-written intro paragraphs and 3-4 FAQs. `src/data/index.ts` concatenates them all for lookups and OG images.
2. Add it to `related` on two or three neighbouring entries.
3. Build. The route, OG image and sitemap entry are generated. `check:build` will tell you if a link is dead.
4. If it is a new _kind_ of page, add a `[slug].astro` under `src/pages/<kind>/` using `ProgrammaticTimer.astro`, and add the paths to `src/lib/pages.ts`.

### Adding a blog post

1. Create `src/content/blog/<slug>.md` with the frontmatter in `src/content.config.ts` (`title`, `description`, `pubDate`, `tags`, `timer`, `keyword`).
2. Body: 500-900 words, no leading H1 (the layout renders it), keyword in the first sentence, link the timer at least twice, end with a "Try it" line.
3. Add the post path to `relatedPosts` in `src/data/related.ts` or to a data entry's `related` so a timer page links back.

## Do not

- Do not add dark mode, a theme toggle, or any `prefers-color-scheme` rule.
- Do not add auth, accounts, server endpoints, or `output: 'server'`.
- Do not use cookies. `localStorage` only, through `src/platform/storage.ts`.
- Do not add a dependency without a one-line reason in `PLAN.md` under Dependencies. The current list is intentionally short.
- Do not add client JS to content pages. Blog, about and 404 must stay JS-free.
- Do not add third-party scripts other than GA4 and Cloudflare Web Analytics (injected by Pages, allowed in the CSP).
- Do not ship audio files, icon fonts, or an animation library.
- Do not count ticks in anything time-related.
- Do not write templated copy with a number swapped in.
