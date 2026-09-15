/** Every page that gets an OG image, with the text to put on it. */
import { getCollection } from 'astro:content';
import { TIMERS } from './site';
import { timerPages } from '@/data';

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
      title: 'Time for one thing.',
      kicker: 'Free timers for focus, movement and a little quiet.',
    },
    ...TIMERS.map((t) => ({
      path: t.path,
      title: t.name,
      kicker: t.blurb,
    })),
    ...timerPages.map((p) => ({
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
      title: 'A little room for your time.',
      kicker: 'Open source · No accounts · No ads',
    },
    { path: '/404', title: 'This page drifted away.', kicker: 'Back to timers' },
  ];
}
