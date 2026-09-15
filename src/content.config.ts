import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(80).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).min(1).max(5),
    /** the timer page this post is about, e.g. '/tabata' */
    timer: z.string().startsWith('/'),
    /** primary keyword, used in copy checks */
    keyword: z.string(),
    /** defaults to the site author */
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
