import type { Clock } from './clock';
import { realClock } from './clock';

export interface Lap {
  n: number;
  splitMs: number;
  totalMs: number;
}
export type StopwatchStatus = 'idle' | 'running' | 'paused';

export interface Stopwatch {
  start(): void;
  pause(): void;
  resume(): void;
  toggle(): void;
  reset(): void;
  lap(): Lap | null;
  laps(): Lap[];
  fastestLap(): Lap | null;
  slowestLap(): Lap | null;
  elapsedMs(): number;
  status(): StopwatchStatus;
}

export function createStopwatch(clock: Clock = realClock): Stopwatch {
  let status: StopwatchStatus = 'idle';
  let startedAt = 0;
  let pausedAt = 0;
  let pausedTotal = 0;
  let laps: Lap[] = [];

  const elapsedMs = (): number => {
    if (status === 'idle') return 0;
    const now = status === 'paused' ? pausedAt : clock.now();
    return Math.max(0, now - startedAt - pausedTotal);
  };

  const start = (): void => {
    if (status !== 'idle') return;
    status = 'running';
    startedAt = clock.now();
    pausedTotal = 0;
  };
  const pause = (): void => {
    if (status !== 'running') return;
    pausedAt = clock.now();
    status = 'paused';
  };
  const resume = (): void => {
    if (status !== 'paused') return;
    pausedTotal += clock.now() - pausedAt;
    status = 'running';
  };

  return {
    start,
    pause,
    resume,
    toggle: () => {
      if (status === 'idle') start();
      else if (status === 'running') pause();
      else resume();
    },
    reset: () => {
      status = 'idle';
      startedAt = pausedAt = pausedTotal = 0;
      laps = [];
    },
    lap: () => {
      if (status === 'idle') return null;
      const total = elapsedMs();
      const prev = laps.at(-1)?.totalMs ?? 0;
      const lap: Lap = { n: laps.length + 1, splitMs: total - prev, totalMs: total };
      laps = [...laps, lap];
      return lap;
    },
    laps: () => laps,
    fastestLap: () =>
      laps.length < 2 ? null : laps.reduce((a, b) => (b.splitMs < a.splitMs ? b : a)),
    slowestLap: () =>
      laps.length < 2 ? null : laps.reduce((a, b) => (b.splitMs > a.splitMs ? b : a)),
    elapsedMs,
    status: () => status,
  };
}
