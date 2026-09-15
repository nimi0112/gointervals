/**
 * Thin wrapper around gtag. No-op when PUBLIC_GA_MEASUREMENT_ID is unset.
 * The gtag script itself is loaded (deferred) by Base.astro.
 */
export type EventName =
  | 'timer_start'
  | 'timer_pause'
  | 'timer_resume'
  | 'timer_stop_confirmed'
  | 'timer_reset_confirmed'
  | 'timer_complete'
  | 'timer_run_again'
  | 'timer_change_settings'
  | 'invalid_input'
  | 'audio_toggle'
  | 'audio_unavailable'
  | 'wakelock_failed'
  | 'nav_away_during_session'
  | 'blog_read'
  | 'outbound_click'
  | 'pwa_prompt_shown'
  | 'pwa_prompt_accepted'
  | 'pwa_prompt_dismissed'
  | 'pwa_installed'
  | 'pwa_launch';

export interface EventParams {
  mode?: string;
  /** configured values, in the unit the field uses */
  work?: number;
  rest?: number;
  rounds?: number;
  interval?: number;
  minutes?: number;
  focus?: number;
  short_break?: number;
  long_break?: number;
  sessions?: number;
  bell?: number;
  interval_bell?: boolean;
  start_bell?: boolean;
  end_bell?: boolean;
  total_seconds?: number;
  /** what phase or field the event concerns */
  phase?: string;
  field?: string;
  reason?: string;
  muted?: boolean;
  href?: string;
  slug?: string;
  /** install prompt: which surface asked, and what the user chose */
  platform?: string;
  outcome?: string;
  /** how many timers the visitor had finished when we asked */
  completions?: number;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;

export function track(name: EventName, params: EventParams = {}): void {
  if (!ID || typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    else (window.dataLayer ??= []).push(['event', name, params]);
  } catch {
    /* never let analytics break a timer */
  }
}
