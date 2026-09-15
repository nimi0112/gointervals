import { buildSchedule } from '@/engine/schedule';
import { createTimer } from '@/engine/timer';
import { fakeClock } from '@/engine/clock';
import { defaultConfigs } from '@/engine/presets';
import type { ModeConfig } from '@/engine/schedule';
import { screenCopy, doneCopy } from '@/islands/copy';

/** Run a config to `elapsedS` seconds and return the snapshot and segments. */
function at(cfg: ModeConfig, elapsedS: number, paused = false) {
  const clock = fakeClock(0);
  const segments = buildSchedule(cfg);
  const t = createTimer(segments, clock);
  t.start();
  clock.advance(elapsedS * 1000);
  t.tick();
  if (paused) t.pause();
  return { snap: t.snapshot(), segments };
}

const interval: ModeConfig = { mode: 'interval', prep: 0, work: 40, rest: 20, rounds: 8, sets: 1, setRest: 0 };

describe('screenCopy for the interval timer', () => {
  it('idle: timer name, prompt and summary', () => {
    const segments = buildSchedule(interval);
    const c = screenCopy(interval, createTimer(segments).snapshot(), segments, { muted: false });
    expect(c.phase).toEqual({ icon: 'sliders-horizontal', text: 'Interval' });
    expect(c.context).toBe('Set your pace.');
    expect(c.summary).toBe('8 rounds · 08:00 total');
  });

  it('work round 3 of 8 with 28s left: next rest and session remaining', () => {
    // rounds 1-2 = 120s, then 12s into work 3
    const { snap, segments } = at(interval, 132);
    const c = screenCopy(interval, snap, segments, { muted: false });
    expect(c.phase).toEqual({ icon: 'activity', text: 'Work' });
    expect(c.context).toBe('Round 3 of 8');
    expect(c.next).toBe('Next · Rest 00:20');
    expect(c.left).toBe('05:48 left');
    expect(c.guidance).toBeNull();
  });

  it('rest shows the wind icon and a breath', () => {
    const { snap, segments } = at(interval, 164); // 4s into rest 3
    const c = screenCopy(interval, snap, segments, { muted: false });
    expect(c.phase).toEqual({ icon: 'wind', text: 'Rest' });
    expect(c.next).toBe('Next · Work 00:40');
    expect(c.left).toBe('05:16 left');
    expect(c.guidance).toBe('Take a breath.');
  });

  it('the final rest points at Done', () => {
    const { snap, segments } = at(interval, 465);
    expect(screenCopy(interval, snap, segments, { muted: false }).next).toBe('Next · Done');
  });

  it('paused keeps the phase icon and says so', () => {
    const { snap, segments } = at(interval, 132, true);
    const c = screenCopy(interval, snap, segments, { muted: false });
    expect(c.phase).toEqual({ icon: 'activity', text: 'Paused · Work' });
    expect(c.context).toBe('Round 3 of 8');
  });
});

describe('screenCopy for tabata, emom and pomodoro', () => {
  it('tabata idle and running', () => {
    const cfg = defaultConfigs.tabata;
    const segments = buildSchedule(cfg);
    const idle = screenCopy(cfg, createTimer(segments).snapshot(), segments, { muted: false });
    expect(idle.phase.text).toBe('Tabata');
    expect(idle.context).toBe('20s work · 10s rest · 8 rounds');
    expect(idle.summary).toBe('Classic Tabata · 04:00 total');
    const { snap } = at(cfg, 68); // 8s into work 3
    const c = screenCopy(cfg, snap, segments, { muted: false });
    expect(c.context).toBe('Tabata · Round 3 of 8');
    expect(c.next).toBe('Next · Rest 00:10');
    expect(c.left).toBe('02:52 left');
    const p = screenCopy(cfg, at(cfg, 68, true).snap, segments, { muted: false });
    expect(p.phase).toEqual({ icon: 'pause', text: 'Paused · Work' });
  });

  it('emom counts minutes at 60s and intervals otherwise', () => {
    const cfg = defaultConfigs.emom;
    const segments = buildSchedule(cfg);
    const { snap } = at(cfg, 138);
    const c = screenCopy(cfg, snap, segments, { muted: false });
    expect(c.phase).toEqual({ icon: 'activity', text: 'Minute running' });
    expect(c.context).toBe('EMOM · Minute 3 of 10');
    expect(c.next).toBe('Next · Minute 4');
    expect(c.left).toBe('07:42 left');
    const idle = screenCopy(cfg, createTimer(segments).snapshot(), segments, { muted: false });
    expect(idle.context).toBe('Every minute on the minute');
    const c90: ModeConfig = { mode: 'emom', minutes: 3, interval: 90 };
    const s90 = buildSchedule(c90);
    const r = screenCopy(c90, at(c90, 100).snap, s90, { muted: false });
    expect(r.phase.text).toBe('Interval running');
    expect(r.context).toBe('EMOM · Interval 2 of 2');
    expect(r.next).toBe('Next · Done');
  });

  it('pomodoro focus, breaks and their contexts', () => {
    const cfg = defaultConfigs.pomodoro;
    const segments = buildSchedule(cfg);
    const idle = screenCopy(cfg, createTimer(segments).snapshot(), segments, { muted: false });
    expect(idle.context).toBe('4 focus sessions · One finite cycle');
    const f = screenCopy(cfg, at(cfg, 30 * 60 + 6 * 60 + 28).snap, segments, { muted: false });
    expect(f.phase).toEqual({ icon: 'activity', text: 'Focus' });
    expect(f.context).toBe('Pomodoro · Focus 2 of 4');
    expect(f.next).toBe('Next · Short break 05:00');
    expect(f.left).toBe('93:32 left');
    const b = screenCopy(cfg, at(cfg, 55 * 60 + 108).snap, segments, { muted: false });
    expect(b.phase).toEqual({ icon: 'coffee', text: 'Short break' });
    expect(b.context).toBe('Pomodoro · After focus 2 of 4');
    expect(b.next).toBe('Next · Focus 3 of 4');
    expect(b.left).toBe('73:12 left');
    expect(b.guidance).toBe('Step away for a moment.');
    const l = screenCopy(cfg, at(cfg, 115 * 60 + 135).snap, segments, { muted: false });
    expect(l.phase).toEqual({ icon: 'wind', text: 'Long break' });
    expect(l.context).toBe('Pomodoro · 4 of 4 focus sessions done');
    expect(l.next).toBe('Next · Done');
    expect(l.left).toBe('12:45 left');
    const p = screenCopy(cfg, at(cfg, 30 * 60 + 388, true).snap, segments, { muted: false });
    expect(p.phase).toEqual({ icon: 'pause', text: 'Paused · Focus' });
  });
});

