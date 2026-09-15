/** Internal linking map for the main timer pages. Programmatic pages carry their own `related`. */
export const relatedTimers: Record<string, string[]> = {
  '/interval': [
    '/interval/beep-every-10-minutes',
    '/interval/7-minute-workout',
    '/interval/boxing-rounds-3-1',
    '/tabata',
    '/emom',
  ],
  '/meditation': [
    '/meditation/10-minutes',
    '/meditation/20-minutes',
    '/meditation/30-minutes',
    '/interval',
    '/pomodoro',
  ],
  '/tabata': ['/tabata/20-10-8', '/tabata/30-15-8', '/tabata/20-10-4', '/tabata/30-30-8', '/interval'],
  '/emom': ['/interval/kettlebell-emom-10', '/interval/beep-every-minute', '/interval', '/tabata'],
  '/pomodoro': ['/pomodoro/50-10', '/pomodoro/52-17', '/pomodoro/90-20', '/meditation', '/interval'],
};

export const relatedPosts: Record<string, string[]> = {
  '/interval': [
    '/blog/hiit-interval-timer-beginners',
    '/blog/timer-that-beeps-every-10-minutes',
    '/blog/interval-timer-for-running',
  ],
  '/meditation': ['/blog/meditation-timer-interval-bells', '/blog/how-long-to-meditate'],
  '/tabata': ['/blog/what-is-a-tabata-timer', '/blog/how-long-is-a-tabata-workout'],
  '/emom': ['/blog/emom-workouts-explained'],
  '/pomodoro': [
    '/blog/pomodoro-technique-25-5',
    '/blog/best-pomodoro-length',
    '/blog/study-timer-vs-pomodoro',
  ],
};
