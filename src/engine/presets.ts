import type { IntervalConfig, TabataConfig, ModeConfig } from './schedule';

export interface IntervalPreset {
  id: string;
  name: string;
  config: IntervalConfig;
}

const MAX_SECONDS = 24 * 3600;
const MAX_ROUNDS = 999;

const isInt = (v: unknown, min: number, max: number): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;

export function validIntervalConfig(c: unknown): c is IntervalConfig {
  if (!c || typeof c !== 'object') return false;
  const o = c as Record<string, unknown>;
  return (
    o['mode'] === 'interval' &&
    isInt(o['prep'], 0, MAX_SECONDS) &&
    isInt(o['work'], 1, MAX_SECONDS) &&
    isInt(o['rest'], 0, MAX_SECONDS) &&
    isInt(o['rounds'], 1, MAX_ROUNDS) &&
    isInt(o['sets'], 1, MAX_ROUNDS) &&
    isInt(o['setRest'], 0, MAX_SECONDS)
  );
}

export function serialisePresets(list: readonly IntervalPreset[]): string {
  return JSON.stringify(list);
}

export function parsePresets(raw: string | null | undefined): IntervalPreset[] {
  if (!raw) return [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  const out: IntervalPreset[] = [];
  for (const item of data) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    if (typeof o['id'] !== 'string' || typeof o['name'] !== 'string') continue;
    if (!validIntervalConfig(o['config'])) continue;
    const c = o['config'];
    out.push({
      id: o['id'],
      name: o['name'].slice(0, 60),
      config: {
        mode: 'interval',
        prep: c.prep,
        work: c.work,
        rest: c.rest,
        rounds: c.rounds,
        sets: c.sets,
        setRest: c.setRest,
      },
    });
  }
  return out;
}

export function presetToSlug(c: TabataConfig | IntervalConfig): string {
  return `${c.work}-${c.rest}-${c.rounds}`;
}

export function newPresetId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

const iv = (
  work: number,
  rest: number,
  rounds: number,
  extra: Partial<IntervalConfig> = {},
): IntervalConfig => ({
  mode: 'interval',
  prep: 0,
  work,
  rest,
  rounds,
  sets: 1,
  setRest: 0,
  ...extra,
});

/** Built-in interval presets. The long "beep every N minutes" ones come first on purpose. */
export const builtinIntervalPresets: readonly IntervalPreset[] = [
  { id: 'b-10x3', name: 'Beep every 10 min for 30 min', config: iv(600, 0, 3) },
  { id: 'b-5x6', name: 'Beep every 5 min for 30 min', config: iv(300, 0, 6) },
  { id: 'b-15x4', name: 'Beep every 15 min for 1 hr', config: iv(900, 0, 4) },
  { id: 'b-1x20', name: 'Beep every minute for 20 min', config: iv(60, 0, 20) },
  { id: 'b-hiit', name: 'HIIT 40/20 x 10', config: iv(40, 20, 10, { prep: 10 }) },
  { id: 'b-runwalk', name: 'Run/walk 1:1 x 10', config: iv(60, 60, 10) },
  { id: 'b-boxing', name: 'Boxing 3/1 x 12', config: iv(180, 60, 12, { prep: 10 }) },
];

export const defaultConfigs: { [K in ModeConfig['mode']]: Extract<ModeConfig, { mode: K }> } = {
  countdown: { mode: 'countdown', seconds: 300 },
  interval: { mode: 'interval', prep: 0, work: 30, rest: 15, rounds: 8, sets: 1, setRest: 60 },
  tabata: { mode: 'tabata', prep: 10, work: 20, rest: 10, rounds: 8 },
  emom: { mode: 'emom', prep: 10, minutes: 10, interval: 60 },
  pomodoro: {
    mode: 'pomodoro',
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLong: 4,
    cycles: 1,
  },
  meditation: { mode: 'meditation', prep: 10, bell: 600, total: 1800 },
  stopwatch: { mode: 'stopwatch' },
};
