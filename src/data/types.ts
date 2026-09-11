import type { ModeConfig } from '@/engine/schedule';

export interface Faq {
  q: string;
  a: string;
}

/** One statically generated timer page. Copy must be specific to this page, never templated. */
export interface ProgrammaticPage {
  /** full path, e.g. '/timer/5-minutes' */
  path: string;
  h1: string;
  /** <title> without the site suffix, under 60 characters */
  title: string;
  /** meta description, 120-155 characters */
  description: string;
  /** 2-3 short paragraphs of plain text, no markdown */
  intro: string[];
  /** 3-5 short "good for" bullets */
  uses: string[];
  config: Exclude<ModeConfig, { mode: 'stopwatch' }>;
  faq: Faq[];
  /** related paths on this site */
  related: string[];
}
