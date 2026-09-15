# Go Intervals Porcelain & Ink Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild gointervals.com on the Porcelain & Ink design from `goIntervals.pen` with five timers, keeping the timestamp engine, storage, wake lock, PWA and SEO tooling.

**Architecture:** Astro static site; one Preact island (`Timer`) per timer page owns digits → phase → settings/progress → controls → subordinate nav; every other page is zero-JS. Pure engine (`src/engine`) compiles configs to segments and is tested with an injected clock; a new pure `validate.ts` owns field limits and parsing. Styles are plain CSS custom properties.

**Tech Stack:** Astro 7, Preact 10, TypeScript strict, Vitest, Playwright, satori + resvg, fontsource (DM Sans, Azeret Mono).

**Spec:** `docs/superpowers/specs/2026-09-15-gointervals-redesign-design.md`

## Global Constraints

- Tokens exactly: paper `#F7F8F5`, ink `#202722`, muted `#58615A`, line `#D6DDD5`, accent `#355B46`, soft `#EBEFE9`, disabled `#E1E5DE`. Fonts: DM Sans (UI), Azeret Mono (all numbers, tabular).
- Timer page order: digits → phase word + icon → context → settings or progress → actions → Timers/About nav → guide → footer. Nothing above the digits.
- Interval default 30:00 / 05:00 / 8; ranges work 1–3600 s, rest 0–3600 s, rounds 1–99; final rest included; Start enters Work immediately.
- Tabata fixed 20/10/8 (04:00). EMOM interval 15–300 s (60), minutes 1–99 (10). Pomodoro 25/5/15/4, minutes 1–180, sessions 1–12, one finite cycle. Meditation 30 min, bell every 10 min, session 1–180 min, interval 1 min–session, start bell Off, interval On, end bell On.
- Keyboard: Space start/pause/resume, Esc stop (confirm), R reset (confirm); ignored in fields and with modifiers. No confirmation from setup/Done.
- Done shows only "Run again" and "Change settings".
- `src/platform/wakelock.ts` is not modified. Do not push to git. Never Read/Grep or modify `goIntervals.pen`.
- Verification chain: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run check:build`, `npm run test:e2e`.
- No dark mode, no cookies, no new third-party scripts, no audio files, no dependency without a PLAN.md line.

---

### Task 1: Fonts and tokens

**Files:**
- Modify: `package.json` (add `@fontsource-variable/dm-sans`, `@fontsource-variable/azeret-mono`; remove the Bricolage/JetBrains packages)
- Create: `public/fonts/dm-sans-latin.woff2`, `public/fonts/azeret-mono-latin.woff2`, `src/assets/fonts/DMSans-Medium.ttf`, `src/assets/fonts/DMSans-SemiBold.ttf`, `src/assets/fonts/AzeretMono-Medium.ttf`
- Delete: `public/fonts/bricolage-latin.woff2`, `public/fonts/jetbrains-mono-latin.woff2`, `src/assets/fonts/BricolageGrotesque.ttf`, `src/assets/fonts/JetBrainsMono.ttf`
- Rewrite: `src/styles/tokens.css`

**Interfaces:**
- Produces CSS custom properties `--paper --ink --muted --line --accent --soft --disabled --font-sans --font-digits --fs-* --sp-1..8 --radius --ease --ease-progress --measure --page` used by every later task.

- [ ] Step 1: `npm uninstall @fontsource-variable/bricolage-grotesque @fontsource-variable/jetbrains-mono && npm install @fontsource-variable/dm-sans @fontsource-variable/azeret-mono`
- [ ] Step 2: copy `node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2` → `public/fonts/dm-sans-latin.woff2` and `node_modules/@fontsource-variable/azeret-mono/files/azeret-mono-latin-wght-normal.woff2` → `public/fonts/azeret-mono-latin.woff2`; delete the old woff2 and TTF files.
- [ ] Step 3: download static TTF instances from Google Fonts (`curl -A "Mozilla/4.0" "https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=Azeret+Mono:wght@500"` returns `.ttf` URLs) into `src/assets/fonts/`. Verify with `node -e "require('fontkit')"`-free check: satori render in Task 13 is the real test.
- [ ] Step 4: write `tokens.css`:

```css
:root {
  --paper: #f7f8f5; --ink: #202722; --muted: #58615a; --line: #d6ddd5;
  --accent: #355b46; --soft: #ebefe9; --disabled: #e1e5de;
  --font-sans: 'DM Sans', 'DM Sans Fallback', system-ui, sans-serif;
  --font-digits: 'Azeret Mono', 'Azeret Mono Fallback', ui-monospace, Menlo, monospace;
  --fs-label: 0.8125rem; --fs-ui: 1rem; --fs-section: 1.375rem; --fs-heading: 2.25rem;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 64px;
  --radius: 8px; --ease: 120ms ease-out; --ease-progress: 200ms linear;
  --measure: 680px; --page: 1152px; --gutter: 20px;
  color-scheme: light only;
}
@media (min-width: 720px) { :root { --gutter: 64px; } }
@font-face { font-family: 'DM Sans'; font-weight: 100 1000; font-display: swap; src: url('/fonts/dm-sans-latin.woff2') format('woff2-variations'); }
@font-face { font-family: 'Azeret Mono'; font-weight: 100 900; font-display: optional; src: url('/fonts/azeret-mono-latin.woff2') format('woff2-variations'); }
@font-face { font-family: 'DM Sans Fallback'; src: local('Arial'); size-adjust: 102%; ascent-override: 94%; descent-override: 26%; line-gap-override: 0%; }
@font-face { font-family: 'Azeret Mono Fallback'; src: local('Menlo'), local('Consolas'); size-adjust: 112%; ascent-override: 100%; descent-override: 28%; line-gap-override: 0%; }
```

- [ ] Step 5: commit `chore: switch to DM Sans and Azeret Mono, Porcelain & Ink tokens`.

### Task 2: Engine schedule and format changes (TDD)

**Files:**
- Modify: `src/engine/schedule.ts`, `src/engine/format.ts`, `src/engine/presets.ts`, `src/engine/describe.ts`
- Delete: `src/engine/stopwatch.ts`, `tests/unit/stopwatch.test.ts`
- Test: `tests/unit/schedule.test.ts`, `tests/unit/format.test.ts`, `tests/unit/describe.test.ts`

**Interfaces (produced):**

```ts
export type Phase = 'prep'|'work'|'rest'|'setrest'|'focus'|'break'|'longbreak'|'sit';
export interface IntervalConfig { mode:'interval'; prep:number; work:number; rest:number; rounds:number; sets:number; setRest:number }
export interface TabataConfig { mode:'tabata'; work:20; rest:10; rounds:8 }   // literal types; fixed
export interface EmomConfig { mode:'emom'; minutes:number; interval:number }
export interface PomodoroConfig { mode:'pomodoro'; focus:number; shortBreak:number; longBreak:number; sessions:number }
export interface MeditationConfig { mode:'meditation'; total:number; bell:number; intervalBell:boolean; startBell:boolean; endBell:boolean }
export type ModeConfig = IntervalConfig|TabataConfig|EmomConfig|PomodoroConfig|MeditationConfig;
export function buildSchedule(cfg: ModeConfig): Segment[];
export function formatClock(ms:number): string;           // "130:00", "00:07"
export function meditationBellCount(cfg: MeditationConfig): number; // interval bells, excluding the end
export const defaultConfigs: { [K in Mode]: Extract<ModeConfig,{mode:K}> };
export const TABATA: TabataConfig;
```

- [ ] Step 1: replace the interval/tabata/emom/pomodoro/meditation tests in `tests/unit/schedule.test.ts`:

```ts
it('interval includes the rest after the last round', () => {
  const s = buildSchedule({ mode:'interval', prep:0, work:40, rest:20, rounds:3, sets:1, setRest:0 });
  expect(s.map(x=>x.phase)).toEqual(['work','rest','work','rest','work','rest']);
  expect(totalMs(s)).toBe(180_000);
});
it('interval with rest 0 is just work blocks', () => {
  const s = buildSchedule({ mode:'interval', prep:0, work:600, rest:0, rounds:3, sets:1, setRest:0 });
  expect(s.map(x=>x.phase)).toEqual(['work','work','work']);
});
it('tabata is 20/10 x 8 with the final rest, 04:00', () => {
  const s = buildSchedule(TABATA);
  expect(s).toHaveLength(16); expect(totalMs(s)).toBe(240_000);
});
it('emom counts ceil(total/interval) and caps the last block', () => {
  const s = buildSchedule({ mode:'emom', minutes:10, interval:60 });
  expect(s).toHaveLength(10); expect(s.every(x=>x.ms===60_000)).toBe(true);
  const t = buildSchedule({ mode:'emom', minutes:1, interval:45 });
  expect(t.map(x=>x.ms)).toEqual([45_000, 15_000]); expect(t[1]!.rounds).toBe(2);
});
it('pomodoro runs one finite cycle and handles one session', () => {
  const s = buildSchedule({ mode:'pomodoro', focus:25, shortBreak:5, longBreak:15, sessions:4 });
  expect(s.map(x=>x.phase)).toEqual(['focus','break','focus','break','focus','break','focus','longbreak']);
  expect(totalMs(s)).toBe(130*60_000);
  expect(buildSchedule({ mode:'pomodoro', focus:25, shortBreak:5, longBreak:15, sessions:1 }).map(x=>x.phase)).toEqual(['focus','longbreak']);
});
it('meditation splits by bell interval with a remainder, or is one block', () => {
  const s = buildSchedule({ mode:'meditation', total:1800, bell:600, intervalBell:true, startBell:false, endBell:true });
  expect(s.map(x=>x.ms)).toEqual([600_000,600_000,600_000]);
  const r = buildSchedule({ mode:'meditation', total:1500, bell:600, intervalBell:true, startBell:false, endBell:true });
  expect(r.map(x=>x.ms)).toEqual([600_000,600_000,300_000]);
  const off = buildSchedule({ mode:'meditation', total:1800, bell:600, intervalBell:false, startBell:false, endBell:true });
  expect(off).toHaveLength(1);
  expect(meditationBellCount({ mode:'meditation', total:1800, bell:600, intervalBell:true, startBell:false, endBell:true })).toBe(2);
  expect(meditationBellCount({ mode:'meditation', total:1500, bell:600, intervalBell:true, startBell:false, endBell:true })).toBe(2);
});
```

  and in `format.test.ts`: `expect(formatClock(130*60_000)).toBe('130:00'); expect(formatClock(93*60_000+32_000)).toBe('93:32'); expect(formatClock(400)).toBe('00:01');`

- [ ] Step 2: `npx vitest run tests/unit/schedule.test.ts tests/unit/format.test.ts` → fails.
- [ ] Step 3: implement: interval loop pushes rest after every round (`if (c.rest > 0)`), tabata = `intervalSchedule({prep:0,...TABATA,sets:1,setRest:0})`, emom `n = ceil(minutes*60/interval)`, last `ms = min(interval, remaining)`, pomodoro `per = sessions`, meditation as specified; remove countdown/stopwatch; `formatClock` = `${pad(floor(s/60))}:${pad(s%60)}`; drop `formatTenths`; update `defaultConfigs` and `describeConfig` (summaries: "8 rounds · 08:00 total", "Classic Tabata · 04:00 total", "60s intervals · 10:00 total", "25 / 5 / 15 / 4 · 130 minutes total", "A soft bell every 10 minutes. One at the end." / "No interval bells. One soft bell at the end."). Update `describe.test.ts` accordingly.
- [ ] Step 4: `npx vitest run` → schedule/format/describe pass (timer/others unchanged).
- [ ] Step 5: commit `feat(engine): final rest, fixed tabata, capped emom, finite pomodoro, meditation bells`.

### Task 3: Validation module (TDD)

**Files:**
- Create: `src/engine/validate.ts`
- Test: `tests/unit/validate.test.ts` (replaces `presets.test.ts`)

**Interfaces (produced):**

```ts
export interface Limit { min:number; max:number; unit:'seconds'|'rounds'|'minutes'|'sets'; label:string }
export const LIMITS: { interval:{work,rest,rounds}; emom:{interval,minutes}; pomodoro:{focus,shortBreak,longBreak,sessions}; meditation:{total,bell} } // values in the field's own unit (meditation in minutes)
export type Parsed = { ok:true; value:number } | { ok:false; error:string };
export function parseField(text:string, limit:Limit, maxOverride?:number): Parsed;
// errors: 'Enter a number.' | 'Use a whole number.' | '{Label} must be at least {min} {unit}.' | '{Label} must be {max} {unit} or less.' (thousands separated: 3,600)
export function coerceStored(mode: Mode, raw: unknown): ModeConfig | null;  // exact tabata; ranges enforced
export function isValidConfig(cfg: ModeConfig): boolean;
```

- [ ] Step 1: tests: `parseField('', LIMITS.interval.work)` → `{ok:false,error:'Enter a number.'}`; `'1.5'` → 'Use a whole number.'; `'0'` → 'Work must be at least 1 second.'; `'3601'` → 'Work must be 3,600 seconds or less.'; `' 40 '` → ok 40; rest `'0'` ok; rounds `'100'` → 'Rounds must be 99 rounds or less.'; meditation bell with `maxOverride=30` and `'31'` → 'Bell every must be 30 minutes or less.'; `coerceStored('tabata',{mode:'tabata',work:30,rest:15,rounds:8})` → null; valid returns config; `coerceStored('interval',{mode:'interval',work:5000,...})` → null; meditation stored with `bell>total` → null.
- [ ] Step 2: run → fails. Step 3: implement. Step 4: passes. Step 5: commit `feat(engine): field validation and stored-config coercion`.

### Task 4: Platform: audio, keyboard, analytics, storage, presets cleanup

**Files:**
- Modify: `src/platform/audio.ts` (`unlockAudio(): Promise<boolean>` resolving true when `ctx.state==='running'`; `audioAvailable(): boolean`), `src/platform/keyboard.ts` (drop `lap`; add `escape` handler that also fires inside fields), `src/platform/analytics.ts` (new `EventName` union and `EventParams` from spec §9), `src/platform/storage.ts` (remove `presets`, `pomodoroSessions` keys), `src/engine/presets.ts` (keep only `defaultConfigs`, `TABATA`)
- Delete: `src/platform/fullscreen.ts`
- Test: `tests/unit/keyboard.test.ts` (jsdom-free: call the handler with fake events)

- [ ] Steps: write tests for `bindKeys` (Space with `target` an INPUT is ignored; Escape inside INPUT still fires; modifier keys ignored; `l` does nothing), run, implement, run, commit `refactor(platform): audio unlock result, keyboard without lap, richer analytics`.

### Task 5: Base CSS and content-page shell

**Files:**
- Rewrite: `src/styles/base.css`
- Create: `src/components/Header.astro` (wordmark + Timers/About, `aria-current`)
- Rewrite: `src/components/Footer.astro` (Timers / About only), `src/components/Breadcrumbs.astro`, `src/components/Section.astro`, `src/components/Faq.astro`, `src/components/Related.astro`, `src/components/PostList.astro`
- Modify: `src/layouts/Base.astro` (Header, inline script: SW update gating, `outbound_click`, `blog_read`), `src/components/Head.astro` (font preloads, theme-color `#F7F8F5`), `src/lib/site.ts` (five TIMERS, author, x handle)
- Delete: `src/components/Nav.astro`

