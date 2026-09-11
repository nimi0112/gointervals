import type { Clock } from './clock';
import { realClock } from './clock';
import type { Segment } from './schedule';
import { totalMs as sumMs } from './schedule';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'done';

export type TimerEvent =
  | { type: 'segment'; index: number; segment: Segment }
  | { type: 'warning'; index: number; secondsLeft: number }
  | { type: 'complete' };

export interface TimerSnapshot {
  status: TimerStatus;
  segmentIndex: number;
  segment: Segment | null;
  /** ms left in the current segment (0 when done) */
  remainingMs: number;
  segmentElapsedMs: number;
  totalElapsedMs: number;
  totalRemainingMs: number;
  totalMs: number;
  /** 0..1 within the current segment */
  progress: number;
  segmentCount: number;
}

export interface Timer {
  start(): void;
  pause(): void;
  resume(): void;
  toggle(): void;
  reset(): void;
  skip(): void;
  /** Read the clock, move state forward, return what happened since the last tick. */
  tick(): { snapshot: TimerSnapshot; events: TimerEvent[] };
  snapshot(): TimerSnapshot;
  segments: readonly Segment[];
}

const WARN_AT = [3, 2, 1] as const;

/**
 * Timestamp-driven timer. Position is always derived from clock.now() minus pauses,
 * so a tab that was throttled or a phone that slept lands on the right segment
 * and `tick()` returns every boundary that was crossed in the meantime.
 */
export function createTimer(segments: readonly Segment[], clock: Clock = realClock): Timer {
  const total = sumMs(segments);
  const starts: number[] = [];
  let acc = 0;
  for (const s of segments) {
    starts.push(acc);
    acc += s.ms;
  }

  let status: TimerStatus = 'idle';
  let startedAt = 0;
  let pausedAt = 0;
  let pausedTotal = 0;
  /** elapsed at the last tick, used to detect crossed boundaries */
  let lastElapsed = 0;

  const elapsedNow = (): number => {
    if (status === 'idle') return 0;
    if (status === 'done') return total;
    const now = status === 'paused' ? pausedAt : clock.now();
    return Math.min(total, Math.max(0, now - startedAt - pausedTotal));
  };

  const indexAt = (elapsed: number): number => {
    if (segments.length === 0) return 0;
    for (let i = segments.length - 1; i >= 0; i--) {
      if (elapsed >= starts[i]!) return i;
    }
    return 0;
  };

  const snapshotAt = (elapsed: number): TimerSnapshot => {
    if (segments.length === 0) {
      return {
        status,
        segmentIndex: 0,
        segment: null,
        remainingMs: 0,
        segmentElapsedMs: 0,
        totalElapsedMs: 0,
        totalRemainingMs: 0,
        totalMs: 0,
        progress: 0,
        segmentCount: 0,
      };
    }
    const done = status === 'done';
    const i = done ? segments.length - 1 : indexAt(elapsed);
    const seg = segments[i]!;
    const segElapsed = done ? seg.ms : Math.min(seg.ms, elapsed - starts[i]!);
    return {
      status,
      segmentIndex: i,
      segment: seg,
      remainingMs: Math.max(0, seg.ms - segElapsed),
      segmentElapsedMs: segElapsed,
      totalElapsedMs: elapsed,
      totalRemainingMs: Math.max(0, total - elapsed),
      totalMs: total,
      progress: seg.ms === 0 ? 1 : segElapsed / seg.ms,
      segmentCount: segments.length,
    };
  };

  /** Events with a timestamp in (from, to]. */
  const eventsBetween = (from: number, to: number): TimerEvent[] => {
    const out: TimerEvent[] = [];
    segments.forEach((seg, i) => {
      const start = starts[i]!;
      if (i > 0 && start > from && start <= to)
        out.push({ type: 'segment', index: i, segment: seg });
      for (const w of WARN_AT) {
        const at = start + seg.ms - w * 1000;
        if (at > start && at > from && at <= to)
          out.push({ type: 'warning', index: i, secondsLeft: w });
      }
    });
    // keep chronological order: sort by the time they fire
    const timeOf = (e: TimerEvent): number => {
      if (e.type === 'segment') return starts[e.index]!;
      if (e.type === 'warning')
        return starts[e.index]! + segments[e.index]!.ms - e.secondsLeft * 1000;
      return total;
    };
    out.sort((a, b) => timeOf(a) - timeOf(b));
    if (total > from && total <= to) out.push({ type: 'complete' });
    return out;
  };

  const start = (): void => {
    if (status !== 'idle') return;
    if (segments.length === 0) return;
    status = 'running';
    startedAt = clock.now();
    pausedTotal = 0;
    lastElapsed = 0;
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

  const reset = (): void => {
    status = 'idle';
    startedAt = pausedAt = pausedTotal = lastElapsed = 0;
  };

  const skip = (): void => {
    if (status !== 'running' && status !== 'paused') return;
    const elapsed = elapsedNow();
    const i = indexAt(elapsed);
    const target = i + 1 < segments.length ? starts[i + 1]! : total;
    // move startedAt back so that elapsedNow() === target, minus 1ms so the boundary is crossed on the next tick
    const shift = target - elapsed;
    startedAt -= shift;
    lastElapsed = Math.max(0, target - 1);
  };

  const tick = (): { snapshot: TimerSnapshot; events: TimerEvent[] } => {
    if (status === 'idle' || status === 'done')
      return { snapshot: snapshotAt(elapsedNow()), events: [] };
    const elapsed = elapsedNow();
    const events = eventsBetween(lastElapsed, elapsed);
    lastElapsed = elapsed;
    if (elapsed >= total) status = 'done';
    return { snapshot: snapshotAt(elapsed), events };
  };

  return {
    start,
    pause,
    resume,
    toggle: () => {
      if (status === 'idle') start();
      else if (status === 'running') pause();
      else if (status === 'paused') resume();
    },
    reset,
    skip,
    tick,
    snapshot: () => snapshotAt(elapsedNow()),
    segments,
  };
}
