import { formatClock, formatDuration, describeSeconds, formatTitle } from '@/engine/format';

describe('format', () => {
  it('formats mm:ss with ceiling, never truncating past 59 minutes', () => {
    expect(formatClock(0)).toBe('00:00');
    expect(formatClock(1)).toBe('00:01');
    expect(formatClock(400)).toBe('00:01');
    expect(formatClock(59_999)).toBe('01:00');
    expect(formatClock(60_000)).toBe('01:00');
    expect(formatClock(93 * 60_000 + 32_000)).toBe('93:32');
    expect(formatClock(130 * 60_000)).toBe('130:00');
  });

  it('formats a compact title', () => {
    expect(formatTitle(5 * 60_000)).toBe('5:00');
    expect(formatTitle(130 * 60_000)).toBe('130:00');
  });

  it('formats human durations', () => {
    expect(formatDuration(90)).toBe('1 min 30 sec');
    expect(formatDuration(600)).toBe('10 min');
    expect(formatDuration(45)).toBe('45 sec');
    expect(formatDuration(3600)).toBe('1 hr');
    expect(formatDuration(5400)).toBe('1 hr 30 min');
  });

  it('describes seconds for copy', () => {
    expect(describeSeconds(20)).toBe('20 seconds');
    expect(describeSeconds(60)).toBe('1 minute');
    expect(describeSeconds(120)).toBe('2 minutes');
    expect(describeSeconds(90)).toBe('1 minute 30 seconds');
  });
});
