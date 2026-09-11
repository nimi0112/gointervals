export type Phase =
  'prep' | 'work' | 'rest' | 'setrest' | 'focus' | 'break' | 'longbreak' | 'countdown';

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
export interface CountdownConfig {
  mode: 'countdown';
  seconds: number;
}
export interface IntervalConfig {
  mode: 'interval';
  prep: number;
  work: number;
  rest: number;
  rounds: number;
  sets: number;
  setRest: number;
}
export interface TabataConfig {
  mode: 'tabata';
  prep: number;
  work: number;
  rest: number;
  rounds: number;
}
export interface EmomConfig {
  mode: 'emom';
  prep: number;
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
  sessionsBeforeLong: number;
  cycles: number;
}
export interface StopwatchConfig {
  mode: 'stopwatch';
}

export type ModeConfig =
  CountdownConfig | IntervalConfig | TabataConfig | EmomConfig | PomodoroConfig | StopwatchConfig;
export type Mode = ModeConfig['mode'];

const PHASE_LABEL: Record<Phase, string> = {
  prep: 'Get ready',
  work: 'Work',
  rest: 'Rest',
  setrest: 'Set break',
  focus: 'Focus',
  break: 'Break',
  longbreak: 'Long break',
  countdown: 'Countdown',
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

function intervalSchedule(c: Omit<IntervalConfig, 'mode'>): Segment[] {
  const out: Segment[] = [];
  const sets = Math.max(1, Math.floor(c.sets));
  const rounds = Math.max(1, Math.floor(c.rounds));
  if (c.prep > 0) out.push(seg('prep', c.prep, 0, rounds, 1, sets));
  for (let s = 1; s <= sets; s++) {
    for (let r = 1; r <= rounds; r++) {
      out.push(seg('work', c.work, r, rounds, s, sets));
      if (r < rounds) out.push(seg('rest', c.rest, r, rounds, s, sets));
    }
    if (s < sets) out.push(seg('setrest', c.setRest, rounds, rounds, s, sets));
  }
  return out;
}

export function buildSchedule(cfg: ModeConfig): Segment[] {
  let out: Segment[];
  switch (cfg.mode) {
    case 'countdown':
      out = [seg('countdown', cfg.seconds, 1, 1)];
      break;
    case 'interval':
      out = intervalSchedule(cfg);
      break;
    case 'tabata':
      out = intervalSchedule({ ...cfg, sets: 1, setRest: 0 });
      break;
    case 'emom': {
      const interval = Math.max(1, cfg.interval);
      const n = Math.max(1, Math.floor((cfg.minutes * 60) / interval));
      out = [];
      if (cfg.prep > 0) out.push(seg('prep', cfg.prep, 0, n));
      for (let r = 1; r <= n; r++) out.push(seg('work', interval, r, n));
      break;
    }
    case 'pomodoro': {
      const per = Math.max(1, Math.floor(cfg.sessionsBeforeLong));
      const cycles = Math.max(1, Math.floor(cfg.cycles));
      out = [];
      for (let c = 1; c <= cycles; c++) {
        for (let r = 1; r <= per; r++) {
          out.push(seg('focus', cfg.focus * 60, r, per, c, cycles));
          if (r < per) out.push(seg('break', cfg.shortBreak * 60, r, per, c, cycles));
        }
        out.push(seg('longbreak', cfg.longBreak * 60, per, per, c, cycles));
      }
      break;
    }
    case 'stopwatch':
      out = [];
      break;
  }
  return out.filter((s) => s.ms > 0);
}

export function totalMs(segments: readonly Segment[]): number {
  return segments.reduce((a, s) => a + s.ms, 0);
}

/** Total seconds a config would run, for analytics and copy. */
export function configSeconds(cfg: ModeConfig): number {
  return Math.round(totalMs(buildSchedule(cfg)) / 1000);
}
