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
    sameAs: [SITE.repo, SITE.authorX],
    founder: personRef(),
  };
}

/** The author as a Person node, without @context, for embedding. */
export function personRef(): JsonLd {
  return {
    '@type': 'Person',
    name: SITE.author,
    url: SITE.authorUrl,
    sameAs: [SITE.authorX, SITE.repo],
  };
}

export function person(): JsonLd {
  return { '@context': 'https://schema.org', ...personRef() };
}

/** The five timers as an ordered list, for the home page. */
export function itemList(items: readonly { path: string; name: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: abs(t.path),
    })),
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
    isAccessibleForFree: true,
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: SITE.repo,
    author: personRef(),
    featureList: [
      'Interval timer with work, rest and rounds',
      'Meditation timer with interval bells',
      'Tabata timer',
      'EMOM timer',
      'Pomodoro timer',
      'Works offline after required files are cached',
      'Requests an awake screen while running',
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
    isAccessibleForFree: true,
    license: 'https://opensource.org/licenses/MIT',
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
    author: personRef(),
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
    interval: 'Interval timer',
    meditation: 'Meditation timer',
    tabata: 'Tabata timer',
    emom: 'EMOM timer',
    pomodoro: 'Pomodoro timer',
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

/** HowTo for a preset timer page: three real steps the page's copy also describes. */
export function howTo(
  name: string,
  path: string,
  setup: string,
  totalSeconds: number,
  fixedTiming = false,
): JsonLd {
  const iso = `PT${Math.max(1, Math.round(totalSeconds))}S`;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${name.toLowerCase()}`,
    url: abs(path),
    totalTime: iso,
    tool: [{ '@type': 'HowToTool', name: 'A phone or computer with a web browser' }],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Open the timer',
        text: `Open ${abs(path)}. It loads preset: ${setup}`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Adjust if needed',
        text: fixedTiming
          ? 'This timer uses fixed 20/10 timing for eight rounds. Choose a variant if you need editable durations.'
          : 'Change the settings above the Start button. The summary line describes the result in plain words.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Start and listen',
        text: 'Press Start or the Space bar. Check sound settings and device volume. Keep the page visible for cues; an awake screen depends on browser support.',
      },
    ],
  };
}
