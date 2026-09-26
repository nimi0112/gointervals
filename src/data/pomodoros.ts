import type { ProgrammaticPage } from './types';

export const pomodoros: ProgrammaticPage[] = [
  {
    path: '/pomodoro/50-10',
    h1: '50/10 Pomodoro timer',
    title: '50/10 Pomodoro Timer – Free, No Login',
    description:
      'A 50/10 Pomodoro timer: 50 minutes of focus, 10 minutes off, and a 30 minute break after the third block. Runs in your browser, no signup.',
    intro: [
      'The 50/10 timer gives one longer work block before each short break. It can suit a task you prefer to keep open for most of an hour, such as revising a draft or working through a problem.',
      'This preset contains three 50-minute focus blocks, two 10-minute breaks and a final 30-minute break. Focus time is 150 minutes and the whole cycle takes 200 minutes, or 3 hours 20 minutes.',
      'If only one hour is available, set Focus sessions to 1 and Long break to 10. The single focus block is followed by the long-break setting, not the short-break setting.',
    ],
    uses: [
      'Long writing and editing',
      'Reading dense material that takes time to get into',
      'Coding when it takes a while to get back up to speed',
      'Exam revision in longer chunks',
    ],
    config: {
      mode: 'pomodoro',
      focus: 50,
      shortBreak: 10,
      longBreak: 30,
      sessions: 3,
    },
    faq: [
      {
        q: 'Is 50/10 still the Pomodoro technique?',
        a: 'Loosely. Francesco Cirillo’s original method uses 25 minutes of work and a 5 minute break, partly because a short block is easy to start. Fifty minutes keeps the rhythm of work and rest, and it suits you well if starting isn’t the hard part.',
      },
      {
        q: 'What if I get interrupted mid-session?',
        a: 'Press Space to pause, deal with it, then press Space again to resume. The classic method says to restart the block. In practice, pausing and carrying on works fine.',
      },
      {
        q: 'Can I change the long break?',
        a: 'Yes. You can change the focus length, short break, long break and number of sessions under the timer. Changes on this page last for this visit. The main Pomodoro timer remembers your numbers.',
      },
      {
        q: 'Does it keep time if I switch tabs?',
        a: 'Yes. The time is read from the clock, so it’s right when you come back. The tab title shows the time left. The tones only play while the page is open.',
      },
    ],
    related: [
      '/pomodoro',
      '/pomodoro/52-17',
      '/blog/pomodoro-technique-25-5',
      '/blog/best-pomodoro-length',
    ],
  },
  {
    path: '/pomodoro/52-17',
    h1: '52/17 timer',
    title: '52/17 Timer – The DeskTime Work Rhythm',
    description:
      'A 52/17 timer: 52 minutes of work, then 17 minutes off, based on DeskTime’s 2014 look at its most productive users. Free, no account.',
    intro: [
      'The 52/17 rhythm comes from an observed pattern in DeskTime user activity. It is an option to try, not evidence that these exact numbers are best for everyone.',
      'This preset runs four 52-minute focus blocks, each followed by a 17-minute break. Focus totals 208 minutes, breaks total 68, and the complete cycle takes 276 minutes, or 4 hours 36 minutes.',
      'Use it when you deliberately want a longer break between work periods. If that total does not fit your calendar, reduce Focus sessions. The linked comparison guide explains the evidence and offers a way to test different lengths.',
    ],
    uses: [
      'A steady rhythm for a full day at a desk',
      'Anyone who skips short breaks because they feel too short to matter',
      'Pairing work blocks with real meal or walk breaks',
      'Busy admin days that still need quiet focus time',
    ],
    config: {
      mode: 'pomodoro',
      focus: 52,
      shortBreak: 17,
      longBreak: 17,
      sessions: 4,
    },
    faq: [
      {
        q: 'Where do the numbers 52 and 17 come from?',
        a: 'From DeskTime’s 2014 look at its own users’ computer activity. They were the average work and break lengths of the top 10 percent. It shows what productive people happened to do, not a tested rule.',
      },
      {
        q: 'Why is the long break also 17 minutes?',
        a: 'Because this rhythm has no special long break. Every break is already a proper one, so they’re all the same length. You can change the long break in the settings if you’d like a bigger rest at the end.',
      },
      {
        q: 'Is it better than 25/5?',
        a: 'Neither has strong evidence for its exact numbers. Longer blocks suit work that’s slow to get going. Shorter blocks suit work that’s hard to start. Try each for a week and keep the one you stick with.',
      },
      {
        q: 'Does anything get saved?',
        a: 'Only in your browser. If you change the numbers on the main Pomodoro timer, they stay on your device. There’s no account, and the page can work offline once its required files are cached and an offline reload test succeeds.',
      },
    ],
    related: [
      '/pomodoro/50-10',
      '/pomodoro',
      '/blog/study-timer-vs-pomodoro',
      '/blog/best-pomodoro-length',
    ],
  },
  {
    path: '/pomodoro/90-20',
    h1: '90/20 focus timer',
    title: '90/20 Focus Timer – Long Work Blocks',
    description:
      'A 90/20 focus timer: 90 minutes of deep work, 20 minutes off, then a 30 minute break after the second block. Free, no login needed.',
    intro: [
      'The 90/20 focus timer reserves a long uninterrupted block followed by a twenty-minute break. Choose it because that schedule fits your task, not because it measures a biological attention cycle.',
      'The preset runs two 90-minute focus blocks with a 20-minute break between them and a final 30-minute break. That is 180 minutes of focus and 230 minutes overall, or 3 hours 50 minutes.',
      'If ninety minutes is too long, reduce Focus. A shorter setting does not need justification beyond fitting your work and available time. The timer ends after the final long break.',
    ],
    uses: [
      'Deep work on one problem, with no switching',
      'Practice sessions for music or a language',
      'Writing a big first draft in one sitting',
      'Mock exams and timed papers of about this length',
    ],
    config: {
      mode: 'pomodoro',
      focus: 90,
      shortBreak: 20,
      longBreak: 30,
      sessions: 2,
    },
    faq: [
      {
        q: 'Does 90 minutes match my attention cycle?',
        a: 'The timer cannot measure your attention. Treat ninety minutes as a scheduling choice, not a biological limit or an optimum.',
      },
      {
        q: 'Ninety minutes is too long for me. What should I use?',
        a: 'Try a shorter Focus setting, such as 45 or 60 minutes, and check the new total. Choose a stopping point that suits your task; ninety minutes is not a required target.',
      },
      {
        q: 'What if the bell interrupts a useful thought?',
        a: 'Leave a brief restart note and take your planned break, or adjust future blocks to fit the task. The timer provides structure; it does not judge your productivity.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'The timer requests an awake screen while running. The browser can refuse or release that request. Keep the page visible when sound cues matter.',
      },
    ],
    related: [
      '/pomodoro/50-10',
      '/pomodoro',
      '/meditation/1-hour',
      '/blog/study-timer-vs-pomodoro',
      '/blog/best-pomodoro-length',
    ],
  },
  {
    path: '/pomodoro/15-5',
    h1: '15/5 Pomodoro timer',
    title: '15/5 Pomodoro Timer – Short Focus Blocks',
    description:
      'A 15/5 Pomodoro timer: 15 minutes of focus, 5 minutes off, and a 15 minute break after the fourth round. A gentle place to start. Free.',
    intro: [
      'The 15/5 timer makes the first work commitment smaller than a standard 25-minute block. It is useful when you want to try a limited piece of a task before planning a longer session.',
      'Four 15-minute focus periods provide sixty minutes of work. Three five-minute breaks and one final fifteen-minute break bring the full cycle to ninety minutes.',
      'Choose a concrete first task, such as outlining one paragraph or sorting one folder. This is an optional schedule, not a clinical recommendation or a rule about attention spans. Change the duration if it does not fit.',
    ],
    uses: [
      'Starting one small, defined task',
      'A short practice block',
      'Tidying one area with a clear ending',
    ],
    config: {
      mode: 'pomodoro',
      focus: 15,
      shortBreak: 5,
      longBreak: 15,
      sessions: 4,
    },
    faq: [
      {
        q: 'Is fifteen minutes long enough to get anything done?',
        a: 'Yes, for lots of tasks. A finished fifteen minutes beats an unfinished fifty. It also gets you started, which is often the hardest part.',
      },
      {
        q: 'How do I grow the blocks over time?',
        a: 'Once fifteen minutes feels easy, move to 20, then 25. The breaks can stay at five. On the main Pomodoro timer, your numbers are saved in your browser, so the new length sticks.',
      },
      {
        q: 'Can I make the cycle shorter?',
        a: 'Yes. Reduce Focus sessions. With one session, you get fifteen minutes of focus followed by the configured long break.',
      },
      {
        q: 'Can I use it without setting anything up?',
        a: 'Yes. Press Start or Space and the 15/5 pattern runs as it is. There’s no account, nothing to install, and it can work offline after its required files are cached; test an offline reload first.',
      },
    ],
    related: [
      '/pomodoro',
      '/pomodoro/50-10',
      '/meditation/10-minutes',
      '/blog/pomodoro-technique-25-5',
      '/blog/best-pomodoro-length',
    ],
  },
];
