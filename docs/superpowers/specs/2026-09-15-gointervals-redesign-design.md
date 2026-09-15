# Go Intervals redesign: Porcelain & Ink

Date: 2026-09-15. Status: approved by the owner (decisions listed below are final; do not re-ask).
Design source of truth: `goIntervals.pen` (Pencil MCP). This document records what was read from
the canvas boards and how it maps onto the existing Astro/Preact codebase.

## 1. Goal

Re-implement gointervals.com on the "Porcelain & Ink" design system with five timers (Interval,
Meditation, Tabata, EMOM, Pomodoro), keeping the tested timestamp engine (`src/engine`), the
storage abstraction, the wake lock module, the PWA and the build/SEO tooling. Stopwatch and
countdown go away with 301s. SEO surface is extended, never trimmed.

## 2. Owner decisions (final)

1. Routes kept and restyled: `/`, `/interval`, `/meditation`, `/tabata`, `/emom`, `/pomodoro`,
   `/about`, `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/rss.xml`, `llms.txt`, `humans.txt`,
   robots, sitemap, 404. Deleted: `/stopwatch`, `/timer`, `/timer/*` with 301s in
   `public/_redirects` to the closest surviving timer. Programmatic `/tabata/*`, `/interval/*`,
   `/pomodoro/*`, `/meditation/*` are rebuilt on the new shell at the end. Header nav and footer
   show Timers / About only; home lists the five timers.
2. Delete the Stopwatch island, `src/engine/stopwatch.ts` and its tests, countdown mode, the L
   lap key and the fullscreen control. Blog posts that promoted removed timers are retargeted to
   `/interval` (rest 0) or `/meditation` with light copy edits; no post is deleted.
3. GA4 stays with richer events (see §9). About copy says honestly: no account, no ads, no
   cookies of our own, anonymous usage stats.
4. Interval fields: Work / Rest / Rounds only. Default 30:00 / 05:00 / 8 (canvas 40/20/8 is a
   sample). Ranges work 1–3600 s, rest 0–3600 s, rounds 1–99. Final rest is included. Start
   enters Work immediately (prep 0). Engine keeps `prep`, `sets`, `setRest` for programmatic
   workouts; they leave the UI along with the preset bar.
