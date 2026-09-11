/** Internal linking map for the main timer pages. Programmatic pages carry their own `related`. */
export const relatedTimers: Record<string, string[]> = {
  '/': ['/interval', '/timer', '/stopwatch', '/tabata', '/emom', '/pomodoro'],
  '/interval': ['/tabata', '/emom', '/interval/7-minute-workout', '/interval/boxing-rounds-3-1'],
  '/timer': ['/timer/5-minutes', '/timer/10-minutes', '/timer/25-minutes', '/pomodoro'],
  '/stopwatch': ['/timer', '/interval/running-intervals-1-1', '/interval'],
  '/tabata': ['/tabata/20-10-8', '/tabata/30-15-8', '/tabata/40-20-8', '/interval'],
  '/emom': ['/interval/kettlebell-emom-10', '/interval', '/tabata'],
  '/pomodoro': ['/timer/25-minutes', '/timer/5-minutes', '/timer'],
};

export const relatedPosts: Record<string, string[]> = {
  '/': ['/blog/free-online-timer-that-works-offline', '/blog/hiit-interval-timer-beginners'],
  '/interval': ['/blog/hiit-interval-timer-beginners', '/blog/keep-phone-screen-on-workout-timer'],
  '/timer': ['/blog/free-online-timer-that-works-offline', '/blog/study-timer-vs-pomodoro'],
  '/stopwatch': ['/blog/stopwatch-running-splits-lap-times'],
  '/tabata': ['/blog/what-is-a-tabata-timer', '/blog/hiit-interval-timer-beginners'],
  '/emom': ['/blog/emom-workouts-explained'],
  '/pomodoro': ['/blog/pomodoro-technique-25-5', '/blog/study-timer-vs-pomodoro'],
};
