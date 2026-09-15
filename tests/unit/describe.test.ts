import { describeConfig, summaryFor } from '@/engine/describe';
import { TABATA } from '@/engine/schedule';

describe('summaryFor (the setup summary line on the canvas)', () => {
  it('interval: rounds and total', () => {
    expect(
      summaryFor({ mode: 'interval', prep: 0, work: 40, rest: 20, rounds: 8, sets: 1, setRest: 0 }),
    ).toBe('8 rounds · 08:00 total');
    expect(
      summaryFor({
        mode: 'interval',
        prep: 0,
        work: 1800,
        rest: 300,
        rounds: 8,
        sets: 1,
        setRest: 0,
      }),
    ).toBe('8 rounds · 280:00 total');
    expect(
      summaryFor({ mode: 'interval', prep: 0, work: 600, rest: 0, rounds: 1, sets: 1, setRest: 0 }),
    ).toBe('1 round · 10:00 total');
  });

  it('tabata, emom, pomodoro', () => {
    expect(summaryFor(TABATA)).toBe('Classic Tabata · 04:00 total');
    expect(summaryFor({ mode: 'emom', minutes: 10, interval: 60 })).toBe(
      '60s intervals · 10:00 total',
    );
    expect(
      summaryFor({ mode: 'pomodoro', focus: 25, shortBreak: 5, longBreak: 15, sessions: 4 }),
    ).toBe('25 / 5 / 15 / 4 · 130 minutes total');
    expect(
      summaryFor({ mode: 'pomodoro', focus: 25, shortBreak: 5, longBreak: 15, sessions: 1 }),
    ).toBe('25 / 5 / 15 / 1 · 40 minutes total');
  });

  it('meditation: bells in plain words', () => {
    const base = { mode: 'meditation', total: 1800, bell: 600, startBell: false } as const;
    expect(summaryFor({ ...base, intervalBell: true, endBell: true })).toBe(
      'A soft bell every 10 minutes. One at the end.',
    );
    expect(summaryFor({ ...base, intervalBell: false, endBell: true })).toBe(
      'No interval bells. One soft bell at the end.',
    );
    expect(summaryFor({ ...base, intervalBell: true, endBell: false })).toBe(
      'A soft bell every 10 minutes. None at the end.',
    );
    expect(summaryFor({ ...base, intervalBell: false, endBell: false })).toBe(
      'No bells. Just the clock.',
    );
    expect(summaryFor({ ...base, bell: 60, intervalBell: true, endBell: true })).toBe(
      'A soft bell every minute. One at the end.',
    );
    expect(summaryFor({ ...base, bell: 1800, intervalBell: true, endBell: true })).toBe(
      'No interval bells. One soft bell at the end.',
    );
  });
});

describe('describeConfig (prose for programmatic pages)', () => {
  it('reads a no-rest interval as "beep every"', () => {
    expect(
      describeConfig({
        mode: 'interval',
        prep: 0,
        work: 600,
        rest: 0,
        rounds: 3,
        sets: 1,
        setRest: 0,
      }),
    ).toBe('Beep every 10 min for 30 min.');
  });

  it('reads work/rest intervals including the final rest in the total', () => {
    expect(
      describeConfig({
        mode: 'interval',
        prep: 10,
        work: 40,
        rest: 20,
        rounds: 8,
        sets: 2,
        setRest: 60,
      }),
    ).toBe(
      '40 sec work, 20 sec rest, 8 rounds, 2 sets with 1 min between sets. 17 min 10 sec total. Starts with a 10 sec get-ready count.',
    );
  });

  it('reads tabata, emom and pomodoro', () => {
    expect(describeConfig(TABATA)).toBe('20 sec work, 10 sec rest, 8 rounds. 4 min total.');
    expect(describeConfig({ mode: 'emom', minutes: 10, interval: 60 })).toBe(
      'Beep every 1 min for 10 min.',
    );
    expect(
      describeConfig({ mode: 'pomodoro', focus: 25, shortBreak: 5, longBreak: 15, sessions: 4 }),
    ).toBe(
      '25 min focus, 5 min break, then a 15 min long break after 4 sessions. 2 hr 10 min total.',
    );
  });

  it('reads meditation bells', () => {
    expect(
      describeConfig({
        mode: 'meditation',
        total: 1800,
        bell: 600,
        intervalBell: true,
        startBell: false,
        endBell: true,
      }),
    ).toBe('A soft bell every 10 min for 30 min, then one to finish.');
    expect(
      describeConfig({
        mode: 'meditation',
        total: 600,
        bell: 600,
        intervalBell: false,
        startBell: false,
        endBell: true,
      }),
    ).toBe('One soft bell after 10 min.');
  });
});
