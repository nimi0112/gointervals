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
      lastmod: new Date(),
      filter: (page) => !page.includes('/og/') && !page.endsWith('/404'),
    }),
  ],
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
