import { formatClock, formatTenths, formatDuration, describeSeconds } from '@/engine/format';

describe('format', () => {
  it('formats mm:ss and h:mm:ss, ceiling remaining seconds', () => {
    expect(formatClock(0)).toBe('00:00');
    expect(formatClock(1)).toBe('00:01');
    expect(formatClock(59_999)).toBe('01:00');
    expect(formatClock(60_000)).toBe('01:00');
    expect(formatClock(3_600_000)).toBe('1:00:00');
    expect(formatClock(5_400_000)).toBe('1:30:00');
  });

  it('formats stopwatch tenths by flooring', () => {
    expect(formatTenths(0)).toBe('00:00.0');
    expect(formatTenths(1234)).toBe('00:01.2');
    expect(formatTenths(61_950)).toBe('01:01.9');
    expect(formatTenths(3_661_000)).toBe('1:01:01.0');
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
