import type { ProgrammaticPage } from './types';

export const pomodoros: ProgrammaticPage[] = [
  {
    path: '/pomodoro/50-10',
    h1: '50/10 Pomodoro timer',
    title: '50/10 Pomodoro Timer – Free, No Login',
    description:
      'A 50/10 Pomodoro timer: 50 minutes of focus, 10 minutes off, and a 30 minute break after the third block. Runs in your browser, no signup.',
    intro: [
      'The 50/10 Pomodoro timer gives you 50 minutes of focus, then a 10 minute break. It suits work that takes a while to get into, like reading, long writing or debugging. Twenty-five minutes can end just as you’ve warmed up. Fifty gives you a real stretch of focus.',
      'Ten minutes is enough to leave your desk properly. Stand up, get a drink or step outside. After the third focus block you get a 30 minute break, which is about right for lunch or a proper walk.',
      'The whole cycle is three focus blocks with two short breaks, just under three hours. Then comes the long break, and the timer stops. That’s a good amount of deep work for most people, so think of it as the shape of a morning.',
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
      'The 52/17 timer gives you 52 minutes of work, then 17 minutes off. The numbers come from DeskTime, a time-tracking company. In 2014 it looked at its most productive 10 percent of users. On average, they worked for about 52 minutes, then took about 17 minutes away.',
      'This was one company’s look at its own data, not a scientific study. So the numbers are an average, not a magic formula. The helpful lesson is simple: people who got a lot done took real breaks.',
      'It makes a kind, steady rhythm for a work day. Fifty-two minutes is long enough for real work. Seventeen is enough to eat, walk outside or have a proper chat. This preset runs four work blocks, each followed by 17 minutes off, and then it stops. Every break is a long break.',
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
        a: 'Only in your browser. If you change the numbers on the main Pomodoro timer, they stay on your device. There’s no account, and after your first visit the page works offline.',
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
    title: '90/20 Focus Timer – Ultradian Work Blocks',
    description:
      'A 90/20 focus timer: 90 minutes of deep work, 20 minutes off, then a 30 minute break after the second block. Free, no login needed.',
    intro: [
      'The 90/20 focus timer gives you 90 minutes of deep work, then a 20 minute break. “Ultradian” means a body rhythm that repeats more than once a day, like the roughly 90 minute cycle of alertness some researchers describe. The idea comes from sleep research. Nathaniel Kleitman, who helped discover REM sleep, described a rest-and-activity cycle of about 90 minutes during the night. Some believe a similar cycle runs through the day, but that part is much less certain. So take 90 minutes as a rough guide, not a rule for your body.',
      'Ninety minutes is near the upper limit of steady focus for most people. Past that, you tend to put in time without getting much done. If your focus fades at sixty minutes, sixty is your number.',
      'After a block this long, twenty minutes off is well earned. The preset runs two 90 minute blocks with a 20 minute break between them. A 30 minute break follows, and then it stops. That’s three hours of focused work, and about as much as most people can do well in a day.',
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
        q: 'Is the 90 minute cycle real?',
        a: 'At night, yes. Kleitman’s 90 minute sleep cycle is well studied. The daytime version has much less support, so treat 90 minutes as a handy upper limit, not a fact about your brain.',
      },
      {
        q: 'Ninety minutes is too long for me. What should I use?',
        a: 'Lower Focus to 60 or 45 in the settings and keep the long breaks. What helps most is a long block with a real rest, not the exact number.',
      },
      {
        q: 'Should I take breaks even if I am in flow?',
        a: 'If the work is truly flowing, finish your thought first. Just be honest about whether you’re in flow or only feeling busy. The break signal gives you a moment to check.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'Yes, while the timer is running, your laptop or phone screen should stay on. If you’re working in another window, the tab title shows the time left.',
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
      'The 15/5 Pomodoro timer gives you 15 minutes of focus, then a 5 minute break. It’s a gentle option when 25 minutes feels like too much. If starting is the hard part, a smaller block really helps. Fifteen minutes is short enough to just begin.',
      'It’s often suggested for kids doing homework, since fifteen minutes fits a shorter attention span. It’s also a common starting point for people with ADHD. The best way to know if it suits you is to try it, or to ask whoever helps you plan. This is a timer, not medical advice.',
      'You get four 15 minute rounds with 5 minute breaks between them, which takes 75 minutes. Then comes a 15 minute break, and the timer stops. If the blocks start to feel short, raise Focus to 20, then 25, one step at a time.',
    ],
    uses: [
      'Homework blocks for a shorter attention span',
      'Starting a task you’ve been putting off',
      'Building up to longer sessions a few minutes at a time',
      'Chores and tidying in small, doable pieces',
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
        q: 'Will the break beep pull my child off task?',
        a: 'That’s usually the idea. If the sound is too much, turn Sound off under the timer. The on-screen label and the tab title still show where you are.',
      },
      {
        q: 'Can I use it without setting anything up?',
        a: 'Yes. Press Start or Space and the 15/5 pattern runs as it is. There’s no account, nothing to install, and after one visit it works offline.',
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