- [ ] Steps: implement; `npm run build` compiles; visual check in Task 12. Commit `feat(shell): Porcelain & Ink base styles, header and footer`.

### Task 6: Timer island parts

**Files:**
- Create: `src/islands/parts/Icon.tsx` (lucide paths), `Stepper.tsx`, `Progress.tsx`, `PhaseLabel.tsx`, `ShellNav.tsx`, `Confirm.tsx`
- Rewrite: `src/islands/parts/Shell.tsx`
- Delete: `src/islands/parts/DurationField.tsx`, `PresetBar.tsx`, `LapList.tsx`, `src/islands/Stopwatch.tsx`

**Interfaces (produced):**

```tsx
<Icon name="activity"|"wind"|"coffee"|"check"|"pause"|"play"|"rotate-ccw"|"sliders-horizontal"|"bell"|"volume-2"|"volume-x"|"arrow-left"|"arrow-up-right"|"minus"|"plus" size={22} />
<Stepper id label unit text onText(text) onStep(delta) min max value disabled error />  // hold-repeat 400ms then 100ms; aria-describedby error id
<Progress ratio next left />  // "Next · Rest 00:20" / "05:48 left"
<PhaseLabel icon text />
<ShellNav timerName muted onToggleSound footer onNavigate(href)=>boolean />  // returns false to cancel navigation
<Confirm kind='stop'|'reset'|'leave' onKeep onConfirm secondaryLabel />
```

