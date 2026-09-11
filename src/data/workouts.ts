import type { ProgrammaticPage } from './types';

export const workouts: ProgrammaticPage[] = [
  {
    path: '/interval/7-minute-workout',
    h1: '7 minute workout timer',
    title: '7 Minute Workout Timer – 12 Exercises, 30/10, Free',
    description:
      'Timer for the scientific 7 minute workout: 12 exercises, 30 seconds each, 10 seconds rest, beeps between stations. Runs in the browser, no app, no login.',
    intro: [
      'The 7 minute workout is the 2013 ACSM circuit by Chris Jordan: 12 bodyweight exercises, 30 seconds each, 10 seconds to move between them. Jumping jacks, wall sit, push-ups, crunches, step-ups, squats, triceps dips, plank, high knees, lunges, push-up with rotation, side plank. In that order, on purpose, so big muscle groups alternate.',
      'This timer is set to exactly that: 12 rounds of 30 on, 10 off, with a 10 second get-ready count. It beeps when a station ends and ticks through the last three seconds so you can set up for the next one.',
      'The paper suggests repeating the circuit two or three times if you have the time. Change Sets to 2 or 3 in the settings and add a minute of rest between them.',
    ],
    uses: [
      'Hotel-room workouts with a chair and a wall',
      'A fast full-body session with no equipment',
      'Repeat 2-3 times for a 15-25 minute workout',
      'Following the exercise list while the timer calls the switches',
    ],
    config: { mode: 'interval', prep: 10, work: 30, rest: 10, rounds: 12, sets: 1, setRest: 60 },
    faq: [
      {
        q: 'What are the 12 exercises in order?',
        a: 'Jumping jacks, wall sit, push-up, abdominal crunch, step-up onto a chair, squat, triceps dip on a chair, plank, high knees running in place, lunge, push-up and rotation, side plank. Thirty seconds each.',
      },
      {
        q: 'Does the timer tell me which exercise is next?',
        a: 'It shows the round number (Work 5/12). Keep the list above visible or memorise it. Round 5 is always step-ups.',
      },
      {
        q: 'Is 7 minutes actually enough?',
        a: 'For maintenance and for days when the alternative is nothing, yes. The original paper describes it as high-intensity circuit training and suggests 2 to 3 circuits for a fuller session.',
      },
      {
        q: 'Can I make the rest longer?',
        a: 'Open Settings and change Rest from 10 to 15 or 20 seconds. The timer saves that in your browser so it is there next time.',
      },
    ],
    related: ['/blog/7-minute-workout-timer', '/interval', '/tabata/45-15-10', '/timer/7-minutes'],
  },
  {
    path: '/interval/boxing-rounds-3-1',
    h1: 'Boxing round timer: 3 minute rounds, 1 minute rest',
    title: 'Boxing Round Timer – 3 Min Rounds, 1 Min Rest',
    description:
      'Boxing round timer preset to 3 minute rounds with 1 minute rest, 12 rounds, a 10 second warning tick. Bell-style beeps, screen stays on, free.',
    intro: [
      'Three minutes on, one minute off is the professional standard: 12 rounds for a title fight, fewer for club shows. Amateurs box 3 x 3 minutes. This timer is set to 12 rounds and you can stop whenever you like.',
      'Use it for bag work, pads, shadow boxing or sparring. The work beep is a rising pair, the rest beep is a falling pair, and the last three seconds of every round tick. Turn on fullscreen and prop the phone against the mirror.',
      'For a 10 second warning before the bell, the way gyms use a clapper, that is on the list. For now the last-3-second ticks do the job.',
    ],
    uses: [
      'Heavy bag rounds',
      'Pad work with a partner',
      'Shadow boxing warm-ups, 3 rounds',
      'Sparring at full pro round length',
    ],
    config: { mode: 'interval', prep: 10, work: 180, rest: 60, rounds: 12, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How many rounds should I do?',
        a: 'Beginners: 3 to 6 rounds of bag work. Amateur fight prep: 6 to 8. Pro-style sessions: 10 to 12. Set Rounds in the settings, or leave it at 12 and stop when you are done.',
      },
      {
        q: 'Can I do 2 minute rounds?',
        a: 'Yes. Change Work to 2:00. Women’s pro boxing and many amateur formats use 2 minute rounds with 1 minute rest.',
      },
      {
        q: 'Does it sound like a bell?',
        a: 'Not quite. The sounds are generated tones, not a bell sample, so the site works offline and loads instantly. The work tone is distinct enough to hear over a bag.',
      },
      {
        q: 'Will the screen stay on for 12 rounds?',
        a: 'Yes. The timer holds a screen wake lock while running, and falls back to a hidden looping video on browsers without one. 48 minutes at full brightness will eat some battery.',
      },
    ],
    related: ['/blog/boxing-round-timer-3-minute-rounds', '/interval', '/timer/3-minutes', '/emom'],
  },
  {
    path: '/interval/running-intervals-1-1',
    h1: 'Running intervals timer: 1 minute run, 1 minute walk',
    title: 'Run/Walk Interval Timer – 1 Min On, 1 Min Off',
    description:
      'Interval timer for 1:1 run/walk training: 1 minute run, 1 minute walk, 10 rounds. Beeps to switch so you can put the phone away. Free, no login.',
    intro: [
      'One minute running, one minute walking is where most couch-to-5k plans start, and it is also what a lot of experienced runners fall back to for easy days or coming back from injury. Twenty minutes of it is a real session.',
      'The point of the timer is that you do not look at your watch. Run until it beeps, walk until it beeps. The run tone rises, the walk tone falls, and it ticks for the last three seconds of each block so the change is never a surprise.',
      'Progress by stretching the run: 2:1, then 3:1, then 5:1. Open the settings and change Work. The walk stays a minute until you drop it entirely.',
    ],
    uses: [
      'Couch-to-5k weeks 1 to 3',
      'Return-to-running after injury',
      'Easy aerobic days without watching pace',
      'Walking clients into running',
    ],
    config: { mode: 'interval', prep: 10, work: 60, rest: 60, rounds: 10, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Will I hear the beeps with the phone in my pocket?',
        a: 'Usually, and it also vibrates on phones that support it. Headphones are more reliable. The tones are short and high so they cut through traffic.',
      },
      {
        q: 'Does the timer stay accurate if the screen locks?',
        a: 'The clock is based on timestamps so it will be correct when you look again, and it plays a catch-up tone for anything you missed. To hear every beep in real time, keep the page in the foreground. The timer asks the phone to keep the screen on.',
      },
      {
        q: 'How do I do 2 minutes run, 1 minute walk?',
        a: 'Settings, set Work to 2:00, leave Rest at 1:00. The change is saved in your browser.',
      },
    ],
    related: [
      '/interval/sprint-30-90',
      '/interval',
      '/stopwatch',
      '/blog/stopwatch-running-splits-lap-times',
    ],
  },
  {
    path: '/interval/sprint-30-90',
    h1: 'Sprint interval timer: 30 seconds on, 90 seconds off',
    title: 'Sprint Interval Timer – 30s On, 90s Recovery',
    description:
      'Sprint interval timer preset to 30 seconds all-out, 90 seconds recovery, 8 rounds. A 16 minute session with a 1:3 work-to-rest ratio. Free, no signup.',
    intro: [
      'Thirty seconds is about as long as an actual sprint lasts before it becomes a hard run. Ninety seconds of recovery, a 1:3 ratio, is what the sprint interval training studies used so that each rep is close to full effort rather than a fade.',
      'Eight rounds is 16 minutes. It sounds short. It is not. The classic Wingate-style protocols used four to six 30 second efforts, so eight is already an ambitious session for anyone not doing this regularly.',
      'Works on a track, a hill, a bike, a rower. The recovery beep is a falling pair, so walk it off until the rising pair says go.',
    ],
    uses: [
      'Track sprints with a walk-back recovery',
      'Bike sprint intervals, Wingate style',
      'Hill repeats',
      'Rowing 30 second max efforts',
    ],
    config: { mode: 'interval', prep: 15, work: 30, rest: 90, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Why 90 seconds of rest?',
        a: 'So that the next sprint is a sprint. With 30 seconds of rest you would be doing HIIT, which is a different session with a different goal. If you are still gassed at 90, make it 2 minutes.',
      },
      {
        q: 'How many sprints should a beginner do?',
        a: 'Four. Set Rounds to 4 and add one each week. The default of 8 assumes you have done this before.',
      },
      {
        q: 'Is there a longer get-ready count?',
        a: 'This preset uses 15 seconds so you can get to the start line. Change it in the settings.',
      },
    ],
    related: [
      '/interval/running-intervals-1-1',
      '/tabata/20-10-8',
      '/interval',
      '/timer/90-seconds',
    ],
  },
  {
    path: '/interval/kettlebell-emom-10',
    h1: 'Kettlebell EMOM timer: 10 minutes',
    title: 'Kettlebell EMOM Timer – 10 Minutes, Beep Every Minute',
    description:
      '10 minute EMOM timer for kettlebell swings, snatches or clean and press. Beeps on every minute so you start each set on time. Free, no login, works offline.',
    intro: [
      'Every minute on the minute for ten minutes: do your reps, rest for whatever is left of the minute, go again at the beep. For kettlebells that usually means 10 to 15 swings, 5 snatches per arm, or 3 to 5 clean and press per side.',
      'The beauty of an EMOM is that the rest is built in and it shrinks when you slow down. If a set takes 20 seconds you rest 40. If it starts taking 40 seconds you rest 20, which is the bell telling you the weight or the reps are too high.',
      'The timer beeps at the start of each minute and ticks through the last three seconds so you can pick the bell up on time. The phase label counts minutes for you.',
    ],
    uses: [
      'Kettlebell swings, 10-15 per minute',
      'Snatch or clean and press, alternating arms each minute',
      'Simple and Sinister style swing blocks',
      'A finisher after lifting',
    ],
    config: { mode: 'interval', prep: 10, work: 60, rest: 0, rounds: 10, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is this the same as the EMOM timer page?',
        a: 'Same engine, preset for 10 minutes. The EMOM page lets you pick the total length and the interval, this one is ready to go for a kettlebell block.',
      },
      {
        q: 'How many reps per minute?',
        a: 'Pick a number that takes 20 to 30 seconds with good form. For most people that is 10 to 15 two-hand swings or 5 snatches per side. If you cannot finish inside 40 seconds by minute 7, drop the reps.',
      },
      {
        q: 'Can I make it 20 minutes?',
        a: 'Change Rounds to 20 in the settings. Each round is one minute.',
      },
    ],
    related: ['/emom', '/blog/emom-workouts-explained', '/interval', '/timer/10-minutes'],
  },
];
