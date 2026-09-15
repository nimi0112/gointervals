export type Phase = 'prep' | 'work' | 'rest' | 'setrest' | 'focus' | 'break' | 'longbreak' | 'sit';

export interface Segment {
  phase: Phase;
  ms: number;
  /** 1-based round within the set (or focus session number for pomodoro). */
  round: number;
  rounds: number;
  set: number;
  sets: number;
  label: string;
}

/** All durations in seconds unless the name says otherwise. */
export interface IntervalConfig {
  mode: 'interval';
  /** get-ready count; 0 on the main page, kept for programmatic workouts */
  prep: number;
  work: number;
  rest: number;
  rounds: number;
  sets: number;
  setRest: number;
}
/** Tabata is the fixed classic protocol. Nothing about it is editable. */
export interface TabataConfig {
  mode: 'tabata';
  work: 20;
  rest: 10;
  rounds: 8;
}
export interface EmomConfig {
  mode: 'emom';
  /** total length in minutes */
  minutes: number;
  /** interval length in seconds, default 60 */
  interval: number;
}
export interface PomodoroConfig {
  mode: 'pomodoro';
  /** minutes */
  focus: number;
  shortBreak: number;
  longBreak: number;
  /** focus sessions in the one finite cycle */
  sessions: number;
}
export interface MeditationConfig {
  mode: 'meditation';
  /** total seconds */
  total: number;
  /** seconds between interval bells */
  bell: number;
  intervalBell: boolean;
  startBell: boolean;
  endBell: boolean;
}

export type ModeConfig =
  IntervalConfig | TabataConfig | EmomConfig | PomodoroConfig | MeditationConfig;
export type Mode = ModeConfig['mode'];

export const TABATA: TabataConfig = { mode: 'tabata', work: 20, rest: 10, rounds: 8 };

const PHASE_LABEL: Record<Phase, string> = {
  prep: 'Get ready',
  work: 'Work',
  rest: 'Rest',
  setrest: 'Set break',
  focus: 'Focus',
  break: 'Short break',
  longbreak: 'Long break',
  sit: 'Meditation',
};

function seg(
  phase: Phase,
  seconds: number,
  round: number,
  rounds: number,
  set = 1,
  sets = 1,
): Segment {
  return {
    phase,
    ms: Math.round(seconds * 1000),
    round,
    rounds,
    set,
    sets,
    label: PHASE_LABEL[phase],
  };
}

/** Work then rest for every round, including the rest after the last one. */
function intervalSchedule(c: Omit<IntervalConfig, 'mode'>): Segment[] {
  const out: Segment[] = [];
  const sets = Math.max(1, Math.floor(c.sets));
  const rounds = Math.max(1, Math.floor(c.rounds));
  if (c.prep > 0) out.push(seg('prep', c.prep, 0, rounds, 1, sets));
  for (let s = 1; s <= sets; s++) {
    for (let r = 1; r <= rounds; r++) {
      out.push(seg('work', c.work, r, rounds, s, sets));
      out.push(seg('rest', c.rest, r, rounds, s, sets));
    }
    if (s < sets) out.push(seg('setrest', c.setRest, rounds, rounds, s, sets));
  }
  return out;
}

export function buildSchedule(cfg: ModeConfig): Segment[] {
  let out: Segment[];
  switch (cfg.mode) {
    case 'interval':
      out = intervalSchedule(cfg);
      break;
    case 'tabata':
      out = intervalSchedule({ ...TABATA, prep: 0, sets: 1, setRest: 0 });
      break;
    case 'emom': {
      const interval = Math.max(1, cfg.interval);
      const total = Math.max(1, cfg.minutes) * 60;
      const n = Math.max(1, Math.ceil(total / interval));
      out = [];
      for (let r = 1; r <= n; r++) {
        const remaining = total - (r - 1) * interval;
        out.push(seg('work', Math.min(interval, remaining), r, n));
      }
      break;
    }
    case 'pomodoro': {
      const per = Math.max(1, Math.floor(cfg.sessions));
      out = [];
      for (let r = 1; r <= per; r++) {
        out.push(seg('focus', cfg.focus * 60, r, per));
        if (r < per) out.push(seg('break', cfg.shortBreak * 60, r, per));
      }
      out.push(seg('longbreak', cfg.longBreak * 60, per, per));
      break;
    }
    case 'meditation': {
      const total = Math.max(1, cfg.total);
      out = [];
      if (!cfg.intervalBell) {
        out.push(seg('sit', total, 1, 1));
        break;
      }
      const bell = Math.max(1, cfg.bell);
      const n = Math.max(1, Math.ceil(total / bell));
      for (let r = 1; r <= n; r++) {
        const remaining = total - (r - 1) * bell;
        out.push(seg('sit', Math.min(bell, remaining), r, n));
      }
      break;
    }
  }
  return out.filter((s) => s.ms > 0);
}

/** Interval bells that will sound during a sit, not counting the end. */
export function meditationBellCount(cfg: MeditationConfig): number {
  if (!cfg.intervalBell) return 0;
  return Math.max(0, Math.ceil(Math.max(1, cfg.total) / Math.max(1, cfg.bell)) - 1);
}

export function totalMs(segments: readonly Segment[]): number {
  return segments.reduce((a, s) => a + s.ms, 0);
}

/** Total seconds a config would run, for analytics and copy. */
export function configSeconds(cfg: ModeConfig): number {
  return Math.round(totalMs(buildSchedule(cfg)) / 1000);
}
