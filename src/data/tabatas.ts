import type { ProgrammaticPage } from './types';
import { TABATA } from '../engine/schedule';

export const tabatas: ProgrammaticPage[] = [
  {
    path: '/tabata/20-10-8',
    h1: 'Tabata timer 20/10 x 8',
    title: 'Tabata Timer 20/10 x 8 – The Original 4 Minute Protocol',
    description:
      'Run the classic 20/10 timer for eight rounds and four minutes, including the final rest. Check the timing and prepare your session before starting.',
    intro: [
      'This is the fixed 20/10 clock: eight twenty-second work periods and eight ten-second rests. Work totals 2:40, rest totals 1:20, and the session ends at 4:00.',
      'The timing is associated with Tabata training, but a timer alone does not reproduce the original research intervention. Choose the activity and effort from an appropriate plan. Prepare before pressing Start; no warm-up is built into the block.',
    ],
    config: TABATA,
    faq: [
      {
        q: 'Can I change the classic timing here?',
        a: 'No. This page uses the fixed Tabata mode: 20 seconds work, 10 seconds rest and eight rounds. Choose an interval variant to edit the durations.',
      },
      {
        q: 'Does four minutes include the final rest?',
        a: 'Yes. The last work period ends at 3:50 and the final rest brings the total to 4:00.',
      },
      {
        q: 'Does this reproduce the original study?',
        a: 'It reproduces the familiar timing pattern, not the full intervention. The original research also specified equipment, intensity and a repeated training programme.',
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
    h1: 'Tabata-style interval timer 30/15 x 8',
    title: 'Tabata Timer 30/15 x 8 – 6 Minute Interval Preset',
    description:
      'Time eight rounds of 30 seconds work and 15 seconds recovery. Six minutes including the final rest, with editable seconds and distinct phase cues.',
    intro: [
      'Thirty-second efforts give you more time within each work period than the classic twenty-second clock. The fifteen-second rests still make transitions short, so set up any equipment before starting.',
      'Eight pairs take six minutes, including four minutes of work. This is a Tabata-style interval variation, not the original protocol. The longer rest does not automatically make it easier, because the work period is longer too.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 30,
      rest: 15,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 8 work periods and 8 rests, including the last rest: 360 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/20-10-8',
      '/tabata/40-20-8',
      '/tabata',
      '/blog/hiit-interval-timer-beginners',
      '/interval',
      '/blog/what-is-a-tabata-timer',
    ],
  },
  {
    path: '/tabata/40-20-8',
    h1: 'Tabata-style interval timer 40/20 x 8',
    title: 'Tabata Timer 40/20 x 8 – 8 Minute HIIT Preset',
    description:
      'Set eight one-minute cycles of 40 seconds work and 20 seconds recovery. Edit your work, rest and round count to match a prepared circuit or session.',
    intro: [
      'This 40/20 timer divides each minute into forty seconds of work and twenty seconds of recovery or transition. Eight rounds therefore fill an eight-minute block.',
      'Use the twenty seconds to reset for your planned next station. If changing equipment takes longer, increase Rest instead of hurrying. The timing does not prescribe a weight, repetition count or exercise.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 40,
      rest: 20,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 8 work periods and 8 rests, including the last rest: 480 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/30-15-8',
      '/tabata/45-15-10',
      '/interval',
      '/tabata',
      '/blog/what-is-a-tabata-timer',
    ],
  },
  {
    path: '/tabata/45-15-10',
    h1: 'Tabata-style interval timer 45/15 x 10',
    title: 'Tabata Timer 45/15 x 10 – 10 Minute Circuit Preset',
    description:
      'Time ten planned stations with 45 seconds work and 15 seconds transition. A ten-minute block with editable recovery and clear work and rest cues.',
    intro: [
      'Ten rounds of 45 seconds work and 15 seconds rest occupy ten minutes. That provides 7:30 of work and 2:30 of recovery, including the last rest.',
      'This layout can time ten planned stations. Write the sequence down, arrange the space and allow enough time for transitions. The timer displays a round number rather than announcing the next exercise.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 45,
      rest: 15,
      rounds: 10,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 10 work periods and 10 rests, including the last rest: 600 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/40-20-8',
      '/interval/7-minute-workout',
      '/tabata',
      '/interval/beep-every-minute',
      '/interval',
      '/blog/what-is-a-tabata-timer',
    ],
  },
  {
    path: '/tabata/60-30-6',
    h1: 'Tabata-style interval timer 60/30 x 6',
    title: 'Tabata Timer 60/30 x 6 – 9 Minute Long-Interval Preset',
    description:
      'Run six rounds of one minute work and thirty seconds recovery. Nine minutes including the final rest, with editable durations to match your plan.',
    intro: [
      'Six rounds of one minute work and thirty seconds recovery take nine minutes. Work totals six minutes; recovery totals three.',
      'Choose an effort that belongs in your training plan for a full minute. The clock does not require a sprint. If you split the session into two blocks of three rounds, take any longer gap separately before Run again.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 60,
      rest: 30,
      rounds: 6,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 6 work periods and 6 rests, including the last rest: 540 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/45-15-10',
      '/interval/running-intervals-1-1',
      '/interval',
      '/emom',
      '/tabata',
      '/blog/what-is-a-tabata-timer',
    ],
  },
  {
    path: '/tabata/20-10-4',
    h1: 'Tabata-style interval timer 20/10 x 4',
    title: 'Tabata Timer 20/10 x 4 – 2 Minute Half Tabata',
    description:
      'Time four rounds of 20 seconds work and 10 seconds rest. A two-minute interval block with editable seconds, round counts and work and rest cues.',
    intro: [
      'Four rounds of 20 seconds work and 10 seconds rest produce a two-minute block. This is half the round count of the classic eight-round clock.',
      'A shorter total does not make maximal effort a beginner prescription. Use the block to time a suitable planned activity. If you need more recovery, edit Rest; there is no requirement to progress automatically to eight rounds.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 20,
      rest: 10,
      rounds: 4,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 4 work periods and 4 rests, including the last rest: 120 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/20-10-8',
      '/tabata/10-20-8',
      '/tabata',
      '/blog/hiit-interval-timer-beginners',
      '/blog/how-long-is-a-tabata-workout',
      '/interval',
      '/blog/what-is-a-tabata-timer',
    ],
  },
  {
    path: '/tabata/10-20-8',
    h1: 'Tabata-style interval timer 10/20 x 8',
    title: '10/20 Interval Timer – 8 Rounds with Longer Recovery',
    description:
      'Run ten-second efforts with twenty-second rests for eight rounds. Four minutes total, with editable timing to match an activity you have planned.',
    intro: [
      'This variation places twenty seconds of recovery after each ten-second effort. Across eight rounds, you get eighty seconds of work within a four-minute session.',
      'The short work period can be useful for a task that ends quickly, but it is not a reason to rush a technical movement or add heavy weight. Choose the activity first and give yourself enough time to reset.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 10,
      rest: 20,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 8 work periods and 8 rests, including the last rest: 240 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/20-10-4',
      '/tabata/20-10-8',
      '/tabata',
      '/blog/what-is-a-tabata-timer',
      '/blog/how-long-is-a-tabata-workout',
      '/interval',
    ],
  },
  {
    path: '/tabata/30-10-8',
    h1: 'Tabata-style interval timer 30/10 x 8',
    title: '30/10 Interval Timer – 8 Rounds, 5 Minutes 20 Seconds',
    description:
      'Time eight rounds of 30 seconds work and 10 seconds rest. A 5:20 interval block with editable recovery, phase cues and a clearly displayed round count.',
    intro: [
      'Thirty seconds work followed by ten seconds rest is a 3:1 ratio. Eight rounds total 5:20, with four minutes of work and 1:20 of recovery.',
      'Compared with 20/10, each work period is ten seconds longer while recovery stays the same. Plan effort and transitions accordingly. A familiar simple setup is easier to organise than moving between distant stations.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 30,
      rest: 10,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 8 work periods and 8 rests, including the last rest: 320 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/30-15-8',
      '/tabata/30-30-8',
      '/tabata',
      '/interval',
      '/blog/how-long-is-a-tabata-workout',
      '/blog/what-is-a-tabata-timer',
    ],
  },
  {
    path: '/tabata/30-30-8',
    h1: 'Tabata-style interval timer 30/30 x 8',
    title: 'Tabata Timer 30/30 x 8 – 8 Minute 1:1 Intervals',
    description:
      'Run equal thirty-second work and recovery periods for eight rounds. Eight minutes total, or edit the seconds and round count to match your session.',
    intro: [
      'Equal thirty-second work and recovery periods make the arithmetic easy to inspect: eight rounds take eight minutes, split equally between work and rest.',
      'Use this editable page when your plan calls for seconds rather than whole minutes. It is also a useful starting point for short holds with recovery. Equal duration does not guarantee full recovery; adjust the session when needed.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 30,
      rest: 30,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 8 work periods and 8 rests, including the last rest: 480 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/30-10-8',
      '/tabata/45-15-8',
      '/interval',
      '/blog/what-is-a-tabata-timer',
      '/blog/how-long-is-a-tabata-workout',
      '/tabata',
    ],
  },
  {
    path: '/tabata/45-15-8',
    h1: 'Tabata-style interval timer 45/15 x 8',
    title: 'Tabata Timer 45/15 x 8 – 8 Minute Circuit',
    description:
      'Time eight planned stations with 45 seconds work and 15 seconds rest. An eight-minute block with editable transitions and clear work and rest cues.',
    intro: [
      'Eight stations of 45 seconds work and 15 seconds transition take eight minutes. Six minutes are work, and two are recovery or movement between stations.',
      'Compared with the ten-round version, this leaves out two stations. Decide the sequence before starting and keep it visible. If your equipment needs more than fifteen seconds to change, extend Rest and check the new total.',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 45,
      rest: 15,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is this the original Tabata protocol?',
        a: 'No. Classic Tabata timing is 20/10 for eight rounds. This is an editable interval variation; exercise and effort remain your choice.',
      },
      {
        q: 'What does the total include?',
        a: 'The default includes 8 work periods and 8 rests, including the last rest: 480 seconds altogether. Preparation and any longer gaps are separate.',
      },
      {
        q: 'Can I add a longer gap between blocks?',
        a: 'Run one block, take your planned gap separately, then choose Run again. Increasing Rounds repeats the same pair without adding longer gaps.',
      },
    ],
    related: [
      '/tabata/45-15-10',
      '/tabata/30-30-8',
      '/tabata',
      '/blog/what-is-a-tabata-timer',
      '/blog/how-long-is-a-tabata-workout',
      '/interval',
    ],
  },
];
