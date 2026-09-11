import {
  DISMISS_LIMIT,
  SNOOZE_MS,
  decideInstallPrompt,
  detectPlatform,
  isStandalone,
  loadInstallState,
  recordCompletion,
  recordDismiss,
  recordInstalled,
  type InstallSignals,
} from '@/platform/install';
import { createStorage } from '@/platform/storage';

function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    get length() {
      return m.size;
    },
    clear: () => m.clear(),
    getItem: (k) => m.get(k) ?? null,
    key: (i) => [...m.keys()][i] ?? null,
    removeItem: (k) => void m.delete(k),
    setItem: (k, v) => void m.set(k, String(v)),
  };
}

const NOW = 1_700_000_000_000;

/** A user who has earned the prompt on a platform that can show it. */
function earned(over: Partial<InstallSignals> = {}): InstallSignals {
  return {
    completions: 1,
    dismissCount: 0,
    snoozedUntil: 0,
    installed: false,
    standalone: false,
    canPrompt: true,
    platform: 'native',
    ...over,
  };
}

describe('decideInstallPrompt', () => {
  it('holds until the user has completed a timer', () => {
    expect(decideInstallPrompt(earned({ completions: 0 }), NOW)).toBe('hold');
    expect(decideInstallPrompt(earned({ completions: 1 }), NOW)).toBe('show');
    expect(decideInstallPrompt(earned({ completions: 9 }), NOW)).toBe('show');
  });

  it('never prompts someone who already installed', () => {
    expect(decideInstallPrompt(earned({ installed: true }), NOW)).toBe('hold');
  });

  it('never prompts inside the installed app itself', () => {
    expect(decideInstallPrompt(earned({ standalone: true }), NOW)).toBe('hold');
  });

  it('holds while snoozed and shows again once the snooze expires', () => {
    const snoozed = earned({ dismissCount: 1, snoozedUntil: NOW + SNOOZE_MS });
    expect(decideInstallPrompt(snoozed, NOW)).toBe('hold');
    expect(decideInstallPrompt(snoozed, NOW + SNOOZE_MS - 1)).toBe('hold');
    expect(decideInstallPrompt(snoozed, NOW + SNOOZE_MS)).toBe('show');
  });

  it('stops asking permanently after the second dismissal', () => {
    const twice = earned({ dismissCount: DISMISS_LIMIT, snoozedUntil: 0 });
    expect(decideInstallPrompt(twice, NOW)).toBe('hold');
    // Even far in the future, a hard no stays a no.
    expect(decideInstallPrompt(twice, NOW + SNOOZE_MS * 100)).toBe('hold');
  });

  it('holds on a platform that cannot install at all', () => {
    expect(decideInstallPrompt(earned({ canPrompt: false, platform: 'none' }), NOW)).toBe('hold');
  });

  it('shows iOS instructions even though no native event can fire', () => {
    expect(decideInstallPrompt(earned({ canPrompt: false, platform: 'ios' }), NOW)).toBe('show');
  });

  it('holds on native platforms until the browser offers the prompt', () => {
    expect(decideInstallPrompt(earned({ canPrompt: false, platform: 'native' }), NOW)).toBe('hold');
  });
});

describe('install state persistence', () => {
  it('starts from a clean slate', () => {
    const s = createStorage(memoryStorage);
    const state = loadInstallState(s);
    expect(state.completions).toBe(0);
    expect(state.dismissCount).toBe(0);
    expect(state.snoozedUntil).toBe(0);
    expect(state.installed).toBe(false);
  });

  it('counts completions across visits', () => {
    const backing = memoryStorage();
    const s = createStorage(() => backing);
    recordCompletion(s);
    recordCompletion(s);
    // A fresh storage wrapper stands in for a new page load.
    expect(loadInstallState(createStorage(() => backing)).completions).toBe(2);
  });

  it('first dismiss snoozes, second dismiss is permanent', () => {
    const backing = memoryStorage();
    const s = createStorage(() => backing);

    const first = recordDismiss(s, NOW);
    expect(first.dismissCount).toBe(1);
    expect(first.snoozedUntil).toBe(NOW + SNOOZE_MS);
    expect(decideInstallPrompt({ ...earned(), ...first }, NOW)).toBe('hold');

    const second = recordDismiss(s, NOW + SNOOZE_MS);
    expect(second.dismissCount).toBe(DISMISS_LIMIT);
    expect(decideInstallPrompt({ ...earned(), ...second }, NOW + SNOOZE_MS * 50)).toBe('hold');
  });

  it('marks installed permanently', () => {
    const backing = memoryStorage();
    const s = createStorage(() => backing);
    recordInstalled(s);
    expect(loadInstallState(createStorage(() => backing)).installed).toBe(true);
  });

  it('survives corrupt stored state', () => {
    const backing = memoryStorage();
    backing.setItem('gi:pwa', '{not json');
    const state = loadInstallState(createStorage(() => backing));
    expect(state.completions).toBe(0);
    expect(state.dismissCount).toBe(0);
  });

  it('never throws when localStorage is unavailable', () => {
    const boom = () => {
      throw new DOMException('SecurityError');
    };
    const broken = createStorage(
      () =>
        ({
          length: 0,
          clear: boom,
          getItem: boom,
          key: boom,
          removeItem: boom,
          setItem: boom,
        }) as Storage,
    );
    expect(() => recordCompletion(broken)).not.toThrow();
    expect(() => recordDismiss(broken, NOW)).not.toThrow();
    expect(() => recordInstalled(broken)).not.toThrow();
    expect(loadInstallState(broken).completions).toBe(0);
  });
});

describe('platform detection', () => {
  const IPHONE =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
  const IPAD_DESKTOP_MODE =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
  const ANDROID_CHROME =
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
  const IOS_CHROME =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0 Mobile/15E148 Safari/604.1';

  it('detects iOS Safari, where only manual add-to-home-screen works', () => {
    expect(detectPlatform(IPHONE, false, 0)).toBe('ios');
  });

  it('detects an iPad requesting the desktop site by its touch points', () => {
    expect(detectPlatform(IPAD_DESKTOP_MODE, true, 5)).toBe('ios');
    // The same UA on a real Mac is not iOS.
    expect(detectPlatform(IPAD_DESKTOP_MODE, true, 0)).toBe('native');
  });

  it('treats in-app iOS browsers that cannot add to home screen as none', () => {
    expect(detectPlatform(IOS_CHROME, false, 0)).toBe('none');
  });

  it('treats Android Chrome as a native-prompt platform', () => {
    expect(detectPlatform(ANDROID_CHROME, false, 0)).toBe('native');
  });
});

describe('isStandalone', () => {
  it('is true for a display-mode match', () => {
    expect(isStandalone(true, undefined)).toBe(true);
  });

  it('is true for the iOS navigator.standalone flag', () => {
    expect(isStandalone(false, true)).toBe(true);
  });

  it('is false in an ordinary browser tab', () => {
    expect(isStandalone(false, false)).toBe(false);
    expect(isStandalone(false, undefined)).toBe(false);
  });
});
