import { buildSchedule, totalMs } from '@/engine/schedule';

describe('buildSchedule', () => {
  it('builds a countdown as one segment', () => {
    const s = buildSchedule({ mode: 'countdown', seconds: 300 });
    expect(s).toHaveLength(1);
    expect(s[0]).toMatchObject({ phase: 'countdown', ms: 300_000, round: 1, rounds: 1 });
  });

  it('builds interval with prep, work, rest and drops the trailing rest', () => {
    const s = buildSchedule({
      mode: 'interval',
      prep: 10,
      work: 40,
      rest: 20,
      rounds: 3,
      sets: 1,
      setRest: 0,
    });
    expect(s.map((x) => x.phase)).toEqual(['prep', 'work', 'rest', 'work', 'rest', 'work']);
    expect(s[1]!.round).toBe(1);
    expect(s[5]!.round).toBe(3);
    expect(totalMs(s)).toBe((10 + 40 * 3 + 20 * 2) * 1000);
  });

  it('skips zero-length rest so "beep every 10 minutes for 30" is just 3 work blocks', () => {
    const s = buildSchedule({
      mode: 'interval',
      prep: 0,
      work: 600,
      rest: 0,
      rounds: 3,
      sets: 1,
      setRest: 0,
    });
    expect(s.map((x) => x.phase)).toEqual(['work', 'work', 'work']);
    expect(totalMs(s)).toBe(1_800_000);
  });

  it('inserts set rest between sets and numbers sets', () => {
    const s = buildSchedule({
      mode: 'interval',
      prep: 0,
      work: 30,
      rest: 10,
      rounds: 2,
      sets: 2,
      setRest: 60,
    });
    expect(s.map((x) => x.phase)).toEqual([
      'work',
      'rest',
      'work',
      'setrest',
      'work',
      'rest',
      'work',
    ]);
    expect(s[3]!.set).toBe(1);
    expect(s[4]!.set).toBe(2);
    expect(s[6]!.round).toBe(2);
  });

  it('builds tabata 20/10 x 8', () => {
    const s = buildSchedule({ mode: 'tabata', prep: 10, work: 20, rest: 10, rounds: 8 });
    expect(s.filter((x) => x.phase === 'work')).toHaveLength(8);
    expect(s.filter((x) => x.phase === 'rest')).toHaveLength(7);
    expect(totalMs(s)).toBe((10 + 20 * 8 + 10 * 7) * 1000);
  });

  it('builds EMOM as N equal work blocks', () => {
    const s = buildSchedule({ mode: 'emom', prep: 0, minutes: 10, interval: 60 });
    expect(s).toHaveLength(10);
    expect(s.every((x) => x.phase === 'work' && x.ms === 60_000)).toBe(true);
    expect(s[9]!.round).toBe(10);
  });

  it('builds EMOM with 90 second intervals, floor of total/interval', () => {
    const s = buildSchedule({ mode: 'emom', prep: 0, minutes: 10, interval: 90 });
    expect(s).toHaveLength(6);
  });

  it('builds a pomodoro cycle with a long break after 4 focus blocks', () => {
    const s = buildSchedule({
      mode: 'pomodoro',
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      sessionsBeforeLong: 4,
      cycles: 1,
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

describe('meditation schedule', () => {
  it('builds sit blocks of one bell interval each, with a settle-in prep', () => {
    const s = buildSchedule({ mode: 'meditation', prep: 10, bell: 600, total: 1800 });
    expect(s.map((x) => x.phase)).toEqual(['prep', 'sit', 'sit', 'sit']);
    expect(s[1]!.ms).toBe(600_000);
    expect(s[3]!.round).toBe(3);
    expect(totalMs(s)).toBe(1_810_000);
  });

  it('a single-bell sit is one block', () => {
    const s = buildSchedule({ mode: 'meditation', prep: 0, bell: 300, total: 300 });
    expect(s).toHaveLength(1);
    expect(s[0]).toMatchObject({ phase: 'sit', ms: 300_000, label: 'Sitting' });
  });
});
