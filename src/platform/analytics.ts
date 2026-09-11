/**
 * Thin wrapper around gtag. No-op when PUBLIC_GA_MEASUREMENT_ID is unset.
 * The gtag script itself is loaded (deferred) by Base.astro.
 */
export type EventName =
  | 'timer_start'
  | 'timer_pause'
  | 'timer_resume'
  | 'timer_reset'
  | 'timer_complete'
  | 'preset_saved'
  | 'preset_loaded'
  | 'fullscreen_enter'
  | 'mute_toggle'
  | 'pwa_prompt_shown'
  | 'pwa_prompt_accepted'
  | 'pwa_prompt_dismissed'
  | 'pwa_installed'
  | 'pwa_launch';

export interface EventParams {
  mode?: string;
  duration_seconds?: number;
  rounds?: number;
  muted?: boolean;
  preset?: string;
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
