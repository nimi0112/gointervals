/**
 * Beeps from oscillators, no audio files. The AudioContext is created lazily and
 * resumed on the first user gesture, which iOS requires.
 */
import { storage, KEYS } from './storage';

export type Sound = 'work' | 'rest' | 'warning' | 'done' | 'catchup' | 'bell';

let ctx: AudioContext | null = null;
let muted = storage.get<boolean>(KEYS.muted, false);
let vibrateOn = storage.get<boolean>(KEYS.vibrate, true);

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

/** True when this browser has Web Audio at all. Does not create a context (that needs a gesture). */
export function audioAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'AudioContext' in window ||
    'webkitAudioContext' in (window as unknown as Record<string, unknown>)
  );
}

/**
 * Call from any pointer/keyboard handler. Safe to call repeatedly. Resolves true when the
 * context is running afterwards, false when audio is missing or the browser refused to
 * resume it; the caller shows a quiet notice and the timer carries on.
 */
export async function unlockAudio(): Promise<boolean> {
  const c = getCtx();
  if (!c) return false;
  try {
    if (c.state !== 'running') await c.resume();
    // iOS also wants an actual (silent) buffer played once.
    const buf = c.createBuffer(1, 1, 22050);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start(0);
  } catch {
    /* fall through to the state check */
  }
  return c.state === 'running';
}

function tone(
  freq: number,
  at: number,
  dur: number,
  gain = 0.25,
  type: OscillatorType = 'sine',
): void {
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, at);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g).connect(c.destination);
  o.start(at);
  o.stop(at + dur + 0.02);
}

const PATTERNS: Record<Sound, (t: number) => void> = {
  // rising pair: go
  work: (t) => {
    tone(660, t, 0.12);
    tone(880, t + 0.14, 0.18);
  },
  // falling pair: ease off
  rest: (t) => {
    tone(660, t, 0.12);
    tone(440, t + 0.14, 0.18);
  },
  // short tick
  warning: (t) => tone(1000, t, 0.08, 0.18, 'square'),
  // three-note finish
  done: (t) => {
    tone(660, t, 0.12);
    tone(880, t + 0.15, 0.12);
    tone(1320, t + 0.3, 0.4);
  },
  // single longer note when we had to catch up after a sleep
  catchup: (t) => tone(880, t, 0.35),
  // one soft bell: fundamental plus a quiet octave, long decay. Used for every meditation event.
  bell: (t) => {
    tone(528, t, 2.2, 0.28);
    tone(1056, t, 1.4, 0.06);
  },
};

const VIBE: Record<Sound, number[]> = {
  work: [80, 40, 120],
  rest: [120],
  warning: [30],
  done: [100, 50, 100, 50, 200],
  catchup: [200],
  bell: [180],
};

export function play(sound: Sound): void {
  if (vibrateOn && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(VIBE[sound]);
    } catch {
      /* ignore */
    }
  }
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  if (c.state === 'suspended') void c.resume();
  PATTERNS[sound](c.currentTime + 0.01);
}

export function isMuted(): boolean {
  return muted;
}
export function setMuted(v: boolean): void {
  muted = v;
  storage.set(KEYS.muted, v);
}
export function isVibrate(): boolean {
  return vibrateOn;
}
export function setVibrate(v: boolean): void {
  vibrateOn = v;
  storage.set(KEYS.vibrate, v);
}
