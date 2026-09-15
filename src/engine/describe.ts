import type { ModeConfig, MeditationConfig } from './schedule';
import { configSeconds } from './schedule';
import { formatDuration, formatClock } from './format';

const d = (seconds: number): string => formatDuration(seconds);
const plural = (n: number, w: string): string => `${n} ${w}${n === 1 ? '' : 's'}`;

function bellEvery(cfg: MeditationConfig): string {
  const m = Math.round(cfg.bell / 60);
  if (cfg.bell === 60) return 'A soft bell every minute';
  if (cfg.bell % 60 === 0) return `A soft bell every ${m} minutes`;
  return `A soft bell every ${d(cfg.bell)}`;
}

/** The one-line summary under the setup fields, exactly as designed. */
export function summaryFor(cfg: ModeConfig): string {
  const total = formatClock(configSeconds(cfg) * 1000);
  switch (cfg.mode) {
    case 'interval':
      return `${plural(cfg.rounds, 'round')} · ${total} total`;
    case 'tabata':
      return `Classic Tabata · ${total} total`;
    case 'emom':
      return `${cfg.interval}s intervals · ${total} total`;
    case 'pomodoro':
      return `${cfg.focus} / ${cfg.shortBreak} / ${cfg.longBreak} / ${cfg.sessions} · ${Math.round(configSeconds(cfg) / 60)} minutes total`;
    case 'meditation': {
      if (!cfg.intervalBell && !cfg.endBell) return 'No bells. Just the clock.';
      if (!cfg.intervalBell) return 'No interval bells. One soft bell at the end.';
      return `${bellEvery(cfg)}. ${cfg.endBell ? 'One' : 'None'} at the end.`;
    }
  }
}

/** One or two sentences a person would say out loud: "Beep every 10 sec for 5 min." */
export function describeConfig(cfg: ModeConfig): string {
  const total = configSeconds(cfg);
  switch (cfg.mode) {
    case 'meditation': {
      if (!cfg.intervalBell || cfg.bell >= cfg.total) return `One soft bell after ${d(cfg.total)}.`;
      return `A soft bell every ${d(cfg.bell)} for ${d(cfg.total)}, then one to finish.`;
    }
    case 'emom':
      return `Beep every ${d(cfg.interval)} for ${d(cfg.minutes * 60)}.`;
    case 'pomodoro':
      return `${d(cfg.focus * 60)} focus, ${d(cfg.shortBreak * 60)} break, then a ${d(cfg.longBreak * 60)} long break after ${plural(cfg.sessions, 'session')}. ${d(total)} total.`;
    case 'interval':
    case 'tabata': {
      const prepS = cfg.mode === 'interval' ? cfg.prep : 0;
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
      return s + (prepS > 0 ? ` Starts with a ${d(prepS)} get-ready count.` : '');
    }
  }
}
