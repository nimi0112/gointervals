import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { ModeConfig, IntervalConfig, Segment } from '@/engine/schedule';
import { configSeconds, buildSchedule } from '@/engine/schedule';
import type { TimerEvent, TimerSnapshot } from '@/engine/timer';
import { formatClock, formatTitle, describeSeconds, formatDuration } from '@/engine/format';
import {
  builtinIntervalPresets,
  parsePresets,
  serialisePresets,
  newPresetId,
  type IntervalPreset,
} from '@/engine/presets';
import { storage, KEYS } from '@/platform/storage';
import { play, unlockAudio } from '@/platform/audio';
import { keepAwake, releaseAwake } from '@/platform/wakelock';
import { setTitle } from '@/platform/title';
import { bindKeys } from '@/platform/keyboard';
import { track } from '@/platform/analytics';
import { useEngine } from './useEngine';
import { Shell } from './parts/Shell';
import { Settings } from './parts/Settings';
import { PresetBar } from './parts/PresetBar';

interface Props {
  config: Exclude<ModeConfig, { mode: 'stopwatch' }>;
  /** when true, ignore any saved settings for this mode and use `config` as given (programmatic pages) */
  fixed?: boolean;
  /** show the preset bar (interval pages) */
  presets?: boolean;
}

interface HistoryItem {
  mode: string;
  seconds: number;
  at: number;
}

const PHASE_SOUND = {
  prep: 'rest',
  work: 'work',
  rest: 'rest',
  setrest: 'rest',
  focus: 'work',
  break: 'rest',
  longbreak: 'rest',
  countdown: 'work',
} as const;

function phaseText(s: TimerSnapshot): string | null {
  const seg = s.segment;
  if (!seg) return null;
  if (s.status === 'done') return 'Done';
  if (seg.phase === 'countdown')
    return s.status === 'idle' ? 'Ready' : s.status === 'paused' ? 'Paused' : 'Counting down';
  if (seg.phase === 'prep') return 'Get ready';
  const base = seg.label;
  const roundPart = seg.rounds > 1 ? ` ${seg.round}/${seg.rounds}` : '';
  const setPart = seg.sets > 1 ? ` · set ${seg.set}/${seg.sets}` : '';
  return `${base}${roundPart}${setPart}${s.status === 'paused' ? ' · paused' : ''}`;
}

function metaText(s: TimerSnapshot, segments: readonly Segment[]): string {
  if (s.status === 'done') return 'Finished. Reset to go again.';
  const left = formatDuration(Math.ceil(s.totalRemainingMs / 1000));
  if (s.segmentCount <= 1)
    return s.status === 'idle' ? 'Tap start when you are ready' : `${left} left`;
  const nextSeg = segments[s.segmentIndex + 1];
  const next = nextSeg
    ? `next ${nextSeg.label.toLowerCase()} ${formatDuration(nextSeg.ms / 1000)}`
    : 'last block';
  return `${left} total left · ${next}`;
}

