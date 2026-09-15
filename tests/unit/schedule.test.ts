import { buildSchedule, totalMs, meditationBellCount, TABATA } from '@/engine/schedule';

const iv = (work: number, rest: number, rounds: number) =>
  ({ mode: 'interval', prep: 0, work, rest, rounds, sets: 1, setRest: 0 }) as const;

describe('interval schedule', () => {
  it('includes the rest after the last round', () => {
    const s = buildSchedule(iv(40, 20, 3));
    expect(s.map((x) => x.phase)).toEqual(['work', 'rest', 'work', 'rest', 'work', 'rest']);
    expect(s[1]!.round).toBe(1);
    expect(s[5]!.round).toBe(3);
    expect(totalMs(s)).toBe(180_000);
  });

  it('with rest 0 is just work blocks, so "beep every 10 minutes for 30" is 3 blocks', () => {
    const s = buildSchedule(iv(600, 0, 3));
    expect(s.map((x) => x.phase)).toEqual(['work', 'work', 'work']);
    expect(totalMs(s)).toBe(1_800_000);
  });

  it('keeps prep, sets and set rest for programmatic workouts', () => {
    const s = buildSchedule({
      mode: 'interval',
      prep: 10,
      work: 30,
      rest: 10,
      rounds: 2,
      sets: 2,
      setRest: 60,
    });
    expect(s.map((x) => x.phase)).toEqual([
      'prep',
      'work',
      'rest',
      'work',
      'rest',
      'setrest',
      'work',
      'rest',
      'work',
      'rest',
    ]);
    expect(s[5]!.set).toBe(1);
    expect(s[6]!.set).toBe(2);
  });

  it('never produces a zero-length segment', () => {
    const s = buildSchedule({
      mode: 'interval',
      prep: 0,
      work: 5,
      rest: 0,
      rounds: 2,
      sets: 2,
      setRest: 0,
    });
    expect(s.every((x) => x.ms > 0)).toBe(true);
  });
});

describe('tabata schedule', () => {
  it('is the fixed 20/10 x 8 with the final rest, 04:00 total', () => {
    const s = buildSchedule(TABATA);
    expect(s).toHaveLength(16);
    expect(s.filter((x) => x.phase === 'work')).toHaveLength(8);
    expect(s.filter((x) => x.phase === 'rest')).toHaveLength(8);
    expect(totalMs(s)).toBe(240_000);
  });
});

describe('emom schedule', () => {
  it('builds N equal blocks for minutes x 60 / interval', () => {
    const s = buildSchedule({ mode: 'emom', minutes: 10, interval: 60 });
    expect(s).toHaveLength(10);
    expect(s.every((x) => x.phase === 'work' && x.ms === 60_000)).toBe(true);
    expect(s[9]!.round).toBe(10);
    expect(s[9]!.rounds).toBe(10);
  });

  it('rounds the count up and caps the last interval by the remaining total', () => {
    const s = buildSchedule({ mode: 'emom', minutes: 1, interval: 45 });
    expect(s.map((x) => x.ms)).toEqual([45_000, 15_000]);
    expect(s[1]!.rounds).toBe(2);
    expect(totalMs(s)).toBe(60_000);
  });
});

describe('pomodoro schedule', () => {
  it('runs one finite cycle: F SB F SB F SB F LB', () => {
    const s = buildSchedule({
      mode: 'pomodoro',
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      sessions: 4,
    });
    expect(s.map((x) => x.phase)).toEqual([
      'focus',
      'break',
      'focus',
      'break',
      'focus',
      'break',
      'focus',
      'longbreak',
    ]);
    expect(s[0]!.ms).toBe(25 * 60_000);
    expect(s[7]!.ms).toBe(15 * 60_000);
    expect(totalMs(s)).toBe(130 * 60_000);
  });

  it('with one session goes focus, long break, done', () => {
    const s = buildSchedule({
      mode: 'pomodoro',
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      sessions: 1,
    });
    expect(s.map((x) => x.phase)).toEqual(['focus', 'longbreak']);
  });
});

describe('meditation schedule', () => {
  const med = (total: number, bell: number, intervalBell = true) =>
    ({ mode: 'meditation', total, bell, intervalBell, startBell: false, endBell: true }) as const;

  it('splits the session by the bell interval', () => {
    const s = buildSchedule(med(1800, 600));
    expect(s.map((x) => x.phase)).toEqual(['sit', 'sit', 'sit']);
    expect(s.map((x) => x.ms)).toEqual([600_000, 600_000, 600_000]);
    expect(totalMs(s)).toBe(1_800_000);
  });

  it('keeps the remainder as a shorter last block', () => {
    const s = buildSchedule(med(1500, 600));
    expect(s.map((x) => x.ms)).toEqual([600_000, 600_000, 300_000]);
  });

  it('is one block when interval bells are off', () => {
    const s = buildSchedule(med(1800, 600, false));
    expect(s).toHaveLength(1);
    expect(s[0]!.ms).toBe(1_800_000);
  });

  it('counts interval bells excluding the one that would coincide with the end', () => {
    expect(meditationBellCount(med(1800, 600))).toBe(2);
    expect(meditationBellCount(med(1500, 600))).toBe(2);
    expect(meditationBellCount(med(600, 600))).toBe(0);
    expect(meditationBellCount(med(1800, 600, false))).toBe(0);
  });
});