5. Blog: replace `meditation-timer-with-interval-bells.md` with the canvas article at slug
   `meditation-timer-interval-bells`, lightly SEO tuned, 301 the old slug, update related maps.
   Author Nimish Nandwana (https://nimishnandwana.com). Publication date = the date it ships
   (2026-09-15); nothing older is invented.
6. SEO is top priority: llms.txt, RSS, sitemap, JSON-LD, OG images, breadcrumbs, internal links.
7. `src/platform/wakelock.ts` stays byte-for-byte as is.

## 3. Design system (from board `bi8Au`)

Tokens (CSS custom properties in `src/styles/tokens.css`):

| Token        | Value     | Role                                                           |
| ------------ | --------- | -------------------------------------------------------------- |
| `--paper`    | `#F7F8F5` | Porcelain canvas, only background                              |
| `--ink`      | `#202722` | Text, control boundaries                                       |
| `--muted`    | `#58615A` | Secondary text                                                 |
| `--line`     | `#D6DDD5` | Dividers and progress track                                    |
| `--accent`   | `#355B46` | Forest: primary action, focus ring, wordmark, progress fill    |
| `--soft`     | `#EBEFE9` | Selected surface, chip and stepper button fill, first home row |
| `--disabled` | `#E1E5DE` | Unavailable control fill (ink text on it, no opacity)          |

Type: DM Sans for UI (`--font-sans`), Azeret Mono for every number (`--font-digits`,
`font-variant-numeric: tabular-nums`). Scale: T1 timer 98px (375) / 208px (1280) weight 500;
T2 heading 36/1.2; T3 section 22/1.3; T4 UI 16/1.4; T5 label 13/1.4. Phase name 24 (375) /
28 (1280) weight 500. Home H1 36 (375) / 64 (1280). Blog H1 48/600, H2 28/600, body 18/1.65.

Space: 4, 8, 12, 16, 24, 32, 48, 64. Radius: 0 structural, 8 on controls. Borders: 1px `--line`
for grouping, 1px `--ink` for control boundaries (steppers, secondary buttons, chips). Focus:
2px `--accent` outline with 2px offset (paper gap). Motion: feedback 120ms ease-out, progress
200ms linear, reduced motion 0ms; no pulsing, ticking or digit animation. Targets ≥ 44×44.
Disabled: ink text on `--disabled`, no opacity. Gutters: 20px at 375, 64px at 1280, content max
1152px; timer column max 432px for the primary button on desktop.

Fonts are self-hosted from `@fontsource-variable/dm-sans` and `@fontsource-variable/azeret-mono`
(latin woff2 copied to `public/fonts/`), with metric-matched fallbacks. Static TTF instances of
DM Sans 500/600 and Azeret Mono 500 live in `src/assets/fonts/` for satori (build time only).
Bricolage and JetBrains Mono are removed everywhere.

### Component mapping (canvas component → code)

| Canvas component              | Code                                                                                                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary button                | `.btn.btn--primary`: accent fill, paper text, 60px (72px for the timer control, icon 24 + 20/500 label), radius 8; disabled = `--disabled` fill, ink text, label "Start · unavailable" |
| Secondary button              | `.btn`: paper fill, 1px ink stroke, radius 8, 60px                                                                                                                                     |
| Quiet button                  | `.btn--quiet`: no border, ink or muted text, 44px                                                                                                                                      |
| Chip (aria-pressed)           | `.chip`: soft fill, 1px ink stroke, radius 8, 44px, explicit "· On / · Off" text                                                                                                       |
| Duration stepper              | `Stepper` part: 56px row, 1px ink stroke, radius 8; − and + are 56×56 soft-fill buttons with lucide minus/plus; centre is an editable text input (24px digits) plus 12px muted unit    |
| Progress                      | `Progress` part: 6px `--line` track, accent fill, 13px muted details row ("Next · Rest 00:20" left, "05:48 left" right); `aria-hidden`, not a tab stop                                 |
| Navigation                    | Timer subordinate nav: "← Timers" (arrow-left 18 + 14px), "About" centred, sound chip right (volume-2/volume-x 18 + "On"/"Off"), 1px line above, 12px muted utility footer under it    |
| Timer list item / link        | Home rows: index 13px digits muted, name 21px, description 14px muted, arrow-up-right 24 accent; first row soft fill, others paper + 1px line; radius 8; whole row is the link         |
| Shell mobile / desktop header | Content-page header: "gointervals" wordmark in accent (21/24px), "Timers" and "About" links (14/15px) with 2px accent underline on the current page, 1px line below                    |

Icons are inline SVG paths copied from lucide (activity, wind, coffee, check, pause, play,
rotate-ccw, sliders-horizontal, bell, volume-2, volume-x, arrow-left, arrow-up-right, minus,
plus). No icon library.

## 4. Page shells

### Timer pages (`/interval`, `/meditation`, `/tabata`, `/emom`, `/pomodoro`, programmatic)

DOM and visual order at both widths, nothing above the digits except the safe-area inset:

1. Digits (T1, `role="timer"`, fixed width reserved with tabular numerals).
2. Phase label: lucide icon 22 + phase word (24/28, weight 500).
3. Context line (16, muted): "Set your pace." / "Round 3 of 8" / etc.
4. Settings (idle) or Progress (running/paused/done).
5. Quiet space; state guidance ("Take a breath.", "Step away for a moment.",
   "That's the session.") sits here.
6. Desktop keyboard hints (12px muted, only ≥ 720px with hover): `Space start / pause · Esc stop · R reset`.
7. Controls: primary (72px, icon + label) then a quiet secondary ("End session" / "Stop" /
   "Change settings").
8. Subordinate nav: ← Timers · About · Sound chip; utility footer line.
9. Guide: server-rendered `<h1>` ("Interval timer"), lede, sections, FAQ, Related. This is the
   SEO copy the site already has, restyled. It sits below the timer shell so nothing interrupts
   the active timer, and it keeps exactly one visible H1 per page.
10. Site footer: Timers / About.

The Astro layout renders 1–8 through the `Timer` island (SSR'd, `client:load`) and 9–10 as
zero-JS components. The island owns the subordinate nav so it can intercept navigation while a
session is active and so the sound chip lives in the same row.

At 1280 the settings fields sit in one row of three 288px fields, the primary button is 432px
centred, digits are 208px. Everything else is identical.

### Content pages (`/`, `/about`, `/blog*`, 404)

Header (wordmark, Timers, About) → main → footer (Timers / About). Zero client JS beyond the
GA4 loader and the tiny inline analytics/SW script in `Base.astro`.

Home: eyebrow "Five tools. One thing at a time." (11px digits face, accent, uppercase), H1
"Make time for your next thing.", lede "A little structure for work, rest and everything in
between. Choose a timer to get going.", index "01—05" + "Pick a timer. Find your rhythm.",
five timer rows (Interval "Alternate effort and recovery.", Meditation "Periodic gentle beeps: a
30-minute session with a beep every 10 minutes.", Tabata "Short bursts. Well-earned breaks.",
EMOM "A fresh start, every minute.", Pomodoro "Make room for focused work."), then the guide:
H2 "Online interval and meditation timers" with the two canvas paragraphs, H2 "Common questions"
with the two canvas H3 Q&As plus three more in the same voice (free, screen lock, keyboard),
a compact "Ready-made timers" link list to programmatic pages (SEO internal linking, below
selection), and the underlined article link "Read the meditation timer guide". JSON-LD:
WebSite, Organization, FAQPage, ItemList of the five timers.

About (under 150 words, canvas copy with the honest analytics line): H1 "A little room for your
time.", three paragraphs, persistent-underline links: Source on GitHub
(https://github.com/nimi0112/gointervals), Nimish Nandwana (https://nimishnandwana.com), Nimish
on X (https://x.com/nimish_nandwana), then the "Clear my data" quiet button with its status line.

404: H1 "This page drifted away." and an underlined "Back to timers" link. `noindex`, served as
a real 404 by Cloudflare Pages (`dist/404.html`).

Blog post: breadcrumb "Home / Article", H1, "By Nimish Nandwana" (link), "Open the …" timer
link, body, closing "Try it" link, 680px reading column, all links persistently underlined.
Article JSON-LD author is a Person (Nimish Nandwana). Blog index and tag pages keep their
structure, restyled.

## 5. Timer behaviour (boards `lTG23`, `fYFgB`, `eTCi2`)

Common:

- Status: `idle` (setup) → `running` ↔ `paused` → `done`. A `confirm` overlay state
  (`stop` | `reset` | `leave`) freezes time and audio, replaces the phase label with the
  question ("Stop session?" / "Reset timer?", context "Your timer is paused." / "This clears
  your progress."), primary "Keep going", quiet "Stop session" / "Reset timer". It is not a
  modal: the question is announced, focus moves to "Keep going", and focus is restored on cancel.
  Confirming returns to setup retaining values (and, for `leave`, continues the navigation).
  No confirmation from setup or Done.
- Keyboard (desktop): Space start/pause/resume; Esc opens the stop confirmation while running or
  paused, and cancels an open confirmation; R opens the reset confirmation while running or
  paused, resets the preview to the last valid settings in setup, and returns Done to setup.
  Ignored inside edited fields and with modifier keys. Space on setup with invalid input focuses
  the first invalid field.
- Steppers move ±1 (seconds, rounds, minutes as designed), clamp at bounds, disable the button at
  a bound, and repeat after holding 400ms (then every 100ms).
- Typed input is a text field with `inputmode="numeric"`. Empty, non-numeric, decimal and
  out-of-range values stay visible with a specific inline error via `aria-describedby`; Start is
  disabled ("Start · unavailable"); nothing is coerced silently. Settings are disabled while
  running/paused.
- Persist valid settings per mode in `gi:settings:<mode>`; validate on load; corrupt or stale
  values fall back to defaults with a quiet notice in the utility footer.
- Time: monotonic engine (unchanged), ceiling rounding, `mm:ss` for everything including values
  over 59 minutes (`93:32`, `130:00`). Progress = active elapsed / total, frozen on pause.
- Audio: unlock on Start/Preview gestures. If the context cannot be created or resumed the
  utility footer shows "Sound blocked. Tap On to retry." and the chip retries; the timer keeps
  running. The sound chip has explicit "On"/"Off" text, 44px, `aria-pressed`. Mute persists.
  Background return plays at most one catch-up tone (existing behaviour).
- Done: `00:00`, check icon, "Done", completion count, full progress with "Session complete" /
  "MM:SS total", guidance "That's the session.", actions only "Run again" (rotate-ccw icon) and
  "Change settings".
- Utility footer: "Works offline. No account needed." (setup/done), "{Timer} · Screen stays on
  while running" (running/paused), audio and storage notices override it.
- Wake lock: acquired on running, released otherwise (module unchanged).
- Warning ticks in the last three seconds stay for the four active timers; Meditation has none.

Interval: Work / Rest / Rounds steppers (seconds, seconds, rounds). Summary "8 rounds · 08:00
total". Running: phase Work (activity) / Rest (wind), "Round 3 of 8", "Next · Rest 00:20",
"05:48 left"; rest guidance "Take a breath.". Paused: "Paused · Work" with the phase icon.
Secondary "End session". Done "8 of 8 rounds complete". Schedule includes the final rest.

Tabata: fixed 20/10/8, no fields; context "20s work · 10s rest · 8 rounds", summary "Classic
Tabata · 04:00 total". Running context "Tabata · Round 3 of 8". Paused uses the pause icon and
"Paused · Work" / "Paused · Rest". Secondary "Stop". Persisted values are validated to exactly
20/10/8.

EMOM: Interval length 15–300 s (default 60) and Total minutes 1–99 (default 10), both editable.
Summary "60s intervals · 10:00 total". Segments = ceil(total / interval), final one capped to the
remaining total. Phase "Minute running" with "EMOM · Minute 3 of 10" when interval is 60 s,
otherwise "Interval running" with "EMOM · Interval 3 of 10". Next "Next · Minute 4" / "Next ·
Done". Done "EMOM · 10 of 10 minutes complete".

Pomodoro: Focus / Short break / Long break (1–180 min) and Focus sessions (1–12) steppers,
defaults 25/5/15/4, summary "25 / 5 / 15 / 4 · 130 minutes total", context "4 focus sessions ·
One finite cycle". Sequence F1 SB F2 SB F3 SB F4 LB Done; with one session F1 LB Done. Phases:
Focus (activity) "Pomodoro · Focus 2 of 4", Short break (coffee) "Pomodoro · After focus 2 of
4" with "Step away for a moment.", Long break (wind) "Pomodoro · 4 of 4 focus sessions done".
Done: "Cycle complete", "That's the cycle.". The persistent session counter is removed.

Meditation: Session length (1–180 min) and Bell every (1 min–session length) steppers in
minutes; chips Interval bell (On), Start bell (Off), End bell (On), all independent; "Preview
bell" quiet button plays one sample. Interval Off disables its stepper but keeps the value.
Summary "A soft bell every 10 minutes. One at the end." / "No interval bells. One soft bell at
the end." Main clock = total remaining; details "Next bell in 08:42" and "1 of 2 interval bells"
(bells sounded of ceil(total/bell) − 1); muted: "Bells muted" / "18:42 left"; interval off: "No
interval bells" / "18:42 left". Phase "Meditation" (bell icon), context "30 minute session".
Paused: pause icon, "Paused", "Meditation · Timer stopped", footer "Meditation · Bells paused
too". A bell coinciding with the end plays only the end cue; with the end bell off nothing plays
at the end. Global mute overrides everything. No warning ticks, no catch-up burst.

## 6. Engine changes (tests first)

- `IntervalConfig` schedule includes the rest after the last round (`rest` > 0).
- `TabataConfig` drops `prep`; schedule = interval with final rest; total 240 s for 20/10/8.
- `EmomConfig` drops `prep`; count = ceil(minutes·60 / interval); last segment capped.
- `PomodoroConfig` becomes `{ focus, shortBreak, longBreak, sessions }` (minutes); one cycle.
- `MeditationConfig` becomes `{ total, bell, intervalBell, startBell, endBell }` (seconds);
  segments of `bell` while `intervalBell`, remainder as the last segment; one segment otherwise.
- `CountdownConfig` and `StopwatchConfig` are deleted, as are `stopwatch.ts` and its tests.
- `formatClock` renders minutes without an hours group (`130:00`).
- New pure module `src/engine/validate.ts`: per-mode field limits, `parseField(text)` →
  `{ value } | { error }`, `validateConfig(mode, draft)` and `coerceStored(mode, unknown)`.
- `describeConfig` returns the canvas summaries.

## 7. Files

Delete: `src/pages/stopwatch.astro`, `src/pages/timer.astro`, `src/pages/timer/[slug].astro`,
`src/islands/Stopwatch.tsx`, `src/islands/parts/LapList.tsx`, `src/islands/parts/PresetBar.tsx`,
`src/engine/stopwatch.ts`, `src/platform/fullscreen.ts`, `src/data/countdowns.ts`,
`src/data/uses.ts`, `tests/unit/stopwatch.test.ts`, `tests/unit/presets.test.ts` (replaced by
validate tests), `public/fonts/bricolage-latin.woff2`, `public/fonts/jetbrains-mono-latin.woff2`,
`src/assets/fonts/BricolageGrotesque.ttf`, `src/assets/fonts/JetBrainsMono.ttf`,
`src/content/blog/meditation-timer-with-interval-bells.md`.

New: `src/engine/validate.ts`, `src/islands/parts/{Stepper,Progress,PhaseLabel,Icon,ShellNav,
Confirm}.tsx`, `src/islands/settings/{Interval,Meditation,Tabata,Emom,Pomodoro}Settings.tsx`,
`src/components/Header.astro` (replaces Nav), `src/components/TimerGuide.astro`,
`src/content/blog/meditation-timer-interval-bells.md`, `public/fonts/dm-sans-latin.woff2`,
`public/fonts/azeret-mono-latin.woff2`, `src/assets/fonts/{DMSans-Medium,DMSans-SemiBold,
AzeretMono-Medium}.ttf`, new `public/favicon.svg` and regenerated icons.

Rewritten: `tokens.css`, `base.css`, `timer.css`, `Timer.tsx`, `Settings.tsx` (dispatcher),
`Shell.tsx`, `DurationField.tsx` → `Stepper.tsx`, `keyboard.ts`, `audio.ts` (unlock reports
success), `analytics.ts`, `storage.ts` (keys), `presets.ts` (defaults + stored validation),
`Base.astro`, `TimerPage.astro`, `Post.astro`, `Head.astro`, `Footer.astro`, `Breadcrumbs.astro`,
`Faq.astro`, `Related.astro`, `Section.astro`, `PostList.astro`, `ProgrammaticTimer.astro`,
all pages, `seo.ts` (Person author, ItemList), `og.ts` (r5UgD3 layout), `pages.ts`, `site.ts`,
data files, `related.ts`, `faqs.ts`, `sw.js`, `manifest.webmanifest`, `_redirects`, `llms.txt`,
`humans.txt`, `AGENTS.md`, `PLAN.md`, tests.

## 8. PWA

`sw.js`: precache `/`, the five timers, `/about`, `/404`, manifest, fonts, favicon. No
`skipWaiting()` in install; activation happens when the page posts `SKIP_WAITING`. `Base.astro`
posts it on `updatefound`/`waiting` only when `window.__giSessionActive` is false, otherwise it
waits for the `gi:session-idle` event the island dispatches. `clients.claim()` stays in activate
(activation is already gated on idle). Manifest shortcuts: Interval, Meditation, Tabata, EMOM,
Pomodoro; theme/background `#F7F8F5`. Earned install prompt unchanged.

## 9. Analytics

Events: `timer_start`, `timer_pause`, `timer_resume`, `timer_stop_confirmed`,
`timer_reset_confirmed`, `timer_complete`, `timer_run_again`, `timer_change_settings`,
`invalid_input`, `audio_toggle`, `audio_unavailable`, `wakelock_failed` (only detectable case:
API unsupported, since the module is frozen), `nav_away_during_session`, `blog_read`,
`outbound_click`, plus the existing `pwa_*` events. Params: `mode` and the configured values
(`work`, `rest`, `rounds`, `interval`, `minutes`, `focus`, `short_break`, `long_break`,
`sessions`, `total_seconds`, `bell`, `interval_bell`, `start_bell`, `end_bell`), `field`,
`reason`, `muted`, `href`, `slug`. `blog_read` and `outbound_click` come from a small inline
script in `Base.astro` (no framework JS on content pages).

## 10. Redirects

```
/stopwatch                 /interval    301
/timer                     /interval    301
/timer/meditation-timer    /meditation  301
/timer/nap-timer           /meditation  301
/timer/study-timer         /pomodoro    301
/timer/25-minutes          /pomodoro    301
/timer/*                   /interval    301
/blog/meditation-timer-with-interval-bells  /blog/meditation-timer-interval-bells  301
```

## 11. Verification

`npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run check:build`,
`npm run test:e2e`; Playwright screenshots of every state family at 375 and 1280 plus 320×568
and 1280×600 compared against the canvas; timing boundaries, pause/resume, reset, repeats,
audio failure and offline are covered by unit and e2e tests. iOS/Android audio and wake lock
cannot be verified on a desktop and are reported as such.
