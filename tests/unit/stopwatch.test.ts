import { createStopwatch } from '@/engine/stopwatch';
import { fakeClock } from '@/engine/clock';

describe('createStopwatch', () => {
  it('counts elapsed from timestamps and survives a sleep', () => {
    const clock = fakeClock(0);
    const sw = createStopwatch(clock);
    sw.start();
    clock.advance(1500);
    expect(sw.elapsedMs()).toBe(1500);
    clock.advance(3_600_000);
    expect(sw.elapsedMs()).toBe(3_601_500);
  });

  it('pause and resume exclude the paused gap', () => {
    const clock = fakeClock(0);
    const sw = createStopwatch(clock);
    sw.start();
    clock.advance(1000);
    sw.pause();
    clock.advance(5000);
    sw.resume();
    clock.advance(1000);
    expect(sw.elapsedMs()).toBe(2000);
  });

  it('laps record split and total', () => {
    const clock = fakeClock(0);
    const sw = createStopwatch(clock);
    sw.start();
    clock.advance(10_000);
    sw.lap();
    clock.advance(12_000);
    sw.lap();
    clock.advance(8_000);
    sw.lap();
    expect(sw.laps()).toEqual([
      { n: 1, splitMs: 10_000, totalMs: 10_000 },
      { n: 2, splitMs: 12_000, totalMs: 22_000 },
      { n: 3, splitMs: 8_000, totalMs: 30_000 },
    ]);
    expect(sw.fastestLap()?.n).toBe(3);
    expect(sw.slowestLap()?.n).toBe(2);
  });

  it('lap while idle does nothing; reset clears everything', () => {
    const clock = fakeClock(0);
    const sw = createStopwatch(clock);
    sw.lap();
    expect(sw.laps()).toEqual([]);
    sw.start();
    clock.advance(500);
    sw.lap();
    sw.reset();
    expect(sw.laps()).toEqual([]);
    expect(sw.elapsedMs()).toBe(0);
    expect(sw.status()).toBe('idle');
  });
});
