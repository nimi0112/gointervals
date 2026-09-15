import { createTimer } from '@/engine/timer';
import { buildSchedule } from '@/engine/schedule';
import { fakeClock } from '@/engine/clock';

const hiit = () =>
  buildSchedule({ mode: 'interval', prep: 5, work: 20, rest: 10, rounds: 3, sets: 1, setRest: 0 });

describe('createTimer', () => {
  it('starts idle with the first segment loaded', () => {
    const clock = fakeClock(1000);
    const t = createTimer(hiit(), clock);
    const s = t.snapshot();
    expect(s.status).toBe('idle');
    expect(s.segmentIndex).toBe(0);
    expect(s.remainingMs).toBe(5000);
    expect(s.totalMs).toBe((5 + 60 + 30) * 1000);
  });

  it('counts down from timestamps, not ticks', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(1234);
    expect(t.tick().snapshot.remainingMs).toBe(5000 - 1234);
    clock.advance(1);
    expect(t.tick().snapshot.remainingMs).toBe(5000 - 1235);
  });

  it('pause freezes time and resume does not count the gap', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(2000);
    t.pause();
    clock.advance(60_000);
    expect(t.tick().snapshot.remainingMs).toBe(3000);
    t.resume();
    clock.advance(1000);
    expect(t.tick().snapshot.remainingMs).toBe(2000);
    expect(t.snapshot().status).toBe('running');
  });

  it('crosses segment boundaries and reports each one as an event', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(5000);
    const r = t.tick();
    expect(r.snapshot.segmentIndex).toBe(1);
    expect(r.snapshot.segment?.phase).toBe('work');
    expect(r.events.map((e) => e.type)).toContain('segment');
  });

  it('after a long sleep, recomputes position and returns every missed event in order', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(100);
    t.tick();
    // sleep through prep, work1, rest1, into work2 (5 + 20 + 10 = 35s; land at 40s)
    clock.advance(40_000 - 100);
    const r = t.tick();
    expect(r.snapshot.segmentIndex).toBe(3);
    expect(r.snapshot.segment?.round).toBe(2);
    expect(r.snapshot.remainingMs).toBe(15_000);
    const segEvents = r.events.filter((e) => e.type === 'segment');
    expect(segEvents.map((e) => (e.type === 'segment' ? e.index : -1))).toEqual([1, 2, 3]);
  });

  it('emits warning events at 3, 2, 1 seconds left of a segment, once each', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(1999);
    expect(t.tick().events).toEqual([]);
    clock.advance(1);
    const w = t.tick().events.filter((e) => e.type === 'warning');
    expect(w).toHaveLength(1);
    expect(w[0]).toMatchObject({ type: 'warning', secondsLeft: 3 });
    clock.advance(500);
    expect(t.tick().events).toEqual([]);
    clock.advance(500);
    expect(t.tick().events).toMatchObject([{ type: 'warning', secondsLeft: 2 }]);
  });

  it('completes and stays done, with elapsed clamped to total', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(1_000_000);
    const r = t.tick();
    expect(r.snapshot.status).toBe('done');
    expect(r.snapshot.remainingMs).toBe(0);
    expect(r.snapshot.totalElapsedMs).toBe(95_000);
    expect(r.events.at(-1)?.type).toBe('complete');
    clock.advance(1000);
    expect(t.tick().events).toEqual([]);
  });

  it('reset returns to idle and clears event bookkeeping', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(30_000);
    t.tick();
    t.reset();
    expect(t.snapshot()).toMatchObject({ status: 'idle', segmentIndex: 0, remainingMs: 5000 });
    t.start();
    clock.advance(5000);
    const r = t.tick();
    expect(r.events.filter((e) => e.type === 'segment')).toHaveLength(1);
  });

  it('toggle starts, pauses, resumes', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.toggle();
    expect(t.snapshot().status).toBe('running');
    t.toggle();
    expect(t.snapshot().status).toBe('paused');
    t.toggle();
    expect(t.snapshot().status).toBe('running');
  });

  it('skip jumps to the next segment start', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(1000);
    t.skip();
    const s = t.tick().snapshot;
    expect(s.segmentIndex).toBe(1);
    expect(s.remainingMs).toBe(20_000);
  });

  it('progress is 0..1 within the current segment', () => {
    const clock = fakeClock(0);
    const t = createTimer(hiit(), clock);
    t.start();
    clock.advance(2500);
    expect(t.tick().snapshot.progress).toBeCloseTo(0.5);
  });
});
