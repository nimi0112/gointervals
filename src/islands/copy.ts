/**
 * Every string the timer screen shows, derived from the config and an engine snapshot.
 * Pure, so the canvas copy can be checked in unit tests without a browser.
 */
import type { ModeConfig, Segment, Phase } from '@/engine/schedule';
import { meditationBellCount } from '@/engine/schedule';
import type { TimerSnapshot } from '@/engine/timer';
import { formatClock } from '@/engine/format';
import { summaryFor } from '@/engine/describe';
import type { IconName } from '@/lib/icons';

export interface PhaseLabel {
  icon: IconName;
  text: string;
}

export interface ScreenCopy {
  digits: string;
  phase: PhaseLabel;
  context: string;
  /** setup only */
  summary: string | null;
  /** progress details, running/paused only */
  next: string | null;
  left: string | null;
  guidance: string | null;
  footer: string;
}

export interface DoneCopy {
  context: string;
  complete: string;
  total: string;
  guidance: string;
}

const SHORT: Record<ModeConfig['mode'], string> = {
  interval: 'Interval',
  meditation: 'Meditation',
  tabata: 'Tabata',
  emom: 'EMOM',
  pomodoro: 'Pomodoro',
};

const PHASE_ICON: Record<Phase, IconName> = {
  prep: 'sliders-horizontal',
  work: 'activity',
  rest: 'wind',
  setrest: 'wind',
  focus: 'activity',
  break: 'coffee',
  longbreak: 'wind',
  sit: 'bell',
};

const IDLE_ICON: Record<ModeConfig['mode'], IconName> = {
  interval: 'sliders-horizontal',
  tabata: 'sliders-horizontal',
  emom: 'sliders-horizontal',
  pomodoro: 'sliders-horizontal',
  meditation: 'bell',
};

const emomUnit = (cfg: ModeConfig): 'Minute' | 'Interval' =>
  cfg.mode === 'emom' && cfg.interval === 60 ? 'Minute' : 'Interval';

function idleContext(cfg: ModeConfig): string {
  switch (cfg.mode) {
    case 'interval':
      return 'Set your pace.';
    case 'tabata':
      return '20s work · 10s rest · 8 rounds';
    case 'emom':
      return cfg.interval === 60 ? 'Every minute on the minute' : `Every ${cfg.interval} seconds`;
    case 'pomodoro':
      return `${cfg.sessions} focus session${cfg.sessions === 1 ? '' : 's'} · One finite cycle`;
    case 'meditation':
      return 'Set a duration and a bell interval.';
  }
}

function phaseName(cfg: ModeConfig, seg: Segment): string {
  if (cfg.mode === 'emom') return `${emomUnit(cfg)} running`;
  return seg.label;
}

function runningContext(cfg: ModeConfig, seg: Segment): string {
  switch (cfg.mode) {
    case 'interval': {
      if (seg.phase === 'prep') return 'Starts with Work';
      const set = seg.sets > 1 ? ` · Set ${seg.set} of ${seg.sets}` : '';
      return `Round ${seg.round} of ${seg.rounds}${set}`;
    }
    case 'tabata':
      return `Tabata · Round ${seg.round} of ${seg.rounds}`;
    case 'emom':
      return `EMOM · ${emomUnit(cfg)} ${seg.round} of ${seg.rounds}`;
    case 'pomodoro':
      if (seg.phase === 'focus') return `Pomodoro · Focus ${seg.round} of ${seg.rounds}`;
      if (seg.phase === 'break') return `Pomodoro · After focus ${seg.round} of ${seg.rounds}`;
      return `Pomodoro · ${seg.rounds} of ${seg.rounds} focus sessions done`;
    case 'meditation':
      return `${Math.round(cfg.total / 60)} minute session`;
  }
}

function nextLine(cfg: ModeConfig, snap: TimerSnapshot, segments: readonly Segment[]): string {
  const next = segments[snap.segmentIndex + 1];
  if (!next) return 'Next · Done';
  switch (cfg.mode) {
    case 'emom':
      return `Next · ${emomUnit(cfg)} ${next.round}`;
    case 'pomodoro':
      if (next.phase === 'focus') return `Next · Focus ${next.round} of ${next.rounds}`;
      return `Next · ${next.label} ${formatClock(next.ms)}`;
    default:
      return `Next · ${next.label} ${formatClock(next.ms)}`;
  }
}

function guidanceFor(seg: Segment | null): string | null {
  if (!seg) return null;
  if (seg.phase === 'rest' || seg.phase === 'setrest') return 'Take a breath.';
  if (seg.phase === 'break' || seg.phase === 'longbreak') return 'Step away for a moment.';
  return null;
}

