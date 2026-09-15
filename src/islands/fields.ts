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
  /** seconds per edited unit: 60 when the person types minutes but the config stores seconds */
  scale: number;
}

export type Draft = Record<string, string>;

const f = (key: string, limit: Limit, unit: string, scale = 1): FieldDef => ({
  key,
  limit,
  unit,
  scale,
});

/** The main timer pages. Interval work and rest are edited in minutes by owner request. */
export const FIELDS: Record<Mode, FieldDef[]> = {
  interval: [
    f('work', LIMITS.interval.workMinutes, 'min', 60),
    f('rest', LIMITS.interval.restMinutes, 'min', 60),
    f('rounds', LIMITS.interval.rounds, 'rounds'),
  ],
  tabata: [],
  emom: [
    f('interval', LIMITS.emom.interval, 'seconds'),
    f('minutes', LIMITS.emom.minutes, 'minutes'),
  ],
  pomodoro: [
    f('focus', LIMITS.pomodoro.focus, 'min'),
    f('shortBreak', LIMITS.pomodoro.shortBreak, 'min'),
    f('longBreak', LIMITS.pomodoro.longBreak, 'min'),
    f('sessions', LIMITS.pomodoro.sessions, 'sets'),
  ],
  meditation: [
    f('total', LIMITS.meditation.total, 'min', 60),
    f('bell', LIMITS.meditation.bell, 'min', 60),
  ],
};

/** Preset pages carry second-level work values (30 s sprints), so they edit work in seconds. */
export const PRESET_FIELDS: Record<Mode, FieldDef[]> = {
  ...FIELDS,
  interval: [
    f('work', LIMITS.interval.work, 'seconds'),
    f('rest', LIMITS.interval.rest, 'seconds'),
    f('rounds', LIMITS.interval.rounds, 'rounds'),
  ],
};

/** Field value in the unit the person edits. */
function fieldValue(cfg: ModeConfig, def: FieldDef): number {
  const v = (cfg as unknown as Record<string, number>)[def.key] ?? 0;
  return Math.round(v / def.scale);
}

export function draftFrom(cfg: ModeConfig, defs: FieldDef[] = FIELDS[cfg.mode]): Draft {
  const out: Draft = {};
  for (const d of defs) out[d.key] = String(fieldValue(cfg, d));
  return out;
}

/** The bell interval cannot be longer than the session, so its maximum follows the draft. */
function maxFor(cfg: ModeConfig, key: string, draft: Draft): number | undefined {
  if (cfg.mode !== 'meditation' || key !== 'bell') return undefined;
  const total = parseField(draft['total'] ?? '', LIMITS.meditation.total);
  return total.ok ? total.value : undefined;
}

export type Resolved = { ok: true; config: ModeConfig } | { ok: false; errors: Draft };

export function resolveDraft(
  base: ModeConfig,
  draft: Draft,
  defs: FieldDef[] = FIELDS[base.mode],
): Resolved {
  const errors: Draft = {};
  const values: Record<string, number> = {};
  for (const d of defs) {
    // A switched-off interval bell keeps its stored value and is not validated.
    if (base.mode === 'meditation' && !base.intervalBell && d.key === 'bell') continue;
    const r = parseField(draft[d.key] ?? '', d.limit, maxFor(base, d.key, draft));
    if (r.ok) values[d.key] = r.value * d.scale;
    else errors[d.key] = r.error;
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, config: { ...base, ...values } as ModeConfig };
}

/**
 * Step one field by `delta`, clamped to its limits. When the current text does not parse,
 * step from the last valid value instead, so a stray keystroke never strands the stepper.
 */
export function stepField(
  base: ModeConfig,
  draft: Draft,
  key: string,
  delta: 1 | -1,
  defs: FieldDef[] = FIELDS[base.mode],
): string {
  const def = defs.find((d) => d.key === key);
  if (!def) return draft[key] ?? '';
  const max = Math.min(def.limit.max, maxFor(base, key, draft) ?? def.limit.max);
  const current = parseField(draft[key] ?? '', def.limit, max);
  const from = current.ok ? current.value : fieldValue(base, def);
  const next = Math.min(max, Math.max(def.limit.min, from + delta));
  return String(next);
}

/** When interval bells come back on, a retained bell longer than the session shrinks to fit. */
export function clampBell(cfg: ModeConfig): ModeConfig {
  if (cfg.mode !== 'meditation' || cfg.bell <= cfg.total) return cfg;
  return { ...cfg, bell: cfg.total };
}

/** Which stepper buttons are at their bound, for aria-disabled. */
export function bounds(
  base: ModeConfig,
  draft: Draft,
  key: string,
  defs: FieldDef[] = FIELDS[base.mode],
): { atMin: boolean; atMax: boolean } {
  const def = defs.find((d) => d.key === key);
  if (!def) return { atMin: false, atMax: false };
  const max = Math.min(def.limit.max, maxFor(base, key, draft) ?? def.limit.max);
  const current = parseField(draft[key] ?? '', def.limit, max);
  if (!current.ok) return { atMin: false, atMax: false };
  return { atMin: current.value <= def.limit.min, atMax: current.value >= max };
}
