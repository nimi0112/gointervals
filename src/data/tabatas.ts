import type { ProgrammaticPage } from './types';
import { TABATA } from '@/engine/schedule';

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
      'The timer starts straight into round one, beeps on every switch, ticks for the last 3 seconds of each block, and keeps your screen on. Space starts and pauses it.',
    ],
    uses: [
      'Air bike or rower finishers',
      'Burpees when you have four minutes and bad intentions',
      'Hill sprints with a walk-back that fits in 10 seconds',
      'A single-movement kettlebell swing block',
    ],
    config: TABATA,
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
        q: 'Is there a countdown before it starts?',
        a: 'No. Start goes straight into round one, so press it when you are already in position. The 10 second rest after round eight is included, so the session ends on a rest, not it.',
      },
      {
        q: 'Does the timer work with the screen locked?',
        a: 'The timer keeps accurate time from timestamps, so when you unlock it will be on the right round. But the beeps only play while the page is open, so keep the tab in front. The timer requests a screen wake lock so the phone should not lock on its own.',
      },
    ],
    related: [
      '/tabata',
      '/tabata/30-15-8',
      '/interval',
      '/blog/what-is-a-tabata-timer',
      '/blog/how-long-is-a-tabata-workout',
    ],
  },
  {
    path: '/tabata/30-15-8',
    h1: 'Tabata timer 30/15 x 8',
    title: 'Tabata Timer 30/15 x 8 – 6 Minute Interval Preset',
    description:
      'Tabata-style timer preset to 30 seconds on, 15 seconds off, 8 rounds. Six minutes total with distinct work and rest beeps. Free, no signup.',
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
    config: { mode: 'interval', prep: 0, work: 30, rest: 15, rounds: 8, sets: 1, setRest: 0 },
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
        a: 'Change Rounds to 12 above the Start button. This page always opens with 8; the interval timer remembers your own numbers.',
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
    config: { mode: 'interval', prep: 0, work: 40, rest: 20, rounds: 8, sets: 1, setRest: 0 },
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
      '45 seconds on, 15 seconds off, 10 rounds. A 10 minute circuit timer with distinct work and rest beeps, no signup.',
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
    config: { mode: 'interval', prep: 0, work: 45, rest: 15, rounds: 10, sets: 1, setRest: 0 },
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
        q: 'Is there a countdown before it starts?',
        a: 'No. Start goes straight into the first 45 seconds, so press it when you are in position. Ten rounds with the final rest included is exactly ten minutes.',
      },
    ],
    related: ['/tabata/40-20-8', '/interval/7-minute-workout', '/tabata', '/interval/beep-every-minute'],
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
    config: { mode: 'interval', prep: 0, work: 60, rest: 30, rounds: 6, sets: 1, setRest: 0 },
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
  {
    path: '/tabata/20-10-4',
    h1: 'Tabata timer 20/10 x 4',
    title: 'Tabata Timer 20/10 x 4 – 2 Minute Half Tabata',
    description:
      'Half a Tabata: 20 seconds work, 10 seconds rest, 4 rounds, two minutes total. A beginner entry point or an end-of-session finisher. Free.',
    intro: [
      'Four rounds of 20/10 is half the original protocol and it lands in two minutes. There are two honest reasons to run it. The first is that you are new to this and the last two rounds of a full Tabata are where technique falls apart, so cutting the block in half lets you learn the pace before you learn the pain. The second is that you have already trained for an hour and have exactly two minutes of effort left in you.',
      'Because it is short, the intensity has to be real. Four rounds of a movement you are pacing is a warm-up, not a finisher. Pick something you can throw yourself at from the first rep: bike sprints, swings, squat jumps, a rower you have already set up.',
      'Start goes straight into it. When you can hold the same output across all four rounds, go to six, then to the full eight.',
    ],
    uses: [
      'First week of Tabata work, learning the pacing',
      'A two-minute finisher after a lifting session',
      'Squeezing in something when there is genuinely no time',
      'Testing a new movement at Tabata intensity before committing to eight rounds',
    ],
    config: { mode: 'interval', prep: 0, work: 20, rest: 10, rounds: 4, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is four rounds worth doing at all?',
        a: 'At a genuine effort, two minutes of 20/10 will have you breathing hard for a while afterwards. It is not a substitute for a session, but as a finisher or a first attempt it earns its place.',
      },
      {
        q: 'How do I get to the full eight rounds?',
        a: 'Add two rounds when you can finish the last round at the same output as the first. Change Rounds in the settings; four, six, then eight is a sensible three-week progression.',
      },
      {
        q: 'Should I do several blocks of four instead?',
        a: 'That is a different workout. Four rounds, rest a couple of minutes, four more rounds gives you higher quality per round and less accumulated fatigue. Use the interval timer with 2 sets if you want the rest managed.',
      },
    ],
    related: [
      '/tabata/20-10-8',
      '/tabata/10-20-8',
      '/tabata',
      '/blog/hiit-interval-timer-beginners',
      '/blog/how-long-is-a-tabata-workout',
    ],
  },
  {
    path: '/tabata/10-20-8',
    h1: 'Tabata timer 10/20 x 8',
    title: 'Tabata Timer 10/20 x 8 – Beginner 1:2 Preset',
    description:
      '10 seconds work, 20 seconds rest, 8 rounds. The inverted Tabata ratio for beginners and for movements you cannot hold form on for long. Free.',
    intro: [
      'This flips the classic ratio: ten seconds of work, twenty of rest, 1:2 instead of 2:1. Four minutes total, same as the original, but the work only accounts for eighty seconds of it. That makes it the version to start with if a full 20/10 has you slowing down by round three.',
      'It is also the right shape for movements where ten seconds is all the good reps you have. Box jumps, heavy swings, broad jumps, sprint starts: quality drops off a cliff once fatigue arrives, and the long rest keeps every round looking like the first.',
      'The double rest means you should be going harder per round, not coasting. If you finish eight rounds without needing the whole twenty seconds, move up to 20/20 or straight to 20/10.',
    ],
    uses: [
      'A first week of interval training with real recovery',
      'Explosive movements: box jumps, broad jumps, sprint starts',
      'Returning to conditioning after time off',
      'Older or deconditioned clients who need the rest to be longer than the work',
    ],
    config: { mode: 'interval', prep: 0, work: 10, rest: 20, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is this really a Tabata?',
        a: 'No, and it is fine not to be. Tabata is 20/10 x 8 at an intensity most people never reach. This keeps the four-minute frame and the eight rounds while making the work-to-rest ratio survivable.',
      },
      {
        q: 'What is the next step up from 10/20?',
        a: 'Either lengthen the work to 20 seconds and keep the 20 of rest, or keep 10 seconds of work and cut rest to 10. The first builds capacity, the second builds tolerance for short rest. Both are one field in the settings.',
      },
      {
        q: 'Ten seconds is very short. How many reps is that?',
        a: 'Three to five of most loaded movements, two or three box jumps, maybe eight mountain climbers per side. Count what you get in round one and try to match it in round eight.',
      },
    ],
    related: [
      '/tabata/20-10-4',
      '/tabata/20-10-8',
      '/tabata',
      '/blog/what-is-a-tabata-timer',
      '/blog/how-long-is-a-tabata-workout',
    ],
  },
  {
    path: '/tabata/30-10-8',
    h1: 'Tabata timer 30/10 x 8',
    title: 'Tabata Timer 30/10 x 8 – Harder Than Classic',
    description:
      '30 seconds work, 10 seconds rest, 8 rounds. A 3:1 ratio that is harder than the original Tabata. Beeps, ticks and a screen that stays on. No account. Free.',
    intro: [
      'Thirty on, ten off is a 3:1 ratio, which makes it harder than the protocol everyone calls hard. Five minutes and twenty seconds total, and the ten seconds is genuinely only enough to put something down and pick it up again. Do not come here first.',
      'The reason to run it is pacing discipline. With this little rest you cannot sprint round one and survive; you have to pick an output you can repeat eight times, which is a more useful skill than one heroic round followed by seven bad ones. Rowers, cyclists and anyone with a race pace to find will recognise the lesson.',
      'Movements that suit it are cyclical and low-skill: erg, bike, skipping, jogging on the spot, wall balls if your form is solid. Save the barbell for something with more rest.',
    ],
    uses: [
      'Pacing practice: find an output you can hold eight times',
      'Erg and bike intervals with almost no recovery',
      'Skipping rope blocks where the rest is just a rest of the wrists',
      'Progressing on from 30/15 once that stops being hard',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 10, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Why is this harder than 20/10?',
        a: 'Ratio and volume. You do 50 percent more work per round with the same rest, so the ratio goes from 2:1 to 3:1 and the total work goes from 160 seconds to 240. The original is harder if you hit the original intensity, which almost nobody does.',
      },
      {
        q: 'Can I use a barbell for this?',
        a: 'Only for something simple you can rack and unrack fast, and only at a weight you can move with ten seconds of thinking time. Ten seconds is not enough to reset a loaded lift safely, so most people should pick a machine or a bodyweight movement.',
      },
      {
        q: 'What if round six falls apart?',
        a: 'You went too hard early. Run it again a few days later at an output you think is slightly too easy and see where you land. If it still falls apart, go to 30/15 and come back.',
      },
    ],
    related: [
      '/tabata/30-15-8',
      '/tabata/30-30-8',
      '/tabata',
      '/interval',
      '/blog/how-long-is-a-tabata-workout',
    ],
  },
  {
    path: '/tabata/30-30-8',
    h1: 'Tabata timer 30/30 x 8',
    title: 'Tabata Timer 30/30 x 8 – 8 Minute 1:1 Intervals',
    description:
      '30 seconds work, 30 seconds rest, 8 rounds, eight minutes. An even 1:1 interval timer for hard efforts with real recovery. Free, no login.',
    intro: [
      'Equal work and rest is the most forgiving interval shape there is, and it happens to be a well-worn format in endurance training. Thirty seconds hard, thirty easy, repeated: cyclists and runners have used 30/30 for decades because you can hold a genuinely high intensity across all the reps instead of fading.',
      'Eight rounds is eight minutes and sits comfortably in a session as a standalone block. The half-minute of rest is long enough to get your breath back part way and short enough that round eight still costs something. If it feels easy, the honest answer is that round one was too slow.',
      'It works outdoors as much as indoors: hard-run thirty seconds, jog thirty, no measuring distance and no looking at a watch. The rising tone starts the effort, the falling tone releases you.',
    ],
    uses: [
      'Classic 30/30 running or cycling intervals',
      'Rowing at a hard but repeatable split',
      'Kettlebell or dumbbell work where 10 seconds of rest is not enough',
      'A first proper HIIT block for someone who already trains',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 30, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How hard should the 30 seconds be?',
        a: 'Hard enough that eight rounds is the most you would want and no harder. If round two already feels unsustainable you have picked a sprint pace for an interval workout.',
      },
      {
        q: 'Is 1:1 enough rest to call it recovery?',
        a: 'Partly. You will start each round a little less fresh than the last, which is the intended effect. For full recovery between efforts you want 1:2 or 1:3, which is what the sprint preset on the interval timer is for.',
      },
      {
        q: 'Can I run it for longer than eight rounds?',
        a: 'Yes, 30/30 scales well. Twelve rounds is twelve minutes, twenty is twenty. Change Rounds in the settings and it is remembered in your browser.',
      },
    ],
    related: [
      '/tabata/30-10-8',
      '/tabata/45-15-8',
      '/interval',
      '/blog/what-is-a-tabata-timer',
      '/blog/how-long-is-a-tabata-workout',
    ],
  },
  {
    path: '/tabata/45-15-8',
    h1: 'Tabata timer 45/15 x 8',
    title: 'Tabata Timer 45/15 x 8 – 8 Minute Circuit',
    description:
      '45 seconds work, 15 seconds rest, 8 rounds. An eight minute circuit timer with eight stations, one per round. Free and works offline.',
    intro: [
      'Eight stations, 45 seconds each, 15 seconds to move. Eight minutes on the nose, which makes it the shortest circuit that still gets round a reasonable set of movements without repeating any of them.',
      'Fifteen seconds is a transition, not a break, so lay the stations out in a line and put nothing that needs setting up in the middle of the round. Alternate push and pull, upper and lower, so the limiting factor is your lungs rather than one tired muscle group.',
      'Eight rounds of 45 seconds is six minutes of actual work. Run the block twice with two minutes between for a session that stands on its own; the interval timer handles that with sets if you would rather not restart the page.',
    ],
    uses: [
      'Eight-station circuits, one movement per round',
      'Small-group classes where people rotate stations',
      'Dumbbell circuits: press, row, squat, lunge, and so on',
      'A tidy eight-minute block at the end of a strength session',
    ],
    config: { mode: 'interval', prep: 0, work: 45, rest: 15, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How is this different from 45/15 x 10?',
        a: 'Two fewer stations and two fewer minutes. Ten rounds is the bootcamp standard because it lands on exactly ten minutes; eight is easier to program when you only have eight sensible movements to hand.',
      },
      {
        q: 'Which eight exercises work well?',
        a: 'Goblet squat, push-up, reverse lunge, dumbbell row, hip bridge, mountain climbers, dead bug, plank. Change anything that hurts and keep the order alternating.',
      },
      {
        q: 'Can I make the transition longer?',
        a: 'Set Rest to 20 or 30 seconds if your stations are spread out or the equipment needs changing. The work stays at 45 and the total goes up accordingly.',
      },
    ],
    related: [
      '/tabata/45-15-10',
      '/tabata/30-30-8',
      '/tabata',
      '/blog/what-is-a-tabata-timer',
      '/blog/how-long-is-a-tabata-workout',
    ],
  },
];
