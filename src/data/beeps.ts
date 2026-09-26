import type { ProgrammaticPage } from './types';

export const beeps: ProgrammaticPage[] = [
  {
    path: '/interval/beep-every-30-seconds',
    h1: 'Timer that beeps every 30 seconds',
    title: 'Timer That Beeps Every 30 Seconds – Free',
    description:
      'Mark half-minute practice blocks with a repeating 30-second timer. Twenty rounds fill ten minutes, with editable durations and a clear finish cue.',
    intro: [
      'Half-minute markers suit a drill with frequent changes: a short speaking exercise, a planned station rotation or a movement check agreed with a coach. Twenty rounds occupy ten minutes.',
      'At this frequency, a missed cue can make the sequence confusing. Keep the timer visible, test your volume and write the sequence down. The timer counts blocks but does not announce the task at each change.',
    ],
    uses: ['Half-minute speaking turns', 'A prepared station rotation', 'Short practice drills'],
    config: {
      mode: 'interval',
      prep: 0,
      work: 30,
      rest: 0,
      rounds: 20,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Why is there no rest phase?',
        a: 'Because a plain marker works best here. With Rest at 0, each 30 seconds runs straight into the next with one beep between them. Even one second of rest would add a second, different tone.',
      },
      {
        q: 'How do I make it run for half an hour?',
        a: 'Set Rounds to 60. Each round is 30 seconds, so 60 rounds is 30 minutes. There is no separate total-time field.',
      },
      {
        q: 'Does it work in the background?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Can I turn the last-three-second ticks off?',
        a: 'Not on their own. The ticks warn you the next beep is close. If you want silence, turn the Sound chip off and watch the countdown instead.',
      },
    ],
    related: [
      '/interval/beep-every-minute',
      '/interval/beep-every-2-minutes',
      '/interval',
      '/meditation',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-minute',
    h1: 'Timer that beeps every minute',
    title: 'Timer That Beeps Every Minute – Free, No Login',
    description:
      'Mark twenty one-minute practice blocks, or change the round count to fit your session. Use for planned drills or EMOM timing with the page visible.',
    intro: [
      'This timer marks twenty consecutive one-minute blocks. For an EMOM session, start your planned set at the beginning of each minute and use the time left as recovery.',
      'Outside exercise, you might use each minute for one practice question or speaking prompt. Choose the task size beforehand. If the task does not fit, change the plan rather than rushing to obey the next beep.',
    ],
    uses: [
      'Minute-by-minute practice questions',
      'EMOM sets from a training plan',
      'Timed speaking prompts',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 60,
      rest: 0,
      rounds: 20,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'How is this different from the EMOM timer?',
        a: 'It is the same idea set up another way. Here you choose how many one-minute rounds you want. On the EMOM page you type the total minutes and it works out the rest.',
      },
      {
        q: 'What happens if my set runs past the minute?',
        a: 'The next block begins on schedule. Reduce the task, lengthen the interval or stop if the plan no longer leaves appropriate recovery.',
      },
      {
        q: 'Does it keep time if I switch apps?',
        a: 'The time does, because it’s read from the clock. The beeps don’t: in the background a browser slows the page, so a minute beep can come late or not at all. For EMOM sets, leave the phone on the page and propped where you can see it.',
      },
      {
        q: 'Is there a get-ready countdown?',
        a: 'No. Press Start only when you are ready for the first block. Arrange your device and materials beforehand.',
      },
    ],
    related: [
      '/emom',
      '/interval/beep-every-30-seconds',
      '/interval/kettlebell-emom-10',
      '/blog/emom-workouts-explained',
      '/blog/timer-that-beeps-every-10-minutes',
      '/interval',
      '/meditation',
    ],
  },
  {
    path: '/interval/beep-every-2-minutes',
    h1: 'Timer that beeps every 2 minutes',
    title: 'Timer That Beeps Every 2 Minutes – Free Online',
    description:
      'Practise two-minute answers or speaking turns with fifteen consecutive blocks. Thirty minutes total, with editable timing and a clear finish cue.',
    intro: [
      'Two-minute markers can give a rehearsal a clear boundary. Practise a short answer, then use the next block to review it or try again. Fifteen blocks fill half an hour.',
      'Decide whether each beep means stop, switch speaker or begin a new attempt. With Rest at zero, there is no automatic pause to read notes. Add recovery or reduce the number of rounds if your rehearsal needs that time.',
    ],
    uses: [
      'Two-minute presentation practice',
      'Alternating rehearsal and feedback',
      'Short discussion turns',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 120,
      rest: 0,
      rounds: 15,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Can I have just one two-minute beep?',
        a: 'Yes. Set Rounds to 1 and it beeps once at the end, like a simple two-minute timer. Set Rounds to 30 for an hour of two-minute markers.',
      },
      {
        q: 'Why is rest set to 0?',
        a: 'So each beep marks a boundary, not a break. A rest phase would add a falling tone and a pause. Here you want a steady beat every two minutes.',
      },
      {
        q: 'Will it beep while I am in another tab?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Does it work without internet?',
        a: 'It can work offline once the page and required files are cached. Open this exact page online, reload, then test an offline reload and a short session before relying on it.',
      },
    ],
    related: [
      '/interval/beep-every-3-minutes',
      '/interval/beep-every-minute',
      '/interval',
      '/meditation',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-3-minutes',
    h1: 'Timer that beeps every 3 minutes',
    title: 'Timer That Beeps Every 3 Minutes – Free',
    description:
      'Mark ten three-minute practice blocks with no separate rest phase. Thirty minutes total, with editable seconds and clear cues for each new interval.',
    intro: [
      'A three-minute cue can divide a rehearsal or practice session into equal sections. Ten rounds occupy thirty minutes with no separate rest phases.',
      'This is different from boxing rounds with one-minute rests: the next block starts immediately. Choose the boxing preset when you want work and recovery timed separately, rather than letting an untimed gap shift your session.',
    ],
    uses: [
      'Three-minute speaking practice',
      'A planned drill with continuous sections',
      'Timed group discussion turns',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 180,
      rest: 0,
      rounds: 10,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'I want three-minute rounds with a minute of rest. Where is that?',
        a: 'Use the boxing round timer. It runs 3 minutes on and 1 minute off, with different tones for work and rest. This page has no rest phase at all.',
      },
      {
        q: 'How many rounds should I set?',
        a: 'As many as your session needs. It starts at 10, which is 30 minutes. Change Rounds before you press Start, up to 99.',
      },
      {
        q: 'Does it beep if my phone is locked or the tab is hidden?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Can I read it from across the room?',
        a: 'Yes. The digits are the biggest thing on the page and grow with the screen. Space starts and pauses, and Esc asks before it stops.',
      },
    ],
    related: [
      '/interval/beep-every-2-minutes',
      '/interval/beep-every-5-minutes',
      '/interval',
      '/meditation',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-5-minutes',
    h1: 'Timer that beeps every 5 minutes',
    title: 'Timer That Beeps Every 5 Minutes – Free Online',
    description:
      'Divide a meeting or practice session into five-minute turns. Twelve rounds make one hour, with editable settings and a distinct cue at the finish.',
    intro: [
      'Five-minute blocks can divide a meeting into equal speaking turns. Twelve rounds provide one hour; six provide half an hour. Agree what happens at the cue before the meeting begins.',
      'You can also use a block to review one small item, such as a slide or paragraph. If the cue repeatedly interrupts useful work, choose a longer interval. Five minutes is a scheduling choice, not a rule about posture or attention.',
    ],
    uses: ['Equal meeting turns', 'Reviewing slides one at a time', 'Short rehearsal sections'],
    config: {
      mode: 'interval',
      prep: 0,
      work: 300,
      rest: 0,
      rounds: 12,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Does this schedule a separate break?',
        a: 'No. Rest is zero, so consecutive work blocks follow each other. Add Rest if you want timed breaks, and check the larger total.',
      },
      {
        q: 'How do I get exactly one hour?',
        a: 'Set Rounds to 12. Each round is five minutes and there is no rest phase, so the last beep lands right at the hour.',
      },
      {
        q: 'Does it keep running in the background?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Do I need to leave it running to keep my settings?',
        a: 'No. This page always opens with these numbers. The main interval timer remembers your own settings in your browser. Settings are stored locally. Usage analytics are separate from those settings.',
      },
    ],
    related: [
      '/interval/beep-every-10-minutes',
      '/interval/beep-every-3-minutes',
      '/interval',
      '/blog/timer-that-beeps-every-10-minutes',
      '/meditation',
    ],
  },
  {
    path: '/interval/beep-every-10-minutes',
    h1: 'Timer that beeps every 10 minutes',
    title: 'Timer That Beeps Every 10 Minutes – Free',
    description:
      'Set six ten-minute check-ins across an hour, or change the round count. A repeating timer for projects and workshops, with visible timing and cues.',
    intro: [
      'This timer marks six ten-minute blocks across one hour. Use the cue as a planned check-in during a project, or assign one activity to each block in a workshop.',
      'For example, five blocks can hold five discussion questions and the sixth a wrap-up. The final boundary plays the finish cue. Keep the page visible; browser beeps are not suitable as guaranteed medical or exposure alarms.',
    ],
    uses: ['Project check-ins', 'Workshop sections', 'A finite sequence of discussion topics'],
    config: {
      mode: 'interval',
      prep: 0,
      work: 600,
      rest: 0,
      rounds: 6,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Can I make it repeat all day?',
        a: 'Yes. Set Rounds to 48 for eight hours of ten-minute beeps. Rounds goes up to 99, which is a little over 16 hours.',
      },
      {
        q: 'Will it beep when I am working in another window?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'What do the different sounds mean?',
        a: 'A rising pair of tones starts each block. Three short ticks count down the last three seconds. A three-note tune plays when the last round ends. With rest at 0 you never hear the falling rest tone.',
      },
      {
        q: 'Does it remember my numbers?',
        a: 'This page always opens with 10 minutes and 6 rounds. The main interval timer remembers your own numbers in your browser. Settings are stored locally. Usage analytics are separate from those settings.',
      },
    ],
    related: [
      '/interval/beep-every-15-minutes',
      '/interval/beep-every-5-minutes',
      '/interval',
      '/blog/timer-that-beeps-every-10-minutes',
      '/meditation',
    ],
  },
  {
    path: '/interval/beep-every-15-minutes',
    h1: 'Timer that beeps every 15 minutes',
    title: 'Timer That Beeps Every 15 Minutes – Free Online',
    description:
      'Divide an hour into four fifteen-minute blocks for a project or workshop. No automatic breaks, with editable rounds and a clear end to the session.',
    intro: [
      'Quarter-hour blocks provide four markers within an hour. Use them to divide a larger task into parts, such as sorting, drafting, checking and filing.',
      'There is no scheduled break between these blocks. If you want fifteen minutes of work followed by a five-minute break, choose the 15/5 Pomodoro page instead. Here, Rest is zero and each new work interval begins immediately.',
    ],
    uses: [
      'Dividing a project into four parts',
      'Chore blocks with a defined scope',
      'Quarter-hour workshop activities',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 900,
      rest: 0,
      rounds: 4,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Should I use this or a pomodoro timer?',
        a: 'Use the pomodoro timer if you want your breaks planned for you, including a longer one at the end. Use this if you only want quarter-hour beeps and prefer to decide on breaks as you go.',
      },
      {
        q: 'How do I run it for a whole afternoon?',
        a: 'Set Rounds to 16 for four hours. Rounds goes up to 99. The total is always rounds times 15 minutes, because there is no rest.',
      },
      {
        q: 'Does it work with the tab in the background?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Can I use the keyboard?',
        a: 'Yes. Space starts and pauses. While it runs, R asks before it resets and Esc asks before it stops. The keys are ignored while you are typing in a field.',
      },
    ],
    related: [
      '/interval/beep-every-20-minutes',
      '/interval/beep-every-10-minutes',
      '/pomodoro',
      '/interval',
      '/meditation',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-20-minutes',
    h1: 'Timer that beeps every 20 minutes',
    title: 'Timer That Beeps Every 20 Minutes – Free',
    description:
      'Mark three twenty-minute stages of a project or practice session. One hour total, with editable rounds and cues while the timer page stays visible.',
    intro: [
      'Three twenty-minute blocks occupy one hour. You might use one for a draft, one for revision and one for checking details, with the cue marking your planned change.',
      'This timer does not automatically insert a short break or measure any health outcome. If you use it as a reminder to step away from the screen, decide the break length separately. Use a device alarm when a reliable wake-up or appointment alert is essential.',
    ],
    uses: [
      'Three stages of a work session',
      'A planned reminder to step away',
      'Twenty-minute workshop sections',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 1200,
      rest: 0,
      rounds: 3,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Is the 20-20-20 rule actually evidence based?',
        a: 'It is a common tip from eye-care groups, not the result of one big study. The problem it targets is real: staring close up for long spells and blinking less. Treat the exact numbers as a handy rule of thumb.',
      },
      {
        q: 'Can I use this as a guaranteed alarm?',
        a: 'No. A browser timer may be suspended or silenced. Use a device alarm for waking up or any important deadline.',
      },
      {
        q: 'Does it run while I am in another app?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Why not just set a repeating phone alarm?',
        a: 'For all-day reminders, a phone alarm is the sturdier choice. This timer is handy when you want to start and stop the rhythm around a work session and see the countdown.',
      },
    ],
    related: [
      '/interval/beep-every-30-minutes',
      '/interval/beep-every-15-minutes',
      '/interval',
      '/meditation/20-minutes',
      '/meditation',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-30-minutes',
    h1: 'Timer that beeps every 30 minutes',
    title: 'Timer That Beeps Every 30 Minutes – Free Online',
    description:
      'Set four half-hour progress checks across a two-hour project. Change the round count and keep the page visible for this repeating browser timer.',
    intro: [
      'Four half-hour blocks give you two hours of markers. They can help you check progress on a long project without watching a clock continuously.',
      'A marker does not say the task is finished. At each cue, decide whether to keep working on the same part or move to the next. Choose a proper alarm for any deadline or process where a missed cue has important consequences.',
    ],
    uses: [
      'Progress reviews during a project',
      'Half-hour practice sections',
      'Switching between planned desk tasks',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 1800,
      rest: 0,
      rounds: 4,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Should I rely on this for anything medical?',
        a: 'No. It is a browser timer and cannot promise to sound. It cannot wake a sleeping phone or beep with the tab closed. If a missed check matters, use a proper alarm or a device made for the job.',
      },
      {
        q: 'How long can I make it run?',
        a: 'Rounds can be set from 1 to 99. At thirty minutes per round, sixteen rounds take eight hours. Long sessions depend on device power and browser behaviour.',
      },
      {
        q: 'Does it keep time in the background?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Can I see the time left without switching to the tab?',
        a: 'Yes. The browser tab title shows the time left while the timer runs or is paused. A quick look at your tabs is enough. It goes back to normal when you reset.',
      },
    ],
    related: [
      '/interval/beep-every-hour',
      '/interval/beep-every-20-minutes',
      '/meditation/30-minutes',
      '/interval',
      '/meditation',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-hour',
    h1: 'Timer that beeps every hour',
    title: 'Timer That Beeps Every Hour – Hourly Chime',
    description:
      'Use an hourly chime for a work log or project check-in. Eight elapsed hours by default, starting from your first click rather than the clock hour.',
    intro: [
      'An hourly chime can prompt a brief time-log entry: what did you spend the last hour doing, and what comes next? Eight rounds cover eight elapsed hours, though you can choose fewer.',
      'The schedule starts when you press Start. Beginning at 9:17 produces boundaries at 10:17, 11:17 and so on, not at clock-hour boundaries. Pausing also shifts the later cues. Use clock alarms if you need fixed times of day.',
    ],
    uses: [
      'Writing a brief hourly time log',
      'Reviewing a planned workday',
      'Long project check-ins',
    ],
    config: {
      mode: 'interval',
      prep: 0,
      work: 3600,
      rest: 0,
      rounds: 8,
      sets: 1,
      setRest: 0,
    },
    faq: [
      {
        q: 'Will it chime on the hour, like 10:00 and 11:00?',
        a: 'No. It chimes one hour after you press Start, then every hour after that. To match the clock, press Start right on the hour.',
      },
      {
        q: 'Does it beep if I minimise the browser?',
        a: 'A hidden page or locked device may delay or suppress a cue. Keep the timer visible and test your setup. The countdown can recover elapsed time when the page resumes, but a missed cue cannot be delivered on time afterwards.',
      },
      {
        q: 'Can I run it for a twelve-hour shift?',
        a: 'Yes. Set Rounds to 12 and check the total. Plan for battery use and keep the page visible; the browser may release its awake-screen request.',
      },
      {
        q: 'Does it need an account or an internet connection?',
        a: 'It can work offline once the page and required files are cached. Open this exact page online, reload, then test an offline reload and a short session before relying on it.',
      },
    ],
    related: [
      '/interval/beep-every-30-minutes',
      '/interval/beep-every-15-minutes',
      '/meditation/1-hour',
      '/interval',
      '/meditation',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
];
