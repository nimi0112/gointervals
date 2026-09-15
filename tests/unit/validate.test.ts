import { LIMITS, parseField, coerceStored, isValidConfig } from '@/engine/validate';
import { defaultConfigs } from '@/engine/presets';
import { TABATA } from '@/engine/schedule';

describe('parseField', () => {
  const work = LIMITS.interval.work;

  it('rejects empty and non-numeric text', () => {
    expect(parseField('', work)).toEqual({ ok: false, error: 'Enter a number.' });
    expect(parseField('abc', work)).toEqual({ ok: false, error: 'Enter a number.' });
  });

  it('rejects decimals', () => {
    expect(parseField('1.5', work)).toEqual({ ok: false, error: 'Use a whole number.' });
  });

  it('names the field and the bound when out of range', () => {
    expect(parseField('0', work)).toEqual({ ok: false, error: 'Work must be at least 1 second.' });
    expect(parseField('3601', work)).toEqual({
      ok: false,
      error: 'Work must be 3,600 seconds or less.',
    });
    expect(parseField('100', LIMITS.interval.rounds)).toEqual({
      ok: false,
      error: 'Rounds must be 99 rounds or less.',
    });
    expect(parseField('0', LIMITS.emom.interval)).toEqual({
      ok: false,
      error: 'Interval length must be at least 15 seconds.',
    });
    expect(parseField('0', LIMITS.pomodoro.sessions)).toEqual({
      ok: false,
      error: 'Focus sessions must be at least 1 session.',
    });
  });

  it('accepts in-range values with surrounding whitespace, and rest 0', () => {
    expect(parseField(' 40 ', work)).toEqual({ ok: true, value: 40 });
    expect(parseField('0', LIMITS.interval.rest)).toEqual({ ok: true, value: 0 });
    expect(parseField('-0', LIMITS.interval.rest)).toEqual({ ok: true, value: 0 });
  });

  it('lets the caller lower the maximum, for bell interval vs session length', () => {
    expect(parseField('31', LIMITS.meditation.bell, 30)).toEqual({
      ok: false,
      error: 'Bell every must be 30 minutes or less.',
    });
    expect(parseField('30', LIMITS.meditation.bell, 30)).toEqual({ ok: true, value: 30 });
  });
});

describe('coerceStored', () => {
  it('returns null for junk and for the wrong mode', () => {
    expect(coerceStored('interval', null)).toBeNull();
    expect(coerceStored('interval', 'x')).toBeNull();
    expect(coerceStored('interval', { mode: 'emom', minutes: 10, interval: 60 })).toBeNull();
  });

  it('accepts a valid interval and rejects out-of-range or fractional fields', () => {
    expect(coerceStored('interval', defaultConfigs.interval)).toEqual(defaultConfigs.interval);
    expect(coerceStored('interval', { ...defaultConfigs.interval, work: 5000 })).toBeNull();
    expect(coerceStored('interval', { ...defaultConfigs.interval, rounds: 2.5 })).toBeNull();
    expect(coerceStored('interval', { ...defaultConfigs.interval, prep: 10 })).toBeNull();
  });

  it('only ever returns the exact classic tabata', () => {
    expect(coerceStored('tabata', { mode: 'tabata', work: 30, rest: 15, rounds: 8 })).toBeNull();
    expect(coerceStored('tabata', TABATA)).toEqual(TABATA);
  });

  it('validates emom, pomodoro and meditation ranges', () => {
    expect(coerceStored('emom', { mode: 'emom', minutes: 100, interval: 60 })).toBeNull();
    expect(coerceStored('emom', { mode: 'emom', minutes: 10, interval: 14 })).toBeNull();
    expect(coerceStored('emom', defaultConfigs.emom)).toEqual(defaultConfigs.emom);
    expect(coerceStored('pomodoro', { ...defaultConfigs.pomodoro, sessions: 13 })).toBeNull();
    expect(coerceStored('pomodoro', defaultConfigs.pomodoro)).toEqual(defaultConfigs.pomodoro);
    expect(coerceStored('meditation', { ...defaultConfigs.meditation, bell: 2400 })).toBeNull();
    expect(coerceStored('meditation', { ...defaultConfigs.meditation, bell: 90 })).toBeNull();
    expect(coerceStored('meditation', { ...defaultConfigs.meditation, startBell: 'yes' })).toBeNull();
    expect(coerceStored('meditation', defaultConfigs.meditation)).toEqual(
      defaultConfigs.meditation,
    );
  });

  it('drops unknown extra keys', () => {
    expect(coerceStored('emom', { ...defaultConfigs.emom, prep: 10 })).toEqual(defaultConfigs.emom);
  });
});

describe('isValidConfig', () => {
  it('agrees with coerceStored', () => {
    expect(isValidConfig(defaultConfigs.meditation)).toBe(true);
    expect(isValidConfig({ ...defaultConfigs.interval, rounds: 0 })).toBe(false);
  });
});