- [ ] Steps: implement, typecheck, commit `feat(island): Porcelain & Ink timer parts`.

### Task 7: Timer island state machine

**Files:**
- Rewrite: `src/islands/Timer.tsx`, `src/islands/parts/Settings.tsx`
- Create: `src/islands/settings/IntervalSettings.tsx`, `TabataSettings.tsx`, `EmomSettings.tsx`, `PomodoroSettings.tsx`, `MeditationSettings.tsx`, `src/islands/copy.ts` (phase/context/next/summary strings per mode)
- Test: `tests/unit/copy.test.ts` for the string builders (pure), e2e in Task 11.

**Behaviour:** as spec §5. State: `config` (last valid), `draft` (field strings), `errors`, `confirm`, `muted`, `audioBlocked`, `notice`. Keyboard per spec. `window.__giSessionActive` set while running/paused; dispatch `gi:session-idle` on idle/done. Link interception via `ShellNav.onNavigate`.

- [ ] Steps: write copy tests (e.g. `contextFor(snapshot,'emom')` = "EMOM · Minute 3 of 10"; `nextFor` = "Next · Minute 4"; meditation `bellsLine` = "1 of 2 interval bells"), implement, `npm run typecheck`, commit `feat(island): state machine, confirmations, validation, meditation bells`.

