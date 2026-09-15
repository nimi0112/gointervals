import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  return rss({
    title: `${SITE.name} blog`,
    description:
      'Short, specific guides to Tabata, HIIT, EMOM, Pomodoro and meditation with interval bells.',
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}`,
      categories: p.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
