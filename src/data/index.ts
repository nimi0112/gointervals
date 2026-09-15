/** Every programmatic page, in one place, for lookups and OG generation. */
import type { ProgrammaticPage } from './types';
import { tabatas } from './tabatas';
import { workouts } from './workouts';
import { beeps } from './beeps';
import { pomodoros } from './pomodoros';
import { meditations } from './meditations';

export const timerPages: ProgrammaticPage[] = [
  ...tabatas,
  ...workouts,
  ...beeps,
  ...pomodoros,
  ...meditations,
];

export const pageByPath = (path: string): ProgrammaticPage | undefined =>
  timerPages.find((p) => p.path === path);
