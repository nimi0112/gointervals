const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Remaining-time display. Rounds up so 59.2s shows as 01:00, and 0.4s still shows 00:01.
 * Always mm:ss: a 130 minute cycle reads 130:00, never truncated into hours.
 */
export function formatClock(ms: number): string {
  const s = Math.ceil(Math.max(0, ms) / 1000);
  return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
}

/** Short human duration from seconds: "1 min 30 sec", "10 min", "1 hr 30 min". */
export function formatDuration(seconds: number): string {
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h} hr`);
  if (m) parts.push(`${m} min`);
  if (sec || parts.length === 0) parts.push(`${sec} sec`);
  return parts.join(' ');
}

/** Long form for prose: "20 seconds", "1 minute", "1 minute 30 seconds". */
export function describeSeconds(seconds: number): string {
  const s = Math.round(seconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const parts: string[] = [];
  if (m) parts.push(`${m} minute${m === 1 ? '' : 's'}`);
  if (sec || parts.length === 0) parts.push(`${sec} second${sec === 1 ? '' : 's'}`);
  return parts.join(' ');
}

/** "25:00" style for titles: strips a leading zero on minutes under 10 for compactness. */
export function formatTitle(ms: number): string {
  const s = formatClock(ms);
  return s.startsWith('0') ? s.slice(1) : s;
}
