import type { ProgrammaticPage } from './types';

export const meditations: ProgrammaticPage[] = [
  {
    path: '/meditation/5-minutes',
    h1: '5 minute meditation timer',
    title: '5 Minute Meditation Timer – One Soft Bell',
    description:
      'A 5 minute meditation timer with one soft bell at the end and quiet until then. Free, runs in your browser, no account needed.',
    intro: [
      'Five minutes gives you a small, clearly bounded space for a first sit or a busy day. This preset is quiet until one end bell; interval and start bells are off.',
      'Choose a comfortable position and a simple practice before starting. You might attend to your breath and return when you notice attention wandering. The duration is a practical option, not a minimum dose or a promise about how you will feel.',
    ],
    uses: [
      'A first short sit',
      'A quiet pause between tasks',
      'An end bell without intermediate cues',
    ],
    config: {
      mode: 'meditation',
      total: 300,
      bell: 300,
      intervalBell: false,
      startBell: false,
      endBell: true,
    },
    faq: [
      {
        q: 'Is five minutes long enough to help?',
        a: 'It provides time to practise, but this duration does not guarantee a particular benefit. Choose a length that fits your day and the practice you follow.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'The timer requests an awake screen while running, but the browser or battery settings may refuse it. Keep the page visible and test your device before relying on bells.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes. You can change the session length and the bell interval above the Start button. At five minutes you only get the end bell. Turn on Start bell if you’d like one at the beginning too.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'Not reliably. A locked phone may suspend the page or its sound. Keep the timer visible; a correct countdown after resuming does not mean the bell rang on time.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/10-minutes',
      '/interval/beep-every-5-minutes',
      '/blog/how-long-to-meditate',
    ],
  },
  {
    path: '/meditation/10-minutes',
    h1: '10 minute meditation timer',
    title: '10 Minute Meditation Timer – Bell, No App',
    description:
      'A 10 minute meditation timer with quiet until one soft bell at the end. A calm daily sit, free in your browser, nothing to install.',
    intro: [
      'This ten-minute meditation timer has one bell at the end and no intermediate bells. It suits a sit where you want an ending without periodic reminders.',
      'If you want a halfway cue, turn Interval bell on and set Bell every to 5 minutes. The main countdown still measures the whole ten minutes. Give the halfway bell a purpose before you begin, or leave it off.',
    ],
    uses: [
      'One uninterrupted ten-minute practice',
      'Trying a longer session after five minutes',
      'Adding an optional halfway cue',
    ],
    config: {
      mode: 'meditation',
      total: 600,
      bell: 600,
      intervalBell: false,
      startBell: false,
      endBell: true,
    },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'It is one generated tone with a fading end. Use Preview bell to choose a comfortable device volume before starting.',
      },
      {
        q: 'Is ten minutes long enough to be worth doing?',
        a: 'It provides time to practise, but this duration does not guarantee a particular benefit. Choose a length that fits your day and the practice you follow.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. For a bell halfway through, turn on Interval bell and set it to 5 minutes. Leave it off to hear only the end bell.',
      },
      {
        q: 'Can I add a bell at the start of the ten minutes?',
        a: 'Yes. Turn on Start bell above the Start button. You’ll hear one soft bell as you begin and one at ten minutes.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/20-minutes',
      '/interval/beep-every-10-minutes',
      '/blog/how-long-to-meditate',
    ],
  },
  {
    path: '/meditation/20-minutes',
    h1: '20 minute meditation timer',
    title: '20 Minute Meditation Timer with Mid Bell',
    description:
      'A 20 minute meditation timer with a soft bell at ten minutes and at twenty. Use the middle bell to check your posture. Free, no signup.',
    intro: [
      'This twenty-minute session has an interval bell at ten minutes and an end bell at twenty. Use the midpoint to mark a planned change of practice or simply to notice your position.',
      'Twenty minutes is an available length, not a required next step after ten. You can move, shorten the session or turn off the midpoint bell. Comfort and the practice you intend to follow matter more than reaching a larger number.',
    ],
    uses: [
      'Two planned parts of a practice',
      'A midpoint check-in',
      'A continuous sit with the interval bell disabled',
    ],
    config: {
      mode: 'meditation',
      total: 1200,
      bell: 600,
      intervalBell: true,
      startBell: false,
      endBell: true,
    },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'It’s one soft tone made in your browser, the same at ten minutes and at twenty. Every bell is a single strike, so the halfway bell and the end bell sound alike. The end bell is simply the second one.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'The timer requests an awake screen while running, but the browser or battery settings may refuse it. Keep the page visible and test your device before relying on bells.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. Set the bell interval to 20 minutes for just the end bell, or to 5 for a bell every five minutes. The session stays at twenty unless you change it too.',
      },
      {
        q: 'What if I miss the halfway bell?',
        a: 'Glance at the screen. It shows the time left and the current session progress. The halfway bell is a posture check, so missing one does no harm.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/30-minutes',
      '/meditation/10-minutes',
      '/blog/meditation-timer-interval-bells',
    ],
  },
  {
    path: '/meditation/30-minutes',
    h1: '30 minute meditation timer with bells every 10',
    title: '30 Minute Meditation Timer, Bell Every 10',
    description:
      'A 30 minute meditation timer with a soft bell every 10 minutes. Try body scan, breath and open awareness, ten minutes each. Free, no account.',
    intro: [
      'This thirty-minute session is divided by bells at ten and twenty minutes, with an end bell at thirty. The main clock continues through all three parts.',
      'For example, you could use one part for noticing physical sensations, one for the breath and one for noticing sounds. This is only a possible sequence. Keep one practice throughout if that fits better, and use fewer bells if the reminders become distracting.',
    ],
    uses: [
      'Three equal parts of a practice',
      'A planned change at ten and twenty minutes',
      'One continuous session with optional reminders',
    ],
    config: {
      mode: 'meditation',
      total: 1800,
      bell: 600,
      intervalBell: true,
      startBell: false,
      endBell: true,
    },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'It’s one soft tone made in your browser. You’ll hear it three times: at ten, twenty and thirty minutes. Each strike means one part has ended, which suits a body scan, breath, open awareness plan.',
      },
      {
        q: 'How do I know which segment I am in?',
        a: 'Count the bells, which is easy with only three. If you open your eyes, the screen also shows the time left and the current session progress.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. Set it to 15 minutes for two halves instead of three parts. Set it to 30 to hear only the end bell.',
      },
      {
        q: 'Can I make the bells silent?',
        a: 'Sound off mutes the bell but may leave vibration enabled on supported devices. Test your phone before relying on a silent cue; a muted timer does not guarantee a vibration alert.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/45-minutes',
      '/meditation/20-minutes',
      '/blog/meditation-timer-interval-bells',
    ],
  },
  {
    path: '/meditation/45-minutes',
    h1: '45 minute meditation timer',
    title: '45 Minute Meditation Timer, Bells Every 15',
    description:
      'A 45 minute meditation timer with a soft bell every 15 minutes. Sit the whole time, or walk between the bells. Free in your browser, no login.',
    intro: [
      'The forty-five-minute preset rings at fifteen and thirty minutes, then once at the end. It provides three equal sections without restarting the main clock.',
      'You might alternate sitting, walking and sitting, fifteen minutes each. Plan a clear route and check that you can hear the bell from it. If you prefer one continuous sit, the same bells can be optional check-ins rather than instructions to move.',
    ],
    uses: [
      'Alternating sitting and walking',
      'Three fifteen-minute sections',
      'An optional cue to check your position',
    ],
    config: {
      mode: 'meditation',
      total: 2700,
      bell: 900,
      intervalBell: true,
      startBell: false,
      endBell: true,
    },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'It’s one soft tone made in your browser, with a long fade. You’ll hear it at fifteen, thirty and forty-five minutes. How far it carries depends on your volume, so try Preview bell before you walk.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'The timer requests an awake screen while running, but the browser or battery settings may refuse it. Keep the page visible and test your device before relying on bells.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. For two roughly even halves, set the interval to 23 minutes. You’ll hear one bell at 23 minutes, then the end bell at 45.',
      },
      {
        q: 'Can I walk away from the phone between bells?',
        a: 'Yes, as long as the page stays open and on screen. In a background tab, a bell can come late or not at all. That matters most if the bells tell you when to switch from walking to sitting.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/1-hour',
      '/meditation/30-minutes',
      '/blog/meditation-timer-interval-bells',
    ],
  },
  {
    path: '/meditation/1-hour',
    h1: '1 hour meditation timer',
    title: '1 Hour Meditation Timer, Bells Every 20',
    description:
      'A 1 hour meditation timer with a soft bell every 20 minutes. A retreat-length sit with gentle check-ins at twenty and forty. Free, no account.',
    intro: [
      'The one-hour meditation timer marks twenty and forty minutes with interval bells, then ends at sixty. Choose an hour because it fits your practice and circumstances, not because a longer sit is a score.',
      'Arrange a comfortable position and allow yourself to move when needed. Do not wait for a bell to respond to pain or numbness. For a shorter session, change Session length or choose one of the related timers below.',
    ],
    uses: [
      'A planned hour of practice',
      'Three twenty-minute sections',
      'A longer session with optional check-ins',
    ],
    config: {
      mode: 'meditation',
      total: 3600,
      bell: 1200,
      intervalBell: true,
      startBell: false,
      endBell: true,
    },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'It’s one soft tone made in your browser. Over the hour you’ll hear it three times: at twenty, forty and sixty minutes. One strike always marks the end of one twenty minute part.',
      },
      {
        q: 'Should I move if my legs go numb?',
        a: 'Change position rather than waiting for a bell. If numbness or pain persists or concerns you, seek appropriate guidance. A timer cannot assess the cause.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. Thirty minutes gives two halves, and fifteen gives four quarters. Set it to 60 to hear only the end bell, and turn on Start bell if you’d like one at the beginning.',
      },
      {
        q: 'Will my phone last the full hour?',
        a: 'Battery use depends on the device, brightness and other activity. Check charge before starting and test the setup you intend to use.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/45-minutes',
      '/meditation/30-minutes',
      '/blog/how-long-to-meditate',
    ],
  },
];
