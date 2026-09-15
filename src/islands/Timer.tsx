import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { ModeConfig } from '@/engine/schedule';
import { buildSchedule, configSeconds } from '@/engine/schedule';
import type { TimerEvent, TimerSnapshot } from '@/engine/timer';
import { formatTitle, describeSeconds } from '@/engine/format';
import { coerceStored } from '@/engine/validate';
import { storage, KEYS } from '@/platform/storage';
import { recordCompletion } from '@/platform/install';
import { play, unlockAudio, audioAvailable, isMuted, setMuted } from '@/platform/audio';
import { keepAwake, releaseAwake } from '@/platform/wakelock';
import { setTitle } from '@/platform/title';
import { bindKeys } from '@/platform/keyboard';
import { track, type EventParams } from '@/platform/analytics';
import { useEngine } from './useEngine';
import { screenCopy } from './copy';
import { draftFrom, resolveDraft, stepField, FIELDS, type Draft } from './fields';
import { Icon } from './parts/Icon';
import { Settings } from './parts/Settings';
import { Progress } from './parts/Progress';
import { ShellNav } from './parts/ShellNav';
import { InstallPrompt } from './parts/InstallPrompt';

interface Props {
  config: ModeConfig;
  /** programmatic pages: use `config` as given and do not read or write saved settings */
  fixed?: boolean;
}

interface HistoryItem {
  mode: string;
  seconds: number;
  at: number;
}

type ConfirmKind = 'stop' | 'reset' | 'leave';
interface Confirm {
  kind: ConfirmKind;
  href?: string;
  wasRunning: boolean;
  returnTo: HTMLElement | null;
}

const PHASE_SOUND = {
  prep: 'rest',
  work: 'work',
  rest: 'rest',
  setrest: 'rest',
  focus: 'work',
  break: 'rest',
  longbreak: 'rest',
  sit: 'bell',
} as const;

declare global {
  interface Window {
    __giSessionActive?: boolean;
  }
}

/** Configured values for analytics, in the units the fields use. */
function paramsOf(cfg: ModeConfig): EventParams {
  const base: EventParams = { mode: cfg.mode, total_seconds: configSeconds(cfg) };
  switch (cfg.mode) {
    case 'interval':
    case 'tabata':
      return { ...base, work: cfg.work, rest: cfg.rest, rounds: cfg.rounds };
    case 'emom':
      return { ...base, interval: cfg.interval, minutes: cfg.minutes };
    case 'pomodoro':
      return {
        ...base,
        focus: cfg.focus,
        short_break: cfg.shortBreak,
        long_break: cfg.longBreak,
        sessions: cfg.sessions,
      };
    case 'meditation':
      return {
        ...base,
        minutes: Math.round(cfg.total / 60),
        bell: Math.round(cfg.bell / 60),
        interval_bell: cfg.intervalBell,
        start_bell: cfg.startBell,
        end_bell: cfg.endBell,
      };
  }
}

