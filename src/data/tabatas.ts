import type { ProgrammaticPage } from './types';
import { TABATA } from '@/engine/schedule';

export const tabatas: ProgrammaticPage[] = [
  {
    path: '/tabata/20-10-8',
    h1: 'Tabata timer 20/10 x 8',
    title: 'Tabata Timer 20/10 x 8 – The Original 4 Minute Protocol',
    description:
      'A free Tabata timer set to the original: 20 seconds work, 10 seconds rest, 8 rounds, 4 minutes. Clear beeps, screen stays on, no login.',
    intro: [
      'This Tabata timer runs the original protocol: 20 seconds all-out, 10 seconds rest, eight rounds, four minutes in total. It comes from a 1996 study led by Izumi Tabata. The subjects were fit university physical education students on exercise bikes. The workout itself came from the coach of Japan’s speed-skating team.',
      'All-out is the key part. Each 20 seconds is meant to be harder than any pace you could hold steadily. That is what makes four minutes feel like plenty. Pick one movement you can push hard for 20 seconds with good form. Burpees, an air bike, kettlebell swings or hill sprints all work well. The rest is short, so the last few rounds are the tough ones.',
      'Start goes straight into round one. The timer beeps at every switch, ticks through the last 3 seconds of each block and keeps your screen on. Space starts and pauses it.',
    ],
    uses: [
      'Air bike or rower finishers',
      'A four-minute burpee block',
      'Hill sprints with a walk back that fits in 10 seconds',
      'A single-movement kettlebell swing block',
    ],
    config: TABATA,
    faq: [
      {
        q: 'Is one 4 minute Tabata enough?',
        a: 'Yes, if you go truly all-out. In the study, people did it four days a week plus one steady session. If you finish feeling fresh, push a little harder next time.',
      },
      {
        q: 'Can I do two exercises, alternating?',
        a: 'Yes, and it works well. Each muscle group gets a longer break, so you can push harder on each round. It is closer to a HIIT circuit than the original, and both are good training.',
      },
      {
        q: 'Is there a countdown before it starts?',
        a: 'No. Start goes straight into round one, so get into position first. The 10 second rest after round eight is part of the four minutes, so the session ends on a rest.',
      },
      {
        q: 'Does the timer work with the screen locked?',
        a: 'It asks your phone to keep the screen on where it can, so it shouldn’t lock mid-round. If the page goes to the background, the browser slows it down and a beep can come late or not at all. The time stays right, because it’s read from the clock.',
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
      'A Tabata-style timer set to 30 seconds on, 15 seconds off, 8 rounds. Six minutes in total, with different beeps for work and rest. Free, no signup.',
    intro: [
      'This Tabata timer runs 30 seconds on and 15 seconds off for eight rounds. It keeps the 2:1 work-to-rest ratio of classic Tabata. The longer work block gives you time to get real reps in. The whole thing takes six minutes.',
      'It suits movements where 20 seconds ends before you find a rhythm. Rowing, skipping, kettlebell swings and shadow boxing all fit. Fifteen seconds is enough to shake out your arms and breathe.',
      'Eight rounds is the default. Change it to 10 or 12 in the settings if you want a full session rather than a finisher.',
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
        a: 'Not strictly. The original is 20/10 x 8. But 30/15 uses the same 2:1 ratio, and most gyms call this shape a Tabata too.',
      },
      {
        q: 'Should I do the same exercise every round?',
        a: 'Either works. One exercise all the way through is harder and closer to the original. Rotating two or four lets you go harder on each, because each movement gets more rest.',
      },
      {
        q: 'How do I change it to 30/15 x 12?',
        a: 'Change Rounds to 12 above the Start button. This page always opens with 8. The main interval timer remembers your own numbers.',
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
      'A 40/20 Tabata-style HIIT timer: 40 seconds work, 20 seconds rest, 8 rounds, 8 minutes. Beeps, last-3-second ticks and screen kept on. Free.',
    intro: [
      'This Tabata-style timer runs 40 seconds of work and 20 seconds of rest for eight rounds. Forty seconds fits 10 to 15 good reps of most moves. Twenty seconds is enough to walk to the next station. That is why many group classes use 40/20 for circuits.',
      'Eight rounds takes eight minutes. With a dumbbell, pick a weight you could lift about 20 times when fresh. By round six, 40 seconds with it will feel long enough.',
      'Work and rest have different beeps, so you don’t need to watch the screen. A rising pair means go. A falling pair means stop.',
    ],
    uses: [
      'Group-class style circuits, one station per round',
      'Dumbbell complexes where reps matter',
      'Bike or treadmill sprints with a real recovery',
      'Beginners who find 20/10 too rushed',
    ],
    config: { mode: 'interval', prep: 0, work: 40, rest: 20, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Why 40/20 instead of 20/10?',
        a: 'More time on each movement. Twenty seconds gives you only a few reps with a weight, while 40 lets you really train the move. The extra rest helps you keep the weight up.',
      },
      {
        q: 'Can I run two blocks with a break between?',
        a: 'Yes. When the first eight rounds end, rest two minutes, then press Run again. For one long block with no gap, change Rounds on this page to 16.',
      },
      {
        q: 'Does the timer beep at the halfway point?',
        a: 'No. It ticks through the last three seconds of every block instead. That is usually the cue you need to get ready.',
      },
    ],
    related: ['/tabata/30-15-8', '/tabata/45-15-10', '/interval', '/tabata'],
  },
  {
    path: '/tabata/45-15-10',
    h1: 'Tabata timer 45/15 x 10',
    title: 'Tabata Timer 45/15 x 10 – 10 Minute Circuit Preset',
    description:
      'A 45/15 Tabata-style circuit timer: 45 seconds on, 15 seconds off, 10 rounds, exactly 10 minutes. Different beeps for work and rest. Free, no signup.',
    intro: [
      'This Tabata-style circuit timer gives you ten stations of 45 seconds, with 15 seconds to move between them. It is the classic bootcamp layout and the shape of many "10 minute workout" videos.',
      'Fifteen seconds is time to walk, not to sit down. Set your ten stations close together. Mix hard and easy moves, so burpees don’t lead straight into mountain climbers.',
      'Ten rounds takes exactly ten minutes, so it fits before a shower or between meetings. If you switch tabs, the tab title shows the time left.',
    ],
    uses: [
      'Ten-station bodyweight circuits',
      'Lunch-break workouts that fit in exactly ten minutes',
      'Core circuits: plank, side plank, dead bug, and so on',
      'Warm-ups before a lifting session',
    ],
    config: { mode: 'interval', prep: 0, work: 45, rest: 15, rounds: 10, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'What ten exercises should I use?',
        a: 'A good start: squats, push-ups, reverse lunges, plank, glute bridge, mountain climbers, dead bug, jumping jacks, bird dog and burpees. Swap out anything that hurts.',
      },
      {
        q: 'Is 15 seconds enough rest?',
        a: 'Yes, when each station works different muscles. If you repeat one movement ten times, it probably isn’t. Change Rest to 30 seconds in the settings for that.',
      },
      {
        q: 'Is there a countdown before it starts?',
        a: 'No. Start goes straight into the first 45 seconds, so get into position first. Ten rounds, including the final rest, take exactly ten minutes.',
      },
    ],
    related: [
      '/tabata/40-20-8',
      '/interval/7-minute-workout',
      '/tabata',
      '/interval/beep-every-minute',
    ],
  },
  {
    path: '/tabata/60-30-6',
    h1: 'Tabata timer 60/30 x 6',
    title: 'Tabata Timer 60/30 x 6 – 9 Minute Long-Interval Preset',
    description:
      'A 60/30 long-interval timer: one minute of work, 30 seconds rest, six rounds, nine minutes. Good for rowing, running and strength circuits. Free.',
    intro: [
      'This long-interval timer runs one minute of work and 30 seconds of rest for six rounds. Nobody can sprint for a full minute, so aim for hard but steady efforts. Think of a rowing pace you can hold, 20 kettlebell swings, or a heavy carry and back.',
      'The 30 seconds of rest is half the work, so you start each round only partly recovered. Six rounds take nine minutes. Round four is usually where it gets hard.',
      'For a running version, one minute hard and thirty seconds of jogging, open the run/walk interval page and set Rest to 30 seconds.',
    ],
    uses: [
      'Rowing or air bike intervals at a hard pace',
      'Kettlebell swing sets with a timed rest',
      'Loaded carries and sled pushes',
      'Track intervals when you don’t want to count laps',
    ],
    config: { mode: 'interval', prep: 0, work: 60, rest: 30, rounds: 6, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Why six rounds?',
        a: 'Because 60/30 at a hard pace is tough to keep up past nine or ten minutes. If you pace it a little easier, change Rounds to 8 or 10 in the settings.',
      },
      {
        q: 'Does the timer show how many rounds are left?',
        a: 'Yes. The line under the digits reads "Round 3 of 6", and the progress row shows the total time left.',
      },
      {
        q: 'Can I add a longer rest halfway?',
        a: 'Yes. Change Rounds to 3 and take your breather when the first half ends, then press Run again. Two blocks of three with a two-minute gap take about 11 minutes.',
      },
    ],
    related: ['/tabata/45-15-10', '/interval/running-intervals-1-1', '/interval', '/emom'],
  },
  {
    path: '/tabata/20-10-4',
    h1: 'Tabata timer 20/10 x 4',
    title: 'Tabata Timer 20/10 x 4 – 2 Minute Half Tabata',
    description:
      'A half Tabata timer: 20 seconds work, 10 seconds rest, 4 rounds, two minutes in total. A gentle way to start, or a quick finisher. Free.',
    intro: [
      'This half Tabata timer runs 20 seconds of work and 10 seconds of rest for four rounds. That is half the original, and it takes two minutes.',
      'It is good for two reasons. If you are new, form tends to slip in the last rounds of a full Tabata, so four rounds let you learn the pace first. And if you have already trained for an hour, two minutes may be exactly what you have left.',
      'Because it is short, go hard from the first second. Pick something you can give everything to: bike sprints, swings, squat jumps or a rower that is already set up. Start goes straight into round one. When you can hold the same effort across all four rounds, move up to six, then the full eight.',
    ],
    uses: [
      'Your first week of Tabata, learning the pace',
      'A two-minute finisher after a lifting session',
      'A quick workout when time is really short',
      'Trying a new movement at Tabata effort before doing eight rounds',
    ],
    config: { mode: 'interval', prep: 0, work: 20, rest: 10, rounds: 4, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is four rounds worth doing at all?',
        a: 'Yes. Done at a real effort, two minutes of 20/10 will leave you breathing hard for a while. It won’t replace a full session, but it is a great finisher or first try.',
      },
      {
        q: 'How do I get to the full eight rounds?',
        a: 'Add two rounds once your last round matches your first. Change Rounds in the settings. Four, then six, then eight over three weeks is a sensible plan.',
      },
      {
        q: 'Should I do several blocks of four instead?',
        a: 'You can, and it is a slightly different workout. Four rounds, a couple of minutes’ rest, then four more gives you better rounds with less tiredness. It suits a movement whose form fades by round five.',
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
      'A beginner Tabata timer: 10 seconds work, 20 seconds rest, 8 rounds. The ratio flipped, for new starters and moves that are hard to hold for long. Free.',
    intro: [
      'This beginner Tabata timer flips the classic ratio: 10 seconds of work and 20 seconds of rest. It still runs eight rounds in four minutes, but only 80 seconds of that is work. Start here if a full 20/10 slows you down by round three.',
      'It also suits moves where ten seconds is all the good reps you have. Box jumps, heavy swings, broad jumps and sprint starts get sloppy when you are tired. The long rest keeps every round as sharp as the first.',
      'With double the rest, push harder on each round. If you finish eight rounds without needing the full twenty seconds, move up to 20/20 or straight to 20/10.',
    ],
    uses: [
      'A first week of interval training with real recovery',
      'Explosive moves: box jumps, broad jumps, sprint starts',
      'Getting back into training after time off',
      'Anyone who needs the rest to be longer than the work',
    ],
    config: { mode: 'interval', prep: 0, work: 10, rest: 20, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is this really a Tabata?',
        a: 'Not strictly, and that is fine. The original is 20/10 x 8 at an all-out effort. This keeps the four minutes and eight rounds but gives you more rest.',
      },
      {
        q: 'What is the next step up from 10/20?',
        a: 'Either raise work to 20 seconds and keep 20 of rest, or keep 10 of work and cut rest to 10. The first builds fitness, the second gets you used to short rests. Each is one change in the settings.',
      },
      {
        q: 'Ten seconds is very short. How many reps is that?',
        a: 'About three to five of most moves with a weight, two or three box jumps, or eight mountain climbers per side. Count your reps in round one and try to match them in round eight.',
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
      'A 30/10 Tabata timer: 30 seconds work, 10 seconds rest, 8 rounds. A 3:1 ratio for when classic Tabata feels easy. Beeps and screen kept on. Free.',
    intro: [
      'This Tabata timer runs 30 seconds of work and 10 seconds of rest for eight rounds. That is a 3:1 ratio, a step up from the classic 2:1. It takes five minutes and twenty seconds. Ten seconds is only enough to catch one or two breaths. If you’re new, start with 30/15.',
      'The real lesson here is pacing. With so little rest, you can’t sprint round one and hold on. You need an effort you can repeat eight times. Rowers, cyclists and runners working on race pace will find this very useful.',
      'Simple, repeating moves suit it best: a rower, a bike, skipping, jogging on the spot, or wall balls if your form is solid. Save the barbell for a workout with more rest.',
    ],
    uses: [
      'Pacing practice: find an effort you can hold eight times',
      'Rower and bike intervals with very little recovery',
      'Skipping rope blocks where the rest is a break for your wrists',
      'A next step once 30/15 stops feeling hard',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 10, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Why is this harder than 20/10?',
        a: 'You work 50 percent longer each round with the same rest. The ratio goes from 2:1 to 3:1, and total work goes from 160 seconds to 240. The original at a true all-out effort is still very hard.',
      },
      {
        q: 'Can I use a barbell for this?',
        a: 'Only for a simple lift you can pick up and put down quickly, at a light weight. Ten seconds is not enough to reset a heavy lift safely. A machine or a bodyweight move is a better choice.',
      },
      {
        q: 'What if round six falls apart?',
        a: 'You probably started too fast. Try again in a few days at an effort that feels a bit too easy at first. If it still fades, use 30/15 for a while and come back.',
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
      'A 30/30 interval timer: 30 seconds work, 30 seconds rest, 8 rounds, eight minutes. Even work and rest for hard efforts with real recovery. Free.',
    intro: [
      'This 30/30 timer gives you equal work and rest: 30 seconds hard, 30 seconds easy, for eight rounds. It is the most forgiving interval shape. Runners and cyclists have used it for decades, because you can keep the effort high on every rep.',
      'Eight rounds take eight minutes, which fits nicely into a session as its own block. Thirty seconds of rest lets you get some breath back, but round eight still feels hard. If it feels easy, start the next one a little faster.',
      'It works well outdoors too. Run hard for thirty seconds, jog for thirty, with no distances to measure and no watch to check. The rising tone starts each effort. The falling tone starts the rest.',
    ],
    uses: [
      'Classic 30/30 running or cycling intervals',
      'Rowing at a hard pace you can repeat',
      'Kettlebell or dumbbell work where 10 seconds of rest is too little',
      'A first proper HIIT block if you already train',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 30, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How hard should the 30 seconds be?',
        a: 'Hard enough that eight rounds is all you would want. If round two already feels too much, you have started at sprint pace. Ease off a little.',
      },
      {
        q: 'Is 1:1 enough rest to call it recovery?',
        a: 'Partly. You start each round a little more tired than the last, and that is the point. For full recovery between efforts, use a 1:3 ratio like the 30/90 sprint timer.',
      },
      {
        q: 'Can I run it for longer than eight rounds?',
        a: 'Yes, 30/30 scales well. Twelve rounds take twelve minutes and twenty take twenty. Change Rounds in the settings before you press Start.',
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
      'A 45/15 circuit timer: 45 seconds work, 15 seconds rest, 8 rounds, eight minutes. One station per round, with clear beeps. Free and works offline.',
    intro: [
      'This 45/15 circuit timer gives you eight stations of 45 seconds, with 15 seconds to move. It takes exactly eight minutes. That makes it the shortest circuit that still covers a good range of moves without repeats.',
      'Those 15 seconds are for moving, so plan them. Set your stations out in a line and keep anything fiddly to set up out of the middle. Swap between push and pull, upper and lower body, so your breathing sets the limit, not one tired muscle.',
      'Eight rounds of 45 seconds is six minutes of real work. A dumbbell pair and a mat cover all eight stations, so it fits in a small room or a hotel gym.',
    ],
    uses: [
      'Eight-station circuits, one movement per round',
      'Small-group classes where people rotate stations',
      'Dumbbell circuits: press, row, squat, lunge, and so on',
      'A neat eight-minute block at the end of a strength session',
    ],
    config: { mode: 'interval', prep: 0, work: 45, rest: 15, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How is this different from 45/15 x 10?',
        a: 'It has two fewer stations and takes two fewer minutes. Ten rounds is the bootcamp standard because it lands on ten minutes. Eight is easier to plan when you have eight good moves to hand.',
      },
      {
        q: 'Which eight exercises work well?',
        a: 'Goblet squat, push-up, reverse lunge, dumbbell row, hip bridge, mountain climbers, dead bug and plank. Swap anything that hurts, and keep the order alternating.',
      },
      {
        q: 'Can I make the transition longer?',
        a: 'Yes. Set Rest to 20 or 30 seconds if your stations are far apart or need changing. Work stays at 45 seconds, and the total grows to match.',
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
