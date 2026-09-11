export const SITE = {
  name: 'Go Intervals',
  domain: 'gointervals.com',
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://gointervals.com').replace(/\/$/, ''),
  tagline: 'Free timers that just run.',
  description:
    'Free online stopwatch, countdown, interval, HIIT, Tabata, EMOM and Pomodoro timers. No login, no ads, works offline, keeps your screen on.',
  author: 'Go Intervals',
  twitter: '',
  accent: '#0f7a4f',
  repo: 'https://github.com/nimi0112/gointervals',
} as const;

export interface TimerRoute {
  path: string;
  name: string;
  short: string;
  mode: 'interval' | 'stopwatch' | 'countdown' | 'tabata' | 'emom' | 'pomodoro';
}

export const TIMERS: readonly TimerRoute[] = [
  { path: '/interval', name: 'Interval timer', short: 'Interval', mode: 'interval' },
  { path: '/timer', name: 'Countdown timer', short: 'Countdown', mode: 'countdown' },
  { path: '/stopwatch', name: 'Stopwatch', short: 'Stopwatch', mode: 'stopwatch' },
  { path: '/tabata', name: 'Tabata timer', short: 'Tabata', mode: 'tabata' },
  { path: '/emom', name: 'EMOM timer', short: 'EMOM', mode: 'emom' },
  { path: '/pomodoro', name: 'Pomodoro timer', short: 'Pomodoro', mode: 'pomodoro' },
];

export const timerByPath = (path: string): TimerRoute | undefined =>
  TIMERS.find((t) => t.path === path);

/** Stable slug for the per-page OG image. */
export function ogSlug(path: string): string {
  const p = path.replace(/^\/|\/$/g, '');
  return p === '' ? 'home' : p.replace(/\//g, '-');
}