### Task 8: Timer CSS

**Files:** rewrite `src/styles/timer.css` to the canvas measurements (98/208 digits, 72px primary, 56px stepper rows, 6px progress, subordinate nav row, desktop three-column settings, keyboard hints ≥720px and hover).

- [ ] Commit `feat(styles): timer shell`.

### Task 9: Pages

**Files:**
- Rewrite: `src/layouts/TimerPage.astro` (island first, then `TimerGuide` slot content, FAQ, Related), `src/pages/index.astro` (no island; canvas home), `about.astro`, `404.astro`, `interval.astro`, `meditation.astro`, `tabata.astro`, `emom.astro`, `pomodoro.astro`, `blog/index.astro`, `blog/tag/[tag].astro`, `src/layouts/Post.astro`, `src/components/ProgrammaticTimer.astro`
- Delete: `src/pages/stopwatch.astro`, `src/pages/timer.astro`, `src/pages/timer/[slug].astro`
- Modify: `src/lib/seo.ts` (Person author, `itemList`), `src/lib/pages.ts`, `src/data/faqs.ts`, `src/data/related.ts`

- [ ] Commit `feat(pages): home, about, 404, timer pages on the new shell`.

### Task 10: Content, redirects, PWA, SEO files

**Files:**
- Create: `src/content/blog/meditation-timer-interval-bells.md`; delete the old post; light edits to `stopwatch-running-splits-lap-times.md`, `plank-timer-how-long-to-hold.md`, `free-online-timer-that-works-offline.md`, and any post linking `/timer` or `/stopwatch` (retarget to `/interval` or `/meditation`).
- Modify: `src/content.config.ts` (add optional `author`), `public/_redirects` (spec §10), `public/sw.js` (no skipWaiting on install; `SKIP_WAITING` message; new precache), `public/manifest.webmanifest`, `public/llms.txt`, `public/humans.txt`, `public/favicon.svg` (ring mark from lRHYV), regenerate icons with `npm run icons`, `src/lib/og.ts` (r5UgD3 layout), `tests/unit/manifest.test.ts`
- [ ] Commit `feat(content): meditation bells article, redirects, service worker update gating, icons`.

