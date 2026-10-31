// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://gointervals.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [
    preact(),
    sitemap({
      // Tag pages are thin lists that compete with the posts they link to; they stay
      // crawlable for navigation but are noindex, so keep them out of the sitemap.
      filter: (page) =>
        !page.includes('/og/') && !page.endsWith('/404') && !page.includes('/blog/tag/'),
    }),
  ],
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
