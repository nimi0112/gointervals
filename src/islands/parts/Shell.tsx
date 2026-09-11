import type { ComponentChildren } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { enterFullscreen, exitFullscreen, isFullscreen } from '@/platform/fullscreen';
import { isMuted, setMuted, unlockAudio, play } from '@/platform/audio';
import { track } from '@/platform/analytics';

export interface ShellProps {
  mode: string;
  phase: string | null;
  /** 'idle' | 'running' | 'paused' | 'done' */
  status: string;
  digits: string;
  /** 0..1 */
  progress: number;
  /** text under the digits: "Round 2 of 8 · 4:10 left" */
  meta?: string | undefined;
  /** live region text; only changes on phase changes */
  announce: string;
  primaryLabel: string;
  onPrimary(): void;
  onReset(): void;
  onSecondary?: { label: string; action(): void; disabled?: boolean | undefined } | undefined;
  onSkip?: (() => void) | undefined;
  children?: ComponentChildren | undefined;
  /** below-the-controls content that is hidden in fullscreen */
  extra?: ComponentChildren | undefined;
}

export function Shell(p: ShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());
    const onFs = (): void => {
      if (!isFullscreen()) setFull(false);
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // Esc leaves CSS fullscreen (native fullscreen already handles Esc)
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') leave();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [full]);

  const enter = async (): Promise<void> => {
    unlockAudio();
    setFull(true);
    track('fullscreen_enter', { mode: p.mode });
    if (rootRef.current) await enterFullscreen(rootRef.current);
  };
  const leave = (): void => {
    setFull(false);
    void exitFullscreen();
  };

  const toggleMute = (): void => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    track('mute_toggle', { mode: p.mode, muted: next });
    if (!next) {
      unlockAudio();
      play('warning');
    }
  };

  const running = p.status === 'running';

  return (
    <div
      ref={rootRef}
      class={`timer${full ? ' is-fullscreen' : ''}`}
      data-status={p.status}
      data-phase={p.phase ?? ''}
      onClick={(e) => {
        // tap the empty background in fullscreen to leave
        if (full && e.target === e.currentTarget) leave();
      }}
    >
      <div class="timer__stage">
        <p class="timer__phase" aria-hidden="true">
          {p.phase ?? ' '}
        </p>
        <p class="sr-only" aria-live="polite" aria-atomic="true">
          {p.announce}
        </p>
        <div
          class={`timer__digits${p.digits.length > 7 ? ' timer__digits--xlong' : p.digits.length > 5 ? ' timer__digits--long' : ''}`}
          role="timer"
          aria-label={p.digits}
          onClick={() => {
            if (full) p.onPrimary();
          }}
        >
          {(() => {
            const groups = p.digits.split(':');
            const units = groups.length === 3 ? ['hr', 'min', 'sec'] : ['min', 'sec'];
            return groups.map((g, i) => (
              <>
                {i > 0 && (
                  <span class="timer__sep" aria-hidden="true">
                    :
                  </span>
                )}
                <span class="timer__group" data-unit={units[i]}>
                  {g}
                </span>
              </>
            ));
          })()}
        </div>
        <div class="timer__bar" aria-hidden="true">
          <div
            class="timer__bar-fill"
            style={{ transform: `scaleX(${Math.min(1, Math.max(0, p.progress))})` }}
          />
        </div>
        <p class="timer__meta mono">{p.meta ?? ' '}</p>
      </div>

      <div class="timer__controls">
        <button
          type="button"
          class={`btn btn--primary timer__primary${running ? ' is-running' : ''}`}
          onClick={() => {
            unlockAudio();
            p.onPrimary();
          }}
        >
          {p.primaryLabel}
        </button>
        <div class="timer__row">
          {p.onSecondary && (
            <button
              type="button"
              class="btn"
              disabled={p.onSecondary.disabled}
              onClick={p.onSecondary.action}
            >
              {p.onSecondary.label}
            </button>
          )}
          {p.onSkip && (
            <button
              type="button"
              class="btn"
              disabled={p.status === 'idle' || p.status === 'done'}
              onClick={p.onSkip}
            >
              Skip
            </button>
          )}
          <button type="button" class="btn" disabled={p.status === 'idle'} onClick={p.onReset}>
            Reset
          </button>
        </div>
      </div>

      <div class="timer__tools">
        <button
          type="button"
          class="tool"
          aria-pressed={muted}
          onClick={toggleMute}
          title={muted ? 'Unmute' : 'Mute'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            {muted ? (
              <path d="M17 9l4 6M21 9l-4 6" />
            ) : (
              <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
            )}
          </svg>
          <span>{muted ? 'Muted' : 'Sound'}</span>
        </button>
        <button
          type="button"
          class="tool"
          onClick={full ? leave : enter}
          title={full ? 'Exit fullscreen' : 'Fullscreen'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            {full ? (
              <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" />
            ) : (
              <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />
            )}
          </svg>
          <span>{full ? 'Exit' : 'Fullscreen'}</span>
        </button>
        <p class="timer__kbd">
          <kbd>Space</kbd> start/pause <kbd>R</kbd> reset{' '}
          {p.onSecondary && (
            <>
              <kbd>L</kbd> lap{' '}
            </>
          )}
          <kbd>Esc</kbd> stop
        </p>
      </div>

      {p.children}
      {!full && p.extra}
    </div>
  );
}
