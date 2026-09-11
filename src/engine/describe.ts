import type { ModeConfig } from './schedule';
import { configSeconds } from './schedule';
import { formatDuration } from './format';

const d = (seconds: number): string => formatDuration(seconds);
const plural = (n: number, w: string): string => `${n} ${w}${n === 1 ? '' : 's'}`;

/** One or two sentences a person would say out loud: "Beep every 10 sec for 5 min." */
export function describeConfig(cfg: ModeConfig): string {
  const total = configSeconds(cfg);
  switch (cfg.mode) {
    case 'countdown':
      return `Counts down ${d(cfg.seconds)}, then beeps.`;
    case 'stopwatch':
      return 'Counts up until you stop it.';
    case 'meditation': {
      const n = Math.max(1, Math.floor(cfg.total / Math.max(1, cfg.bell)));
      const body =
        n === 1
          ? `One bell after ${d(cfg.total)}.`
          : `A bell every ${d(cfg.bell)} for ${d(cfg.bell * n)}, ${n} bells in all.`;
      return body + (cfg.prep > 0 ? ` Starts with ${d(cfg.prep)} to settle in.` : '');
    }
    case 'emom':
      return `Beep every ${d(cfg.interval)} for ${d(cfg.minutes * 60)}.${prep(cfg.prep)}`;
    case 'pomodoro':
      return `${d(cfg.focus * 60)} focus, ${d(cfg.shortBreak * 60)} break, then a ${d(cfg.longBreak * 60)} long break after ${plural(cfg.sessionsBeforeLong, 'session')}. ${d(total)} total.`;
    case 'interval':
    case 'tabata': {
      const sets = cfg.mode === 'interval' ? cfg.sets : 1;
      const setRest = cfg.mode === 'interval' ? cfg.setRest : 0;
      let s: string;
      if (cfg.rest === 0) {
        s = `Beep every ${d(cfg.work)} for ${d(cfg.work * cfg.rounds)}`;
      } else {
        s = `${d(cfg.work)} work, ${d(cfg.rest)} rest, ${plural(cfg.rounds, 'round')}`;
      }
      if (sets > 1) {
        s += `, ${plural(sets, 'set')}${setRest > 0 ? ` with ${d(setRest)} between sets` : ''}`;
      }
      // a no-rest single set already states the total
      s += cfg.rest === 0 && sets === 1 ? '.' : `. ${d(total)} total.`;
      return s + prep(cfg.prep);
    }
  }
}

function prep(seconds: number): string {
  return seconds > 0 ? ` Starts with a ${d(seconds)} get-ready count.` : '';
}
