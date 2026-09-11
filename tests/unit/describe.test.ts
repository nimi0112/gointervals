import { describeConfig } from '@/engine/describe';

describe('describeConfig', () => {
  it('reads a no-rest interval as "beep every"', () => {
    expect(
      describeConfig({
        mode: 'interval',
        prep: 0,
        work: 10,
        rest: 0,
        rounds: 30,
        sets: 1,
        setRest: 0,
      }),
    ).toBe('Beep every 10 sec for 5 min.');
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

  it('reads work/rest intervals with rounds, sets and prep', () => {
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
      '40 sec work, 20 sec rest, 8 rounds, 2 sets with 1 min between sets. 16 min 30 sec total. Starts with a 10 sec get-ready count.',
    );
  });

  it('reads tabata, emom, pomodoro and countdown', () => {
    expect(describeConfig({ mode: 'tabata', prep: 0, work: 20, rest: 10, rounds: 8 })).toBe(
      '20 sec work, 10 sec rest, 8 rounds. 3 min 50 sec total.',
    );
    expect(describeConfig({ mode: 'emom', prep: 0, minutes: 10, interval: 60 })).toBe(
      'Beep every 1 min for 10 min.',
    );
    expect(
      describeConfig({
        mode: 'pomodoro',
        focus: 25,
        shortBreak: 5,
        longBreak: 15,
        sessionsBeforeLong: 4,
        cycles: 1,
      }),
    ).toBe(
      '25 min focus, 5 min break, then a 15 min long break after 4 sessions. 2 hr 10 min total.',
    );
    expect(describeConfig({ mode: 'countdown', seconds: 300 })).toBe(
      'Counts down 5 min, then beeps.',
    );
  });
});

describe('describeConfig meditation', () => {
  it('reads bells in plain words', () => {
    expect(describeConfig({ mode: 'meditation', prep: 10, bell: 600, total: 1800 })).toBe(
      'A bell every 10 min for 30 min, 3 bells in all. Starts with 10 sec to settle in.',
    );
    expect(describeConfig({ mode: 'meditation', prep: 0, bell: 300, total: 300 })).toBe(
      'One bell after 5 min.',
    );
  });
});
