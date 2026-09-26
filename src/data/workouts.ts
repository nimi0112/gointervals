import type { ProgrammaticPage } from './types';

export const workouts: ProgrammaticPage[] = [
  {
    path: '/interval/7-minute-workout',
    h1: '7 minute workout timer',
    title: '7 Minute Workout Timer – 12 Exercises, 30/10, Free',
    description:
      'A timer for the 7 minute workout: 12 exercises, 30 seconds each, 10 seconds rest, with beeps between stations. Runs in your browser, no app, no login.',
    intro: [
      'The familiar 7-minute circuit has twelve stations. At 30 seconds of work and 10 seconds of rest per station, this timer runs for eight minutes, including the final rest. The last work interval ends at 7:50.',
      'Prepare the exercise list and any stable equipment before starting. The timer shows round numbers and phase changes; it does not name or demonstrate exercises. The linked circuit guide explains the original sequence and its timing.',
      'For a second circuit with a longer recovery gap, finish this session, take the gap separately and press Run again. Increasing Rounds to 24 gives sixteen continuous minutes of 30/10, without an extra gap halfway.',
    ],
    uses: [
      'Timing a twelve-station circuit you already know',
      'Allowing a consistent transition between stations',
      'Adapting recovery time to your setup',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 30,
      rest: 10,
      rounds: 12,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Why does a 7-minute workout take eight minutes here?',
        a: 'Twelve 30-second work periods total six minutes. Twelve 10-second rests add two minutes. This timer includes the rest after the last station.',
      },
      {
        q: 'Does it announce the exercise names?',
        a: 'No. It shows the round number. Keep your own exercise list visible and prepare suitable versions before starting.',
      },
      {
        q: 'Can I make the transitions longer?',
        a: 'Yes. Change Rest in seconds. At 30 seconds work and 20 seconds rest, twelve rounds take ten minutes.',
      },
    ],
    related: ['/blog/7-minute-workout-timer', '/interval', '/tabata/45-15-10', '/tabata'],
  },
  {
    path: '/interval/boxing-rounds-3-1',
    h1: 'Boxing round timer: 3 minute rounds, 1 minute rest',
    title: 'Boxing Round Timer – 3 Min Rounds, 1 Min Rest',
    description:
      'Time boxing training with 3-minute rounds and 1-minute rests. Set your round count, check the complete duration and test the work and rest cues.',
    intro: [
      'This boxing timer starts with twelve 3-minute rounds and 1-minute rests. The complete session takes 48 minutes because it includes recovery after the last round. The final work period ends at 47 minutes.',
      'Change Rounds to match your training plan before putting on gloves. Start begins the first round immediately. Decide the drill for each round in advance; the timer handles timing, not coaching or supervision.',
      'Work and rest use different tones, with warning ticks in the last three seconds. There is no ten-second clapper. Test the sound in your room and leave the page visible.',
    ],
    uses: [
      'Bag-work timing from your training plan',
      'Pad drills with agreed round lengths',
      'Non-contact technique rounds',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 180,
      rest: 60,
      rounds: 12,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'How many rounds should I set?',
        a: 'Use the count in your training plan. The default of twelve is a timer configuration, not a recommendation for every athlete.',
      },
      {
        q: 'Can I use two-minute rounds?',
        a: 'Yes. Set Work to 120 seconds and Rest to 60 for a 2:1 pattern. Check the actual competition rules if you are practising a specific format.',
      },
      {
        q: 'Will the screen stay on throughout?',
        a: 'The timer requests an awake screen while running. Battery settings or browser restrictions can refuse it. Keep the page visible and test before relying on cues.',
      },
    ],
    related: [
      '/blog/boxing-round-timer-3-minute-rounds',
      '/interval',
      '/interval/beep-every-3-minutes',
      '/emom',
      '/blog/how-many-rounds-in-a-boxing-match',
    ],
  },
  {
    path: '/interval/running-intervals-1-1',
    h1: 'Running intervals timer: 1 minute run, 1 minute walk',
    title: 'Run/Walk Interval Timer – 1 Min On, 1 Min Off',
    description:
      'Run one-minute work and walking intervals for ten rounds, or edit the durations in seconds. Check the total and test browser sound before heading out.',
    intro: [
      'This run/walk timer repeats one minute of running and one minute of walking ten times. That is twenty minutes, including the last walk. It does not add a warm-up or cooldown.',
      'Use the ratio required by your plan. A 1:1 preset is not automatically the first week of a named running programme. Work and Rest are entered in seconds here: 120 and 60 produce two minutes running and one minute walking.',
      'For locked-screen or pocket use, test audio under those conditions. A browser can miss background cues even though the countdown catches up when the page resumes.',
    ],
    uses: [
      'A planned session with equal run and walk periods',
      'Editing work and recovery in seconds',
      'Keeping the same timed ratio across repetitions',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 60,
      rest: 60,
      rounds: 10,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Can I rely on the beeps with my phone locked?',
        a: 'No. A locked phone may suspend the page or its sound. If every cue must arrive in your pocket, use a running device or app designed for background alerts.',
      },
      {
        q: 'How do I enter 90 seconds running and 60 walking?',
        a: 'Set Work to 90 and Rest to 60. Ten rounds take 25 minutes, including the final walk.',
      },
      {
        q: 'Does it measure distance?',
        a: 'No. It controls time and counts rounds. Use a watch or measured route if your plan specifies distance.',
      },
    ],
    related: [
      '/interval/sprint-30-90',
      '/interval',
      '/blog/stopwatch-running-splits-lap-times',
      '/blog/interval-timer-for-running',
    ],
  },
  {
    path: '/interval/sprint-30-90',
    h1: 'Sprint interval timer: 30 seconds on, 90 seconds off',
    title: 'Sprint Interval Timer – 30s On, 90s Recovery',
    description:
      'Set 30 seconds of work and 90 seconds of recovery for eight rounds. A sixteen-minute timing pattern you can adjust to your own training plan.',
    intro: [
      'This 30/90 interval timer alternates thirty seconds of work with ninety seconds of recovery. Eight rounds take sixteen minutes, including the final recovery. The clock does not set your pace.',
      'Choose effort and round count from a suitable training plan. Ninety seconds of recovery is a setting, not a guarantee that you are ready for another maximal effort. Adjust or stop if the planned session no longer fits.',
      'Start begins the first work period immediately. Complete your preparation separately, test sound and keep the page visible. The linked work/rest guide explains how changing recovery changes the session.',
    ],
    uses: [
      'A programme that specifies 30/90 intervals',
      'Editing short efforts with longer recovery',
      'Comparing round counts while keeping durations fixed',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 30,
      rest: 90,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the same as a Wingate protocol?',
        a: 'No. Sharing a thirty-second work period does not reproduce a research protocol. Equipment, effort, recovery and training frequency matter too.',
      },
      {
        q: 'How long do four rounds take?',
        a: 'Eight minutes: four pairs of 30 seconds work and 90 seconds recovery. Preparation is additional.',
      },
      {
        q: 'Can I extend recovery?',
        a: 'Yes. Rest is editable in seconds. Use a duration appropriate to your plan, and check the updated total before starting.',
      },
    ],
    related: ['/interval/running-intervals-1-1', '/tabata/20-10-8', '/interval'],
  },
  {
    path: '/interval/kettlebell-emom-10',
    h1: 'Kettlebell EMOM timer: 10 minutes',
    title: 'Kettlebell EMOM Timer – 10 Minutes, Beep Every Minute',
    description:
      'A ten-minute clock for planned kettlebell sets: start each minute, then recover in the time left. Choose your own movement, repetitions and effort.',
    intro: [
      'This kettlebell EMOM clock marks ten one-minute blocks. Begin your planned set at the start of a minute, then rest for the time left. The timer does not prescribe a weight, exercise or repetition count.',
      'If a set and reset take 25 seconds, 35 seconds remain before the next start. If they take 50 seconds, only ten remain. Use that change as information when deciding whether to adjust the task or stop.',
      'The preset uses an interval configuration with Rest at zero, so it never schedules a separate rest phase. Your recovery happens inside each minute. Choose the main EMOM timer if you prefer setting total minutes directly.',
    ],
    uses: [
      'Timing a kettlebell session you have already planned',
      'Tracking starts without counting minutes yourself',
      'A simple repeated set with recovery inside each minute',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 60,
      rest: 0,
      rounds: 10,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'How many repetitions should I do?',
        a: 'Follow a plan suited to your technique and training goals. Leave time for an appropriate recovery and reset. The timer cannot assess either.',
      },
      {
        q: 'Can I use twenty minutes?',
        a: 'Set Rounds to 20. Each round remains one minute. Longer duration changes the session, so use the count your plan calls for.',
      },
      {
        q: 'Is this the same clock as EMOM?',
        a: 'It provides the same one-minute start pattern. This page uses Work 60 seconds, Rest 0 and 10 rounds; the EMOM page lets you enter an interval and total minutes.',
      },
    ],
    related: ['/emom', '/blog/emom-workouts-explained', '/interval', '/interval/beep-every-minute'],
  },
];