export function doneCopy(cfg: ModeConfig): DoneCopy {
  const total = `${formatClock(totalOf(cfg))} total`;
  const session = { complete: 'Session complete', total, guidance: 'That’s the session.' };
  switch (cfg.mode) {
    case 'interval':
      return { context: `${cfg.rounds} of ${cfg.rounds} rounds complete`, ...session };
    case 'tabata':
      return { context: 'Tabata · 8 of 8 rounds complete', ...session };
    case 'emom': {
      const n = Math.ceil((cfg.minutes * 60) / cfg.interval);
      const unit = cfg.interval === 60 ? 'minutes' : 'intervals';
      return { context: `EMOM · ${n} of ${n} ${unit} complete`, ...session };
    }
    case 'pomodoro':
      return {
        context: `Pomodoro · ${cfg.sessions} of ${cfg.sessions} focus sessions done`,
        complete: 'Cycle complete',
        total,
        guidance: 'That’s the cycle.',
      };
    case 'meditation':
      return { context: `${Math.round(cfg.total / 60)} minutes complete`, ...session };
  }
}

function totalOf(cfg: ModeConfig): number {
  switch (cfg.mode) {
    case 'interval':
      return (cfg.prep + (cfg.work + cfg.rest) * cfg.rounds * cfg.sets + cfg.setRest * (cfg.sets - 1)) * 1000;
    case 'tabata':
      return 240_000;
    case 'emom':
      return cfg.minutes * 60_000;
    case 'pomodoro':
      return (cfg.focus * cfg.sessions + cfg.shortBreak * (cfg.sessions - 1) + cfg.longBreak) * 60_000;
    case 'meditation':
      return cfg.total * 1000;
  }
}

export function screenCopy(
  cfg: ModeConfig,
  snap: TimerSnapshot,
  segments: readonly Segment[],
  opts: { muted: boolean },
): ScreenCopy {
  const short = SHORT[cfg.mode];
  const offline = 'Works offline. No account needed.';
  const seg = snap.segment;

  if (snap.status === 'idle' || !seg) {
    return {
      digits: formatClock(cfg.mode === 'meditation' ? snap.totalRemainingMs : snap.remainingMs),
      phase: { icon: IDLE_ICON[cfg.mode], text: short },
      context: idleContext(cfg),
      summary: summaryFor(cfg),
      next: null,
      left: null,
      guidance: null,
      footer: offline,
    };
  }

  if (snap.status === 'done') {
    const d = doneCopy(cfg);
    return {
      digits: '00:00',
      phase: { icon: 'check', text: 'Done' },
      context: d.context,
      summary: null,
      next: d.complete,
      left: d.total,
      guidance: d.guidance,
      footer: offline,
    };
  }

  const paused = snap.status === 'paused';
  const leftText = `${formatClock(snap.totalRemainingMs)} left`;

  if (cfg.mode === 'meditation') {
    const count = meditationBellCount(cfg);
    const lastSegment = snap.segmentIndex === segments.length - 1;
    let next: string;
    let left: string;
    if (opts.muted) {
      next = 'Bells muted';
      left = leftText;
    } else if (!cfg.intervalBell) {
      next = 'No interval bells';
      left = leftText;
    } else if (lastSegment && !cfg.endBell) {
      next = 'No more bells';
      left = leftText;
    } else {
      next = `Next bell in ${formatClock(snap.remainingMs)}`;
      left = `${Math.min(snap.segmentIndex, count)} of ${count} interval bells`;
    }
    return {
      digits: formatClock(snap.totalRemainingMs),
      phase: paused ? { icon: 'pause', text: 'Paused' } : { icon: 'bell', text: 'Meditation' },
      context: paused ? 'Meditation · Timer stopped' : runningContext(cfg, seg),
      summary: null,
      next,
      left,
      guidance: null,
      footer: paused ? 'Meditation · Bells paused too' : `${short} · Screen stays on while running`,
    };
  }

  const name = phaseName(cfg, seg);
  const phase: PhaseLabel = paused
    ? { icon: cfg.mode === 'interval' ? PHASE_ICON[seg.phase] : 'pause', text: `Paused · ${name}` }
    : { icon: PHASE_ICON[seg.phase], text: name };
  return {
    digits: formatClock(snap.remainingMs),
    phase,
    context: runningContext(cfg, seg),
    summary: null,
    next: nextLine(cfg, snap, segments),
    left: leftText,
    guidance: guidanceFor(seg),
    footer: `${short} · Screen stays on while running`,
  };
}

export const timerShort = (mode: ModeConfig['mode']): string => SHORT[mode];
