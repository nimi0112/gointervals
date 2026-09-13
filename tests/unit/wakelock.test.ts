import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type * as WakelockTypes from '@/platform/wakelock';

/**
 * The wake lock module keeps module-level state, so every test imports a fresh
 * copy after stubbing the globals it touches.
 */

interface FakeSentinel {
  released: boolean;
  release(): Promise<void>;
  addEventListener(type: 'release', fn: () => void): void;
}

interface Harness {
  /** sentinels handed out by navigator.wakeLock.request, in order */
  sentinels: FakeSentinel[];
  /** resolve a pending request(); index matches the call order */
  settle(i: number): Promise<void>;
  visible(state: 'visible' | 'hidden'): void;
  listeners: Array<() => void>;
  live(): number;
}

function harness(opts: { native: boolean; deferred?: boolean }): Harness {
  const sentinels: FakeSentinel[] = [];
  const pending: Array<() => void> = [];
  const listeners: Array<() => void> = [];
  let visibility: 'visible' | 'hidden' = 'visible';

  const doc = {
    get visibilityState() {
      return visibility;
    },
    addEventListener: (type: string, fn: () => void) => {
      if (type === 'visibilitychange') listeners.push(fn);
    },
    removeEventListener: (type: string, fn: () => void) => {
      if (type !== 'visibilitychange') return;
      const i = listeners.indexOf(fn);
      if (i >= 0) listeners.splice(i, 1);
    },
    createElement: () => makeVideo(),
    body: { appendChild: () => undefined },
  };

  function makeVideo(): Record<string, unknown> {
    return {
      setAttribute: () => undefined,
      appendChild: () => undefined,
      style: { cssText: '' },
      muted: false,
      loop: false,
      play: () => Promise.resolve(),
      pause: () => undefined,
      remove: () => undefined,
    };
  }

  const navigatorStub: Record<string, unknown> = {};
  if (opts.native) {
    navigatorStub.wakeLock = {
      request: () => {
        const s: FakeSentinel = {
          released: false,
          release() {
            this.released = true;
            return Promise.resolve();
          },
          addEventListener: () => undefined,
        };
        sentinels.push(s);
        if (!opts.deferred) return Promise.resolve(s);
        return new Promise<FakeSentinel>((res) => pending.push(() => res(s)));
      },
    };
  }

  vi.stubGlobal('document', doc);
  vi.stubGlobal('navigator', navigatorStub);

  return {
    sentinels,
    async settle(i: number) {
      pending[i]?.();
      await Promise.resolve();
      await Promise.resolve();
    },
    visible(state) {
      visibility = state;
      for (const fn of [...listeners]) fn();
    },
    listeners,
    live: () => sentinels.filter((s) => !s.released).length,
  };
}

async function freshModule(): Promise<typeof WakelockTypes> {
  vi.resetModules();
  return import('@/platform/wakelock');
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('wakelock', () => {
  let h: Harness;

  describe('native path', () => {
    beforeEach(() => {
      h = harness({ native: true });
    });

    it('holds a lock while wanted and drops it on release', async () => {
      const { keepAwake, releaseAwake } = await freshModule();
      keepAwake();
      await Promise.resolve();
      expect(h.live()).toBe(1);
      releaseAwake();
      await Promise.resolve();
      expect(h.live()).toBe(0);
    });

    it('re-acquires when the tab comes back while still wanted', async () => {
      const { keepAwake } = await freshModule();
      keepAwake();
      await Promise.resolve();
      h.sentinels[0]!.released = true; // the OS drops it while hidden
      h.visible('hidden');
      h.visible('visible');
      await Promise.resolve();
      expect(h.live()).toBe(1);
    });

    it('does not re-acquire after release', async () => {
      const { keepAwake, releaseAwake } = await freshModule();
      keepAwake();
      await Promise.resolve();
      releaseAwake();
      h.visible('hidden');
      h.visible('visible');
      await Promise.resolve();
      expect(h.live()).toBe(0);
    });
  });

  /**
   * The reported bug: a timer that finishes while the tab is hidden only learns it
   * is done on visibilitychange, and the wake lock module re-acquires on that same
   * event. The release that follows must win, even though the request it races is
   * still in flight.
   */
  describe('release racing an in-flight request', () => {
    beforeEach(() => {
      h = harness({ native: true, deferred: true });
    });

    it('leaves no live lock when release lands before the request resolves', async () => {
      const { keepAwake, releaseAwake } = await freshModule();
      keepAwake();
      await h.settle(0);
      expect(h.live()).toBe(1);

      // hidden: the OS released the sentinel behind our back
      h.sentinels[0]!.released = true;
      h.visible('hidden');

      // back to visible: wakelock re-acquires first, the engine then ticks to
      // 'done' and releases while that request is still pending
      h.visible('visible');
      releaseAwake();
      await h.settle(1);

      expect(h.live()).toBe(0);
    });
  });

  describe('fallback path', () => {
    beforeEach(() => {
      h = harness({ native: false });
    });

    it('stops listening once nothing wants the screen on', async () => {
      const { keepAwake, releaseAwake } = await freshModule();
      keepAwake();
      expect(h.listeners.length).toBe(1);
      releaseAwake();
      expect(h.listeners.length).toBe(0);
    });
  });
});
