import type { ProgrammaticPage } from './types';

export const countdowns: ProgrammaticPage[] = [
  {
    path: '/timer/1-minute',
    h1: '1 minute timer',
    title: '1 Minute Timer – Free Online Countdown',
    description:
      'A 1 minute timer that runs in your browser. Hit start, get a beep at zero. No login, no app, and the tab title counts down with you.',
    intro: [
      'A 1 minute timer is the unit of most small bets with yourself. Hold the plank. Sit still. Let the tea steep. Sixty seconds is long enough to notice and short enough that you will not quit.',
      'Press Space to start or pause. The tab title shows the time left, so you can flip to another window and still see it ticking. At zero it beeps.',
      'It keeps the screen awake while it runs, which matters when your hands are on the floor and not on the phone.',
    ],
    uses: [
      'A one minute plank or wall sit',
      'Steeping green tea',
      'A single round of box breathing',
      'Timed writing sprints',
    ],
    config: { mode: 'countdown', seconds: 60 },
    faq: [
      {
        q: 'How do I set a 1 minute timer?',
        a: 'Open this page and press start, or hit Space. It is already set to 60 seconds.',
      },
      {
        q: 'Will it still ring if I switch tabs?',
        a: 'The countdown is tracked from timestamps, so the time stays correct no matter what the tab is doing. The beep plays when the tab is open, or as soon as you come back to it.',
      },
      {
        q: 'Can I change it to 2 minutes?',
        a: 'Yes. Edit the duration on the timer itself, or jump straight to the 2 minute page.',
      },
      {
        q: 'Does it work without internet?',
        a: 'After the first load, yes. It runs entirely in the browser.',
      },
    ],
    related: ['/timer/2-minutes', '/timer/30-seconds', '/timer/90-seconds', '/timer'],
  },
  {
    path: '/timer/2-minutes',
    h1: '2 minute timer',
    title: '2 Minute Timer – Free Online Countdown',
    description:
      'A 2 minute timer for brushing teeth, planks and steeping tea. Runs in the browser, beeps at zero, keeps the screen on. No signup needed.',
    intro: [
      'A 2 minute timer is the dentist number, and the reason most people find out they had been brushing for forty seconds their whole life. It is also black tea, a short stretch, and the length of a decent argument with yourself about starting a task.',
      'Start it with the button or with Space. The remaining time shows up in the tab title, and a beep lands at zero.',
      'Nothing to install and no account. It stays accurate in the background because it reads the clock rather than counting frames.',
    ],
    uses: [
      'Brushing your teeth properly',
      'Steeping black tea',
      'A two minute plank hold',
      'Timed cooldown between sets',
    ],
    config: { mode: 'countdown', seconds: 120 },
    faq: [
      {
        q: 'How do I set a 2 minute timer on my phone?',
        a: 'Open this page in your mobile browser and press start. You can add it to your home screen if you use it daily.',
      },
      {
        q: 'Is 2 minutes really how long to brush?',
        a: 'That is the standard advice from most dental associations, roughly thirty seconds per quadrant.',
      },
      {
        q: 'Will it ring if the screen locks?',
        a: 'The timer keeps correct time either way. The screen-wake lock holds the display on while the tab is in the foreground, and the beep plays when the tab is open or the moment you return.',
      },
      {
        q: 'Can I change the length?',
        a: 'Yes, set any duration on the timer, or use one of the other preset pages.',
      },
    ],
    related: ['/timer/1-minute', '/timer/3-minutes', '/timer/5-minutes', '/timer'],
  },
  {
    path: '/timer/3-minutes',
    h1: '3 minute timer',
    title: '3 Minute Timer – Free Online Countdown',
    description:
      'A 3 minute timer for boxing rounds, steeping tea and short drills. Beeps at zero, keeps the screen on, works offline after the first load.',
    intro: [
      'A 3 minute timer is a boxing round. It is also the length most amateur bouts, heavy bag sets and shadowboxing drills are built around, which is why three minutes feels longer than it reads.',
      'Outside the gym it is a soft boiled egg on the short side, oolong steeping, and roughly how long it takes to decide you are not going to answer that email.',
      'Space starts and pauses. The tab title carries the countdown, and the beep at zero is the bell.',
    ],
    uses: [
      'One boxing or kickboxing round',
      'Heavy bag and shadowboxing sets',
      'Steeping oolong tea',
      'A three minute plank challenge',
    ],
    config: { mode: 'countdown', seconds: 180 },
    faq: [
      {
        q: 'Is a boxing round 3 minutes?',
        a: 'Professional mens rounds are three minutes with a one minute rest. Amateur and womens formats vary, often two minutes.',
      },
      {
        q: 'Can I get repeating rounds instead of one countdown?',
        a: 'Yes. The boxing rounds page runs 3 minutes on, 1 minute off, repeating, so you do not have to restart between rounds.',
      },
      {
        q: 'Will it still beep if I switch tabs?',
        a: 'The countdown stays accurate because it is timestamp based. The beep fires while the tab is open, or right when you come back.',
      },
      { q: 'Do I need an account?', a: 'No. There is no login and nothing to install.' },
    ],
    related: ['/interval/boxing-rounds-3-1', '/timer/1-minute', '/timer/5-minutes', '/interval'],
  },
  {
    path: '/timer/4-minutes',
    h1: '4 minute timer',
    title: '4 Minute Timer – Free Online Countdown',
    description:
      'A 4 minute timer, the length of a full Tabata block. Runs in your browser, beeps at zero and keeps the screen awake while you work.',
    intro: [
      'A 4 minute timer is the Tabata number: eight rounds of twenty seconds on and ten off, which is the original protocol and the reason four minutes has a reputation it did not ask for.',
      'It is also a soft boiled egg with a runny yolk, a pour over brew, and about one song of skipping rope.',
      'Press Space to start. The tab title shows what is left, the screen stays on, and it beeps when time is up.',
    ],
    uses: [
      'One full Tabata block',
      'Soft boiled eggs',
      'A pour over coffee brew',
      'Jump rope rounds',
    ],
    config: { mode: 'countdown', seconds: 240 },
    faq: [
      {
        q: 'Why is Tabata 4 minutes?',
        a: 'The original protocol is eight rounds of twenty seconds hard and ten seconds rest, which comes to exactly four minutes.',
      },
      {
        q: 'Can I get the 20/10 beeps instead of one countdown?',
        a: 'Yes, use the Tabata page. It calls out each work and rest interval so you do not have to watch the screen.',
      },
      {
        q: 'Does it work in the background?',
        a: 'The time stays correct from timestamps whatever the tab is doing, and the beep plays when the tab is open or as soon as you return to it.',
      },
      {
        q: 'Can I change it to 5 minutes?',
        a: 'Yes, adjust the duration on the timer or open the 5 minute page.',
      },
    ],
    related: ['/tabata', '/tabata/20-10-8', '/timer/20-seconds', '/timer/5-minutes'],
  },
  {
    path: '/timer/5-minutes',
    h1: '5 minute timer',
    title: '5 Minute Timer – Free Online Countdown with Alarm',
    description:
      'A 5 minute timer with an alarm at zero. Free, no signup, runs in your browser and keeps the screen on. Press Space to start or pause.',
    intro: [
      'A 5 minute timer is the most useful five minutes you can borrow. It is the hard boiled egg lower bound, the rice rest, the stretch you keep skipping, and the standard answer to "just five more minutes" before you actually get up.',
      'It is also the classic procrastination hack. Tell yourself you will only work for five minutes, start the timer, and see what happens at zero.',
      'Space starts and pauses. The tab title counts down so you can work in another window, and the alarm beeps when time is up.',
    ],
    uses: [
      'A five minute focus warmup',
      'Letting rice rest off the heat',
      'Guided breathing or stretching',
      'Short break between work blocks',
    ],
    config: { mode: 'countdown', seconds: 300 },
    faq: [
      {
        q: 'How do I set a 5 minute timer on my phone?',
        a: 'Open this page in any mobile browser and press start. No app install, and you can save it to your home screen.',
      },
      {
        q: 'Will it still ring if I switch tabs?',
        a: 'The countdown is tracked from timestamps, so it never drifts. The beep plays if the tab stays open, or the instant you switch back.',
      },
      {
        q: 'Can I change it to 6 minutes?',
        a: 'Yes. Edit the duration directly on the timer, or open the 6 minute page.',
      },
      {
        q: 'Is it free?',
        a: 'Yes, free with no account, no ads in your way and nothing to download.',
      },
    ],
    related: ['/timer/10-minutes', '/timer/3-minutes', '/timer/15-minutes', '/timer'],
  },
  {
    path: '/timer/6-minutes',
    h1: '6 minute timer',
    title: '6 Minute Timer – Free Online Countdown',
    description:
      'A 6 minute timer for hard boiled eggs, warmups and short drills. Beeps at zero, shows the time in the tab title, no account required.',
    intro: [
      'A 6 minute timer is the egg number people argue about, and it gets you a jammy yolk that still runs a little, which is the whole point of not going to seven.',
      'It also covers a walking test, a short mobility flow, or the first block of a warmup before anything gets serious.',
      'Start with Space, watch it in the tab title, and listen for the beep. The screen stays awake while it runs.',
    ],
    uses: [
      'Jammy six minute eggs',
      'A short mobility warmup',
      'Six minute walk test',
      'Reading or journaling sprints',
    ],
    config: { mode: 'countdown', seconds: 360 },
    faq: [
      {
        q: 'Is 6 minutes right for a boiled egg?',
        a: 'For a large egg dropped into already boiling water, six minutes gives a set white and a soft, slightly runny yolk. Seven is firmer.',
      },
      {
        q: 'Will the alarm work in the background?',
        a: 'The timer keeps correct time from timestamps regardless. The beep plays while the tab is open, or as soon as you come back to it.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any length on the timer itself, or use the 5 or 7 minute pages.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes, after the first load it runs entirely in your browser.',
      },
    ],
    related: ['/timer/5-minutes', '/timer/7-minutes', '/timer/10-minutes', '/timer'],
  },
  {
    path: '/timer/7-minutes',
    h1: '7 minute timer',
    title: '7 Minute Timer – Free Online Countdown',
    description:
      'A 7 minute timer for the classic bodyweight workout, firm boiled eggs and short focus blocks. Beeps at zero and keeps the screen on.',
    intro: [
      'A 7 minute timer is best known for the workout. Twelve bodyweight exercises, thirty seconds each, ten seconds between, and it is over before you can talk yourself out of it.',
      'Seven minutes is also a firm boiled egg, a full song and a half, and about the right length for a stretch you will actually finish.',
      'Space starts and pauses. The countdown shows in the tab title and a beep marks zero.',
    ],
    uses: [
      'The classic 7 minute workout',
      'Firm boiled eggs',
      'A short guided meditation',
      'Quick tidy up sprints',
    ],
    config: { mode: 'countdown', seconds: 420 },
    faq: [
      {
        q: 'Can I get the 30/10 cues for the 7 minute workout?',
        a: 'Yes. The 7 minute workout page runs the twelve stations with beeps between them, so you do not need to watch the clock.',
      },
      {
        q: 'Will it ring if I lock my phone?',
        a: 'Time stays correct either way since it reads timestamps. The screen-wake lock keeps the display on while the tab is in front, and the beep plays when the tab is open or the moment you return.',
      },
      {
        q: 'Can I change it to 8 minutes?',
        a: 'Yes, edit the duration or open the 8 minute page.',
      },
      {
        q: 'Do I need to sign up?',
        a: 'No. No login, no install, and it works offline after the first visit.',
      },
    ],
    related: ['/interval/7-minute-workout', '/timer/6-minutes', '/timer/8-minutes', '/interval'],
  },
  {
    path: '/timer/8-minutes',
    h1: '8 minute timer',
    title: '8 Minute Timer – Free Online Countdown',
    description:
      'An 8 minute timer for pasta, abs circuits and short study blocks. Runs in the browser, beeps at zero and keeps the screen awake.',
    intro: [
      'An 8 minute timer lands on a lot of pasta boxes and a lot of ab routines. It is long enough to be a real set of work and short enough that you can hold form through it.',
      'It is also the length of an eight minute ab circuit, a decent cold plunge build up, or a queue you are trying to sit through without checking your phone.',
      'Press Space to start. The tab title counts down, the screen stays on, and it beeps when you are done.',
    ],
    uses: [
      'Boiling pasta al dente',
      'An eight minute abs circuit',
      'Short study or revision blocks',
      'Timed cleaning bursts',
    ],
    config: { mode: 'countdown', seconds: 480 },
    faq: [
      {
        q: 'How do I start an 8 minute timer quickly?',
        a: 'Open the page and press Space. It is preset to eight minutes, so nothing to configure.',
      },
      {
        q: 'Will it still beep if I switch tabs?',
        a: 'Yes in practice. The countdown is timestamp based so it cannot drift, and the beep plays while the tab stays open or as soon as you return.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, edit it on the timer or use another preset page like 9 or 10 minutes.',
      },
      { q: 'Does it cost anything?', a: 'No. It is free and there is no account.' },
    ],
    related: ['/timer/7-minutes', '/timer/9-minutes', '/timer/10-minutes', '/timer'],
  },
  {
    path: '/timer/9-minutes',
    h1: '9 minute timer',
    title: '9 Minute Timer – Free Online Countdown',
    description:
      'A 9 minute timer for snooze length naps, pasta and short circuits. Beeps at zero, shows the time in the tab title, no signup needed.',
    intro: [
      'A 9 minute timer is the snooze button, a strange piece of history: it is nine because old mechanical clock gears could not comfortably fit ten, and the convention outlived the gears.',
      'It is a fine length for a nap you do not want to slip into deep sleep, a pasta box that says nine, or three rounds of three minute work.',
      'Space starts and pauses. The tab title shows the remaining time and a beep lands at zero.',
    ],
    uses: [
      'A short snooze length nap',
      'Pasta and grains that call for nine',
      'Three three minute rounds',
      'Short breathwork sessions',
    ],
    config: { mode: 'countdown', seconds: 540 },
    faq: [
      {
        q: 'Why is snooze 9 minutes?',
        a: 'Early mechanical alarm clocks used a fixed gear for the snooze interval, and the tooth count that fit landed just under ten minutes. The convention stuck.',
      },
      {
        q: 'Will the alarm go off in the background?',
        a: 'The timer keeps correct time from timestamps whatever the tab is doing, and the beep plays while it is open or right when you return.',
      },
      {
        q: 'Can I change it to 10 minutes?',
        a: 'Yes, edit the duration or open the 10 minute page.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes, once the page has loaded once it runs without a connection.',
      },
    ],
    related: ['/timer/8-minutes', '/timer/10-minutes', '/timer/20-minutes', '/timer'],
  },
  {
    path: '/timer/10-minutes',
    h1: '10 minute timer',
    title: '10 Minute Timer – Free Online Countdown with Alarm',
    description:
      'A 10 minute timer with an alarm. Good for meditation, tidying and focus blocks. Free, runs in your browser and keeps the screen on.',
    intro: [
      'A 10 minute timer is the default meditation length for a reason. It is long enough for your head to settle and short enough that you will do it again tomorrow.',
      'Ten minutes also happens to be the honest amount of time most tidying takes, the length of a proper stretch session, and a good ceiling on a task you have been avoiding.',
      'Start with Space. The tab title keeps counting so you can close the window in your head, and the alarm beeps at zero.',
    ],
    uses: [
      'A ten minute meditation',
      'Tidying one room',
      'A mobility or stretch session',
      'Timed inbox clear out',
    ],
    config: { mode: 'countdown', seconds: 600 },
    faq: [
      {
        q: 'Is 10 minutes enough for meditation?',
        a: 'For most people yes, especially as a daily habit. Consistency matters more than length.',
      },
      {
        q: 'Will it still ring if I switch tabs?',
        a: 'The countdown never drifts because it is tracked from timestamps. The beep plays if the tab is open, or the moment you switch back to it.',
      },
      {
        q: 'Can I change it to 12 or 15 minutes?',
        a: 'Yes. Set any duration on the timer, or use the 12 and 15 minute pages.',
      },
      {
        q: 'Do I need to install anything?',
        a: 'No. It is a web page, works offline after the first load, and there is no account.',
      },
    ],
    related: ['/timer/5-minutes', '/timer/15-minutes', '/timer/20-minutes', '/timer'],
  },
  {
    path: '/timer/12-minutes',
    h1: '12 minute timer',
    title: '12 Minute Timer – Free Online Countdown',
    description:
      'A 12 minute timer for the Cooper test, baking and focus blocks. Beeps at zero, keeps the screen on and works offline after first load.',
    intro: [
      'A 12 minute timer is the Cooper test. Run as far as you can in twelve minutes and the distance tells you roughly where your aerobic fitness sits. It is brutal and it is the point.',
      'Away from the track, twelve minutes covers a lot of oven trays, a long shower you should not be taking, and a study block for people who find twenty five too long.',
      'Press Space to start. The remaining time appears in the tab title, the screen stays awake, and a beep marks the end.',
    ],
    uses: [
      'The Cooper 12 minute run test',
      'Baking trays and cookies',
      'Short focus blocks',
      'Rowing or bike time trials',
    ],
    config: { mode: 'countdown', seconds: 720 },
    faq: [
      {
        q: 'What is the Cooper test?',
        a: 'You run as far as you can in twelve minutes, then compare the distance to age and sex tables to estimate VO2 max.',
      },
      {
        q: 'Will the beep work if my phone screen turns off?',
        a: 'The countdown stays correct regardless because it reads timestamps. The wake lock holds the screen on while the tab is in the foreground, and the beep plays when the tab is open or as soon as you return.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, edit it on the timer or use the 10 or 15 minute pages.',
      },
      { q: 'Is it free?', a: 'Yes, free and no login.' },
    ],
    related: ['/timer/10-minutes', '/timer/15-minutes', '/timer/20-minutes', '/stopwatch'],
  },
  {
    path: '/timer/15-minutes',
    h1: '15 minute timer',
    title: '15 Minute Timer – Free Online Countdown with Alarm',
    description:
      'A 15 minute timer with an alarm at zero. Good for standups, power naps and cleaning sprints. Free, no signup, runs in your browser.',
    intro: [
      'A 15 minute timer is the length of a standup that has not gone wrong yet. It is also the classic power nap, the one short enough that you wake up without the fog.',
      'Fifteen minutes is a real cleaning sprint, a decent chunk of reading, or the block you give a task you are dreading to find out it takes six.',
      'Space starts and pauses. The tab title shows the countdown and the alarm beeps at zero.',
    ],
    uses: [
      'A 15 minute power nap',
      'Keeping standups short',
      'A cleaning sprint',
      'Reading or language practice',
    ],
    config: { mode: 'countdown', seconds: 900 },
    faq: [
      {
        q: 'Is 15 minutes a good nap length?',
        a: 'Fifteen to twenty minutes is the usual advice. It keeps you in light sleep so you wake up alert rather than groggy.',
      },
      {
        q: 'Will it ring if I switch tabs or apps?',
        a: 'The timer tracks real time from timestamps so it cannot fall behind. The beep plays while the tab is open, or the instant you come back.',
      },
      {
        q: 'Can I change it to 20 minutes?',
        a: 'Yes, set any duration on the timer or open the 20 minute page.',
      },
      {
        q: 'Does it need an account?',
        a: 'No login and nothing to install. It also works offline once loaded.',
      },
    ],
    related: ['/timer/10-minutes', '/timer/20-minutes', '/timer/25-minutes', '/pomodoro'],
  },
  {
    path: '/timer/20-minutes',
    h1: '20 minute timer',
    title: '20 Minute Timer – Free Online Countdown with Alarm',
    description:
      'A 20 minute timer with an alarm. Good for naps, rice and short study blocks. Free, keeps the screen on and works offline after loading.',
    intro: [
      'A 20 minute timer is the nap most sleep researchers would sign off on, and the length white rice needs to sit covered before you touch it.',
      'It is also a solid study block for anyone who finds the pomodoro twenty five a bit long, and roughly the point at which a meeting should have ended.',
      'Start with Space. The tab title counts down, the screen stays awake, and it beeps when the twenty minutes are up.',
    ],
    uses: [
      'A twenty minute nap',
      'Resting rice off the heat',
      'Focused study blocks',
      'Timed deep cleaning',
    ],
    config: { mode: 'countdown', seconds: 1200 },
    faq: [
      {
        q: 'How long should a nap be?',
        a: 'Twenty minutes or less keeps you out of deep sleep, so you wake up without the heavy feeling that follows a longer nap.',
      },
      {
        q: 'Will it still beep if I switch tabs?',
        a: 'Yes. The countdown runs off timestamps so it stays accurate, and the beep plays while the tab is open or as soon as you return.',
      },
      {
        q: 'Can I change it to 25 minutes?',
        a: 'Yes, edit the duration or use the 25 minute page, which is set up for pomodoros.',
      },
      {
        q: 'Is there an app?',
        a: 'No app needed. It is a web page that works offline after the first load.',
      },
    ],
    related: ['/timer/15-minutes', '/timer/25-minutes', '/timer/30-minutes', '/pomodoro'],
  },
  {
    path: '/timer/25-minutes',
    h1: '25 minute timer',
    title: '25 Minute Timer – Pomodoro Countdown',
    description:
      'A 25 minute timer for one pomodoro. Beeps at zero, keeps the screen on and shows the time in the tab title. Free with no signup.',
    intro: [
      'A 25 minute timer is one pomodoro. Twenty five minutes of single tasking, then a five minute break, and after four of them something longer. The number is arbitrary and that is what makes it work: you stop arguing about how long to work.',
      'The rule that matters is the one people skip. If you break the block, the pomodoro does not count. Start it again.',
      'Space starts and pauses. The tab title carries the countdown so a full screen document does not hide it, and it beeps at zero.',
    ],
    uses: [
      'One pomodoro work block',
      'Writing or coding sprints',
      'Exam revision sessions',
      'Clearing a backlog of admin',
    ],
    config: { mode: 'countdown', seconds: 1500 },
    faq: [
      {
        q: 'Why is a pomodoro 25 minutes?',
        a: 'Francesco Cirillo picked it using a kitchen timer while studying. The length is long enough for real work and short enough to protect from interruption.',
      },
      {
        q: 'Can I get the work and break cycle automatically?',
        a: 'Yes, the pomodoro page runs 25 on and 5 off with a longer break after four rounds, so you do not restart anything.',
      },
      {
        q: 'Will it ring if I am in another tab?',
        a: 'The countdown stays exact because it reads timestamps. The beep plays while the tab is open, or the moment you switch back.',
      },
      {
        q: 'Can I change the length?',
        a: 'Yes. Plenty of people prefer 50 minute blocks, and there is a page for that too.',
      },
    ],
    related: [
      '/pomodoro',
      '/blog/pomodoro-technique-25-5',
      '/timer/5-minutes',
      '/timer/50-minutes',
    ],
  },
  {
    path: '/timer/30-minutes',
    h1: '30 minute timer',
    title: '30 Minute Timer – Free Online Countdown with Alarm',
    description:
      'A 30 minute timer with an alarm at zero. Good for focus blocks, oven trays and workouts. Free, no login, and it keeps the screen on.',
    intro: [
      'A 30 minute timer is a half hour block, which is the shortest amount of time most people can call real focused work. Long enough to get past the setup, short enough to not need a break halfway.',
      'It is also a roast tray, a half hour on the bike, and the meeting length that should have been the default all along.',
      'Press Space to start. The tab title counts down, a beep marks the end, and the screen stays awake while it runs.',
    ],
    uses: [
      'A half hour deep work block',
      'Oven roasting and baking',
      'A thirty minute workout',
      'Language practice sessions',
    ],
    config: { mode: 'countdown', seconds: 1800 },
    faq: [
      {
        q: 'How do I set a 30 minute timer on my laptop?',
        a: 'Open this page and press Space. It is already set, and the tab title shows the time left while you work elsewhere.',
      },
      {
        q: 'Will it still ring if I switch tabs?',
        a: 'Yes in practice. The countdown is timestamp based so it never drifts, and the beep plays while the tab is open or as soon as you return.',
      },
      {
        q: 'Can I change it to 45 minutes?',
        a: 'Yes, edit the duration on the timer or go to the 45 minute page.',
      },
      {
        q: 'Does it work without internet?',
        a: 'After the first load, yes. Everything runs in the browser.',
      },
    ],
    related: ['/timer/25-minutes', '/timer/45-minutes', '/timer/60-minutes', '/pomodoro'],
  },
  {
    path: '/timer/40-minutes',
    h1: '40 minute timer',
    title: '40 Minute Timer – Free Online Countdown',
    description:
      'A 40 minute timer for study blocks, laundry cycles and long runs. Beeps at zero, shows the time in the tab title, free with no account.',
    intro: [
      'A 40 minute timer sits in the gap between a focus block and a full hour. It is the length of a short university lecture, a slow cooked tray, and most wash cycles.',
      'Forty minutes is also about the point where a run stops being exercise and starts being a mood, if you are into that.',
      'Space starts and pauses. The remaining time shows in the tab title and a beep lands at zero.',
    ],
    uses: [
      'A long study or writing block',
      'Laundry and dishwasher cycles',
      'Steady state cardio',
      'Slow oven cooking',
    ],
    config: { mode: 'countdown', seconds: 2400 },
    faq: [
      {
        q: 'How do I start a 40 minute timer?',
        a: 'Open the page and press start or hit Space. It is preset to forty minutes.',
      },
      {
        q: 'Will the alarm still go off in the background?',
        a: 'The timer keeps correct time from timestamps whatever the tab does. The beep plays while the tab is open, or right when you come back to it.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set anything you like on the timer, or use the 45 and 50 minute pages.',
      },
      { q: 'Is it free?', a: 'Yes. No account, no install.' },
    ],
    related: ['/timer/30-minutes', '/timer/45-minutes', '/timer/60-minutes', '/timer'],
  },
  {
    path: '/timer/45-minutes',
    h1: '45 minute timer',
    title: '45 Minute Timer – Free Online Countdown with Alarm',
    description:
      'A 45 minute timer with an alarm at zero. The length of a class, a gym session or a half of football. Free and runs in your browser.',
    intro: [
      'A 45 minute timer is a class. School periods, gym sessions, a half of football and most therapy hours all land here, which suggests forty five minutes is about as long as attention holds.',
      'It is a good work block if twenty five feels like it ends just as you get going. Set it, do one thing, take a real break after.',
      'Start with Space. The tab title shows what is left, the screen stays on, and the alarm beeps at zero.',
    ],
    uses: [
      'A class or lecture period',
      'One half of football',
      'A full gym session',
      'Long focus blocks',
    ],
    config: { mode: 'countdown', seconds: 2700 },
    faq: [
      {
        q: 'Is 45 minutes a good study block?',
        a: 'Many people focus better in 45 to 50 minute blocks with a proper break after, rather than the shorter pomodoro cycle.',
      },
      {
        q: 'Will it ring if the tab is in the background?',
        a: 'The countdown never drifts since it is tracked from timestamps. The beep plays while the tab is open, or the moment you switch back to it.',
      },
      {
        q: 'Can I change it to an hour?',
        a: 'Yes. Edit the duration on the timer or open the 60 minute page.',
      },
      {
        q: 'Do I need to sign up?',
        a: 'No login, no install, and it works offline after the first load.',
      },
    ],
    related: ['/timer/30-minutes', '/timer/50-minutes', '/timer/60-minutes', '/timer'],
  },
  {
    path: '/timer/50-minutes',
    h1: '50 minute timer',
    title: '50 Minute Timer – Free Online Countdown',
    description:
      'A 50 minute timer for long focus blocks and the 50/10 work rhythm. Beeps at zero, keeps the screen awake, free with no signup.',
    intro: [
      'A 50 minute timer is the grown up pomodoro. Fifty minutes of work, ten minutes off, repeat. It suits work that needs a long runway before it gets good, like writing or debugging something ugly.',
      'Fifty minutes is also the standard therapy hour and the length of a university lecture with the change over built in.',
      'Space starts and pauses. The tab title counts down, so a full screen editor will not hide the time from you.',
    ],
    uses: [
      'The 50/10 focus rhythm',
      'Writing and coding sessions',
      'A lecture or seminar block',
      'Long practice sessions',
    ],
    config: { mode: 'countdown', seconds: 3000 },
    faq: [
      {
        q: 'Is 50/10 better than 25/5?',
        a: 'It depends on the work. Longer blocks suit deep tasks with a slow warmup; shorter ones suit admin and anything you are avoiding.',
      },
      {
        q: 'Will it still beep if I switch tabs?',
        a: 'Yes. The countdown runs off timestamps so it stays accurate, and the beep plays while the tab is open or as soon as you return.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set anything on the timer, or use the 45 and 60 minute pages.',
      },
      { q: 'Does it work offline?', a: 'Yes, once loaded it runs entirely in the browser.' },
    ],
    related: ['/timer/25-minutes', '/timer/45-minutes', '/timer/60-minutes', '/pomodoro'],
  },
  {
    path: '/timer/60-minutes',
    h1: '60 minute timer',
    title: '60 Minute Timer – 1 Hour Countdown Online',
    description:
      'A 60 minute timer for one hour of deep work, cooking or exams. Beeps at zero, keeps the screen on and shows the time in the tab title.',
    intro: [
      'A 60 minute timer is an hour of deep work, which is the unit most people actually plan their day in. One hour, one thing, phone somewhere else.',
      'An hour is also a slow roast, an exam paper, a full gym session with warmup, and the amount of parking you paid for.',
      'Press Space to start. The tab title carries the countdown, the screen stays awake, and it beeps when the hour is up.',
    ],
    uses: [
      'One hour of deep work',
      'Exam and mock test timing',
      'Slow roasting and braising',
      'A full training session',
    ],
    config: { mode: 'countdown', seconds: 3600 },
    faq: [
      {
        q: 'How do I set a 1 hour timer in my browser?',
        a: 'Open this page and press start or Space. It is preset to sixty minutes and the tab title shows the time remaining.',
      },
      {
        q: 'Will it ring if I leave the tab?',
        a: 'The countdown stays exact because it reads timestamps rather than counting frames. The beep plays while the tab is open, or the instant you return.',
      },
      {
        q: 'Can I set 90 minutes instead?',
        a: 'Yes, edit the duration or open the 90 minute page.',
      },
      { q: 'Is it free?', a: 'Yes, free with no account and nothing to download.' },
    ],
    related: ['/timer/45-minutes', '/timer/90-minutes', '/timer/30-minutes', '/timer'],
  },
  {
    path: '/timer/90-minutes',
    h1: '90 minute timer',
    title: '90 Minute Timer – Free Online Countdown',
    description:
      'A 90 minute timer for ultradian work cycles, a sleep cycle or a football match. Beeps at zero, free, and it keeps the screen awake.',
    intro: [
      'A 90 minute timer matches the ultradian rhythm, the roughly ninety minute cycle your brain runs through before it wants a real break. Work with it and the afternoon slump makes more sense.',
      'Ninety minutes is also one sleep cycle, the ninety minutes of a football match, and about the length of a film that respects your time.',
      'Space starts and pauses. The tab title shows the remaining time and a beep lands at zero.',
    ],
    uses: [
      'An ultradian deep work cycle',
      'One sleep cycle',
      'Ninety minutes of a match',
      'Long exam practice papers',
    ],
    config: { mode: 'countdown', seconds: 5400 },
    faq: [
      {
        q: 'What is a 90 minute work cycle?',
        a: 'The ultradian rhythm is a roughly ninety minute cycle of alertness. Working in ninety minute blocks with a proper break after tends to match it.',
      },
      {
        q: 'Will it still beep after an hour and a half in the background?',
        a: 'The countdown is tracked from timestamps so long durations stay accurate. The beep plays while the tab is open, or as soon as you switch back.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any length on the timer, or use the 60 minute page.',
      },
      { q: 'Do I need an account?', a: 'No. No login, and it works offline after the first load.' },
    ],
    related: ['/timer/60-minutes', '/timer/45-minutes', '/timer/30-minutes', '/timer'],
  },
  {
    path: '/timer/10-seconds',
    h1: '10 second timer',
    title: '10 Second Timer – Free Online Countdown',
    description:
      'A 10 second timer for short rests, breath holds and countdowns. Beeps at zero, runs in the browser and needs no signup or install.',
    intro: [
      'A 10 second timer is the gap between Tabata rounds, the transition between circuit stations, and the only rest you get before the next set of twenty.',
      'Ten seconds is also a breath hold, a countdown before a take, and long enough to notice how short it is when you are out of breath.',
      'Press Space to start. It beeps at zero, which is the whole job at this length.',
    ],
    uses: [
      'Rest between Tabata rounds',
      'Circuit station transitions',
      'Breath hold practice',
      'A countdown before recording',
    ],
    config: { mode: 'countdown', seconds: 10 },
    faq: [
      {
        q: 'Can I get repeating 10 second rests?',
        a: 'Yes. The Tabata page runs 20 seconds work and 10 seconds rest on a loop with beeps between, so you never restart anything.',
      },
      {
        q: 'Will it beep if I switch tabs?',
        a: 'The countdown stays accurate from timestamps, and the beep plays while the tab is open or as soon as you come back. At ten seconds you will probably be watching anyway.',
      },
      {
        q: 'Can I change it to 15 or 20 seconds?',
        a: 'Yes, edit the duration on the timer or use the other seconds pages.',
      },
      { q: 'Is it free?', a: 'Yes, free with no account.' },
    ],
    related: ['/timer/20-seconds', '/timer/15-seconds', '/tabata', '/timer/30-seconds'],
  },
  {
    path: '/timer/15-seconds',
    h1: '15 second timer',
    title: '15 Second Timer – Free Online Countdown',
    description:
      'A 15 second timer for HIIT rests, drills and quick countdowns. Beeps at zero, keeps the screen on and works offline after first load.',
    intro: [
      'A 15 second timer is a HIIT rest. Fifteen seconds is the standard recovery in a lot of 45/15 and 30/15 circuits, short enough to keep the heart rate up and long enough to reset your grip.',
      'It is also the length of a social clip, a scale run on an instrument, and roughly how long a proper hand rub with sanitiser takes.',
      'Space starts it. A beep marks zero and the screen stays awake while it runs.',
    ],
    uses: [
      'HIIT rest between work bouts',
      'Quick drill intervals',
      'Hand sanitiser rub time',
      'Short breath work holds',
    ],
    config: { mode: 'countdown', seconds: 15 },
    faq: [
      {
        q: 'Can I loop 45 seconds on and 15 off?',
        a: 'Yes, the interval timer handles repeating work and rest pairs with beeps, so you do not restart between rounds.',
      },
      {
        q: 'Will it still ring in another tab?',
        a: 'The countdown is timestamp based so it stays correct, and the beep plays while the tab is open or the moment you return.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds on the timer, or use the 10, 20 or 30 second pages.',
      },
      {
        q: 'Do I need to install an app?',
        a: 'No. It is a web page and it works offline after the first load.',
      },
    ],
    related: [
      '/timer/45-seconds',
      '/timer/10-seconds',
      '/interval',
      '/blog/hiit-interval-timer-beginners',
    ],
  },
  {
    path: '/timer/20-seconds',
    h1: '20 second timer',
    title: '20 Second Timer – Free Online Countdown',
    description:
      'A 20 second timer, the Tabata work interval. Also the hand washing standard. Beeps at zero, free, and runs entirely in your browser.',
    intro: [
      'A 20 second timer is the Tabata work interval. Twenty seconds all out, ten seconds rest, eight times. Twenty seconds is not long until it is the fifth round.',
      'It is also the hand washing standard, which is where most people learned that twenty seconds is longer than they thought.',
      'Press Space to start. It beeps at zero and the screen stays awake if you are mid set.',
    ],
    uses: [
      'Tabata work intervals',
      'Hand washing',
      'Sprint or bike all out efforts',
      'Short isometric holds',
    ],
    config: { mode: 'countdown', seconds: 20 },
    faq: [
      {
        q: 'Can I get all eight Tabata rounds automatically?',
        a: 'Yes. The Tabata page runs 20 on and 10 off for eight rounds with beeps at every switch.',
      },
      {
        q: 'Why is 20 seconds the hand washing time?',
        a: 'Health guidance settled on twenty seconds of scrubbing as the point where soap reliably does its job. Humming happy birthday twice is the usual trick.',
      },
      {
        q: 'Will it beep if I look away?',
        a: 'The countdown stays correct from timestamps and the beep plays while the tab is open or as soon as you return to it.',
      },
      {
        q: 'Can I change it to 30 seconds?',
        a: 'Yes, edit the duration or use the 30 second page.',
      },
    ],
    related: ['/tabata', '/tabata/20-10-8', '/timer/10-seconds', '/timer/4-minutes'],
  },
  {
    path: '/timer/30-seconds',
    h1: '30 second timer',
    title: '30 Second Timer – Free Online Countdown',
    description:
      'A 30 second timer for planks, circuit stations and quick rests. Beeps at zero, keeps the screen on, and needs no account or install.',
    intro: [
      'A 30 second timer is where most planks begin and a lot of them end. Half a minute is the standard station length in circuit training and the work bout in the 30/30 and 30/10 formats.',
      'Thirty seconds is also a stretch hold, the rinse on a pour over, and long enough to be uncomfortable in an ice bath.',
      'Space starts and pauses. It beeps at zero and the screen stays on while your hands are busy.',
    ],
    uses: [
      'A thirty second plank hold',
      'Circuit training stations',
      'Stretch holds',
      'Rest between heavy sets',
    ],
    config: { mode: 'countdown', seconds: 30 },
    faq: [
      {
        q: 'Can I repeat 30 seconds on and off?',
        a: 'Yes, the interval timer loops work and rest pairs with beeps so you can leave it running through the whole circuit.',
      },
      {
        q: 'Will it still beep if my phone screen dims?',
        a: 'The timer keeps correct time from timestamps regardless. The wake lock holds the screen on while the tab is in the foreground, and the beep plays when the tab is open or as soon as you return.',
      },
      {
        q: 'Can I change it to 45 seconds?',
        a: 'Yes, edit the duration on the timer or open the 45 second page.',
      },
      { q: 'Is it free?', a: 'Yes. No account and nothing to download.' },
    ],
    related: ['/timer/45-seconds', '/timer/60-seconds', '/interval', '/timer/1-minute'],
  },
  {
    path: '/timer/45-seconds',
    h1: '45 second timer',
    title: '45 Second Timer – Free Online Countdown',
    description:
      'A 45 second timer for circuit stations and HIIT work bouts. Beeps at zero, shows the time in the tab title, free with no signup.',
    intro: [
      'A 45 second timer is a circuit station. Forty five on, fifteen off is one of the most common HIIT formats because it is long enough to build real fatigue without wrecking your form.',
      'It is also a good hold for the harder isometrics, and about as long as anyone should hold a wall sit on a first try.',
      'Press Space to start. A beep lands at zero and the tab title counts down if you are not looking at the page.',
    ],
    uses: [
      'Circuit training stations',
      'HIIT work bouts at 45/15',
      'Wall sits and isometric holds',
      'Timed rounds on a bag',
    ],
    config: { mode: 'countdown', seconds: 45 },
    faq: [
      {
        q: 'Can I loop 45 on and 15 off?',
        a: 'Yes, the interval timer handles repeating work and rest pairs with beeps at each switch.',
      },
      {
        q: 'Will it still ring if I switch tabs?',
        a: 'The countdown is timestamp based so it never drifts, and the beep plays while the tab is open or the moment you come back.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds, or use the 30 and 60 second pages.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes, after the first load it runs entirely in your browser.',
      },
    ],
    related: [
      '/timer/15-seconds',
      '/timer/30-seconds',
      '/interval',
      '/blog/hiit-interval-timer-beginners',
    ],
  },
  {
    path: '/timer/60-seconds',
    h1: '60 second timer',
    title: '60 Second Timer – Free Online Countdown',
    description:
      'A 60 second timer for the minute plank, rest between sets and steeping tea. Beeps at zero and keeps the screen on while it runs.',
    intro: [
      'A 60 second timer is the minute plank, the rest between heavy sets, and the round break in boxing. One minute is the smallest unit that feels like a real effort.',
      'Sixty seconds is also green tea, a full minute of silence you did not plan on, and the classic test of whether you can sit still.',
      'Space starts and pauses. The tab title carries the count and a beep marks zero.',
    ],
    uses: [
      'The one minute plank',
      'Rest between heavy sets',
      'Boxing round breaks',
      'Steeping green tea',
    ],
    config: { mode: 'countdown', seconds: 60 },
    faq: [
      {
        q: 'Is this the same as the 1 minute timer?',
        a: 'Yes, sixty seconds and one minute are the same countdown. Use whichever page you found first.',
      },
      {
        q: 'Will it still beep if I switch tabs?',
        a: 'The countdown stays correct because it reads timestamps, and the beep plays while the tab is open or as soon as you return.',
      },
      {
        q: 'Can I repeat it for rest between sets?',
        a: 'Yes, the interval timer loops work and rest so you are not restarting after every set.',
      },
      {
        q: 'Do I need an account?',
        a: 'No login and no install. It works offline after the first load.',
      },
    ],
    related: [
      '/timer/1-minute',
      '/timer/90-seconds',
      '/timer/30-seconds',
      '/interval/boxing-rounds-3-1',
    ],
  },
  {
    path: '/timer/90-seconds',
    h1: '90 second timer',
    title: '90 Second Timer – Free Online Countdown',
    description:
      'A 90 second timer for sprint recovery and rest between compound sets. Beeps at zero, keeps the screen on, free with no account.',
    intro: [
      'A 90 second timer is sprint recovery. Ninety seconds is the standard walk back between repeats, and the rest most lifting programmes give you between moderate compound sets.',
      'It is also long enough for an emotion to pass, which is the reason the ninety second rule gets quoted so often.',
      'Press Space to start. The tab title counts down, the screen stays awake, and it beeps at zero so you know when to go again.',
    ],
    uses: [
      'Recovery between sprint repeats',
      'Rest between compound lifts',
      'Cooldown between rounds',
      'Timed breathing resets',
    ],
    config: { mode: 'countdown', seconds: 90 },
    faq: [
      {
        q: 'How long should I rest between sets?',
        a: 'Roughly 90 seconds suits moderate compound work. Heavy strength sets usually want three minutes or more, and light accessory work less.',
      },
      {
        q: 'Will it ring if I put the phone down?',
        a: 'The countdown keeps correct time from timestamps. The screen-wake lock holds the display on while the tab is in front, and the beep plays when the tab is open or as soon as you return.',
      },
      {
        q: 'Can I repeat it automatically?',
        a: 'Yes, the interval timer loops work and rest pairs so you do not restart between repeats.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any length on the timer or use the 60 second and 2 minute pages.',
      },
    ],
    related: ['/timer/60-seconds', '/timer/2-minutes', '/interval', '/timer/3-minutes'],
  },
];
