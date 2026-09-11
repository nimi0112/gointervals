import type { ProgrammaticPage } from './types';

export const tabatas: ProgrammaticPage[] = [
  {
    path: '/tabata/20-10-8',
    h1: 'Tabata timer 20/10 x 8',
    title: 'Tabata Timer 20/10 x 8 – The Original 4 Minute Protocol',
    description:
      'Free Tabata timer preset to 20 seconds work, 10 seconds rest, 8 rounds. The original 4 minute protocol with beeps, screen kept on, no login.',
    intro: [
      'This is the Tabata timer as Izumi Tabata actually ran it: 20 seconds flat out, 10 seconds off, eight times, four minutes total. The 1996 study used speed skaters on bikes at 170 percent of VO2 max, which is the part everyone forgets when they call a leisurely circuit "Tabata".',
      'Pick one movement you can go hard on for 20 seconds without technique falling apart. Burpees, air bike, kettlebell swings, sprints on a hill. The rest is too short to recover, so round 6 onwards is where the protocol earns its reputation.',
      'The timer gives you a 10 second get-ready count, beeps on every switch, ticks for the last 3 seconds of each block, and keeps your screen on. Space starts and pauses it.',
    ],
    uses: [
      'Air bike or rower finishers',
      'Burpees when you have four minutes and bad intentions',
      'Hill sprints with a walk-back that fits in 10 seconds',
      'A single-movement kettlebell swing block',
    ],
    config: { mode: 'tabata', prep: 10, work: 20, rest: 10, rounds: 8 },
    faq: [
      {
        q: 'Is one 4 minute Tabata enough?',
        a: 'If you do it at the intensity the protocol calls for, one round leaves most people on the floor. Tabata’s subjects did it four days a week alongside one steady-state session. If you finish feeling fine, the intensity was not there.',
      },
      {
        q: 'Can I do two exercises, alternating?',
        a: 'You can, and lots of people do, but it is closer to a HIIT circuit than the original protocol. Alternating lets you go harder per rep because each muscle group gets 40 seconds off. Both are fine. Just be honest about which one you did.',
      },
      {
        q: 'What is the 10 second countdown at the start?',
        a: 'A get-ready phase so you are not fumbling for the phone when round one starts. Set it to 0 in the settings if you do not want it.',
      },
      {
        q: 'Does the timer work with the screen locked?',
        a: 'The timer keeps accurate time from timestamps, so when you unlock it will be on the right round. But the beeps only play while the page is open, so keep the tab in front. The timer requests a screen wake lock so the phone should not lock on its own.',
      },
    ],
    related: ['/tabata', '/tabata/30-15-8', '/interval', '/blog/what-is-a-tabata-timer'],
  },
  {
    path: '/tabata/30-15-8',
    h1: 'Tabata timer 30/15 x 8',
    title: 'Tabata Timer 30/15 x 8 – 6 Minute Interval Preset',
    description:
      'Tabata-style timer preset to 30 seconds on, 15 seconds off, 8 rounds. Six minutes total with beeps and a get-ready countdown. Free, no signup.',
    intro: [
      'Thirty on, fifteen off keeps the 2:1 ratio of classic Tabata but gives you a long enough work block to get real reps in. Six minutes total, which is about the point where a single exercise starts to feel like a decision you regret.',
      'It suits movements where 20 seconds is over before you find a rhythm: rowing, skipping, kettlebell swings, shadow boxing. Fifteen seconds is enough to shake out your arms and not much more.',
      'Eight rounds by default. Bump it to 10 or 12 in the settings if you are using this as a full session rather than a finisher.',
    ],
    uses: [
      'Rowing or ski erg intervals',
      'Skipping rope, where 20 seconds is barely a warm-up',
      'Bodyweight circuits with one move per round',
      'Shadow boxing rounds with a short breather',
    ],
    config: { mode: 'tabata', prep: 10, work: 30, rest: 15, rounds: 8 },
    faq: [
      {
        q: 'Is 30/15 still Tabata?',
        a: 'Strictly, no. Tabata is 20/10 x 8. But 30/15 uses the same 2:1 work-to-rest ratio and most gyms call anything in that shape a Tabata. The timer does not care what you call it.',
      },
      {
        q: 'Should I do the same exercise every round?',
        a: 'Either works. Same exercise every round is harder and closer to the original idea. Rotating two or four exercises lets you go heavier per round because each pattern gets more rest.',
      },
      {
        q: 'How do I change it to 30/15 x 12?',
        a: 'Open Settings under the timer and change Rounds to 12. The change is saved in your browser for next time.',
      },
    ],
    related: [
      '/tabata/20-10-8',
      '/tabata/40-20-8',
      '/tabata',
      '/blog/hiit-interval-timer-beginners',
    ],
  },
  {
    path: '/tabata/40-20-8',
    h1: 'Tabata timer 40/20 x 8',
    title: 'Tabata Timer 40/20 x 8 – 8 Minute HIIT Preset',
    description:
      '40 seconds work, 20 seconds rest, 8 rounds. An 8 minute Tabata-style HIIT timer with beeps, last-3-second ticks and screen wake lock. Free, no login.',
    intro: [
      'Forty seconds is long enough to do 10 to 15 reps of most things with decent form, and 20 seconds is long enough to walk to the next station. That is why 40/20 is the default in a lot of group classes: it works as a circuit, not just as a sprint.',
      'Eight rounds gives you eight minutes. Run it twice with a two-minute break between and you have a proper 18 minute session. The interval timer can do that with sets if you would rather not restart.',
      'The beeps are different for work and rest so you do not need to look at the screen. A rising pair means go, a falling pair means stop.',
    ],
    uses: [
      'Group-class style circuits, one station per round',
      'Dumbbell complexes where reps matter',
      'Bike or treadmill sprints with a real recovery',
      'Beginners who find 20/10 too frantic',
    ],
    config: { mode: 'tabata', prep: 10, work: 40, rest: 20, rounds: 8 },
    faq: [
      {
        q: 'Why 40/20 instead of 20/10?',
        a: 'Time under tension. At 20 seconds you only get a handful of reps of a loaded movement. At 40 you can actually train the pattern, and the extra rest lets you keep the load up.',
      },
      {
        q: 'Can I run two blocks with a break between?',
        a: 'Yes. Use the interval timer, set 40/20, 8 rounds, 2 sets and a 2 minute rest between sets. This page is the single-block version.',
      },
      {
        q: 'Does the timer beep at the halfway point?',
        a: 'Not by default. It ticks for the last three seconds of every block, which is usually the cue people want. Halfway beeps are on the list.',
      },
    ],
    related: ['/tabata/30-15-8', '/tabata/45-15-10', '/interval', '/tabata'],
  },
  {
    path: '/tabata/45-15-10',
    h1: 'Tabata timer 45/15 x 10',
    title: 'Tabata Timer 45/15 x 10 – 10 Minute Circuit Preset',
    description:
      '45 seconds on, 15 seconds off, 10 rounds. A 10 minute circuit timer with distinct work and rest beeps, a get-ready count and no signup.',
    intro: [
      'Ten stations, 45 seconds each, 15 seconds to move between them. This is the layout of most bootcamp circuits and nearly every "10 minute workout" video, minus the person shouting at you.',
      'Fifteen seconds is not really rest. It is a transition. Plan your ten movements so that you are not running across the room, and stack hard and easy ones so you are not doing burpees straight into mountain climbers.',
      'Ten rounds is ten minutes exactly, which makes it easy to slot in before a shower or between meetings. The tab title shows the countdown if you switch away.',
    ],
    uses: [
      'Ten-station bodyweight circuits',
      'Lunch-break workouts that must fit in exactly ten minutes',
      'Core circuits: plank, side plank, dead bug, and so on',
      'Warm-ups before a lifting session',
    ],
    config: { mode: 'tabata', prep: 10, work: 45, rest: 15, rounds: 10 },
    faq: [
      {
        q: 'What ten exercises should I use?',
        a: 'A safe default: squats, push-ups, reverse lunges, plank, glute bridge, mountain climbers, dead bug, jumping jacks, bird dog, burpees. Swap anything that hurts.',
      },
      {
        q: 'Is 15 seconds enough rest?',
        a: 'For a circuit where each station uses different muscles, yes. For repeating the same movement ten times, probably not. Bump rest to 30 seconds in the settings if you are doing that.',
      },
      {
        q: 'Can I get a longer countdown before it starts?',
        a: 'Yes, the "Get ready" field in the settings controls it. Ten seconds is the default, set it to whatever you like.',
      },
    ],
    related: ['/tabata/40-20-8', '/interval/7-minute-workout', '/tabata', '/timer/10-minutes'],
  },
  {
    path: '/tabata/60-30-6',
    h1: 'Tabata timer 60/30 x 6',
    title: 'Tabata Timer 60/30 x 6 – 9 Minute Long-Interval Preset',
    description:
      'One minute of work, 30 seconds rest, six rounds. A nine minute long-interval timer for rowing, running and strength circuits. Free and no login.',
    intro: [
      'A full minute of work changes the workout. You cannot sprint for 60 seconds, so this preset is for hard-but-sustainable efforts: a rowing pace you can hold, kettlebell swings in sets of 20, a loaded carry down the car park and back.',
      'Thirty seconds of rest at a 2:1 ratio means you start each round only partly recovered. Six rounds is nine minutes total. Most people find round four is the honest one.',
      'If you want this as a running workout, one minute hard, thirty seconds jog, use the run/walk preset on the interval timer and set it to 60/30.',
    ],
    uses: [
      'Rowing or assault bike intervals at a hard pace',
      'Kettlebell swing sets with a counted rest',
      'Loaded carries and sled pushes',
      'Track intervals when you do not want to count laps',
    ],
    config: { mode: 'tabata', prep: 10, work: 60, rest: 30, rounds: 6 },
    faq: [
      {
        q: 'Why six rounds?',
        a: 'Because 60/30 at an honest pace is hard to sustain past nine or ten minutes. Change Rounds to 8 or 10 in the settings if you are pacing it more conservatively.',
      },
      {
        q: 'Does the timer show how many rounds are left?',
        a: 'Yes. The phase label reads "Work 3/6" and the line under the digits shows the total time left.',
      },
      {
        q: 'Can I add a longer rest halfway?',
        a: 'Use the interval timer with 2 sets of 3 rounds and a rest between sets. This page runs one continuous block.',
      },
    ],
    related: ['/tabata/45-15-10', '/interval/running-intervals-1-1', '/interval', '/emom'],
  },
];
