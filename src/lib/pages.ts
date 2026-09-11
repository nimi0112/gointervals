/** Every page that gets an OG image, with the text to put on it. */
import { getCollection } from 'astro:content';
import { TIMERS } from './site';
import { countdowns } from '@/data/countdowns';
import { tabatas } from '@/data/tabatas';
import { workouts } from '@/data/workouts';

export interface OgPage {
  path: string;
  title: string;
  kicker: string;
}

export async function allOgPages(): Promise<OgPage[]> {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  return [
    {
      path: '/',
      title: 'Free timers that just run',
      kicker: 'Interval · Countdown · Stopwatch · Tabata · EMOM · Pomodoro',
    },
    ...TIMERS.map((t) => ({
      path: t.path,
      title: t.name,
      kicker: 'Free, no login, works offline',
    })),
    ...[...countdowns, ...tabatas, ...workouts].map((p) => ({
      path: p.path,
      title: p.h1,
      kicker: 'Ready to start',
    })),
    { path: '/blog', title: 'Timers, intervals and focus, explained', kicker: 'Blog' },
    ...posts.map((p) => ({
      path: `/blog/${p.id}`,
      title: p.data.title,
      kicker: `Blog · ${p.data.tags.join(', ')}`,
    })),
    ...tags.map((t) => ({ path: `/blog/tag/${t}`, title: `Posts tagged ${t}`, kicker: 'Blog' })),
    {
      path: '/about',
      title: 'About Go Intervals',
      kicker: 'Open source · No accounts · No cookies',
    },
    { path: '/404', title: 'Nothing here', kicker: '404' },
  ];
}
