import type { ProgrammaticPage } from './types';

export const workouts: ProgrammaticPage[] = [
  {
    path: '/interval/7-minute-workout',
    h1: '7 minute workout timer',
    title: '7 Minute Workout Timer – 12 Exercises, 30/10, Free',
    description:
      'A timer for the 7 minute workout: 12 exercises, 30 seconds each, 10 seconds rest, with beeps between stations. Runs in your browser, no app, no login.',
    intro: [
      'This 7 minute workout timer runs the 2013 ACSM circuit by Chris Jordan: 12 bodyweight exercises, 30 seconds each, with 10 seconds to move between them. The order is jumping jacks, wall sit, push-ups, crunches, step-ups, squats, triceps dips, plank, high knees, lunges, push-up with rotation and side plank. It is set up so big muscle groups take turns.',
      'The timer is set to exactly that: 12 rounds of 30 on and 10 off, starting as soon as you press Start. It beeps when a station ends and ticks through the last three seconds, so you can get ready for the next one.',
      'The paper suggests doing the circuit two or three times if you have time. Press Run again when it ends, or change Rounds on this page to 24 or 36 for one longer session.',
    ],
    uses: [
      'Hotel-room workouts with a chair and a wall',
      'A quick full-body session with no equipment',
      'Repeat 2-3 times for a 15-25 minute workout',
      'Following the exercise list while the timer calls the switches',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 10, rounds: 12, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'What are the 12 exercises in order?',
        a: 'Jumping jacks, wall sit, push-up, crunch, step-up onto a chair, squat, triceps dip on a chair, plank, high knees in place, lunge, push-up with rotation and side plank. Thirty seconds each.',
      },
      {
        q: 'Does the timer tell me which exercise is next?',
        a: 'It shows the round number, such as "Round 5 of 12". Keep the list above in view or learn it by heart. Round 5 is always step-ups.',
      },
      {
        q: 'Is 7 minutes actually enough?',
        a: 'Yes, for staying fit and for busy days. The paper calls it high-intensity circuit training and suggests 2 to 3 circuits for a fuller session.',
      },
      {
        q: 'Can I make the rest longer?',
        a: 'Yes. Change Rest from 10 to 15 or 20 seconds above the Start button. This page always opens with 10. The main interval timer remembers your own numbers.',
      },
    ],
    related: ['/blog/7-minute-workout-timer', '/interval', '/tabata/45-15-10', '/tabata'],
  },
  {
    path: '/interval/boxing-rounds-3-1',
    h1: 'Boxing round timer: 3 minute rounds, 1 minute rest',
    title: 'Boxing Round Timer – 3 Min Rounds, 1 Min Rest',
    description:
      'A boxing round timer set to 3 minute rounds with 1 minute rest, 12 rounds, and ticks before each switch. Clear beeps, screen stays on. Free.',
    intro: [
      'This boxing round timer runs 3 minute rounds with 1 minute of rest, the pro standard. Title fights go 12 rounds and club shows go fewer. Amateurs usually box 3 rounds of 3 minutes. The timer is set to 12, and you can stop whenever you like.',
      'Use it for bag work, pads, shadow boxing or sparring. A rising pair of beeps starts each round and a falling pair starts the rest. The last three seconds of every round tick. Prop your phone against the mirror, since the digits are the biggest thing on the page.',
      'There is no 10 second warning like a gym clapper. The last-3-second ticks give you the heads-up instead.',
    ],
    uses: [
      'Heavy bag rounds',
      'Pad work with a partner',
      'Shadow boxing warm-ups, 3 rounds',
      'Sparring at full pro round length',
    ],
    config: { mode: 'interval', prep: 0, work: 180, rest: 60, rounds: 12, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How many rounds should I do?',
        a: 'Beginners: 3 to 6 rounds of bag work. Amateur fight prep: 6 to 8. Pro-style sessions: 10 to 12. Set Rounds above the Start button, or leave it at 12 and stop when you are done.',
      },
      {
        q: 'Can I do 2 minute rounds?',
        a: 'Yes. Set Work to 120 seconds. Women’s pro boxing and many amateur formats use 2 minute rounds with 1 minute rest.',
      },
      {
        q: 'Does it sound like a bell?',
        a: 'Not quite. The sounds are simple tones made in your browser, not a bell recording, so the site loads fast and works offline. The work tone is clear enough to hear over a bag.',
      },
      {
        q: 'Will the screen stay on for 12 rounds?',
        a: 'Yes. The timer keeps the screen awake while it runs, even on browsers without built-in support. Twelve rounds is 48 minutes, so it will use some battery.',
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
      'A run/walk interval timer for 1:1 training: 1 minute run, 1 minute walk, 10 rounds. Beeps tell you when to switch, so the phone can stay away. Free.',
    intro: [
      'This running intervals timer switches you between 1 minute of running and 1 minute of walking. Most couch-to-5k plans start this way. Many experienced runners use it too, for easy days or coming back from injury. Twenty minutes of it is a real session.',
      'The timer means you don’t have to watch the clock. Run until it beeps, then walk until it beeps. The run tone rises and the walk tone falls. The last three seconds of each block tick, so the change never catches you out.',
      'To progress, make the run longer: 2:1, then 3:1, then 5:1. Open the settings and change Work. Keep the walk at a minute until you are ready to drop it.',
    ],
    uses: [
      'Couch-to-5k weeks 1 to 3',
      'Getting back to running after injury',
      'Easy aerobic days without watching pace',
      'Helping walkers start running',
    ],
    config: { mode: 'interval', prep: 0, work: 60, rest: 60, rounds: 10, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Will I hear the beeps with the phone in my pocket?',
        a: 'Usually, and it also vibrates on phones that support it. Headphones are the most reliable. The tones are short and high, so they carry over traffic.',
      },
      {
        q: 'Does the timer stay accurate if the screen locks?',
        a: 'Yes. It keeps time from the clock, so it is correct when you look again, and it plays one catch-up tone for any switch you missed. To hear every beep on time, keep the page open. The timer asks your phone to keep the screen on.',
      },
      {
        q: 'How do I do 2 minutes run, 1 minute walk?',
        a: 'Set Work to 120 above the Start button and leave Rest at 60.',
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
      'A sprint interval timer: 30 seconds all-out, 90 seconds recovery, 8 rounds. A 16 minute session with three times more rest than work. Free, no signup.',
    intro: [
      'This sprint interval timer gives you 30 seconds all-out, then 90 seconds to recover. Thirty seconds is about as long as a true sprint lasts. The 1:3 ratio matches the sprint studies, so each effort stays close to full speed.',
      'Eight rounds take 16 minutes. That may sound short, but it is a big session. Classic Wingate-style workouts, named after a well-known 30 second bike test, used just four to six sprints. Eight is plenty unless you do this often.',
      'Use it on a track, a hill, a bike or a rower. A falling pair of beeps starts the recovery, so walk it off until a rising pair says go.',
    ],
    uses: [
      'Track sprints with a walk-back recovery',
      'Bike sprint intervals, Wingate style',
      'Hill repeats',
      'Rowing 30 second max efforts',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 90, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Why 90 seconds of rest?',
        a: 'So your next sprint is still a real sprint. With only 30 seconds of rest it becomes a HIIT session with a different goal. If you still feel spent at 90 seconds, make it 2 minutes.',
      },
      {
        q: 'How many sprints should a beginner do?',
        a: 'Four. Set Rounds to 4 and add one each week. The default of 8 is for people who have done this before.',
      },
      {
        q: 'Is there a get-ready count?',
        a: 'No. Start goes straight into the first sprint, so press it when you are at the line and ready to go.',
      },
    ],
    related: ['/interval/running-intervals-1-1', '/tabata/20-10-8', '/interval'],
  },
  {
    path: '/interval/kettlebell-emom-10',
    h1: 'Kettlebell EMOM timer: 10 minutes',
    title: 'Kettlebell EMOM Timer – 10 Minutes, Beep Every Minute',
    description:
      'A 10 minute kettlebell EMOM timer for swings, snatches or clean and press. It beeps every minute so each set starts on time. Free and works offline.',
    intro: [
      'This kettlebell EMOM timer beeps every minute on the minute for ten minutes. Do your reps, rest for the rest of the minute, and go again at the beep. For kettlebells that is often 10 to 15 swings, 5 snatches per arm, or 3 to 5 clean and press per side.',
      'The nice thing about an EMOM is that rest is built in. If a set takes 20 seconds, you rest 40. If it starts taking 40 seconds, you only rest 20, which tells you the weight or reps are too high.',
      'The timer beeps at the start of each minute and ticks through the last three seconds, so you can pick the bell up on time. The line under the digits counts the minutes for you.',
    ],
    uses: [
      'Kettlebell swings, 10-15 per minute',
      'Snatch or clean and press, switching arms each minute',
      'Simple and Sinister style swing blocks',
      'A finisher after lifting',
    ],
    config: { mode: 'interval', prep: 0, work: 60, rest: 0, rounds: 10, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is this the same as the EMOM timer page?',
        a: 'It works the same way, set up for 10 minutes. The EMOM page lets you pick the total length and the interval. This one is ready to go for a kettlebell block.',
      },
      {
        q: 'How many reps per minute?',
        a: 'Pick a number that takes 20 to 30 seconds with good form. For most people that is 10 to 15 two-hand swings or 5 snatches per side. If you can’t finish within 40 seconds by minute 7, drop the reps.',
      },
      {
        q: 'Can I make it 20 minutes?',
        a: 'Yes. Change Rounds to 20 in the settings. Each round is one minute.',
      },
    ],
    related: ['/emom', '/blog/emom-workouts-explained', '/interval', '/interval/beep-every-minute'],
  },
];