describe('screenCopy for meditation', () => {
  const cfg = defaultConfigs.meditation;
  const segments = buildSchedule(cfg);

  it('idle', () => {
    const c = screenCopy(cfg, createTimer(segments).snapshot(), segments, { muted: false });
    expect(c.phase).toEqual({ icon: 'bell', text: 'Meditation' });
    expect(c.context).toBe('Set a duration and a bell interval.');
    expect(c.summary).toBe('A soft bell every 10 minutes. One at the end.');
  });

  it('running: the main clock is the whole session, the quiet line is the next bell', () => {
    const { snap } = at(cfg, 11 * 60 + 18);
    const c = screenCopy(cfg, snap, segments, { muted: false });
    expect(c.digits).toBe('18:42');
    expect(c.phase).toEqual({ icon: 'bell', text: 'Meditation' });
    expect(c.context).toBe('30 minute session');
    expect(c.next).toBe('Next bell in 08:42');
    expect(c.left).toBe('1 of 2 interval bells');
  });

  it('muted and interval-off variants', () => {
    const { snap } = at(cfg, 11 * 60 + 18);
    expect(screenCopy(cfg, snap, segments, { muted: true }).next).toBe('Bells muted');
    expect(screenCopy(cfg, snap, segments, { muted: true }).left).toBe('18:42 left');
    const off: ModeConfig = { ...cfg, intervalBell: false };
    const so = buildSchedule(off);
    const c = screenCopy(off, at(off, 11 * 60 + 18).snap, so, { muted: false });
    expect(c.next).toBe('No interval bells');
    expect(c.left).toBe('18:42 left');
  });

  it('paused', () => {
    const c = screenCopy(cfg, at(cfg, 678, true).snap, segments, { muted: false });
    expect(c.phase).toEqual({ icon: 'pause', text: 'Paused' });
    expect(c.context).toBe('Meditation · Timer stopped');
    expect(c.footer).toBe('Meditation · Bells paused too');
  });
});

describe('doneCopy', () => {
  it('per mode', () => {
    expect(doneCopy(interval)).toEqual({
      context: '8 of 8 rounds complete',
      complete: 'Session complete',
      total: '08:00 total',
      guidance: 'That’s the session.',
    });
    expect(doneCopy(defaultConfigs.tabata).context).toBe('Tabata · 8 of 8 rounds complete');
    expect(doneCopy(defaultConfigs.emom).context).toBe('EMOM · 10 of 10 minutes complete');
    expect(doneCopy({ mode: 'emom', minutes: 3, interval: 90 }).context).toBe(
      'EMOM · 2 of 2 intervals complete',
    );
    expect(doneCopy(defaultConfigs.pomodoro)).toEqual({
      context: 'Pomodoro · 4 of 4 focus sessions done',
      complete: 'Cycle complete',
      total: '130:00 total',
      guidance: 'That’s the cycle.',
    });
    expect(doneCopy(defaultConfigs.meditation).context).toBe('30 minutes complete');
  });
});

describe('footer line', () => {
  it('depends on status', () => {
    const segments = buildSchedule(interval);
    expect(screenCopy(interval, createTimer(segments).snapshot(), segments, { muted: false }).footer).toBe(
      'Works offline. No account needed.',
    );
    expect(screenCopy(interval, at(interval, 5).snap, segments, { muted: false }).footer).toBe(
      'Interval · Screen stays on while running',
    );
  });
});
