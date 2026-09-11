import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import { createTimer, type TimerSnapshot, type TimerEvent } from '@/engine/timer';
import { buildSchedule, type ModeConfig } from '@/engine/schedule';

export interface EngineApi {
  snap: TimerSnapshot;
  toggle(): void;
  reset(): void;
  skip(): void;
}

/**
 * Owns a Timer and re-renders on animation frames while it runs.
 * `onEvents` receives every boundary crossed since the last frame, including
 * ones missed while the tab was hidden or the phone slept.
 */
export function useEngine(
  config: ModeConfig,
  onEvents: (events: TimerEvent[], snap: TimerSnapshot) => void,
  onStatus: (status: TimerSnapshot['status'], prev: TimerSnapshot['status']) => void,
): EngineApi {
  const timerRef = useRef(createTimer(buildSchedule(config)));
  const [snap, setSnap] = useState<TimerSnapshot>(() => timerRef.current.snapshot());
  const eventsRef = useRef(onEvents);
  const statusRef = useRef(onStatus);
  eventsRef.current = onEvents;
  statusRef.current = onStatus;
  const lastStatus = useRef(snap.status);

  // rebuild when the config changes (only allowed while idle by the UI, but be safe)
  const key = JSON.stringify(config);
  useEffect(() => {
    timerRef.current = createTimer(buildSchedule(config));
    setSnap(timerRef.current.snapshot());
  }, [key]);

  const publish = useCallback((s: TimerSnapshot) => {
    setSnap(s);
    if (s.status !== lastStatus.current) {
      const prev = lastStatus.current;
      lastStatus.current = s.status;
      statusRef.current(s.status, prev);
    }
  }, []);

  const tick = useCallback(() => {
    const { snapshot, events } = timerRef.current.tick();
    if (events.length) eventsRef.current(events, snapshot);
    publish(snapshot);
  }, [publish]);

  // Drive rendering with rAF while running; a slow interval keeps the tab title
  // moving when rAF is paused in the background; visibilitychange catches up at once.
  useEffect(() => {
    if (snap.status !== 'running') return;
    let raf = 0;
    const loop = (): void => {
      tick();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const iv = window.setInterval(tick, 250);
    const onVis = (): void => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [snap.status, tick]);

  return {
    snap,
    toggle: () => {
      timerRef.current.toggle();
      publish(timerRef.current.snapshot());
    },
    reset: () => {
      timerRef.current.reset();
      publish(timerRef.current.snapshot());
    },
    skip: () => {
      timerRef.current.skip();
      tick();
    },
  };
}
