import type { ProgrammaticPage } from './types';

export const beeps: ProgrammaticPage[] = [
  {
    path: '/interval/beep-every-30-seconds',
    h1: 'Timer that beeps every 30 seconds',
    title: 'Timer That Beeps Every 30 Seconds – Free',
    description:
      'A timer that beeps every 30 seconds, 20 times for 10 minutes. Good for form checks, breathing drills and stretches. Free, no login.',
    intro: [
      'This is a timer that beeps every 30 seconds, 20 times in a row. It gives you a gentle cue twice a minute, so you never have to count.',
      'Coaches like it for form checks. Half a minute is long enough to settle into a set. It is short enough to catch small slips early. At each beep, check your knees, your back and your shoulders.',
      'It also helps with breathing practice. At six slow breaths a minute, each beep marks three breaths. You can follow the beeps instead of counting in your head.',
      'Rest is set to 0, so there is one tone per block and no break phase. Rounds sets the length: 20 rounds is 10 minutes. Change Rounds to make it any multiple of 30 seconds.',
    ],
    uses: [
      'Form checks during a long set',
      'Breathing drills without counting in your head',
      'Physio holds and stretch changes',
      'A warm-up split into half-minute blocks',
    ],
    config: { mode: 'interval', prep: 0, work: 30, rest: 0, rounds: 20, sets: 1, setRest: 0 },
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
        a: 'Not reliably. A background tab gets slowed down, and with a beep due every 30 seconds you would miss a lot of them. Keep the page on screen during your drill. The round count stays right either way, because it’s read from the clock.',
      },
      {
        q: 'Can I turn the last-three-second ticks off?',
        a: 'Not on their own. The ticks warn you the next beep is close. If you want silence, turn the Sound chip off and watch the countdown instead.',
      },
    ],
    related: ['/interval/beep-every-minute', '/interval/beep-every-2-minutes', '/interval'],
  },
  {
    path: '/interval/beep-every-minute',
    h1: 'Timer that beeps every minute',
    title: 'Timer That Beeps Every Minute – Free, No Login',
    description:
      'A timer that beeps every minute, 20 times by default. Great for EMOM sets, study drills and plank ladders. Free, works offline, no account.',
    intro: [
      'This is a timer that beeps every minute, 20 times by default. It is the heart of EMOM training, which means every minute on the minute. At each beep you start a set. Whatever is left of the minute is your rest.',
      'Say five kettlebell swings take 20 seconds. You get 40 seconds off. Ten burpees might take 50 seconds, which leaves you 10. The beep shows you quickly how hard a set really is.',
      'It helps outside the gym too. Use it to pace a language drill, a set of exam questions, a plank ladder or a stair climb. You feel the pace without doing sums against a clock.',
      'Rest is 0, so each minute is one unbroken block. Rounds sets the length, and 20 rounds is 20 minutes. If you prefer to type a total in minutes, the EMOM timer takes that directly.',
    ],
    uses: [
      'EMOM sets: start the work when it beeps',
      'Pacing questions or drills in a study block',
      'Plank or hold ladders that change every minute',
      'Any repeating task that fits in a minute',
    ],
    config: { mode: 'interval', prep: 0, work: 60, rest: 0, rounds: 20, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'How is this different from the EMOM timer?',
        a: 'It is the same idea set up another way. Here you choose how many one-minute rounds you want. On the EMOM page you type the total minutes and it works out the rest.',
      },
      {
        q: 'What happens if my set runs past the minute?',
        a: 'The timer beeps anyway and the next minute starts. That tells you the set no longer fits. Drop a rep or two and it will.',
      },
      {
        q: 'Does it keep time if I switch apps?',
        a: 'The time does, because it’s read from the clock. The beeps don’t: in the background a browser slows the page, so a minute beep can come late or not at all. For EMOM sets, leave the phone on the page and propped where you can see it.',
      },
      {
        q: 'Is there a get-ready countdown?',
        a: 'No. The first minute begins the moment you press Start. If you need a few seconds to get into place, press Start and put the phone down on your way.',
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
      'A timer that beeps every 2 minutes, 15 times for half an hour. For brushing teeth, practice talks and short rounds. Free, works offline, no signup.',
    intro: [
      'This is a timer that beeps every 2 minutes, 15 times by default. Two minutes is the brushing time dentists suggest. Set Rounds to 1, start brushing, and stop at the beep. Kids often find it easier to brush when a sound says when to stop.',
      'Two minutes is also a common length for a spoken answer. Interview answers, short practice speeches and many oral exams sit near it. Practising against a beep helps you finish on time without glancing at a clock.',
      'Rest is 0, so each two minutes runs straight into the next. Rounds sets the length, and 15 rounds is half an hour.',
      'The browser tab title counts down while it runs. That helps when your notes are in another window.',
    ],
    uses: [
      'Brushing teeth for the full two minutes',
      'Practising two-minute talks and interview answers',
      'French press and steeping times',
      'Two-minute sparring or grappling rounds with no rest call',
    ],
    config: { mode: 'interval', prep: 0, work: 120, rest: 0, rounds: 15, sets: 1, setRest: 0 },
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
        a: 'It might not. Browsers slow down background tabs, so a beep can come late or not at all. If you are rehearsing a talk, put your notes beside this tab rather than over it. The count itself stays right.',
      },
      {
        q: 'Does it work without internet?',
        a: 'Yes, after your first visit. The page is saved in your browser. The tones are made in the browser, so there are no sound files to download.',
      },
    ],
    related: ['/interval/beep-every-3-minutes', '/interval/beep-every-minute', '/interval'],
  },
  {
    path: '/interval/beep-every-3-minutes',
    h1: 'Timer that beeps every 3 minutes',
    title: 'Timer That Beeps Every 3 Minutes – Free',
    description:
      'A timer that beeps every 3 minutes, 10 times for half an hour. For bag rounds, tea and anything on a three-minute cycle. Free, no login.',
    intro: [
      'This is a timer that beeps every 3 minutes, 10 times by default. Three minutes is a boxing round. A plain three-minute beep suits bag work where the rest is loose. You might chat, fix your wraps or grab a drink. The beep keeps the rounds on time and leaves the rest to you.',
      'It is handy in the kitchen too. Three minutes is the low end for black tea and the high end for most green tea. It also works for checking pasta, eggs and anything else you want to taste at three minutes.',
      'Rest is 0, so one three-minute block follows another with a rising tone at each change. Rounds sets the length: 10 rounds is 30 minutes. Try 3 for a short shadow-boxing warm-up or 20 for an hour.',
    ],
    uses: [
      'Bag or pad rounds with untimed rest',
      'Steeping tea without forgetting it',
      'Shadow boxing and skipping rounds',
      'Thinking time limits in practice chess games',
    ],
    config: { mode: 'interval', prep: 0, work: 180, rest: 0, rounds: 10, sets: 1, setRest: 0 },
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
        a: 'Not reliably, so keep the page open and on screen between rounds. The time stays right, because it’s read from the clock. If it missed several beeps, it plays one catch-up tone when you come back, not a burst.',
      },
      {
        q: 'Can I read it from across the room?',
        a: 'Yes. The digits are the biggest thing on the page and grow with the screen. Space starts and pauses, and Esc asks before it stops.',
      },
    ],
    related: ['/interval/beep-every-2-minutes', '/interval/beep-every-5-minutes', '/interval'],
  },
  {
    path: '/interval/beep-every-5-minutes',
    h1: 'Timer that beeps every 5 minutes',
    title: 'Timer That Beeps Every 5 Minutes – Free Online',
    description:
      'A timer that beeps every 5 minutes, 12 times for a full hour. For posture checks, breathing and timed meetings. Free, no account, works offline.',
    intro: [
      'This is a timer that beeps every 5 minutes, 12 times for an hour. It is a gentle nudge, not a task timer. Five minutes is about how long you sit well before you start to slump.',
      'At each beep, check in with your body. Sit up, drop your shoulders, relax your jaw and take one slow breath. The beeps come often enough to catch you drifting, but not so often that they break your focus.',
      'It also keeps meetings fair. Give each person five minutes in a stand-up, a design review or an interview panel. The beep marks the time, so nobody has to cut anyone off.',
      'For eye breaks, the 20-20-20 rule uses every 20 minutes, and there is a page for that. Rest is 0 here, and Rounds sets the total. Twelve rounds is an hour and six is half an hour.',
    ],
    uses: [
      'Posture and jaw checks through a long desk session',
      'Timed stand-ups, one beep per speaker',
      'Five-minute sections in a practice interview',
      'Stirring a long cook at regular times',
    ],
    config: { mode: 'interval', prep: 0, work: 300, rest: 0, rounds: 12, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is five minutes the right interval for eye breaks?',
        a: 'No. The 20-20-20 rule means every 20 minutes, look about 20 feet away for 20 seconds. Use the 20-minute page for that. Five minutes suits posture, breathing and shifting position.',
      },
      {
        q: 'How do I get exactly one hour?',
        a: 'Set Rounds to 12. Each round is five minutes and there is no rest phase, so the last beep lands right at the hour.',
      },
      {
        q: 'Does it keep running in the background?',
        a: 'The count does, but a posture beep in a background tab can come late or not at all. Browsers slow hidden pages down. Put this page on a second screen, or in a small window beside your work.',
      },
      {
        q: 'Do I need to leave it running to keep my settings?',
        a: 'No. This page always opens with these numbers. The main interval timer remembers your own settings in your browser. There is no account and nothing is sent anywhere.',
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
      'A timer that beeps every 10 minutes, six times for an hour. For sauna rounds, study check-ins and long soaks. Free, works offline, no login.',
    intro: [
      'This is a timer that beeps every 10 minutes, six times for an hour. Ten minutes suits things you need to check on but not watch.',
      'Think of a sauna round, where you want a clear sign it is time to step out. Or a long tattoo session with agreed breaks. Or a study block, where the beep asks if you are still reading or just staring at the page.',
      'Ten minutes is long enough to lose track of time, and short enough that it matters when you do. A wall clock does not help, because you stop looking at it.',
      'Rest is 0, so each beep is a plain marker. Rounds sets the length: six rounds is an hour, three is half an hour and 18 is three hours.',
    ],
    uses: [
      'Sauna and cold plunge rounds',
      'Study check-ins: still reading, or just staring',
      'Long tattoo or treatment sessions with set breaks',
      'Soaks, marinades and anything you check every ten minutes',
    ],
    config: { mode: 'interval', prep: 0, work: 600, rest: 0, rounds: 6, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Can I make it repeat all day?',
        a: 'Yes. Set Rounds to 48 for eight hours of ten-minute beeps. Rounds goes up to 99, which is a little over 16 hours.',
      },
      {
        q: 'Will it beep when I am working in another window?',
        a: 'Only if it stays on screen. Behind another window, the browser slows it down, so a beep can come late or not at all. A study check-in that comes late defeats the point, so give it a corner of your screen. The time itself never drifts.',
      },
      {
        q: 'What do the different sounds mean?',
        a: 'A rising pair of tones starts each block. Three short ticks count down the last three seconds. A three-note tune plays when the last round ends. With rest at 0 you never hear the falling rest tone.',
      },
      {
        q: 'Does it remember my numbers?',
        a: 'This page always opens with 10 minutes and 6 rounds. The main interval timer remembers your own numbers in your browser. There is no account and nothing is sent anywhere.',
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
      'A timer that beeps every 15 minutes, four times for an hour. Quarter-hour markers for short focus blocks and chores. Free, runs in your browser.',
    intro: [
      'This is a timer that beeps every 15 minutes, four times for an hour. Most days are already planned in quarter hours, so it fits right in.',
      'It works well as a short focus block. If 25 minutes feels like too much, 15 is easier to start. It also helps you keep an eye on a parking meter or the time before a meeting.',
      'Fifteen minutes is a good size for one task. Write one email, take one page of notes or tidy one room. The beep is a chance to stop and choose: keep going or take a break.',
      'Rest is 0, so no break is built in, and the choice stays with you. Rounds sets the length: four rounds is an hour. Use 16 for four hours, or 1 for a single quarter hour.',
    ],
    uses: [
      'Short focus blocks when 25 minutes feels like too much',
      'Parking and appointment reminders',
      'Chore blocks: fifteen minutes, one room',
      'Regular stretch breaks through a long day',
    ],
    config: { mode: 'interval', prep: 0, work: 900, rest: 0, rounds: 4, sets: 1, setRest: 0 },
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
        a: 'The quarter hours stay right, since they’re read from the clock. The beep may not: a background tab gets slowed, so it can come late or not at all. If a parking meter depends on it, keep the page on screen.',
      },
      {
        q: 'Can I use the keyboard?',
        a: 'Yes. Space starts and pauses. While it runs, R asks before it resets and Esc asks before it stops. The keys are ignored while you are typing in a field.',
      },
    ],
    related: ['/interval/beep-every-20-minutes', '/interval/beep-every-10-minutes', '/pomodoro'],
  },
  {
    path: '/interval/beep-every-20-minutes',
    h1: 'Timer that beeps every 20 minutes',
    title: 'Timer That Beeps Every 20 Minutes – Free',
    description:
      'A timer that beeps every 20 minutes for the 20-20-20 eye rule, short naps and screen breaks. Three rounds for an hour by default. Free, no login.',
    intro: [
      'This is a timer that beeps every 20 minutes, three times for an hour. It is made for the 20-20-20 rule. Every 20 minutes, look at something about 20 feet away for 20 seconds.',
      'Eye doctors suggest this habit to ease eye strain from screens. The hard part is noticing when 20 minutes have passed while you work. That is the job of this timer.',
      'Twenty minutes is also a classic short nap. It is long enough to rest, but short enough to wake up without feeling groggy. Set Rounds to 1 for a single nap alarm.',
      'Rest is 0, so each 20 minutes runs into the next with one tone between them. Rounds sets the total, and three rounds is an hour.',
    ],
    uses: [
      'The 20-20-20 rule: look 20 feet away for 20 seconds',
      'A twenty-minute nap without oversleeping',
      'Standing up and moving during long desk stretches',
      'Switching between two tasks on a steady rhythm',
    ],
    config: { mode: 'interval', prep: 0, work: 1200, rest: 0, rounds: 3, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Is the 20-20-20 rule actually evidence based?',
        a: 'It is a common tip from eye-care groups, not the result of one big study. The problem it targets is real: staring close up for long spells and blinking less. Treat the exact numbers as a handy rule of thumb.',
      },
      {
        q: 'Can I use it as a nap timer?',
        a: 'Yes. Set Rounds to 1 for one twenty-minute block with a three-note finish. Keep the page open, on screen and with the volume up so you hear it.',
      },
      {
        q: 'Does it run while I am in another app?',
        a: 'Keep it on screen for the eye-break beep. In another app or tab, the browser slows the page down, and the beep can come late or not at all. The time left is still right when you look back.',
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
    ],
  },
  {
    path: '/interval/beep-every-30-minutes',
    h1: 'Timer that beeps every 30 minutes',
    title: 'Timer That Beeps Every 30 Minutes – Free Online',
    description:
      'A timer that beeps every 30 minutes, four times for two hours. Half-hour markers for bread, watering and long cooks. Free, no account.',
    intro: [
      'This is a timer that beeps every 30 minutes, four times for two hours. It suits jobs that look after themselves for a while and then need a hand.',
      'Bread dough is a good example. You check it every half hour and give it a fold. A sprinkler zone might run for 30 minutes before you move the hose. A slow cook or smoker might need a look now and then.',
      'You do not need to watch a countdown for any of this. You just need one clear beep every half hour while you get on with other things.',
      'Rest is 0, so each half hour ends with a tone and the next begins right away. Rounds sets the length, and four rounds is two hours. That covers most bread rises and watering rounds.',
    ],
    uses: [
      'Bread rising and stretch-and-fold times',
      'Watering or sprinkler zone changes',
      'Half-hourly checks on a slow cook or a smoker',
      'Switching between two long-running jobs',
    ],
    config: { mode: 'interval', prep: 0, work: 1800, rest: 0, rounds: 4, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Should I rely on this for anything medical?',
        a: 'No. It is a browser timer and cannot promise to sound. It cannot wake a sleeping phone or beep with the tab closed. If a missed check matters, use a proper alarm or a device made for the job.',
      },
      {
        q: 'How long can I make it run?',
        a: 'Rounds goes up to 99, which is over two days of half-hour beeps. Sixteen rounds is eight hours. Your battery and screen will run out before the timer does.',
      },
      {
        q: 'Does it keep time in the background?',
        a: 'The time does. Two hours in another tab won’t make it drift, because it’s read from the clock. The half-hour beep is another matter: a background tab gets slowed, so it can come late or not at all. Keep the page open on a screen you’ll hear.',
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
    ],
  },
  {
    path: '/interval/beep-every-hour',
    h1: 'Timer that beeps every hour',
    title: 'Timer That Beeps Every Hour – Hourly Chime',
    description:
      'A timer that beeps every hour, eight times for a working day. An hourly chime to drink water, stretch and get up from your chair. Free, no login.',
    intro: [
      'This is a timer that beeps every hour, eight times for a full working day. An hourly chime is one of the oldest time tools there is. Like a church bell, it tells you time has passed when you had lost track.',
      'Use each beep as a prompt to drink some water, stand up and stretch. After hours at a desk, one short move each hour helps.',
      'Hourly beeps also help you keep a simple time log. Write one line each hour about what you did. It is far more accurate than trying to remember at the end of the day.',
      'Rest is 0, so each hour runs straight into the next with one tone between them. Rounds sets the length: eight rounds is eight hours and four is a morning. This is a web page, not an app, so it chimes while it is open on screen. It suits a computer you use all day, but it does not replace a phone alarm.',
    ],
    uses: [
      'Hourly water and posture prompts at a desk',
      'A one-line time log every hour',
      'Getting up and walking once an hour',
      'Planning breaks on a long drive',
    ],
    config: { mode: 'interval', prep: 0, work: 3600, rest: 0, rounds: 8, sets: 1, setRest: 0 },
    faq: [
      {
        q: 'Will it chime on the hour, like 10:00 and 11:00?',
        a: 'No. It chimes one hour after you press Start, then every hour after that. To match the clock, press Start right on the hour.',
      },
      {
        q: 'Does it beep if I minimise the browser?',
        a: 'It might not. A minimised browser gets slowed down, so the hourly chime can come late or not at all. Leave the window open on a corner of the screen. The hour count stays right either way.',
      },
      {
        q: 'Can I run it for a twelve-hour shift?',
        a: 'Yes. Set Rounds to 12. Keep the laptop plugged in, since the screen stays awake the whole time.',
      },
      {
        q: 'Does it need an account or an internet connection?',
        a: 'Neither. There is no login. After your first visit the page works offline, and the tones are made in the browser, so nothing needs to download.',
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
