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
    related: [
      '/timer/1-minute',
      '/timer/3-minutes',
      '/timer/5-minutes',
      '/timer',
      '/interval/beep-every-2-minutes',
    ],
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
    related: [
      '/timer/10-minutes',
      '/timer/3-minutes',
      '/timer/15-minutes',
      '/timer',
      '/timer/classroom-timer',
    ],
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
    related: [
      '/timer/5-minutes',
      '/timer/11-minutes',
      '/timer/15-minutes',
      '/timer/20-minutes',
      '/timer/kitchen-timer',
      '/meditation',
    ],
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
    related: ['/timer/11-minutes', '/timer/13-minutes', '/timer/10-minutes', '/timer/15-minutes'],
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
    related: [
      '/timer/14-minutes',
      '/timer/16-minutes',
      '/timer/20-minutes',
      '/timer/25-minutes',
      '/timer/sauna-timer',
    ],
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
    related: [
      '/timer/18-minutes',
      '/timer/22-minutes',
      '/timer/25-minutes',
      '/pomodoro',
      '/timer/nap-timer',
    ],
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
      '/timer/22-minutes',
      '/pomodoro/50-10',
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
    related: [
      '/timer/22-minutes',
      '/timer/35-minutes',
      '/timer/45-minutes',
      '/pomodoro',
      '/interval/beep-every-10-minutes',
    ],
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
    related: ['/timer/35-minutes', '/timer/30-minutes', '/timer/45-minutes', '/timer'],
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
    related: ['/timer/35-minutes', '/timer/50-minutes', '/timer/55-minutes', '/timer/60-minutes'],
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
    related: [
      '/timer/55-minutes',
      '/timer/45-minutes',
      '/timer/60-minutes',
      '/pomodoro',
      '/timer/study-timer',
      '/pomodoro/50-10',
    ],
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
    related: ['/timer/55-minutes', '/timer/90-minutes', '/timer/2-hours', '/timer/45-minutes'],
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
    related: ['/timer/2-hours', '/timer/3-hours', '/timer/60-minutes', '/timer', '/pomodoro/90-20'],
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
    related: ['/timer/8-seconds', '/timer/15-seconds', '/timer/5-seconds', '/timer/30-seconds'],
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
    related: ['/tabata', '/tabata/20-10-8', '/timer/25-seconds', '/timer/4-minutes'],
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
    related: ['/timer/25-seconds', '/timer/40-seconds', '/timer/45-seconds', '/timer/60-seconds'],
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
      '/timer/30-seconds',
      '/timer/40-seconds',
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
      '/timer/75-seconds',
      '/timer/30-seconds',
      '/interval/boxing-rounds-3-1',
      '/timer/plank-timer',
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
    related: [
      '/timer/75-seconds',
      '/timer/60-seconds',
      '/timer/2-minutes',
      '/interval',
      '/timer/rest-timer',
    ],
  },
  {
    path: '/timer/11-minutes',
    h1: '11 minute timer',
    title: '11 Minute Timer – Free Online Countdown',
    description:
      'An 11 minute timer for follow-along HIIT videos and short mobility flows. Beeps at zero, keeps the screen on, no signup needed.',
    intro: [
      'An 11 minute timer matches the length most follow-along HIIT videos land on, because eleven minutes is what fits after an editor trims a ten minute workout and leaves the cooldown in. Run it alongside a muted video when you would rather hear your own beeps than someone counting at you.',
      'Eleven minutes is also a sensible mobility flow, long enough to get through hips, ankles and shoulders without turning into a second session.',
      'Press Space to start. The tab title carries the countdown, the screen stays awake, and it beeps at zero.',
    ],
    uses: [
      'Follow-along HIIT videos',
      'A full mobility flow',
      'Bodyweight circuits without a rep count',
      'Short erg or bike pieces',
    ],
    config: { mode: 'countdown', seconds: 660 },
    faq: [
      {
        q: 'Why would I want 11 minutes rather than 10?',
        a: 'Video workouts rarely come out at a round number. If the clip runs 11 minutes, matching the timer to it saves you restarting a ten minute countdown with a minute to go.',
      },
      {
        q: 'Can I get beeps during the workout instead of only at the end?',
        a: 'Yes. The interval timer repeats work and rest pairs and beeps at every switch, so you are not watching the screen.',
      },
      {
        q: 'Will it still beep if I switch tabs?',
        a: 'The countdown reads timestamps, so it never drifts. The beep plays while the tab is open, or as soon as you come back to it.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any length on the timer, or use the 10 and 12 minute pages.',
      },
    ],
    related: ['/timer/10-minutes', '/timer/12-minutes', '/interval', '/interval/7-minute-workout'],
  },
  {
    path: '/timer/13-minutes',
    h1: '13 minute timer',
    title: '13 Minute Timer – Free Online Countdown',
    description:
      'A 13 minute timer for short cycling classes, core sets and oven trays. Beeps at zero, shows the time in the tab title, free to use.',
    intro: [
      'A 13 minute timer is the length of a short studio cycling or core class, the sort you tack onto the end of a ride when you have thirteen minutes and no excuse. It is an odd number precisely because instructors build to a playlist, not to a clock.',
      'Thirteen minutes also covers a tray of roast vegetables at high heat, or a warmup that includes the bits people skip.',
      'Space starts and pauses. The tab title shows what is left, and a beep marks the end.',
    ],
    uses: [
      'A short cycling or core class',
      'Roasting vegetables at high heat',
      'A thorough warmup block',
      'Reading a chapter before bed',
    ],
    config: { mode: 'countdown', seconds: 780 },
    faq: [
      {
        q: 'Why is a class 13 minutes?',
        a: 'Short classes are cut to music, so they land wherever the last track ends. Thirteen and fourteen minutes are common results.',
      },
      {
        q: 'Will it ring if my phone screen turns off?',
        a: 'The countdown stays correct because it is timestamp based. The wake lock holds the screen on while the tab is in front, and the beep plays when the tab is open or the moment you return.',
      },
      {
        q: 'Can I change it to 15 minutes?',
        a: 'Yes, edit the duration on the timer or open the 15 minute page.',
      },
      { q: 'Is it free?', a: 'Yes, free with no login and nothing to install.' },
    ],
    related: ['/timer/12-minutes', '/timer/14-minutes', '/timer/15-minutes', '/timer'],
  },
  {
    path: '/timer/14-minutes',
    h1: '14 minute timer',
    title: '14 Minute Timer – Free Online Countdown',
    description:
      'A 14 minute timer for frozen pizza, oven trays and short sessions. Beeps at zero, keeps the screen awake, works offline after load.',
    intro: [
      'A 14 minute timer is a frozen pizza. Most boxes say twelve to fifteen minutes at around 220C, and fourteen is where the base is done and the cheese has not gone to leather yet.',
      'The same fourteen minutes covers oven chips, a tray of sausages turned once, and the gap between putting food in and remembering you did.',
      'Press Space to start. The remaining time shows in the tab title so you can leave the kitchen, and it beeps at zero.',
    ],
    uses: [
      'Frozen pizza in a hot oven',
      'Oven chips and tray bakes',
      'Reheating leftovers properly',
      'A short conditioning session',
    ],
    config: { mode: 'countdown', seconds: 840 },
    faq: [
      {
        q: 'How long does a frozen pizza take?',
        a: 'Usually twelve to fifteen minutes at about 220C, depending on the base. Check the box, then trust your eyes on the cheese.',
      },
      {
        q: 'Will it beep if I walk away from the laptop?',
        a: 'The countdown keeps correct time from timestamps. The beep plays while the tab is open, so leave the tab in front if you want to hear it from the next room.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of minutes on the timer, or use the 13 and 15 minute pages.',
      },
      {
        q: 'Does it work without internet?',
        a: 'Yes, after the first load it runs entirely in the browser.',
      },
    ],
    related: ['/timer/13-minutes', '/timer/15-minutes', '/timer/20-minutes', '/timer'],
  },
  {
    path: '/timer/16-minutes',
    h1: '16 minute timer',
    title: '16 Minute Timer – Free Online Countdown',
    description:
      'A 16 minute timer for four Tabata blocks, ice baths and rice. Beeps at zero, keeps the screen on and counts down in the tab title.',
    intro: [
      'A 16 minute timer is four Tabata blocks back to back, four minutes of work each, which is about the ceiling before the intervals stop being intervals. It is also the honest length of a sixteen minute AMRAP once you stop rounding.',
      'In the kitchen, sixteen minutes is brown rice that needs longer than white, and a jacket potato finished in a hot oven after the microwave.',
      'Space starts and pauses. The tab title carries the count, the screen stays awake, and a beep lands at zero.',
    ],
    uses: [
      'Four Tabata blocks in a row',
      'A sixteen minute AMRAP',
      'Brown rice and grains',
      'Timed ice bath or sauna sits',
    ],
    config: { mode: 'countdown', seconds: 960 },
    faq: [
      {
        q: 'Can I get the 20/10 beeps across the whole sixteen minutes?',
        a: 'Yes. The Tabata timer loops twenty on and ten off and calls each switch, so you can run several blocks without restarting.',
      },
      {
        q: 'Will it still ring if I switch tabs?',
        a: 'The countdown is timestamp based and never drifts. The beep plays while the tab is open, or the instant you switch back.',
      },
      {
        q: 'Can I change it to 15 or 20 minutes?',
        a: 'Yes, adjust the duration on the timer or open the 15 and 20 minute pages.',
      },
      { q: 'Do I need an account?', a: 'No login, no install, and no ads in your way.' },
    ],
    related: ['/timer/15-minutes', '/timer/17-minutes', '/tabata/20-10-8', '/timer/20-minutes'],
  },
  {
    path: '/timer/17-minutes',
    h1: '17 minute timer',
    title: '17 Minute Timer – Free Online Countdown',
    description:
      'A 17 minute timer for talk rehearsals, podcast segments and simmering. Beeps at zero and shows the remaining time in the tab title.',
    intro: [
      'A 17 minute timer is the practice run for an 18 minute talk. Rehearsing a minute short leaves room for the laugh you did not plan and the question you get asked mid-sentence, which is why speaking coaches aim under the limit rather than at it.',
      'Seventeen minutes is also a podcast segment, a simmer that reduces a sauce without catching, and a commute you can measure but not shorten.',
      'Press Space to start. The tab title shows what is left so you can rehearse without staring at the clock, and it beeps at the end.',
    ],
    uses: [
      'Rehearsing an 18 minute talk',
      'Podcast or lecture segments',
      'Simmering and reducing sauces',
      'Timed exam sections',
    ],
    config: { mode: 'countdown', seconds: 1020 },
    faq: [
      {
        q: 'Why rehearse at 17 minutes for an 18 minute slot?',
        a: 'A live run is almost always slower than a rehearsal. Finishing a minute early on practice means you still land inside the slot on the day.',
      },
      {
        q: 'Will it beep if I am in another window?',
        a: 'The countdown stays accurate because it reads the clock rather than counting frames. The beep plays while the tab is open, or as soon as you return to it.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any length on the timer, or use the 16 and 18 minute pages.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes, after the first load it runs entirely in your browser.',
      },
    ],
    related: ['/timer/16-minutes', '/timer/18-minutes', '/timer/15-minutes', '/timer'],
  },
  {
    path: '/timer/18-minutes',
    h1: '18 minute timer',
    title: '18 Minute Timer – TED Talk Length Countdown',
    description:
      'An 18 minute timer, the TED talk slot. Rehearse a talk, run a focus block or time a bake. Beeps at zero and keeps the screen on.',
    intro: [
      'An 18 minute timer is the TED talk slot. Eighteen minutes is the hard ceiling every speaker gets, chosen because it is long enough to make one real argument and short enough that an audience stays with you.',
      'The same eighteen minutes works for a focus block if twenty five feels like a commitment, and for a tray of cookies that wants a look at fifteen.',
      'Space starts and pauses. The tab title carries the countdown, so you can rehearse from your notes, and a beep marks the end.',
    ],
    uses: [
      'Rehearsing a TED style talk',
      'Timed presentations and pitches',
      'A short focus block',
      'Baking cookies and tray bakes',
    ],
    config: { mode: 'countdown', seconds: 1080 },
    faq: [
      {
        q: 'Why are TED talks 18 minutes?',
        a: 'It is a deliberate limit. Long enough to be serious, short enough to hold attention and to fit neatly into a conference schedule.',
      },
      {
        q: 'Can I see the time without looking at the page?',
        a: 'The tab title shows the remaining time while it runs, which is enough to glance at from your slides.',
      },
      {
        q: 'Will it still ring if I switch tabs?',
        a: 'The countdown is tracked from timestamps so it never drifts, and the beep plays while the tab is open or the moment you come back.',
      },
      {
        q: 'Can I change it to 20 minutes?',
        a: 'Yes, edit the duration on the timer or open the 20 minute page.',
      },
    ],
    related: ['/timer/17-minutes', '/timer/20-minutes', '/timer/15-minutes', '/timer'],
  },
  {
    path: '/timer/22-minutes',
    h1: '22 minute timer',
    title: '22 Minute Timer – Free Online Countdown',
    description:
      'A 22 minute timer, about one sitcom episode without ads. Good for a focus block or a nap. Beeps at zero and keeps the screen on.',
    intro: [
      'A 22 minute timer is one sitcom episode without ads. A half hour US network slot leaves about twenty two minutes of actual show, which is why streaming a season feels faster than you remember it airing.',
      'Twenty two minutes is also a decent nap, a jog around the block, and a chunk of admin you can finish before the tea goes cold.',
      'Press Space to start. The remaining time appears in the tab title, the screen stays awake, and it beeps at zero.',
    ],
    uses: [
      'One episode-length break',
      'A short nap with an alarm',
      'An easy jog or walk',
      'Clearing the inbox',
    ],
    config: { mode: 'countdown', seconds: 1320 },
    faq: [
      {
        q: 'Why is a half hour sitcom 22 minutes?',
        a: 'A thirty minute broadcast slot has to carry adverts and promos. What is left for the show itself is usually twenty one to twenty two minutes.',
      },
      {
        q: 'Will it wake me if I nap?',
        a: 'Only if the tab stays open and your volume is up. The countdown itself stays accurate, but the beep needs the page in front to play on time.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any length on the timer, or use the 20 and 25 minute pages.',
      },
      { q: 'Is it free?', a: 'Yes, free with no account and nothing to download.' },
    ],
    related: ['/timer/20-minutes', '/timer/25-minutes', '/timer/30-minutes', '/timer'],
  },
  {
    path: '/timer/35-minutes',
    h1: '35 minute timer',
    title: '35 Minute Timer – Free Online Countdown',
    description:
      'A 35 minute timer for half a lecture, a roast chicken leg or a study block. Beeps at zero, keeps the screen on, no signup.',
    intro: [
      'A 35 minute timer is half a lecture. A seventy minute class usually breaks near the middle, and thirty five minutes is about as long as anyone holds a single thread of a talk before the room needs a stretch.',
      'Thirty five minutes also gets chicken thighs through a hot oven, covers a steady bike commute, and is a study block for people who find an hour too long and twenty five too short.',
      'Space starts and pauses. The tab title carries the countdown and a beep lands at the end.',
    ],
    uses: [
      'Half a lecture or seminar',
      'Roasting chicken thighs',
      'A long study block',
      'Steady state cardio',
    ],
    config: { mode: 'countdown', seconds: 2100 },
    faq: [
      {
        q: 'Is 35 minutes a good study block?',
        a: 'It sits between the 25 minute Pomodoro and a 50 minute block. If 25 keeps cutting you off mid-thought, try 35 with a five minute break.',
      },
      {
        q: 'Will it ring if I leave the tab?',
        a: 'The countdown is timestamp based, so the time stays correct whatever the tab is doing. The beep plays while the tab is open, or as soon as you return.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, edit it on the timer or use the 30 and 40 minute pages.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes, after the first load it runs entirely in your browser.',
      },
    ],
    related: ['/timer/30-minutes', '/timer/40-minutes', '/timer/45-minutes', '/pomodoro'],
  },
  {
    path: '/timer/55-minutes',
    h1: '55 minute timer',
    title: '55 Minute Timer – Free Online Countdown',
    description:
      'A 55 minute timer, the length of a therapy or tutoring hour. Beeps at zero, keeps the screen on and counts down in the tab title.',
    intro: [
      'A 55 minute timer is the therapy hour. Fifty minutes of session plus a few minutes to write notes is how the hour has been carved up for a century, and tutors and coaches borrowed the same trick so the next person is not waiting in the hall.',
      'Fifty five minutes is also a full gym session including the warmup, and a deep work block that still leaves five minutes to stand up before the next meeting.',
      'Press Space to start. The tab title shows the remaining time, which is enough to keep half an eye on without looking at a clock on the wall.',
    ],
    uses: [
      'A therapy or tutoring hour',
      'Coaching and consultation slots',
      'A full training session',
      'Deep work with a buffer',
    ],
    config: { mode: 'countdown', seconds: 3300 },
    faq: [
      {
        q: 'Why is a therapy hour 55 minutes?',
        a: 'The convention leaves the practitioner time to write notes and reset between clients. Fifty and fifty five minute sessions are both common.',
      },
      {
        q: 'Can the client see the time too?',
        a: 'Put the tab in fullscreen and the digits are readable from across a room, or leave it in the tab title if you would rather be discreet.',
      },
      {
        q: 'Will it still beep in the background?',
        a: 'The countdown stays exact because it reads timestamps. The beep plays while the tab is open, or the instant you switch back to it.',
      },
      {
        q: 'Can I set a full hour instead?',
        a: 'Yes, edit the duration or open the 60 minute page.',
      },
    ],
    related: ['/timer/50-minutes', '/timer/60-minutes', '/timer/45-minutes', '/timer'],
  },
  {
    path: '/timer/2-hours',
    h1: '2 hour timer',
    title: '2 Hour Timer – Free Online Countdown',
    description:
      'A 2 hour timer for a film, an exam paper or a slow bake. Beeps at zero and shows the remaining time in the tab title while it runs.',
    intro: [
      'A 2 hour timer is a film, or an exam paper. Two hours is the standard length of most written papers and the point at which a cinema release starts testing your patience, which makes it the most common long block people need to measure.',
      'Two hours also covers a loaf proving, a first fermentation, parking you paid for, and a revision session with one break in the middle.',
      'For a countdown this long, the tab has to stay open for the beep to sound. The wake lock only keeps the screen on while the page is in front, so if you switch away the phone will sleep as normal. Plug it in and leave the tab up.',
    ],
    uses: [
      'Timing a film or a screening',
      'Two hour exam papers',
      'Dough proving and fermentation',
      'Long revision sessions',
    ],
    config: { mode: 'countdown', seconds: 7200 },
    faq: [
      {
        q: 'Will it beep after two hours if I close the tab?',
        a: 'No. There is no server and no notification, so the page has to stay open for the alarm to play. Leave the tab up and keep the device awake.',
      },
      {
        q: 'Does the screen stay on for two hours?',
        a: 'Only while the page is in the foreground. Switch apps or tabs and the wake lock is released, so plug the phone in if you want the display up the whole time.',
      },
      {
        q: 'Is the countdown accurate over two hours?',
        a: 'Yes. Position comes from the clock, not from counting frames, so nothing drifts even if the device sleeps and wakes.',
      },
      {
        q: 'Can I set a different length?',
        a: 'Yes, set any duration on the timer, or use the 90 minute and 3 hour pages.',
      },
    ],
    related: ['/timer/90-minutes', '/timer/3-hours', '/timer/60-minutes', '/timer'],
  },
  {
    path: '/timer/3-hours',
    h1: '3 hour timer',
    title: '3 Hour Timer – Free Online Countdown',
    description:
      'A 3 hour timer for a long exam, a slow roast or a shift. Beeps at zero as long as the tab stays open. No signup and nothing to install.',
    intro: [
      'A 3 hour timer is a long exam. Three hours is the classic finals paper and the length of most professional qualifying tests, so it is the block law and medical students measure their practice in.',
      'It is also a slow roast at a low oven, a marathon target for a fast club runner, and a shift you would like to see the end of.',
      'Three hours is long enough that the practicalities matter. The alarm only sounds if this tab is still open, and the wake lock holds the screen on only while the page is in front. Plug the phone in before you start.',
    ],
    uses: [
      'Three hour exam papers',
      'Slow roasting a joint',
      'Long study or writing sessions',
      'Timing a shift or a drive break',
    ],
    config: { mode: 'countdown', seconds: 10800 },
    faq: [
      {
        q: 'Will it still ring three hours later?',
        a: 'Yes, as long as this tab is still open. The page runs entirely in your browser, so closing it or restarting the device ends the countdown.',
      },
      {
        q: 'Will my screen stay on the whole time?',
        a: 'Only while the page is in the foreground. The wake lock is released when you switch away, so use a charger for a countdown this long.',
      },
      {
        q: 'Does it drift over three hours?',
        a: 'No. The remaining time is worked out from timestamps, so it stays exact even after the device sleeps.',
      },
      {
        q: 'Can I split it into blocks with breaks?',
        a: 'Yes, the interval timer repeats work and rest pairs, which is closer to how a long exam practice or study session actually runs.',
      },
    ],
    related: ['/timer/2-hours', '/timer/4-hours', '/timer/90-minutes', '/interval'],
  },
  {
    path: '/timer/4-hours',
    h1: '4 hour timer',
    title: '4 Hour Timer – Free Online Countdown',
    description:
      'A 4 hour timer for a brine, a half day or a long bake. Beeps at zero if the tab stays open. Free, no account, runs in the browser.',
    intro: [
      'A 4 hour timer is a brine. Four hours in salt water is the usual window for a chicken before the texture turns, and it is the same number that turns up on cold brew steeping the short way and on a dough with a long bulk.',
      'Four hours is also a half day. It is the shift you signed up for, the drive before a legally required break, and a parking stay that will cost you if you forget.',
      'At this length the setup matters more than the timer. The alarm needs this tab open to sound, and the screen only stays on while the page is in front, so plug the device in and leave the page up.',
    ],
    uses: [
      'Brining chicken or pork',
      'Cold brew and long infusions',
      'A half day shift or block',
      'Dough with a long bulk rise',
    ],
    config: { mode: 'countdown', seconds: 14400 },
    faq: [
      {
        q: 'How long should I brine a chicken?',
        a: 'Four hours in a standard wet brine suits a whole bird or thick pieces. Much longer and the meat starts going spongy.',
      },
      {
        q: 'Will the alarm sound four hours later?',
        a: 'Only if this tab is still open. There is no server and no push notification, so a closed tab means no beep.',
      },
      {
        q: 'Should I worry about the screen turning off?',
        a: 'The countdown keeps correct time either way. The wake lock holds the display on only while the page is in the foreground, so keep the device on a charger.',
      },
      {
        q: 'Can I set a different length?',
        a: 'Yes, set any duration on the timer, or use the 3 hour and 5 hour pages.',
      },
    ],
    related: ['/timer/3-hours', '/timer/5-hours', '/timer/2-hours', '/timer'],
  },
  {
    path: '/timer/5-hours',
    h1: '5 hour timer',
    title: '5 Hour Timer – Free Online Countdown',
    description:
      'A 5 hour timer for sous vide, a long study day or a slow cook. Beeps at zero if the tab stays open. No login and nothing to install.',
    intro: [
      'A 5 hour timer is a sous vide bath. Five hours at a low temperature is a common window for short ribs and tougher cuts, where the clock does the work that heat cannot rush.',
      'Five hours is also a full study day with breaks in it, a slow cooker on high, and roughly the flight where you stop pretending you will get anything done.',
      'Be honest about what a browser can do over five hours. The beep only plays if this tab is still open, and the wake lock keeps the screen on only while the page is in front. Put the phone on a charger, or use this on a machine that is not going anywhere.',
    ],
    uses: [
      'Sous vide on tougher cuts',
      'Slow cooker and braise timing',
      'A long study or writing day',
      'Curing and marinating',
    ],
    config: { mode: 'countdown', seconds: 18000 },
    faq: [
      {
        q: 'Is a browser tab reliable for five hours?',
        a: 'The countdown itself is, because it reads the clock rather than counting ticks. What is not guaranteed is the tab surviving five hours, so use a device you will not close.',
      },
      {
        q: 'Will the screen stay on?',
        a: 'Only while the page is in the foreground. Switch away and the wake lock is released. Plug the device in for anything this long.',
      },
      {
        q: 'What if my laptop sleeps?',
        a: 'On waking, the timer recalculates from timestamps and shows the correct remaining time, or fires one catch-up beep if zero has already passed.',
      },
      {
        q: 'Can I set a different length?',
        a: 'Yes, set any duration on the timer, or use the 4 hour and 8 hour pages.',
      },
    ],
    related: ['/timer/4-hours', '/timer/8-hours', '/timer/3-hours', '/timer'],
  },
  {
    path: '/timer/8-hours',
    h1: '8 hour timer',
    title: '8 Hour Timer – Free Online Countdown',
    description:
      'An 8 hour timer for a workday or a sleep target. Beeps at zero if the tab stays open. Free, no account, runs entirely in the browser.',
    intro: [
      'An 8 hour timer is a workday, and the sleep target nobody hits. Eight hours is the number both the working week and every sleep guideline were built around, which makes it the longest block most people ever want to measure.',
      'Eight hours also covers an overnight cold ferment, a long smoke on a brisket, and a charge cycle you would rather not guess at.',
      'Over eight hours a browser tab is the weak link, not the clock. The alarm only sounds while this tab is open, and the screen stays on only when the page is in front. Plug the device in, and for a sleep target use your phone alarm as the real backup.',
    ],
    uses: [
      'A standard workday block',
      'An eight hour sleep target',
      'Overnight cold ferments',
      'Long smokes and slow cooks',
    ],
    config: { mode: 'countdown', seconds: 28800 },
    faq: [
      {
        q: 'Should I use this as an alarm clock?',
        a: 'Not on its own. It needs the tab open and the volume up for eight hours, so set your phone alarm as well and treat this as the visible countdown.',
      },
      {
        q: 'Will the countdown still be right in the morning?',
        a: 'Yes. It works out the remaining time from timestamps, so sleeping and waking the device does not shift it.',
      },
      {
        q: 'Does the screen stay on for eight hours?',
        a: 'Only while the page is in the foreground, and only if the device has power. Use a charger.',
      },
      {
        q: 'Can I set a different length?',
        a: 'Yes, set any duration on the timer, or use the 5 hour page.',
      },
    ],
    related: ['/timer/5-hours', '/timer/4-hours', '/timer/60-minutes', '/timer'],
  },
  {
    path: '/timer/5-seconds',
    h1: '5 second timer',
    title: '5 Second Timer – Free Online Countdown',
    description:
      'A 5 second timer for a short rest between reps, a breath hold or a countdown to go. Beeps at zero and needs no signup at all.',
    intro: [
      'A 5 second timer is the pause between reps. Five seconds at the top of a squat or hanging off a bar is enough to reset your breathing without letting the set cool off, and it is the standard hold in tempo work written as a five count.',
      'Five seconds is also a breath hold at the top of an inhale, and the countdown before someone starts recording.',
      'Press Space to start. It beeps at zero, which is all a five second timer really has to do.',
    ],
    uses: [
      'Short rest between reps',
      'Tempo holds at the top of a lift',
      'Breath holds on the inhale',
      'A countdown to go',
    ],
    config: { mode: 'countdown', seconds: 5 },
    faq: [
      {
        q: 'Can I repeat it automatically?',
        a: 'Yes. The interval timer loops work and rest pairs, so a five second rest can fire again and again without you touching anything.',
      },
      {
        q: 'Is five seconds long enough to hear the beep?',
        a: 'Yes, the beep is an oscillator tone generated on the spot, so there is no file to load and no delay.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds, or use the 7 and 10 second pages.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes, after the first load it runs entirely in your browser.',
      },
    ],
    related: ['/timer/7-seconds', '/timer/10-seconds', '/interval', '/timer'],
  },
  {
    path: '/timer/7-seconds',
    h1: '7 second timer',
    title: '7 Second Timer – Free Online Countdown',
    description:
      'A 7 second timer for isometric holds and tempo reps. Beeps at zero, works in any browser, no login and nothing to download.',
    intro: [
      'A 7 second timer is an isometric hold. Seven seconds is a common prescription for maximal isometrics, long enough to reach real tension and short enough that you can still push hard the whole way through.',
      'Seven seconds also covers a paused rep at the sticking point, a stretch held just past comfortable, and one round of a slow exhale.',
      'Press Space to start. It beeps at zero so you can close your eyes and just hold.',
    ],
    uses: [
      'Maximal isometric holds',
      'Paused reps at the sticking point',
      'Short stretch holds',
      'Slow controlled exhales',
    ],
    config: { mode: 'countdown', seconds: 7 },
    faq: [
      {
        q: 'How long should an isometric hold be?',
        a: 'Around six to ten seconds for maximal effort holds. Longer holds are a different stimulus, closer to endurance than strength.',
      },
      {
        q: 'Can I loop it for several holds?',
        a: 'Yes, the interval timer repeats a work and rest pair so you get a beep at each switch.',
      },
      {
        q: 'Will it beep with the screen off?',
        a: 'The count stays correct either way, but the beep needs the tab in front. Keep the page up while you hold.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds, or use the 5 and 10 second pages.',
      },
    ],
    related: ['/timer/5-seconds', '/timer/8-seconds', '/timer/10-seconds', '/interval'],
  },
  {
    path: '/timer/8-seconds',
    h1: '8 second timer',
    title: '8 Second Timer – Free Online Countdown',
    description:
      'An 8 second timer, the bull riding number and a cold plunge breath. Beeps at zero, runs in the browser, no account needed.',
    intro: [
      'An 8 second timer is the bull ride. Eight seconds is the qualifying time in rodeo, one hand up, and the reason the number sounds much shorter than it feels.',
      'Eight seconds is also one long breath at the shock of a cold plunge, where the job is to get through the first few before your breathing settles.',
      'Press Space to start. A beep marks zero and there is nothing else to set.',
    ],
    uses: [
      'Bull riding practice timing',
      'The first breath in a cold plunge',
      'Short hang or grip holds',
      'Quick transitions between stations',
    ],
    config: { mode: 'countdown', seconds: 8 },
    faq: [
      {
        q: 'Why is bull riding 8 seconds?',
        a: 'It is the qualifying ride in professional rodeo. Stay on with one hand for eight seconds and the ride is scored.',
      },
      {
        q: 'Can I repeat it without restarting?',
        a: 'Yes, the interval timer loops a work and rest pair and beeps at each change.',
      },
      {
        q: 'Will it beep if the tab is in the background?',
        a: 'The count stays correct because it reads timestamps, and the beep plays when the tab is open or as soon as you return.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds, or use the 7 and 10 second pages.',
      },
    ],
    related: ['/timer/7-seconds', '/timer/10-seconds', '/timer/15-seconds', '/timer'],
  },
  {
    path: '/timer/25-seconds',
    h1: '25 second timer',
    title: '25 Second Timer – Free Online Countdown',
    description:
      'A 25 second timer for plank progressions, hollow holds and short work bouts. Beeps at zero and keeps the screen on while it runs.',
    intro: [
      'A 25 second timer is a plank progression. Twenty five seconds is the honest step between fifteen and thirty, the one you add when thirty collapses your hips and fifteen has stopped being hard.',
      'It is also a hollow hold, a dead hang, and a work bout just over the Tabata twenty for anyone building towards a longer format.',
      'Press Space to start. The beep at zero is the cue to put your knees down, and the screen stays awake while it runs.',
    ],
    uses: [
      'Plank and side plank progressions',
      'Hollow holds and dead hangs',
      'Work bouts above 20 seconds',
      'Rest between short sprints',
    ],
    config: { mode: 'countdown', seconds: 25 },
    faq: [
      {
        q: 'Is 25 seconds a useful plank step?',
        a: 'Yes. Adding five or ten seconds at a time holds form better than jumping from fifteen straight to a minute.',
      },
      {
        q: 'Can I loop it with a rest?',
        a: 'Yes, the interval timer repeats work and rest pairs and beeps at each switch.',
      },
      {
        q: 'Will it beep if I switch tabs?',
        a: 'The countdown is timestamp based so it never drifts, and the beep plays while the tab is open or the moment you come back.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds, or use the 20 and 30 second pages.',
      },
    ],
    related: ['/timer/20-seconds', '/timer/30-seconds', '/tabata/20-10-8', '/interval'],
  },
  {
    path: '/timer/40-seconds',
    h1: '40 second timer',
    title: '40 Second Timer – Free Online Countdown',
    description:
      'A 40 second timer for HIIT work blocks and circuit stations. Beeps at zero, keeps the screen on, free with no signup required.',
    intro: [
      'A 40 second timer is a HIIT work block. Forty on and twenty off is one of the most used ratios in group classes because forty seconds is long enough to push your heart rate up and short enough to hold decent form to the end.',
      'Forty seconds is also a long wall sit, a hard row piece, and the station length on most circuit boards in a commercial gym.',
      'Press Space to start. The screen stays awake and a beep lands at zero so you can stop looking at the phone.',
    ],
    uses: [
      'HIIT work blocks at 40/20',
      'Circuit training stations',
      'Wall sits and long isometrics',
      'Hard rowing or bike efforts',
    ],
    config: { mode: 'countdown', seconds: 40 },
    faq: [
      {
        q: 'Is 40/20 a good HIIT ratio?',
        a: 'It is a solid default for group work. Two parts work to one part rest is hard but repeatable across eight or ten rounds.',
      },
      {
        q: 'Can I loop 40 on and 20 off automatically?',
        a: 'Yes. The 40/20 Tabata style page runs the pair on repeat with a beep at every switch.',
      },
      {
        q: 'Will it beep if my hands are busy?',
        a: 'The beep plays on its own while the tab is open, and the wake lock keeps the screen on so you can see the digits from the floor.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds, or use the 30 and 45 second pages.',
      },
    ],
    related: ['/tabata/40-20-8', '/timer/30-seconds', '/timer/45-seconds', '/interval'],
  },
  {
    path: '/timer/75-seconds',
    h1: '75 second timer',
    title: '75 Second Timer – Free Online Countdown',
    description:
      'A 75 second timer for rest between heavy sets. Beeps at zero, keeps the screen on and counts down in the tab title. No account.',
    intro: [
      'A 75 second timer is rest between heavy sets. Seventy five seconds sits between the ninety second default and the minute most people actually take, which makes it the honest middle for accessory work that is still hard.',
      'It is also a long enough gap between hill repeats to get your breathing back without letting your legs go cold.',
      'Press Space to start. The tab title carries the countdown so you can rack the bar, and a beep tells you to go again.',
    ],
    uses: [
      'Rest between heavy sets',
      'Recovery between hill repeats',
      'Timed supersets',
      'Cooldown between rounds',
    ],
    config: { mode: 'countdown', seconds: 75 },
    faq: [
      {
        q: 'How long should I rest between sets?',
        a: 'Around 75 to 90 seconds works for moderate compound and accessory work. Heavy strength sets usually want three minutes or more.',
      },
      {
        q: 'Can I make it repeat between every set?',
        a: 'Yes, the interval timer loops work and rest pairs so you are not restarting after each one.',
      },
      {
        q: 'Will it still beep if I put the phone down?',
        a: 'The countdown keeps correct time from timestamps. The beep plays while the tab is open, or the instant you come back to it.',
      },
      {
        q: 'Can I change the duration?',
        a: 'Yes, set any number of seconds, or use the 60 and 90 second pages.',
      },
    ],
    related: ['/timer/60-seconds', '/timer/90-seconds', '/timer/2-minutes', '/interval'],
  },
];
