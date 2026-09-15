import type { ProgrammaticPage } from './types';

export const beeps: ProgrammaticPage[] = [
  {
    path: '/interval/beep-every-30-seconds',
    h1: 'Timer that beeps every 30 seconds',
    title: 'Timer That Beeps Every 30 Seconds – Free',
    description:
      'A timer that beeps every 30 seconds, 20 times by default. No rest phase, no counting. Runs in the browser, keeps the screen on, no login.',
    intro: [
      'A timer that beeps every 30 seconds is mostly a coaching tool. Half a minute is the window where a form check is still useful: reset the bar path, look at where the knee is tracking, check whether the shoulders have crept up. Long enough to get into a set, short enough that nothing has gone badly wrong yet.',
      'The other common use is breathing work. Box breathing, 4-7-8, resonant breathing at six breaths a minute: all of them go better when something external marks the phase so you are not silently counting and drifting. A cue every 30 seconds gives you five breaths per marker at a slow pace.',
      'Rest is deliberately set to 0, so there is no second phase and no falling tone. Rounds is what controls the total length. Twenty rounds is ten minutes; change Rounds in the settings to make it any multiple of 30 seconds you want, and the change is kept in your browser.',
    ],
    uses: [
      'Form checks during a long working set',
      'Breathing drills where counting silently goes wrong',
      'Physio holds and stretch changes',
      'Splitting a warm-up into tidy half-minute blocks',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 0, rounds: 20, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Why is there no rest phase?',
        a: 'Because you do not want one. With Rest at 0 the timer compiles to a single repeating block, so it beeps, starts the next 30 seconds and nothing else happens. Adding a rest of even one second would give you a second tone to ignore.',
      },
      {
        q: 'How do I make it run for half an hour?',
        a: 'Set Rounds to 60. Each round is 30 seconds, so rounds times 30 seconds is the total. There is no separate duration field on purpose.',
      },
      {
        q: 'Does it work in the background?',
        a: 'The timing does. Position comes from timestamps rather than counted ticks, so whenever you come back the timer is on the right round with the right time left. The beeps only play while the tab is open and in front, and the wake lock keeps the screen on while the page is the one you are looking at.',
      },
      {
        q: 'Can I turn the last-three-second ticks off?',
        a: 'Not separately. At a 30 second cadence the ticks act as a warning that the marker is coming, which most people want. Muting the tab silences everything if you only want the visual countdown.',
      },
    ],
    related: [
      '/interval/beep-every-minute',
      '/interval/beep-every-2-minutes',
      '/interval',
    ],
  },
  {
    path: '/interval/beep-every-minute',
    h1: 'Timer that beeps every minute',
    title: 'Timer That Beeps Every Minute – Free, No Login',
    description:
      'A timer that beeps every minute for as long as you want. Set the rounds, press start, put the phone down. Free, works offline, no account.',
    intro: [
      'A timer that beeps every minute is the backbone of EMOM training: every minute on the minute you start the next set, and whatever is left of the minute is your rest. Five kettlebell swings takes twenty seconds, so you get forty off. Ten burpees takes fifty, so you get ten, and you learn that quickly.',
      'It is just as useful away from the gym. Minute markers are how people pace a language drill, a set of exam questions, a plank ladder, or a set of stairs. Anything where you want to know the pace without doing arithmetic against a clock face.',
      'Rest is 0 here so the minute is one unbroken block rather than work-then-rest. Rounds sets the length: 20 rounds is 20 minutes, and you can put it anywhere from 1 to a full hour in the settings. If you would rather think in total minutes, the EMOM timer takes the length directly.',
    ],
    uses: [
      'EMOM sets: start the work when it beeps',
      'Pacing question sets or drills in a study block',
      'Plank or hold ladders that change every minute',
      'Any repeating task where a minute is the natural unit',
    ],
    config: { mode: 'interval', prep: 0, work: 60, rest: 0, rounds: 20, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How is this different from the EMOM timer?',
        a: 'It is the same schedule described from the other end. Here you set how many minute blocks you want; on the EMOM page you set a total length in minutes and it does the division. Pick whichever field you would rather type in.',
      },
      {
        q: 'What happens if my set runs past the minute?',
        a: 'The timer beeps anyway and the next minute starts. That is the point of the format: it tells you honestly that the work no longer fits, which is your cue to drop the reps.',
      },
      {
        q: 'Does it keep time if I switch apps?',
        a: 'Yes, the timing is timestamp-based, so it is correct when you return rather than behind by however long you were away. The beeps need the tab open and in front to sound, and the screen wake lock only holds while the page is the one on screen.',
      },
      {
        q: 'Is there a get-ready countdown?',
        a: 'No. A minute marker usually needs to line up with something, so Start is the first marker. Press it on the settings if you want a moment to put the phone down.',
      },
    ],
    related: [
      '/emom',
      '/interval/beep-every-30-seconds',
      '/interval/kettlebell-emom-10',
      '/blog/emom-workouts-explained',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-2-minutes',
    h1: 'Timer that beeps every 2 minutes',
    title: 'Timer That Beeps Every 2 Minutes – Free Online',
    description:
      'A timer that beeps every 2 minutes, 15 markers by default. Change the rounds to set the total length. Browser-based, offline, no signup.',
    intro: [
      'Two minutes is the tooth-brushing interval every dentist quotes, and it is one of the few pieces of timed advice most people will actually follow if something else is doing the counting. Two beeps, thirty seconds a quadrant, done. It works the same way for kids who will brush for exactly as long as a noise tells them to.',
      'It is also the standard block for speech practice. Two-minute talks are the format at Toastmasters table topics, in interview answers, and in most oral exams, and the only way to get good at landing inside them is to rehearse against a marker rather than a stopwatch you keep glancing at.',
      'There is no rest phase here: rest is 0, so each two minutes runs straight into the next. Rounds is the length control, and fifteen rounds gives you half an hour. Set it to 1 if you only want a single two-minute block with a beep at the end.',
      'The tab title counts down while it runs, which is handy when the timer is in one window and your notes are in another.',
    ],
    uses: [
      'Brushing teeth, one beep per pair of quadrants',
      'Rehearsing two-minute talks and interview answers',
      'French press and steeping timings',
      'Two-minute sparring or grappling rounds without a rest call',
    ],
    config: { mode: 'interval', prep: 0, work: 120, rest: 0, rounds: 15, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Can I have just one two-minute beep?',
        a: 'Set Rounds to 1 and it beeps once at the end, which turns it into a plain two-minute countdown. Set Rounds to 30 for an hour of two-minute tool.',
      },
      {
        q: 'Why is rest set to 0?',
        a: 'So the beeps mark a boundary rather than a break. With a rest phase you would get a falling tone, a pause, then a rising tone, which is wrong when what you want is a metronome at two-minute resolution.',
      },
      {
        q: 'Will it beep while I am in another tab?',
        a: 'No. The clock stays right because it is calculated from timestamps, so nothing drifts and you see the correct round when you come back, but the tones only play with the page open and in front. The wake lock keeps the screen awake for the same reason.',
      },
      {
        q: 'Does it work without internet?',
        a: 'After the first visit, yes. The page and the fonts are cached, and the tones are generated rather than loaded from audio files, so nothing has to be fetched to make a sound.',
      },
    ],
    related: [
      '/interval/beep-every-3-minutes',
      '/interval/beep-every-minute',
      '/interval',
    ],
  },
  {
    path: '/interval/beep-every-3-minutes',
    h1: 'Timer that beeps every 3 minutes',
    title: 'Timer That Beeps Every 3 Minutes – Free',
    description:
      'A timer that beeps every 3 minutes with no rest phase, 10 rounds by default. For rounds, brews and anything on a three-minute cycle. Free.',
    intro: [
      'Three minutes is a boxing round, and a plain three-minute marker is what you want when the rest is not fixed. Gym sessions on the bag rarely stick to a clean minute off: the coach talks, someone rewraps their hands, you drink. A beep every three minutes keeps the work honest without pretending to manage the recovery.',
      'The other place this cadence lives is tea. Three minutes is the middle of the range for black tea and about the upper limit for most green, and leaving it a minute longer is the difference between a cup and a tannin experiment. Same for pasta checks, egg timings and anything else where the useful advice is "taste it at three minutes".',
      'Rest sits at 0, so you get one three-minute block after another with a rising tone on each boundary. The rounds field decides how long the whole thing lasts. Ten rounds is thirty minutes; set it to 3 for a short shadow-boxing warm-up or to 20 for an hour.',
    ],
    uses: [
      'Bag or pad rounds where the rest is not timed',
      'Steeping tea without forgetting about it',
      'Shadow boxing and skipping rounds',
      'Chess-style thinking limits in practice games',
    ],
    config: { mode: 'interval', prep: 0, work: 180, rest: 0, rounds: 10, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'I want three-minute rounds with a minute of rest. Where is that?',
        a: 'On the boxing round timer, which is set to 3 minutes on and 1 minute off with a bell-style tone on each change. This page is the version with no rest phase at all.',
      },
      {
        q: 'How many rounds should I set?',
        a: 'Whatever the session is. This preset ships with 10, which is thirty minutes of marked work. Change Rounds in the settings and the number is remembered in your browser next time you open the page.',
      },
      {
        q: 'Does it beep if my phone is locked or the tab is hidden?',
        a: 'The timing is derived from timestamps, so it is accurate the moment you look again, and it plays a single catch-up tone rather than a burst. Real-time beeps need the tab open and in front, and the wake lock holds the screen on only while the page is visible.',
      },
      {
        q: 'Can I read it from across the room?',
        a: 'The digits are the largest thing on the page and scale with the screen, so a laptop on a bench is readable from the other side of a gym. Space still starts and pauses, and Esc leaves fullscreen.',
      },
    ],
    related: [
      '/interval/beep-every-2-minutes',
      '/interval/beep-every-5-minutes',
      '/interval',
    ],
  },
  {
    path: '/interval/beep-every-5-minutes',
    h1: 'Timer that beeps every 5 minutes',
    title: 'Timer That Beeps Every 5 Minutes – Free Online',
    description:
      'A timer that beeps every 5 minutes, twelve times for a full hour. No rest phase, no account, keeps the screen on. Works offline after one visit.',
    intro: [
      'A timer that beeps every 5 minutes is a nudge, not a task timer. Five minutes is roughly how long you can sit badly before your back starts filing a complaint, so people use this cadence to check posture, unclench the jaw, drop the shoulders, take a proper breath. Frequent enough to catch the drift, rare enough that you are not being interrupted constantly.',
      'It is also the honest way to run a timeboxed meeting. Stand-ups with five minutes per person, design critiques with five minutes per piece, interview panels with a five-minute section each: the marker does the enforcing so nobody has to be the person cutting someone off.',
      'Worth being clear about one neighbouring rule: the 20-20-20 guidance for screen work is every 20 minutes, not every five, and there is a page for that cadence. Five minutes is the posture-and-breathing interval, not the eye-break one.',
      'Rest is 0, so nothing splits the five minutes into work and recovery. Rounds sets the total: twelve rounds is an hour, six is half an hour, and you can change it in the settings whenever the block you are timing is a different length.',
    ],
    uses: [
      'Posture and jaw checks through a long desk session',
      'Timeboxed stand-ups, one beep per speaker',
      'Five-minute sections in a practice interview',
      'Pacing a long cook with regular stirs',
    ],
    config: { mode: 'interval', prep: 0, work: 300, rest: 0, rounds: 12, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is five minutes the right interval for eye breaks?',
        a: 'No. The 20-20-20 rule is a break every 20 minutes, looking 20 feet away for 20 seconds. Use the 20-minute beep page for that. Five minutes suits posture, breathing and position changes.',
      },
      {
        q: 'How do I get exactly one hour?',
        a: 'Rounds 12. Each round is five minutes and there is no rest phase adding to the total, so twelve markers is sixty minutes and the last beep lands at the hour.',
      },
      {
        q: 'Does it keep running in the background?',
        a: 'The clock does, because position is worked out from timestamps rather than counted ticks, so it is right when you switch back. The beeps only sound while the tab is open in front of you, and the screen wake lock applies only while the page is visible.',
      },
      {
        q: 'Do I need to leave it running to keep my settings?',
        a: 'No. Changed values and saved presets live in your browser, so the page opens with your numbers next time. There is no account and nothing is sent anywhere.',
      },
    ],
    related: [
      '/interval/beep-every-10-minutes',
      '/interval/beep-every-3-minutes',
      '/interval',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-10-minutes',
    h1: 'Timer that beeps every 10 minutes',
    title: 'Timer That Beeps Every 10 Minutes – Free',
    description:
      'A timer that beeps every 10 minutes, six rounds for an hour. Set rest to nothing, set the rounds, press start. Free, offline, no login.',
    intro: [
      'Ten minutes is the interval for things that need supervising but not watching. A sauna round, where you want a marker before you start making bad decisions about how long you have been in there. A tattoo session where the artist and the client have agreed on a break rhythm. Contact lenses in solution. A study block where you want to notice whether you are still reading or just moving your eyes.',
      'What these have in common is that ten minutes is long enough for you to genuinely lose track, and short enough that losing track matters. A clock on the wall does not help, because the whole problem is that you stop looking at it.',
      'Rest is 0 so the markers are plain boundaries, not a work-and-rest pattern. Rounds decides how long you get: six rounds is an hour, three is half an hour, eighteen is a three-hour session. Change it under the timer and it stays changed in your browser.',
    ],
    uses: [
      'Sauna and cold plunge rounds',
      'Study check-ins: still reading, or just staring',
      'Long tattoo or treatment sessions with agreed breaks',
      'Soaks, marinades and anything on a ten-minute check',
    ],
    config: { mode: 'interval', prep: 0, work: 600, rest: 0, rounds: 6, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Can I make it repeat all day?',
        a: 'Set Rounds high. At 48 rounds it runs for eight hours of ten-minute markers. The rounds field is the only length control because there is no rest phase to add time.',
      },
      {
        q: 'Will it beep when I am working in another window?',
        a: 'Only if this page is the one in front. The timing itself is timestamp-based, so it never drifts and shows the right round the moment you come back, but tones need the tab open and visible, and the wake lock keeps the screen on under the same condition.',
      },
      {
        q: 'What do the different sounds mean?',
        a: 'A rising pair of tones marks the start of a work block, a falling pair marks a rest, and the last three seconds tick. With rest at 0 you only ever hear the rising pair and the ticks, plus a three-note finish when the last round ends.',
      },
      {
        q: 'Does it remember my numbers?',
        a: 'This page always opens with 10 minutes and 6 rounds. Change the numbers on the main interval timer instead and it keeps them in your browser, with no account and nothing sent anywhere.',
      },
    ],
    related: [
      '/interval/beep-every-15-minutes',
      '/interval/beep-every-5-minutes',
      '/interval',
      '/blog/timer-that-beeps-every-10-minutes',
    ],
  },
  {
    path: '/interval/beep-every-15-minutes',
    h1: 'Timer that beeps every 15 minutes',
    title: 'Timer That Beeps Every 15 Minutes – Free Online',
    description:
      'A timer that beeps every 15 minutes, four rounds for an hour. Quarter-hour markers with no rest phase. Runs in the browser, no signup.',
    intro: [
      'A quarter of an hour is the unit most of the world already schedules in, which is why a timer that beeps every 15 minutes tends to slot straight into whatever you are doing. It is a pomodoro for people who find 25 minutes too long to commit to, and it happens to be the interval a lot of people use to time contractions in early labour, or to stay ahead of a parking meter.',
      'Fifteen minutes is also the length of a decent single task. One email properly written, one page of notes, one room tidied. The beep is useful mostly as permission to stop and decide whether to keep going.',
      'Rest is 0, so there is no break phase built in: the timer marks quarter hours and leaves the decision about breaks to you. Rounds controls the total length, four rounds being an hour. Push it to 16 for a four-hour stretch or drop it to 1 for a single quarter-hour block.',
    ],
    uses: [
      'Short focus blocks when 25 minutes feels like too much',
      'Timing contractions and other regular check intervals',
      'Parking and appointment reminders',
      'Chore blocks: fifteen minutes, one room',
    ],
    config: { mode: 'interval', prep: 0, work: 900, rest: 0, rounds: 4, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Should I use this or a pomodoro timer?',
        a: 'Use the pomodoro timer if you want the breaks managed for you, including a longer one every few sessions. Use this if you only want the quarter-hour markers and would rather decide about breaks in the moment.',
      },
      {
        q: 'How do I run it for a whole afternoon?',
        a: 'Rounds 16 gives you four hours. There is no hidden maximum, and the total is always rounds times fifteen minutes because rest is zero.',
      },
      {
        q: 'Does it work with the tab in the background?',
        a: 'The timing does, because it is calculated from timestamps rather than counted, so switching away and back leaves you on the right round. Beeps only play while the tab is open and in front, and the wake lock holds the screen on only while the page is visible.',
      },
      {
        q: 'Can I use the keyboard?',
        a: 'Space starts and pauses, R asks to reset, Esc asks to stop. They are ignored while you are typing in a field.',
      },
    ],
    related: [
      '/interval/beep-every-20-minutes',
      '/interval/beep-every-10-minutes',
      '/pomodoro',
    ],
  },
  {
    path: '/interval/beep-every-20-minutes',
    h1: 'Timer that beeps every 20 minutes',
    title: 'Timer That Beeps Every 20 Minutes – Free',
    description:
      'A timer that beeps every 20 minutes for the 20-20-20 eye rule, naps and screen breaks. Three rounds by default, change it freely. Free, no login.',
    intro: [
      'Twenty minutes is the number in the 20-20-20 rule for screen work: every 20 minutes, look at something about 20 feet away for 20 seconds. Optometrists have pushed it for years as a way to reduce eye strain from close focus, and the reason almost nobody follows it is that you cannot notice twenty minutes passing while you are concentrating. That is the entire job of this timer.',
      'The same interval is the standard short nap. Twenty minutes gets you the restorative part without dropping into deep sleep and waking up worse than you started, so a marker at twenty is a nap alarm you can trust more than your own sense of time.',
      'Rest is set to 0, which means each twenty minutes runs into the next with a single tone on the boundary. Rounds sets the total, and three rounds is an hour. For a single nap alarm, set Rounds to 1.',
    ],
    uses: [
      'The 20-20-20 rule: look away, twenty feet, twenty seconds',
      'A twenty-minute nap without oversleeping it',
      'Standing up and moving during long desk stretches',
      'Rotating between two tasks on a fixed cadence',
    ],
    config: { mode: 'interval', prep: 0, work: 1200, rest: 0, rounds: 3, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is the 20-20-20 rule actually evidence based?',
        a: 'It is a widely recommended habit from eye-care bodies rather than a hard finding from one trial. The mechanism it targets, sustained near focus and reduced blinking, is real; treat the exact numbers as a practical rule of thumb.',
      },
      {
        q: 'Can I use it as a nap timer?',
        a: 'Yes, with Rounds set to 1 you get one twenty-minute block and a three-note finish. Keep the tab in front and the volume up, since the sound needs the page open to play.',
      },
      {
        q: 'Does it run while I am in another app?',
        a: 'The clock keeps perfect time either way because position comes from timestamps, so you will see the correct remaining time when you return. The beep itself needs the tab open and in front, and the screen wake lock only holds while the page is visible.',
      },
      {
        q: 'Why not just set a repeating phone alarm?',
        a: 'You can, and for all-day reminders a phone alarm is the more robust tool. This is better when you want to start and stop the cadence around a work session, see the countdown, and not touch a system setting.',
      },
    ],
    related: [
      '/interval/beep-every-30-minutes',
      '/interval/beep-every-15-minutes',
      '/interval',
      '/meditation/20-minutes',
    ],
  },
  {
    path: '/interval/beep-every-30-minutes',
    h1: 'Timer that beeps every 30 minutes',
    title: 'Timer That Beeps Every 30 Minutes – Free Online',
    description:
      'A timer that beeps every 30 minutes, four rounds for two hours. Half-hour markers for infusions, watering and long bakes. Free, no account.',
    intro: [
      'Half-hourly markers belong to processes that mind themselves for a while and then need a hand. An infusion or a drip that gets checked on the half hour. A sprinkler zone that runs thirty minutes before you move the hose. Bread proofing, where you want to look at the dough and do a fold rather than guess from how long it feels like it has been sitting.',
      'None of this needs a countdown you watch. It needs something that interrupts you once, reliably, every thirty minutes, while you get on with other things in the same room.',
      'Rest is 0 so there is no second phase: each half hour ends with a tone and the next starts immediately. Rounds is the total-length control and four rounds is two hours, which covers most bulk ferments and most watering rotations. Change it in the settings and your value is kept in the browser.',
    ],
    uses: [
      'Bread proofing and stretch-and-fold intervals',
      'Watering or sprinkler zone rotations',
      'Half-hourly checks on a slow cook or a smoker',
      'Alternating between two long-running jobs',
    ],
    config: { mode: 'interval', prep: 0, work: 1800, rest: 0, rounds: 4, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Should I rely on this for anything medical?',
        a: 'No. It is a browser timer with no alarm guarantees: it cannot wake a sleeping phone or sound with the tab closed. For anything where a missed check matters, use a dedicated alarm or a device built for the job.',
      },
      {
        q: 'How long can I make it run?',
        a: 'As long as you like. Sixteen rounds is eight hours of half-hour markers. Battery and the screen staying awake become the practical limits before the timer does.',
      },
      {
        q: 'Does it keep time in the background?',
        a: 'Yes, the timing is timestamp-based, so a long stretch in another tab does not make it drift and the round is right when you look. Beeps play only with the tab open and in front, and the wake lock keeps the screen on only while the page is visible.',
      },
      {
        q: 'Can I see the time left without switching to the tab?',
        a: 'The browser tab title shows the remaining time while the timer is running or paused, so a glance at the tab strip is enough. It goes back to the page title on reset.',
      },
    ],
    related: [
      '/interval/beep-every-hour',
      '/interval/beep-every-20-minutes',
      '/meditation/30-minutes',
    ],
  },
  {
    path: '/interval/beep-every-hour',
    h1: 'Timer that beeps every hour',
    title: 'Timer That Beeps Every Hour – Hourly Chime',
    description:
      'A timer that beeps every hour, eight rounds for a working day. An hourly chime for water, posture and getting out of the chair. Free, no login.',
    intro: [
      'An hourly chime is the oldest productivity tool there is, and it still works for the same reason church bells did: it tells you time has passed when you had no idea. Eight rounds covers a working day, and each beep is a prompt to drink something, stand up, and stop sitting in whatever shape you have folded into.',
      'People also use hourly markers to keep a log honest. If you are tracking what you actually spent the day on, writing one line every hour gives you something closer to the truth than reconstructing it at six in the evening.',
      'Rest is 0, so an hour runs straight into the next hour with one tone between them. Rounds is the length: eight rounds is eight hours, four gets you a morning. Set the value once and the browser keeps it for the next day.',
      'Keep in mind that this is a page, not a background service. It chimes while it is open in front of you, which suits a machine you work at all day and does not replace a phone alarm.',
    ],
    uses: [
      'Hourly water and posture prompts at a desk',
      'A one-line time log every hour',
      'Getting up and walking once an hour',
      'Marking hours on a long drive break schedule',
    ],
    config: { mode: 'interval', prep: 0, work: 3600, rest: 0, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Will it chime on the hour, like 10:00 and 11:00?',
        a: 'No. It chimes an hour after you press start, then every hour after that. To line it up with the clock, start it on the hour.',
      },
      {
        q: 'Does it beep if I minimise the browser?',
        a: 'No. The clock stays exact because it is calculated from timestamps, so the remaining time is right when you come back, but tones need the tab open and in front. The wake lock also only keeps the screen on while the page is visible.',
      },
      {
        q: 'Can I run it for a twelve-hour shift?',
        a: 'Set Rounds to 12. There is no cap, though a laptop left with the screen awake for twelve hours will notice.',
      },
      {
        q: 'Does it need an account or an internet connection?',
        a: 'Neither. There is no login, and after the first visit the page works offline because the tones are generated in the browser rather than downloaded.',
      },
    ],
    related: [
      '/interval/beep-every-30-minutes',
      '/interval/beep-every-15-minutes',
      '/meditation/1-hour',
      '/interval',
    ],
  },
];
