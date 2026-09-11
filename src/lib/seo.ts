import { SITE } from './site';
import type { Faq } from '@/data/types';

type JsonLd = Record<string, unknown>;

const abs = (path: string): string => `${SITE.url}${path === '/' ? '' : path}` || SITE.url;

export function webSite(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en',
  };
}

export function organization(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icons/icon-512.png`,
  };
}

export function webApplication(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE.name,
    url: SITE.url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript for the timer. Content readable without it.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: SITE.description,
    featureList: [
      'Stopwatch with laps',
      'Countdown timer',
      'Interval and HIIT timer with presets',
      'Tabata timer',
      'EMOM timer',
      'Pomodoro timer',
      'Works offline',
      'Keeps the screen on',
    ],
  };
}

export function softwareApplication(name: string, path: string, description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    url: abs(path),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  };
}

export function faqPage(faq: readonly Faq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbList(crumbs: readonly Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function article(opts: {
  title: string;
  description: string;
  path: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  image: string;
  wordCount: number;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    keywords: opts.tags.join(', '),
    wordCount: opts.wordCount,
    image: opts.image,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/icons/icon-512.png` },
    },
  };
}

/** Breadcrumb trail for a path, using human names where we know them. */
export function crumbsFor(path: string, leafName: string): Crumb[] {
  const out: Crumb[] = [{ name: 'Home', path: '/' }];
  const parts = path.split('/').filter(Boolean);
  const names: Record<string, string> = {
    timer: 'Countdown timer',
    interval: 'Interval timer',
    tabata: 'Tabata timer',
    blog: 'Blog',
    tag: 'Tags',
  };
  let acc = '';
  parts.forEach((p, i) => {
    acc += `/${p}`;
    const last = i === parts.length - 1;
    out.push({ name: last ? leafName : (names[p] ?? p), path: acc });
  });
  return out;
}
