import { useEffect, useRef, useState } from 'preact/hooks';
import { createStopwatch, type Lap } from '@/engine/stopwatch';
import { formatTenths, formatTitle } from '@/engine/format';
import { keepAwake, releaseAwake } from '@/platform/wakelock';
import { setTitle } from '@/platform/title';
import { bindKeys } from '@/platform/keyboard';
import { track } from '@/platform/analytics';
import { unlockAudio, play } from '@/platform/audio';
import { Shell } from './parts/Shell';
import { LapList } from './parts/LapList';

export default function Stopwatch() {
  const sw = useRef(createStopwatch());
  const [status, setStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    if (status !== 'running') return;
    let raf = 0;
    const loop = (): void => {
      setElapsed(sw.current.elapsedMs());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const iv = window.setInterval(() => setElapsed(sw.current.elapsedMs()), 250);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
    };
  }, [status]);

  useEffect(() => {
    if (status === 'idle') setTitle(null);
    else setTitle(`${status === 'paused' ? '⏸ ' : ''}${formatTitle(elapsed)}`);
  }, [status, Math.floor(elapsed / 1000)]);

  const sync = (): void => {
    const s = sw.current.status();
    setStatus(s);
    setElapsed(sw.current.elapsedMs());
    if (s === 'running') keepAwake();
    else releaseAwake();
  };

  const toggle = (): void => {
    unlockAudio();
    const before = sw.current.status();
    sw.current.toggle();
    sync();
    track(
      before === 'idle' ? 'timer_start' : before === 'running' ? 'timer_pause' : 'timer_resume',
      { mode: 'stopwatch' },
    );
    setAnnounce(before === 'running' ? 'Paused' : before === 'idle' ? 'Started' : 'Resumed');
  };
  const reset = (): void => {
    if (sw.current.status() === 'idle') return;
    sw.current.reset();
    setLaps([]);
    sync();
    track('timer_reset', { mode: 'stopwatch' });
    setAnnounce('Reset');
  };
  const lap = (): void => {
    const l = sw.current.lap();
    if (!l) return;
    setLaps(sw.current.laps());
    play('warning');
    setAnnounce(`Lap ${l.n}, ${formatTenths(l.splitMs)}`);
  };

  useEffect(() =>
    bindKeys({
      toggle,
      reset,
      lap,
      stop: () => {
        if (sw.current.status() === 'running') toggle();
      },
    }),
  );
  useEffect(() => () => releaseAwake(), []);

  return (
    <Shell
      mode="stopwatch"
      phase={status === 'idle' ? 'Ready' : status === 'running' ? 'Running' : 'Paused'}
      status={status}
      digits={formatTenths(elapsed)}
      progress={0}
      meta={laps.length ? `${laps.length} lap${laps.length === 1 ? '' : 's'}` : 'L for lap'}
      announce={announce}
      primaryLabel={status === 'idle' ? 'Start' : status === 'running' ? 'Pause' : 'Resume'}
      onPrimary={toggle}
      onReset={reset}
      onSecondary={{ label: 'Lap', action: lap, disabled: status === 'idle' }}
      extra={
        <LapList laps={laps} fastest={sw.current.fastestLap()} slowest={sw.current.slowestLap()} />
      }
    />
  );
}