### Task 11: Programmatic pages rebuild

**Files:** `src/data/{tabatas,workouts,beeps,pomodoros,meditations}.ts` (configs on the new types, remove `/timer/*` and `/stopwatch` from `related`, refresh copy that mentions get-ready counts, fullscreen, skip or presets), `src/data/index.ts`, `src/pages/tabata/[slug].astro`, `interval/[slug].astro`, `pomodoro/[slug].astro`, `meditation/[slug].astro`, delete `countdowns.ts`, `uses.ts`.

- [ ] Commit `feat(programmatic): rebuild preset pages on the new shell`.

### Task 12: Tests and verification

**Files:** `tests/e2e/smoke.spec.ts`, `tests/e2e/timer.spec.ts`, `tests/e2e/install.spec.ts`, `tests/unit/timer.test.ts` (update fixtures), `tests/unit/sw.test.ts` (no `skipWaiting()` inside the install handler).

- [ ] Run the full chain; screenshot every state family at 375 and 1280 (Playwright `page.screenshot`) and compare with the Pencil screenshots; fix discrepancies.
- [ ] Commit `test: e2e for the five timers, confirmations and validation`.

### Task 13: Docs

**Files:** `AGENTS.md`, `PLAN.md` rewritten for Porcelain & Ink (tokens, components, routes, engine invariants updated: no lap key, no fullscreen, confirmations, final rest; dependency lines for the two font packages).

- [ ] Commit `docs: Porcelain & Ink system in AGENTS.md and PLAN.md`.
