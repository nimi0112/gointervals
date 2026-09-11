import type { ProgrammaticPage } from './types';

export const pomodoros: ProgrammaticPage[] = [
  {
    path: '/pomodoro/50-10',
    h1: '50/10 Pomodoro timer',
    title: '50/10 Pomodoro Timer – Free, No Login',
    description:
      'A 50/10 Pomodoro timer: 50 minutes of focus, 10 minutes off, a 30 minute break every third session. Runs in the browser, no signup.',
    intro: [
      'The 50/10 Pomodoro timer suits work that takes a while to get into. Reading a paper, writing something long, debugging: twenty-five minutes is often over just as the context has finished loading into your head, and the break undoes the loading. Fifty minutes gives you a real stretch of it.',
      'Ten minutes off is enough to leave the desk properly rather than just scrolling in the same chair. After three sessions this preset gives you thirty minutes, which is roughly lunch, or a walk that is long enough to count as one.',
      'Three focus blocks plus their breaks is a three-hour chunk. That is about as much deep work as most people get in a day, so treat this as the shape of a morning rather than something to run four times over.',
    ],
    uses: [
      'Long-form writing and editing',
      'Reading dense material that needs a run-up',
      'Coding sessions where context takes time to rebuild',
      'Exam revision in half-hour-plus chunks',
    ],
    config: {
      mode: 'pomodoro',
      focus: 50,
      shortBreak: 10,
      longBreak: 30,
      sessionsBeforeLong: 3,
      cycles: 1,
    },
    faq: [
      {
        q: 'Is 50/10 still the Pomodoro technique?',
        a: 'Loosely. Cirillo’s method is specifically 25 minutes with a 5 minute break, and the 25 is part of the point: a short unit you cannot talk yourself out of starting. Fifty minutes keeps the structure and drops that property, which is a fair trade if starting is not your problem.',
      },
      {
        q: 'What if I get interrupted mid-session?',
        a: 'Pause with Space, deal with it, resume. Cirillo would tell you the session is void and you should start again; in practice, pausing and carrying on beats abandoning the block.',
      },
      {
        q: 'Can I change the long break?',
        a: 'Yes. Focus, short break, long break and how many sessions come before the long one are all editable under the timer, and your numbers stay in the browser for next time.',
      },
      {
        q: 'Does it keep time if I switch tabs?',
        a: 'The clock is derived from timestamps, so it is correct when you come back rather than however far behind you were away. The tab title shows the countdown, and the end-of-session tones play while the page is open and in front.',
      },
    ],
    related: [
      '/pomodoro',
      '/pomodoro/52-17',
      '/timer/50-minutes',
      '/blog/pomodoro-technique-25-5',
      '/timer/study-timer',
      '/blog/best-pomodoro-length',
    ],
  },
  {
    path: '/pomodoro/52-17',
    h1: '52/17 timer',
    title: '52/17 Timer – The DeskTime Work Rhythm',
    description:
      'A 52/17 timer: 52 minutes of work, 17 minutes off, the ratio from DeskTime’s 2014 look at its most productive users. Free, no account.',
    intro: [
      'The 52/17 timer comes from a 2014 write-up by DeskTime, a time-tracking company that looked at the logged activity of the most productive 10 percent of its users and reported that they averaged about 52 minutes of work followed by about 17 minutes away. It was an observation in one company’s usage data, not a controlled study, and the numbers are an average rather than a discovered optimum.',
      'That is worth saying plainly, because the ratio gets repeated as if it were a finding about human attention. What it does tell you is that people who get a lot done took substantial breaks, which is the useful half of the claim and the part most schedules ignore.',
      'As a working rhythm it is generous and it holds up. Fifty-two minutes is a long enough block for real work, and seventeen minutes is enough to eat something, walk outside or have an actual conversation instead of half a one. This preset runs four sessions before offering another seventeen, so the day has no special long break: every break is the long break.',
    ],
    uses: [
      'A default work rhythm for a full day at a desk',
      'Anyone who keeps skipping five-minute breaks as pointless',
      'Pairing work blocks with real meal or walk breaks',
      'Admin-heavy days that still need protected focus',
    ],
    config: {
      mode: 'pomodoro',
      focus: 52,
      shortBreak: 17,
      longBreak: 17,
      sessionsBeforeLong: 4,
      cycles: 1,
    },
    faq: [
      {
        q: 'Where do the numbers 52 and 17 come from?',
        a: 'From DeskTime’s 2014 analysis of its own users’ tracked computer activity, reporting the average work and break lengths of its top 10 percent. Treat it as a description of what productive users happened to do, not as a tested prescription.',
      },
      {
        q: 'Why is the long break also 17 minutes?',
        a: 'Because the rhythm does not have a long break in it. Every break in the original description is a proper one, so this preset keeps them all the same length. Change the long break in the settings if you want a bigger gap after four sessions.',
      },
      {
        q: 'Is it better than 25/5?',
        a: 'Neither has good evidence behind the exact numbers. Longer blocks suit work with a slow start; shorter blocks suit work you struggle to begin. Try both for a week and keep the one you actually stick to.',
      },
      {
        q: 'Does anything get saved?',
        a: 'Only in your browser. Adjusted values and any preset you save stay on the device, there is no account, and after the first visit the page works offline.',
      },
    ],
    related: [
      '/pomodoro/50-10',
      '/pomodoro',
      '/blog/study-timer-vs-pomodoro',
      '/timer/50-minutes',
      '/timer/study-timer',
      '/blog/best-pomodoro-length',
    ],
  },
  {
    path: '/pomodoro/90-20',
    h1: '90/20 focus timer',
    title: '90/20 Focus Timer – Ultradian Work Blocks',
    description:
      'A 90/20 focus timer: 90 minutes of work, 20 minutes off, two blocks before a longer break. For deep work sessions. Free, no login.',
    intro: [
      'A 90/20 focus timer is built on the ultradian idea: Nathaniel Kleitman, who also co-discovered REM sleep, described a basic rest-activity cycle of roughly 90 minutes running through the night, and the popular extension is that a similar cycle continues during the day. That extension is much less settled than the sleep work it borrows from, and the 90 minute figure is an approximation even where the cycle is well described. Do not treat it as a biological deadline.',
      'What is fair to say is that ninety minutes is close to the outer limit of sustained concentration for most people, and that pushing past it tends to produce time spent rather than work done. If you notice quality dropping at sixty, the honest number for you is sixty.',
      'Twenty minutes off after a block that long is not a luxury. The preset runs two 90 minute blocks and then a 30 minute break, which is about four hours of deliberate work and roughly the most that anyone reliably manages in a day.',
    ],
    uses: [
      'Deep work on one problem with no context switching',
      'Practice sessions for music or a language',
      'Drafting something substantial in one sitting',
      'Mock exams and timed papers of about this length',
    ],
    config: {
      mode: 'pomodoro',
      focus: 90,
      shortBreak: 20,
      longBreak: 30,
      sessionsBeforeLong: 2,
      cycles: 1,
    },
    faq: [
      {
        q: 'Is the 90 minute cycle real?',
        a: 'Kleitman’s basic rest-activity cycle is well established in sleep research. The claim that the same roughly 90 minute rhythm governs daytime attention is a plausible extension with far weaker support, so use 90 as a convenient ceiling rather than a fact about your brain.',
      },
      {
        q: 'Ninety minutes is too long for me. What should I use?',
        a: 'Drop Focus to 60 or 45 in the settings and keep the generous break. The useful part of this format is the long block plus a real rest, not the specific number.',
      },
      {
        q: 'Should I take breaks even if I am in flow?',
        a: 'If the work is genuinely flowing, finishing the thought is usually better than stopping mid-sentence. The risk is the other case, where you feel busy and are not producing anything. The marker exists so you get to notice which one it is.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'It requests a screen wake lock while running, so a laptop or phone left on the page should not dim off. The tab title shows the remaining time if you are working in another window.',
      },
    ],
    related: [
      '/pomodoro/50-10',
      '/pomodoro',
      '/timer/90-minutes',
      '/blog/study-timer-vs-pomodoro',
      '/blog/best-pomodoro-length',
    ],
  },
  {
    path: '/pomodoro/15-5',
    h1: '15/5 Pomodoro timer',
    title: '15/5 Pomodoro Timer – Short Focus Blocks',
    description:
      'A 15/5 Pomodoro timer: 15 minutes of focus, 5 minutes off, a longer break every fourth round. A gentler starting point. Free, no signup.',
    intro: [
      'The 15/5 Pomodoro timer exists because 25 minutes is not a small ask for everyone. If the hard part of the work is starting it, the size of the block is the thing standing in your way, and fifteen minutes is small enough that the argument with yourself is shorter than the session.',
      'It is a common suggestion for kids doing homework, where a quarter of an hour matches attention better than half an hour does, and it is often floated as a starting point for people with ADHD who find standard pomodoros a set-up for failure. Whether it suits you is something to work out by trying it, or with whoever helps you plan this stuff; this is a timer, not advice about anyone’s condition.',
      'Four fifteen-minute rounds with five-minute breaks comes to eighty minutes, ending in a fifteen-minute break. If the blocks start feeling too short, stretch Focus to 20 and then 25 rather than jumping straight to a long session.',
    ],
    uses: [
      'Homework blocks that match a shorter attention span',
      'Starting on a task you have been avoiding all week',
      'Building up to longer sessions a few minutes at a time',
      'Chores and tidying in small, finishable pieces',
    ],
    config: {
      mode: 'pomodoro',
      focus: 15,
      shortBreak: 5,
      longBreak: 15,
      sessionsBeforeLong: 4,
      cycles: 1,
    },
    faq: [
      {
        q: 'Is fifteen minutes long enough to get anything done?',
        a: 'For a lot of tasks, yes, and a finished fifteen minutes beats an abandoned fifty. The other thing it does is get you past the start, which is where most sessions die.',
      },
      {
        q: 'How do I grow the blocks over time?',
        a: 'Change Focus to 20, then 25, once fifteen stops feeling like the right size. The breaks can stay at five. Your numbers are saved in the browser, so each new default sticks.',
      },
      {
        q: 'Will the break beep pull my child off task?',
        a: 'That is usually the point, but if the sound is disruptive you can mute the tab and use the on-screen phase label and the tab title countdown instead.',
      },
      {
        q: 'Can I use it without setting anything up?',
        a: 'Yes. Press Space or Start and it runs the 15/5 pattern as it is. There is no account, nothing to install, and after one visit it works offline.',
      },
    ],
    related: [
      '/pomodoro',
      '/pomodoro/50-10',
      '/timer/15-minutes',
      '/blog/pomodoro-technique-25-5',
      '/blog/best-pomodoro-length',
    ],
  },
];
