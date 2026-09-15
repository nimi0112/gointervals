import type { ModeConfig } from './schedule';
import { TABATA } from './schedule';

/** Factory defaults per mode. Interval is 30 min work, 5 min rest, 8 rounds by owner decision. */
export const defaultConfigs: { [K in ModeConfig['mode']]: Extract<ModeConfig, { mode: K }> } = {
  interval: { mode: 'interval', prep: 0, work: 1800, rest: 300, rounds: 8, sets: 1, setRest: 0 },
  tabata: TABATA,
  emom: { mode: 'emom', minutes: 10, interval: 60 },
  pomodoro: { mode: 'pomodoro', focus: 25, shortBreak: 5, longBreak: 15, sessions: 4 },
  meditation: {
    mode: 'meditation',
    total: 1800,
    bell: 600,
    intervalBell: true,
    startBell: false,
    endBell: true,
  },
};
