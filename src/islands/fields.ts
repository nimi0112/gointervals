/**
 * The editable fields of each timer as text drafts, and the pure logic that turns a draft
 * back into a config (or a set of errors) and steps a field by one.
 */
import type { ModeConfig, Mode } from '@/engine/schedule';
import { LIMITS, parseField, type Limit } from '@/engine/validate';

export interface FieldDef {
  key: string;
  limit: Limit;
  /** caption after the number: "seconds", "rounds", "min", "sets" */
  unit: string;
}

export type Draft = Record<string, string>;

export const FIELDS: Record<Mode, FieldDef[]> = {
  interval: [
    { key: 'work', limit: LIMITS.interval.work, unit: 'seconds' },
    { key: 'rest', limit: LIMITS.interval.rest, unit: 'seconds' },
    { key: 'rounds', limit: LIMITS.interval.rounds, unit: 'rounds' },
  ],
  tabata: [],
  emom: [
    { key: 'interval', limit: LIMITS.emom.interval, unit: 'seconds' },
    { key: 'minutes', limit: LIMITS.emom.minutes, unit: 'minutes' },
  ],
  pomodoro: [
    { key: 'focus', limit: LIMITS.pomodoro.focus, unit: 'min' },
    { key: 'shortBreak', limit: LIMITS.pomodoro.shortBreak, unit: 'min' },
    { key: 'longBreak', limit: LIMITS.pomodoro.longBreak, unit: 'min' },
    { key: 'sessions', limit: LIMITS.pomodoro.sessions, unit: 'sets' },
  ],
  meditation: [
    { key: 'total', limit: LIMITS.meditation.total, unit: 'min' },
    { key: 'bell', limit: LIMITS.meditation.bell, unit: 'min' },
  ],
};

/** Field value in the unit the person edits (meditation stores seconds, edits minutes). */
function fieldValue(cfg: ModeConfig, key: string): number {
  const v = (cfg as unknown as Record<string, number>)[key] ?? 0;
  return cfg.mode === 'meditation' ? Math.round(v / 60) : v;
}

export function draftFrom(cfg: ModeConfig): Draft {
  const out: Draft = {};
  for (const f of FIELDS[cfg.mode]) out[f.key] = String(fieldValue(cfg, f.key));
  return out;
}

/** The bell interval cannot be longer than the session, so its maximum follows the draft. */
function maxFor(cfg: ModeConfig, key: string, draft: Draft): number | undefined {
  if (cfg.mode !== 'meditation' || key !== 'bell') return undefined;
  const total = parseField(draft['total'] ?? '', LIMITS.meditation.total);
  return total.ok ? total.value : undefined;
}

export type Resolved = { ok: true; config: ModeConfig } | { ok: false; errors: Draft };

export function resolveDraft(base: ModeConfig, draft: Draft): Resolved {
  const errors: Draft = {};
  const values: Record<string, number> = {};
  for (const f of FIELDS[base.mode]) {
    const r = parseField(draft[f.key] ?? '', f.limit, maxFor(base, f.key, draft));
    if (r.ok) values[f.key] = base.mode === 'meditation' ? r.value * 60 : r.value;
    else errors[f.key] = r.error;
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, config: { ...base, ...values } as ModeConfig };
}

/**
 * Step one field by `delta`, clamped to its limits. When the current text does not parse,
 * step from the last valid value instead, so a stray keystroke never strands the stepper.
 */
export function stepField(base: ModeConfig, draft: Draft, key: string, delta: 1 | -1): string {
  const def = FIELDS[base.mode].find((f) => f.key === key);
  if (!def) return draft[key] ?? '';
  const max = Math.min(def.limit.max, maxFor(base, key, draft) ?? def.limit.max);
  const current = parseField(draft[key] ?? '', def.limit, max);
  const from = current.ok ? current.value : fieldValue(base, key);
  const next = Math.min(max, Math.max(def.limit.min, from + delta));
  return String(next);
}

/** Which stepper buttons are at their bound, for aria-disabled. */
export function bounds(
  base: ModeConfig,
  draft: Draft,
  key: string,
): { atMin: boolean; atMax: boolean } {
  const def = FIELDS[base.mode].find((f) => f.key === key);
  if (!def) return { atMin: false, atMax: false };
  const max = Math.min(def.limit.max, maxFor(base, key, draft) ?? def.limit.max);
  const current = parseField(draft[key] ?? '', def.limit, max);
  if (!current.ok) return { atMin: false, atMax: false };
  return { atMin: current.value <= def.limit.min, atMax: current.value >= max };
}
