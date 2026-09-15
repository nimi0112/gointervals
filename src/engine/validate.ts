/**
 * Field limits and typed-input parsing for every timer, plus validation of values that come
 * back from storage. Pure: no DOM, no storage. Limits are in the unit the person types in
 * (seconds for interval and EMOM, minutes for Pomodoro and Meditation).
 */
import type { ModeConfig, Mode, MeditationConfig } from './schedule';
import { TABATA } from './schedule';

export type Unit = 'seconds' | 'rounds' | 'minutes' | 'sessions';

export interface Limit {
  label: string;
  unit: Unit;
  min: number;
  max: number;
}

const lim = (label: string, unit: Unit, min: number, max: number): Limit => ({
  label,
  unit,
  min,
  max,
});

export const LIMITS = {
  interval: {
    work: lim('Work', 'seconds', 1, 3600),
    /** the main interval page edits work in whole minutes */
    workMinutes: lim('Work', 'minutes', 1, 60),
    rest: lim('Rest', 'seconds', 0, 3600),
    rounds: lim('Rounds', 'rounds', 1, 99),
  },
  emom: {
    interval: lim('Interval length', 'seconds', 15, 300),
    minutes: lim('Total minutes', 'minutes', 1, 99),
  },
  pomodoro: {
    focus: lim('Focus', 'minutes', 1, 180),
    shortBreak: lim('Short break', 'minutes', 1, 180),
    longBreak: lim('Long break', 'minutes', 1, 180),
    sessions: lim('Focus sessions', 'sessions', 1, 12),
  },
  meditation: {
    total: lim('Session length', 'minutes', 1, 180),
    bell: lim('Bell every', 'minutes', 1, 180),
  },
} as const;

export type Parsed = { ok: true; value: number } | { ok: false; error: string };

const unitWord = (n: number, unit: Unit): string => {
  const one = { seconds: 'second', rounds: 'round', minutes: 'minute', sessions: 'session' }[unit];
  return n === 1 ? one : unit;
};
const num = (n: number): string => n.toLocaleString('en-US');

/** Parse what a person typed. Never coerces: an invalid value comes back with the reason. */
export function parseField(text: string, limit: Limit, maxOverride?: number): Parsed {
  const t = text.trim();
  if (t === '' || !/^-?\d+(\.\d+)?$/.test(t)) return { ok: false, error: 'Enter a number.' };
  const n = Number(t);
  if (!Number.isInteger(n)) return { ok: false, error: 'Use a whole number.' };
  const max = maxOverride === undefined ? limit.max : Math.min(limit.max, maxOverride);
  if (n < limit.min)
    return {
      ok: false,
      error: `${limit.label} must be at least ${num(limit.min)} ${unitWord(limit.min, limit.unit)}.`,
    };
  if (n > max)
    return {
      ok: false,
      error: `${limit.label} must be ${num(max)} ${unitWord(max, limit.unit)} or less.`,
    };
  return { ok: true, value: n === 0 ? 0 : n };
}

const isInt = (v: unknown, min: number, max: number): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= min && v <= max;
const isBool = (v: unknown): v is boolean => typeof v === 'boolean';
const inLimit = (v: unknown, l: Limit): v is number => isInt(v, l.min, l.max);

/**
 * Turn whatever storage handed back into a config for `mode`, or null when it is missing,
 * malformed, stale or out of range. Tabata only ever accepts the exact classic preset.
 */
export function coerceStored(mode: Mode, raw: unknown): ModeConfig | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (o['mode'] !== mode) return null;
  switch (mode) {
    case 'interval': {
      const L = LIMITS.interval;
      if (
        !inLimit(o['work'], L.work) ||
        !inLimit(o['rest'], L.rest) ||
        !inLimit(o['rounds'], L.rounds)
      )
        return null;
      if (o['prep'] !== 0 || o['sets'] !== 1 || o['setRest'] !== 0) return null;
      return {
        mode,
        prep: 0,
        work: o['work'],
        rest: o['rest'],
        rounds: o['rounds'],
        sets: 1,
        setRest: 0,
      };
    }
    case 'tabata':
      return o['work'] === 20 && o['rest'] === 10 && o['rounds'] === 8 ? TABATA : null;
    case 'emom': {
      const L = LIMITS.emom;
      if (!inLimit(o['minutes'], L.minutes) || !inLimit(o['interval'], L.interval)) return null;
      return { mode, minutes: o['minutes'], interval: o['interval'] };
    }
    case 'pomodoro': {
      const L = LIMITS.pomodoro;
      if (
        !inLimit(o['focus'], L.focus) ||
        !inLimit(o['shortBreak'], L.shortBreak) ||
        !inLimit(o['longBreak'], L.longBreak) ||
        !inLimit(o['sessions'], L.sessions)
      )
        return null;
      return {
        mode,
        focus: o['focus'],
        shortBreak: o['shortBreak'],
        longBreak: o['longBreak'],
        sessions: o['sessions'],
      };
    }
    case 'meditation': {
      const L = LIMITS.meditation;
      const total = o['total'];
      const bell = o['bell'];
      if (!isInt(total, L.total.min * 60, L.total.max * 60) || total % 60 !== 0) return null;
      if (!isInt(bell, 60, total) || bell % 60 !== 0) return null;
      if (!isBool(o['intervalBell']) || !isBool(o['startBell']) || !isBool(o['endBell']))
        return null;
      const cfg: MeditationConfig = {
        mode,
        total,
        bell,
        intervalBell: o['intervalBell'],
        startBell: o['startBell'],
        endBell: o['endBell'],
      };
      return cfg;
    }
  }
}

export function isValidConfig(cfg: ModeConfig): boolean {
  return coerceStored(cfg.mode, cfg) !== null;
}
