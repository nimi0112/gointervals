import { FIELDS, PRESET_FIELDS, draftFrom, resolveDraft, stepField } from '@/islands/fields';
import { defaultConfigs } from '@/engine/presets';

describe('fields', () => {
  it('lists the editable fields per mode in canvas order', () => {
    expect(FIELDS.interval.map((f) => f.key)).toEqual(['work', 'rest', 'rounds']);
    expect(FIELDS.interval.map((f) => f.unit)).toEqual(['min', 'seconds', 'rounds']);
    expect(PRESET_FIELDS.interval.map((f) => f.unit)).toEqual(['seconds', 'seconds', 'rounds']);
    expect(FIELDS.tabata).toEqual([]);
    expect(FIELDS.emom.map((f) => f.key)).toEqual(['interval', 'minutes']);
    expect(FIELDS.pomodoro.map((f) => f.key)).toEqual([
      'focus',
      'shortBreak',
      'longBreak',
      'sessions',
    ]);
    expect(FIELDS.meditation.map((f) => f.key)).toEqual(['total', 'bell']);
  });

  it('draftFrom shows meditation in minutes and everything else as stored', () => {
    expect(draftFrom(defaultConfigs.meditation)).toEqual({ total: '30', bell: '10' });
    expect(draftFrom(defaultConfigs.interval)).toEqual({ work: '30', rest: '300', rounds: '8' });
    expect(draftFrom(defaultConfigs.interval, PRESET_FIELDS.interval)).toEqual({
      work: '1800',
      rest: '300',
      rounds: '8',
    });
    expect(draftFrom(defaultConfigs.pomodoro)).toEqual({
      focus: '25',
      shortBreak: '5',
      longBreak: '15',
      sessions: '4',
    });
  });

  it('resolveDraft returns a config when every field parses', () => {
    const r = resolveDraft(defaultConfigs.interval, { work: '40', rest: '20', rounds: '8' });
    expect(r).toEqual({
      ok: true,
      config: { mode: 'interval', prep: 0, work: 2400, rest: 20, rounds: 8, sets: 1, setRest: 0 },
    });
    const p = resolveDraft(
      defaultConfigs.interval,
      { work: '40', rest: '20', rounds: '8' },
      PRESET_FIELDS.interval,
    );
    expect(p.ok && p.config.mode === 'interval' && p.config.work).toBe(40);
    expect(resolveDraft(defaultConfigs.interval, { work: '61', rest: '0', rounds: '1' })).toEqual({
      ok: false,
      errors: { work: 'Work must be 60 minutes or less.' },
    });
  });

  it('resolveDraft reports every invalid field with its message', () => {
    const r = resolveDraft(defaultConfigs.interval, { work: '0', rest: 'x', rounds: '8' });
    expect(r).toEqual({
      ok: false,
      errors: { work: 'Work must be at least 1 minute.', rest: 'Enter a number.' },
    });
  });

  it('meditation bell cannot exceed the session length', () => {
    const r = resolveDraft(defaultConfigs.meditation, { total: '20', bell: '25' });
    expect(r).toEqual({ ok: false, errors: { bell: 'Bell every must be 20 minutes or less.' } });
    const ok = resolveDraft(defaultConfigs.meditation, { total: '20', bell: '20' });
    expect(ok.ok && ok.config.mode === 'meditation' && ok.config.bell).toBe(1200);
  });

  it('stepField moves by one and clamps, starting from the last valid value when the text is bad', () => {
    expect(
      stepField(defaultConfigs.interval, { work: '40', rest: '20', rounds: '8' }, 'rounds', 1),
    ).toBe('9');
    expect(
      stepField(defaultConfigs.interval, { work: '40', rest: '20', rounds: '99' }, 'rounds', 1),
    ).toBe('99');
    expect(
      stepField(defaultConfigs.interval, { work: '40', rest: '0', rounds: '8' }, 'rest', -1),
    ).toBe('0');
    expect(
      stepField(defaultConfigs.interval, { work: 'abc', rest: '20', rounds: '8' }, 'work', 1),
    ).toBe('31');
    expect(
      stepField(
        defaultConfigs.interval,
        { work: 'abc', rest: '20', rounds: '8' },
        'work',
        1,
        PRESET_FIELDS.interval,
      ),
    ).toBe('1801');
    expect(stepField(defaultConfigs.meditation, { total: '30', bell: '30' }, 'bell', 1)).toBe('30');
  });
});