export default function Timer({ config: initial, fixed = false, presets = false }: Props) {
  const mode = initial.mode;
  const [config, setConfigState] = useState<ModeConfig>(() => initial);
  const [saved, setSaved] = useState<IntervalPreset[]>([]);
  const [sessions, setSessions] = useState(0);
  const [announce, setAnnounce] = useState('');
  const doneRef = useRef(false);

  // load persisted settings after hydration (never on the server)
  useEffect(() => {
    if (!fixed) {
      const stored = storage.get<ModeConfig | null>(KEYS.settings(mode), null);
      if (stored && stored.mode === mode) setConfigState(stored);
    }
    if (presets) setSaved(parsePresets(storage.get<string | null>(KEYS.presets, null)));
    if (mode === 'pomodoro') setSessions(storage.get<number>(KEYS.pomodoroSessions, 0));
  }, [mode, fixed, presets]);

  const setConfig = useCallback(
    (c: ModeConfig) => {
      setConfigState(c);
      storage.set(KEYS.settings(mode), c);
    },
    [mode],
  );

  const onEvents = useCallback(
    (events: TimerEvent[], snap: TimerSnapshot) => {
      const segs = events.filter((e) => e.type === 'segment');
      const complete = events.some((e) => e.type === 'complete');
      const warn = events.filter((e) => e.type === 'warning');
      if (complete) {
        play('done');
        if (!doneRef.current) {
          doneRef.current = true;
          track('timer_complete', { mode, duration_seconds: Math.round(snap.totalMs / 1000) });
          const item: HistoryItem = {
            mode,
            seconds: Math.round(snap.totalMs / 1000),
            at: Date.now(),
          };
          const hist = storage.get<HistoryItem[]>(KEYS.history, []);
          storage.set(KEYS.history, [item, ...hist].slice(0, 50));
        }
        setAnnounce('Timer finished');
        return;
      }
      if (segs.length > 1) {
        // we slept through more than one boundary: one catch-up tone, then announce where we are
        play('catchup');
      } else if (segs.length === 1) {
        const e = segs[0]!;
        if (e.type === 'segment') play(PHASE_SOUND[e.segment.phase]);
      } else if (warn.length && snap.segment && snap.segment.ms > 5000) {
        play('warning');
      }
      if (segs.length) {
        const txt = phaseText(snap);
        if (txt) setAnnounce(`${txt}, ${describeSeconds(Math.ceil(snap.remainingMs / 1000))}`);
        // pomodoro: count a finished focus block
        if (mode === 'pomodoro') {
          const finishedFocus = segs.filter(
            (e) =>
              e.type === 'segment' &&
              e.index > 0 &&
              segsRef.current[e.index - 1]?.phase === 'focus',
          ).length;
          if (finishedFocus) {
            setSessions((n) => {
              const v = n + finishedFocus;
              storage.set(KEYS.pomodoroSessions, v);
              return v;
            });
          }
        }
      }
    },
    [mode],
  );

  const onStatus = useCallback(
    (status: TimerSnapshot['status'], prev: TimerSnapshot['status']) => {
      if (status === 'running') {
        keepAwake();
        track(prev === 'paused' ? 'timer_resume' : 'timer_start', {
          mode,
          duration_seconds: configSeconds(config),
          ...('rounds' in config ? { rounds: config.rounds } : {}),
        });
        if (prev === 'idle') {
          doneRef.current = false;
          setAnnounce('Started');
        }
      } else {
        releaseAwake();
        if (status === 'paused') {
          track('timer_pause', { mode });
          setAnnounce('Paused');
        }
        if (status === 'idle' && prev !== 'idle') {
          track('timer_reset', { mode });
          setAnnounce('Reset');
          setTitle(null);
        }
      }
    },
    [mode, config],
  );

  const engine = useEngine(config, onEvents, onStatus);
  const segsRef = useRef(buildSchedule(config));
  useEffect(() => {
    segsRef.current = buildSchedule(config);
  }, [config]);

  const { snap } = engine;
  const running = snap.status === 'running';
  const busy = snap.status !== 'idle';

  // tab title
  useEffect(() => {
    if (snap.status === 'running' || snap.status === 'paused') {
      const p = snap.segment?.phase;
      const label = p === 'countdown' || !p ? '' : ` ${snap.segment?.label ?? ''}`;
      setTitle(`${snap.status === 'paused' ? '⏸ ' : ''}${formatTitle(snap.remainingMs)}${label}`);
    } else if (snap.status === 'done') {
      setTitle('Done');
    }
  }, [snap.status, snap.remainingMs, snap.segment]);

  // keyboard
  useEffect(
    () =>
      bindKeys({
        toggle: () => {
          unlockAudio();
          if (snap.status !== 'done') engine.toggle();
        },
        reset: engine.reset,
        stop: () => {
          if (snap.status === 'running') engine.toggle();
        },
      }),
    [engine, snap.status],
  );

  useEffect(() => () => releaseAwake(), []);

  const primaryLabel =
    snap.status === 'idle'
      ? 'Start'
      : snap.status === 'running'
        ? 'Pause'
        : snap.status === 'paused'
          ? 'Resume'
          : 'Done';

  const loadPreset = (p: IntervalPreset): void => {
    setConfig(p.config);
    track('preset_loaded', { mode, preset: p.name });
  };
  const savePreset = (name: string): void => {
    if (config.mode !== 'interval') return;
    const next = [{ id: newPresetId(), name, config }, ...saved].slice(0, 30);
    setSaved(next);
    storage.set(KEYS.presets, serialisePresets(next));
    track('preset_saved', { mode, preset: name });
  };
  const deletePreset = (id: string): void => {
    const next = saved.filter((p) => p.id !== id);
    setSaved(next);
    storage.set(KEYS.presets, serialisePresets(next));
  };

  return (
    <Shell
      mode={mode}
      phase={phaseText(snap)}
      status={snap.status}
      digits={formatClock(snap.remainingMs)}
      progress={snap.status === 'idle' ? 0 : snap.progress}
      meta={metaText(snap, segsRef.current)}
      announce={announce}
      primaryLabel={primaryLabel}
      onPrimary={() => {
        if (snap.status === 'done') engine.reset();
        else engine.toggle();
      }}
      onReset={engine.reset}
      onSkip={snap.segmentCount > 1 ? engine.skip : undefined}
      extra={
        <div class="timer__below">
          {mode === 'pomodoro' && (
            <p class="timer__sessions mono">
              Focus sessions completed: {sessions}
              {sessions > 0 && (
                <button
                  type="button"
                  class="linkbtn"
                  onClick={() => {
                    setSessions(0);
                    storage.set(KEYS.pomodoroSessions, 0);
                  }}
                >
                  reset count
                </button>
              )}
            </p>
          )}
          {presets && config.mode === 'interval' && (
            <PresetBar
              builtin={builtinIntervalPresets}
              saved={saved}
              current={config as IntervalConfig}
              disabled={busy}
              onLoad={loadPreset}
              onSave={savePreset}
              onDelete={deletePreset}
            />
          )}
          <details class="timer__settings" open={!running}>
            <summary>Settings{busy ? ' (reset to edit)' : ''}</summary>
            <Settings config={config} onChange={setConfig} disabled={busy} />
          </details>
        </div>
      }
    />
  );
}
