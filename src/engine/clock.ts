/** A clock returns milliseconds. The engine never counts ticks; it only reads the clock. */
export interface Clock {
  now(): number;
}

/** Wall clock. Date.now() keeps advancing while a phone sleeps, performance.now() may not on some mobile browsers. */
export const realClock: Clock = { now: () => Date.now() };

export interface FakeClock extends Clock {
  advance(ms: number): void;
  set(ms: number): void;
}

export function fakeClock(start = 0): FakeClock {
  let t = start;
  return {
    now: () => t,
    advance: (ms) => {
      t += ms;
    },
    set: (ms) => {
      t = ms;
    },
  };
}
