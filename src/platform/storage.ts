/**
 * The only place that touches localStorage. Everything is namespaced under `gi:`
 * and every call is wrapped so private mode, quota errors and SSR never throw.
 */
const PREFIX = 'gi:';

export interface AppStorage {
  get<T>(key: string, fallback: T): T;
  set(key: string, value: unknown): void;
  remove(key: string): void;
  clearAll(): void;
  available(): boolean;
}

export function createStorage(getBacking: () => Storage): AppStorage {
  const backing = (): Storage | null => {
    try {
      return getBacking();
    } catch {
      return null;
    }
  };
  return {
    get(key, fallback) {
      try {
        const raw = backing()?.getItem(PREFIX + key);
        if (raw == null) return fallback;
        return JSON.parse(raw) as typeof fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        backing()?.setItem(PREFIX + key, JSON.stringify(value));
      } catch {
        /* quota or private mode: silently ignore */
      }
    },
    remove(key) {
      try {
        backing()?.removeItem(PREFIX + key);
      } catch {
        /* ignore */
      }
    },
    clearAll() {
      try {
        const b = backing();
        if (!b) return;
        const keys: string[] = [];
        for (let i = 0; i < b.length; i++) {
          const k = b.key(i);
          if (k && k.startsWith(PREFIX)) keys.push(k);
        }
        keys.forEach((k) => b.removeItem(k));
      } catch {
        /* ignore */
      }
    },
    available() {
      try {
        const b = backing();
        if (!b) return false;
        const probe = PREFIX + '__probe';
        b.setItem(probe, '1');
        b.removeItem(probe);
        return true;
      } catch {
        return false;
      }
    },
  };
}

export const storage: AppStorage = createStorage(() => window.localStorage);

export const KEYS = {
  settings: (mode: string) => `settings:${mode}`,
  presets: 'presets:interval',
  history: 'history',
  pomodoroSessions: 'pomodoro:sessions',
  muted: 'muted',
  vibrate: 'vibrate',
} as const;
