export const SITE = {
  name: 'gointervals',
  domain: 'gointervals.com',
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://gointervals.com').replace(/\/$/, ''),
  tagline: 'Time for one thing.',
  description:
    'Free online interval, meditation, Tabata, EMOM and Pomodoro timers. No account, no ads, works offline after the first visit, keeps your screen on.',
  author: 'Nimish Nandwana',
  authorUrl: 'https://nimishnandwana.com',
  authorX: 'https://x.com/nimish_nandwana',
  twitter: '@nimish_nandwana',
  accent: '#355B46',
  repo: 'https://github.com/nimi0112/gointervals',
} as const;

export interface TimerRoute {
  path: string;
  /** full name used in titles and lists: "Interval timer" */
  name: string;
  /** the word on the home row and in the phase label: "Interval" */
  short: string;
  /** one line under the name on the home page */
  blurb: string;
  mode: 'interval' | 'meditation' | 'tabata' | 'emom' | 'pomodoro';
}

/** The five timers, in the order the home page shows them. */
export const TIMERS: readonly TimerRoute[] = [
  {
    path: '/interval',
    name: 'Interval timer',
    short: 'Interval',
    blurb: 'Alternate effort and recovery.',
    mode: 'interval',
  },
  {
    path: '/meditation',
    name: 'Meditation timer',
    short: 'Meditation',
    blurb: 'Periodic gentle beeps: a 30-minute session with a beep every 10 minutes.',
    mode: 'meditation',
  },
  {
    path: '/tabata',
    name: 'Tabata timer',
    short: 'Tabata',
    blurb: 'Short bursts. Well-earned breaks.',
    mode: 'tabata',
  },
  { path: '/emom', name: 'EMOM timer', short: 'EMOM', blurb: 'A fresh start, every minute.', mode: 'emom' },
  {
    path: '/pomodoro',
    name: 'Pomodoro timer',
    short: 'Pomodoro',
    blurb: 'Make room for focused work.',
    mode: 'pomodoro',
  },
];

export const timerByPath = (path: string): TimerRoute | undefined =>
  TIMERS.find((t) => t.path === path);

/** Stable slug for the per-page OG image. */
export function ogSlug(path: string): string {
  const p = path.replace(/^\/|\/$/g, '');
  return p === '' ? 'home' : p.replace(/\//g, '-');
}
