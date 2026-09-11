/**
 * Decides when to offer "add it to the home screen".
 *
 * The rule: a prompt is earned, never automatic. You get asked only after a timer
 * has actually run to completion, because someone who finished a round is someone
 * the app is useful to. A dismissal snoozes for a month; a second one is final.
 *
 * Everything here is pure and DOM-free so the decision matrix can be tested
 * directly. The island does the browser bits and hands the answers in.
 */
import type { AppStorage } from './storage';

export const SNOOZE_MS = 30 * 24 * 60 * 60 * 1000;
export const DISMISS_LIMIT = 2;
export const STORAGE_KEY = 'pwa';

/**
 * `native` - the browser fires beforeinstallprompt, so we can install in one tap.
 * `ios`    - iOS Safari: no API, so we show the Share -> Add to Home Screen steps.
 * `none`   - nowhere to install (an in-app webview, or a browser without support).
 */
export type InstallPlatform = 'native' | 'ios' | 'none';

/** What we remember about a visitor between visits. */
export interface StoredInstallState {
  completions: number;
  dismissCount: number;
  snoozedUntil: number;
  installed: boolean;
}

/** Stored state plus what only the live page can know. */
export interface InstallSignals extends StoredInstallState {
  /** Running inside the installed app already. */
  standalone: boolean;
  /** A beforeinstallprompt event is in hand. */
  canPrompt: boolean;
  platform: InstallPlatform;
}

const EMPTY: StoredInstallState = {
  completions: 0,
  dismissCount: 0,
  snoozedUntil: 0,
  installed: false,
};

export function decideInstallPrompt(s: InstallSignals, now: number): 'show' | 'hold' {
  if (s.standalone || s.installed) return 'hold';
  if (s.dismissCount >= DISMISS_LIMIT) return 'hold';
  if (now < s.snoozedUntil) return 'hold';
  if (s.completions < 1) return 'hold';
  // iOS can always be told how to do it by hand; everywhere else we wait for the
  // browser to say installing is actually possible.
  if (s.platform === 'ios') return 'show';
  return s.canPrompt ? 'show' : 'hold';
}

function coerce(raw: unknown): StoredInstallState {
  if (typeof raw !== 'object' || raw === null) return { ...EMPTY };
  const r = raw as Record<string, unknown>;
  const num = (v: unknown): number =>
    typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : 0;
  return {
    completions: num(r['completions']),
    dismissCount: num(r['dismissCount']),
    snoozedUntil: num(r['snoozedUntil']),
    installed: r['installed'] === true,
  };
}

export function loadInstallState(store: AppStorage): StoredInstallState {
  return coerce(store.get<unknown>(STORAGE_KEY, null));
}

function save(store: AppStorage, next: StoredInstallState): StoredInstallState {
  store.set(STORAGE_KEY, next);
  return next;
}

/** Called when a timer finishes. This is the only thing that earns a prompt. */
export function recordCompletion(store: AppStorage): StoredInstallState {
  const s = loadInstallState(store);
  return save(store, { ...s, completions: s.completions + 1 });
}

/** "Not now". First time snoozes a month, second time means never. */
export function recordDismiss(store: AppStorage, now: number): StoredInstallState {
  const s = loadInstallState(store);
  const dismissCount = s.dismissCount + 1;
  return save(store, {
    ...s,
    dismissCount,
    snoozedUntil: dismissCount >= DISMISS_LIMIT ? 0 : now + SNOOZE_MS,
  });
}

export function recordInstalled(store: AppStorage): StoredInstallState {
  return save(store, { ...loadInstallState(store), installed: true });
}

/**
 * iOS only allows add-to-home-screen from Safari proper. An iPad set to "request
 * desktop site" reports a Mac UA, so it is identified by having touch points.
 */
export function detectPlatform(ua: string, macLike: boolean, touchPoints: number): InstallPlatform {
  const iosDevice = /iPhone|iPod|iPad/i.test(ua) || (macLike && touchPoints > 1);
  if (!iosDevice) return 'native';
  // Chrome/Firefox/Edge on iOS and in-app webviews cannot add to the home screen.
  const inAppOrOtherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|Instagram|FBAN|FBAV|Line\//i.test(ua);
  return inAppOrOtherBrowser ? 'none' : 'ios';
}

/** Already launched from the home screen? Chrome reports a display mode; iOS has its own flag. */
export function isStandalone(
  displayModeMatches: boolean,
  iosStandalone: boolean | undefined,
): boolean {
  return displayModeMatches || iosStandalone === true;
}