export default function Timer({ config: initial, fixed = false }: Props) {
  const mode = initial.mode;
  const [config, setConfigState] = useState<ModeConfig>(() => initial);
  const [draft, setDraft] = useState<Draft>(() => draftFrom(initial));
  const [errors, setErrors] = useState<Draft>({});
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [muted, setMutedState] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');
  const [completions, setCompletions] = useState(0);
  const doneRef = useRef(false);
  const silentPause = useRef(false);
  const wakeReported = useRef(false);
  const keepRef = useRef<HTMLButtonElement>(null);
  const configRef = useRef(config);
  configRef.current = config;

  // load persisted settings after hydration (never on the server)
  useEffect(() => {
    setMutedState(isMuted());
    if (!audioAvailable()) setAudioBlocked(true);
    if (fixed) return;
    const raw = storage.get<unknown>(KEYS.settings(mode), null);
    if (raw === null) return;
    const stored = coerceStored(mode, raw);
    if (stored) {
      setConfigState(stored);
      setDraft(draftFrom(stored));
    } else {
      storage.remove(KEYS.settings(mode));
      setNotice('Saved settings were reset to the defaults.');
    }
  }, [mode, fixed]);

  const commit = useCallback(
    (c: ModeConfig) => {
      setConfigState(c);
      setErrors({});
      if (!fixed) storage.set(KEYS.settings(mode), c);
    },
    [mode, fixed],
  );

  const onText = (key: string, text: string): void => {
    const next = { ...draft, [key]: text };
    setDraft(next);
    const r = resolveDraft(config, next);
    if (r.ok) commit(r.config);
    else setErrors(r.errors);
  };
  const onStep = (key: string, delta: 1 | -1): void =>
    onText(key, stepField(config, draft, key, delta));
  const onToggle = (key: 'intervalBell' | 'startBell' | 'endBell'): void => {
    if (config.mode !== 'meditation') return;
    const next = { ...config, [key]: !config[key] };
    commit(next);
    if (key === 'intervalBell') setDraft(draftFrom(next));
  };

  const unlock = (): void => {
    void unlockAudio().then((ok) => {
      setAudioBlocked(!ok);
      if (!ok) track('audio_unavailable', { mode });
    });
  };
  const onPreview = (): void => {
    unlock();
    play('bell');
  };

  const onEvents = useCallback(
    (events: TimerEvent[], snap: TimerSnapshot) => {
      const cfg = configRef.current;
      const segs = events.filter((e) => e.type === 'segment');
      const complete = events.some((e) => e.type === 'complete');
      const warn = events.filter((e) => e.type === 'warning');
      const med = cfg.mode === 'meditation';
      if (complete) {
        if (med) {
          if (cfg.endBell) play('bell');
        } else {
          play('done');
        }
        if (!doneRef.current) {
          doneRef.current = true;
          track('timer_complete', paramsOf(cfg));
          setCompletions(recordCompletion(storage).completions);
          const item: HistoryItem = {
            mode,
            seconds: Math.round(snap.totalMs / 1000),
            at: Date.now(),
          };
          const hist = storage.get<HistoryItem[]>(KEYS.history, []);
          storage.set(KEYS.history, [item, ...hist].slice(0, 50));
        }
        setAnnounce(med ? 'Session complete' : 'Timer finished');
        return;
      }
      if (segs.length > 1) {
        // we slept through more than one boundary: one catch-up tone, never a burst
        play(med ? 'bell' : 'catchup');
      } else if (segs.length === 1) {
        const e = segs[0]!;
        if (e.type === 'segment') play(PHASE_SOUND[e.segment.phase]);
      } else if (!med && warn.length && snap.segment && snap.segment.ms > 5000) {
        play('warning');
      }
      if (segs.length) {
        const c = screenCopy(cfg, snap, segsRef.current, { muted: false });
        const remaining = med ? snap.totalRemainingMs : snap.remainingMs;
        setAnnounce(`${c.phase.text}, ${describeSeconds(Math.ceil(remaining / 1000))}`);
      }
    },
    [mode],
  );

  const onStatus = useCallback(
    (status: TimerSnapshot['status'], prev: TimerSnapshot['status']) => {
      const cfg = configRef.current;
      if (status === 'running') {
        keepAwake();
        if (
          !wakeReported.current &&
          typeof navigator !== 'undefined' &&
          !('wakeLock' in navigator)
        ) {
          wakeReported.current = true;
          track('wakelock_failed', { mode, reason: 'unsupported' });
        }
        if (prev === 'paused') {
          if (!silentPause.current) track('timer_resume', paramsOf(cfg));
          silentPause.current = false;
        } else {
          track('timer_start', paramsOf(cfg));
        }
        if (prev === 'idle') {
          doneRef.current = false;
          setAnnounce('Started');
          if (cfg.mode === 'meditation' && cfg.startBell) play('bell');
        }
      } else {
        releaseAwake();
        if (status === 'paused') {
          if (!silentPause.current) {
            track('timer_pause', { mode });
            setAnnounce('Paused');
          }
        }
        if (status === 'idle' && prev !== 'idle') setTitle(null);
      }
    },
    [mode],
  );

  const engine = useEngine(config, onEvents, onStatus);
  const segsRef = useRef(buildSchedule(config));
  useEffect(() => {
    segsRef.current = buildSchedule(config);
  }, [config]);

  const { snap } = engine;
  const status = snap.status;
  const idle = status === 'idle';
  const active = status === 'running' || status === 'paused';
  const copy = screenCopy(config, snap, segsRef.current, { muted: muted || audioBlocked });

  // tab title
  useEffect(() => {
    if (active) {
      const remaining = mode === 'meditation' ? snap.totalRemainingMs : snap.remainingMs;
      setTitle(`${status === 'paused' ? '⏸ ' : ''}${formatTitle(remaining)} ${copy.phase.text}`);
    } else if (status === 'done') {
      setTitle('Done');
    }
  }, [status, snap.remainingMs, snap.totalRemainingMs, copy.phase.text, active, mode]);

  // the service worker must not activate an update under a running session
  useEffect(() => {
    window.__giSessionActive = active;
    if (!active) window.dispatchEvent(new CustomEvent('gi:session-idle'));
  }, [active]);

  useEffect(() => () => releaseAwake(), []);

  // confirmations
  const openConfirm = (kind: ConfirmKind, href?: string): void => {
    if (!active) return;
    const wasRunning = status === 'running';
    if (wasRunning) {
      silentPause.current = true;
      engine.toggle();
    }
    const returnTo = document.activeElement as HTMLElement | null;
    setConfirm({ kind, wasRunning, returnTo, ...(href ? { href } : {}) });
    if (kind === 'leave') track('nav_away_during_session', { mode, href: href ?? '' });
    setAnnounce(
      kind === 'reset'
        ? 'Reset timer? This clears your progress.'
        : 'Stop session? Your timer is paused.',
    );
  };
  const keepGoing = (): void => {
    if (!confirm) return;
    const c = confirm;
    setConfirm(null);
    if (c.wasRunning) {
      silentPause.current = true;
      engine.toggle();
    }
    setAnnounce('Continuing');
    requestAnimationFrame(() => c.returnTo?.focus());
  };
  const confirmAction = (): void => {
    if (!confirm) return;
    const c = confirm;
    setConfirm(null);
    silentPause.current = false;
    engine.reset();
    track(c.kind === 'reset' ? 'timer_reset_confirmed' : 'timer_stop_confirmed', {
      mode,
      reason: c.kind,
    });
    setAnnounce(c.kind === 'reset' ? 'Timer reset' : 'Session stopped');
    if (c.kind === 'leave' && c.href) window.location.assign(c.href);
  };
  useEffect(() => {
    if (confirm) keepRef.current?.focus();
  }, [confirm]);

  const hasErrors = Object.keys(errors).length > 0;
  const focusFirstInvalid = (): void => {
    const first = FIELDS[mode].find((f) => errors[f.key]);
    if (first) {
      document.getElementById(`f-${first.key}`)?.focus();
      track('invalid_input', { mode, field: first.key, reason: errors[first.key] ?? '' });
    }
  };

  const start = (): void => {
    if (hasErrors) {
      focusFirstInvalid();
      return;
    }
    unlock();
    engine.toggle();
  };
  const primary = (): void => {
    if (confirm) {
      keepGoing();
      return;
    }
    switch (status) {
      case 'idle':
        start();
        break;
      case 'running':
        engine.toggle();
        break;
      case 'paused':
        unlock();
        engine.toggle();
        break;
      case 'done':
        unlock();
        engine.reset();
        engine.toggle();
        track('timer_run_again', paramsOf(config));
        break;
    }
  };
  const secondary = (): void => {
    if (confirm) {
      confirmAction();
      return;
    }
    if (active) openConfirm('stop');
    else if (status === 'done') {
      engine.reset();
      track('timer_change_settings', { mode });
      setAnnounce('Back to settings');
    }
  };

  // keyboard
  useEffect(() =>
    bindKeys({
      toggle: () => {
        if (confirm || status === 'done') return;
        primary();
      },
      reset: () => {
        if (confirm) return;
        if (active) openConfirm('reset');
        else if (status === 'done') {
          engine.reset();
          track('timer_change_settings', { mode });
        } else {
          // setup: restore the preview to the last valid settings
          setDraft(draftFrom(config));
          setErrors({});
        }
      },
      escape: () => {
        if (confirm) keepGoing();
        else if (active) openConfirm('stop');
      },
    }),
  );

  const toggleSound = (): void => {
    if (audioBlocked) {
      unlock();
      return;
    }
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    track('audio_toggle', { mode, muted: next });
    if (!next) {
      unlock();
      if (mode !== 'meditation') play('warning');
    }
  };

  const onNavigate = (href: string): boolean => {
    if (!active && !confirm) return true;
    if (!confirm) openConfirm('leave', href);
    return false;
  };

  const stopLabel = mode === 'interval' || mode === 'meditation' ? 'End session' : 'Stop';
  let primaryLabel: string;
  let primaryIcon: 'play' | 'pause' | 'rotate-ccw';
  let secondaryLabel: string | null = null;
  if (confirm) {
    primaryLabel = 'Keep going';
    primaryIcon = 'play';
    secondaryLabel = confirm.kind === 'reset' ? 'Reset timer' : 'Stop session';
  } else if (status === 'idle') {
    primaryLabel = hasErrors ? 'Start · unavailable' : 'Start';
    primaryIcon = 'play';
  } else if (status === 'running') {
    primaryLabel = 'Pause';
    primaryIcon = 'pause';
    secondaryLabel = stopLabel;
  } else if (status === 'paused') {
    primaryLabel = 'Resume';
    primaryIcon = 'play';
    secondaryLabel = stopLabel;
  } else {
    primaryLabel = 'Run again';
    primaryIcon = 'rotate-ccw';
    secondaryLabel = 'Change settings';
  }

  const phase = confirm
    ? { icon: copy.phase.icon, text: confirm.kind === 'reset' ? 'Reset timer?' : 'Stop session?' }
    : copy.phase;
  const context = confirm
    ? confirm.kind === 'reset'
      ? 'This clears your progress.'
      : 'Your timer is paused.'
    : copy.context;
  const firstError = FIELDS[mode].map((f) => errors[f.key]).find(Boolean);
  const footer = audioBlocked ? 'Sound blocked. Tap On to retry.' : (notice ?? copy.footer);
  const ratio = snap.totalMs > 0 ? snap.totalElapsedMs / snap.totalMs : 0;
  const groups = copy.digits.split(':');

  return (
    <div
      class="timer"
      data-status={status}
      data-mode={mode}
      data-confirm={confirm?.kind ?? undefined}
    >
      <div class="timer__stage">
        <div class="timer__digits" role="timer" aria-label={`${copy.digits} remaining`}>
          {groups.map((g, i) => (
            <>
              {i > 0 && (
                <span class="timer__sep" aria-hidden="true">
                  :
                </span>
              )}
              <span>{g}</span>
            </>
          ))}
        </div>
        <p class="timer__phase">
          <Icon name={phase.icon} size={22} />
          <span>{phase.text}</span>
        </p>
        <p class="timer__context">{context}</p>
        <p class="sr-only" aria-live="polite" aria-atomic="true">
          {announce}
        </p>
      </div>

      <div class="timer__body">
        {idle && !confirm ? (
          <>
            <Settings
              config={config}
              draft={draft}
              errors={errors}
              disabled={false}
              onText={onText}
              onStep={onStep}
              onToggle={onToggle}
              onPreview={onPreview}
            />
            <p class="timer__summary" aria-live="polite">
              {firstError ?? copy.summary}
            </p>
          </>
        ) : (
          <Progress ratio={status === 'done' ? 1 : ratio} left={copy.next} right={copy.left} />
        )}
      </div>

      <div class="timer__quiet">
        {!confirm && copy.guidance && <p class="timer__guidance">{copy.guidance}</p>}
        {status === 'done' && <InstallPrompt mode={mode} completions={completions} />}
      </div>

      <div class="timer__controls">
        <p class="timer__hints" aria-hidden="true">
          <span>
            <kbd>Space</kbd> start / pause
          </span>
          <span>
            <kbd>Esc</kbd> stop
          </span>
          <span>
            <kbd>R</kbd> reset
          </span>
        </p>
        <button
          ref={keepRef}
          type="button"
          class="btn btn--primary timer__primary"
          disabled={!confirm && idle && hasErrors}
          onClick={primary}
        >
          <Icon name={primaryIcon} size={24} />
          <span>{primaryLabel}</span>
        </button>
        {secondaryLabel && (
          <button type="button" class="btn btn--quiet timer__secondary" onClick={secondary}>
            {secondaryLabel}
          </button>
        )}
      </div>

      <ShellNav
        muted={muted}
        audioBlocked={audioBlocked}
        footer={footer}
        onToggleSound={toggleSound}
        onNavigate={onNavigate}
      />
    </div>
  );
}
