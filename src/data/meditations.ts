import type { ProgrammaticPage } from './types';

export const meditations: ProgrammaticPage[] = [
  {
    path: '/meditation/5-minutes',
    h1: '5 minute meditation timer',
    title: '5 Minute Meditation Timer – One Soft Bell',
    description:
      'A 5 minute meditation timer with one soft bell at the end and quiet until then. Free, runs in your browser, no account needed.',
    intro: [
      'This 5 minute meditation timer gives you five quiet minutes and one soft bell at the end. It’s a lovely length for your very first sit. It’s also a good length for busy days, when five minutes is all you have.',
      'If you’d like something to do, count your breaths. Count one on each out-breath, up to ten, then start again at one. You’ll probably lose count by four or so. That’s fine. Noticing you lost count is the whole practice, and five minutes gives you plenty of chances.',
      'You can also just sit. No counting, no method, nothing to get right. Press Start and rest for five minutes until the bell. Nothing will ask anything of you in between.',
    ],
    uses: [
      'Your first try at sitting, before you go longer',
      'A morning sit that fits before you leave the house',
      'A calm reset between meetings',
      'Busy days when five minutes is what you have',
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
        a: 'It’s enough to practise noticing and coming back, which is the core skill. Five minutes you actually sit beats twenty you keep putting off. Move up to ten when five starts to feel short.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'Yes, while the page is open and the timer is running. Your phone shouldn’t go to sleep mid-sit. If a bright screen bothers you, turn the brightness down before you start.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes. You can change the session length and the bell interval above the Start button. At five minutes you only get the end bell. Turn on Start bell if you’d like one at the beginning too.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'The screen should stay on while the timer runs, so it shouldn’t lock. Keep the page open and on screen. In a background tab, the end bell can come late or not at all.',
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
      'This 10 minute meditation timer is quiet for ten minutes, then rings one soft bell. Ten minutes is a common daily length. It feels like a real sit, yet it still fits into most days.',
      'Ten minutes gives you time to settle. The first two or three minutes are often spent shifting around, hearing the room and thinking about your day. After that, the mind has less to sort, and you can watch it wander. Gently coming back is the thing you’re practising.',
      'You don’t need to fill the time. Rest your attention on your breath. When you notice you’ve drifted off, that noticing is one small win. Ten minutes gives you lots of them.',
    ],
    uses: [
      'A daily sit that fits on a weekday',
      'A good default if you’re not sure what length to pick',
      'Winding down at the end of the work day',
      'A gentle next step up from five minutes',
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
        a: 'It’s one soft tone made in your browser that slowly fades out. It’s loud enough to reach you with your eyes closed, and gentle enough not to startle you. You can try it with Preview bell.',
      },
      {
        q: 'Is ten minutes long enough to be worth doing?',
        a: 'Yes. It’s long enough to practise noticing and coming back, which is the heart of most meditation. Small studies suggest daily practice around this length can help a little. Ten minutes most days beats an hour now and then.',
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
      'This 20 minute meditation timer rings a soft bell at ten minutes and again at twenty. Twenty minutes comes up often in meditation. Transcendental Meditation teaches twenty minutes twice a day, and many Zen and Vipassana groups sit for twenty to twenty-five. Teachers vary a lot, but twenty is a long, comfortable sit that doesn’t need special training.',
      'The middle bell is a posture check. Notice if you’ve slumped. Let your back lengthen, soften your jaw and drop your shoulders. Then carry on as before. Ten minutes in is often when the body starts to sag.',
      'Twenty minutes can feel long at first. Restlessness often shows up in the second half, and that’s a good part to stay with. Press Start: ten minutes, a soft bell, ten more minutes, then the end bell.',
    ],
    uses: [
      'A full daily sit once ten minutes feels short',
      'Following the twenty-minute habit many practices use',
      'Morning and evening sits, twice a day',
      'A longer sit with a gentle posture check halfway',
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
        a: 'Yes, while the page is open and the timer is running. Where the browser supports it, the page asks the screen to stay awake. It won’t dim the screen for you, so turn the brightness down before you start.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. Set the bell interval to 20 minutes for just the end bell, or to 5 for a bell every five minutes. The session stays at twenty unless you change it too.',
      },
      {
        q: 'What if I miss the halfway bell?',
        a: 'Glance at the screen. It shows the time left and how many interval bells have rung. The halfway bell is a posture check, so missing one does no harm.',
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
      'This 30 minute meditation timer with bells every 10 splits your sit into three parts. Three short parts feel much easier than one long stretch. That’s a big reason half an hour is easier than it sounds.',
      'Here’s one way to use them. For the first ten minutes, do a body scan, moving your attention slowly from your feet to your head. For the next ten, rest your attention on your breath. For the last ten, just let sounds, thoughts and feelings come and go. This order is only a suggestion. Swap it around, or keep one practice for all thirty minutes.',
      'Even with one practice, the bell every ten minutes helps. After ten minutes your mind has often wandered off. A single soft tone brings you back, kindly and without fuss.',
    ],
    uses: [
      'Splitting a longer sit into three calm parts',
      'Body scan, breath and open awareness in one session',
      'A weekend sit when you have more time',
      'Practising with gentle reminders to come back',
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
        a: 'Count the bells, which is easy with only three. If you open your eyes, the screen also shows the time left and how many interval bells have rung.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. Set it to 15 minutes for two halves instead of three parts. Set it to 30 to hear only the end bell.',
      },
      {
        q: 'Can I make the bells silent?',
        a: 'Turn Sound off. Phones that can vibrate (most Android phones) will buzz at ten, twenty and thirty minutes instead. iPhone browsers don’t vibrate, so there you’d have no signal at all.',
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
      'This 45 minute meditation timer rings a soft bell every 15 minutes. Forty-five minutes is a long sit, and it’s something you grow into over time. At this length, comfort matters more than willpower. Find a seat that will still feel fine in the last ten minutes.',
      'The bells at fifteen and thirty minutes split the time into three parts. If you sit the whole way, they’re gentle posture checks. You can also use them as a plan: sit for fifteen, walk slowly for fifteen, then sit for fifteen. Many retreats mix sitting and walking like this. It gives your legs a rest, and a bell is the usual signal to switch.',
      'Walking meditation needs very little space. Walk a few steps back and forth, slowly, paying attention to your feet. When the bell rings, stop where you are and go back to your seat.',
    ],
    uses: [
      'A long sit once thirty minutes feels comfortable',
      'Sitting and walking in fifteen-minute turns',
      'A retreat-style session at home on a free morning',
      'Sitting with a group, with a bell to mark each change',
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
        a: 'Yes, while the page is open and the timer is running. It lets the screen sleep again when you pause or stop. A bright screen for 45 minutes uses a fair bit of battery, so turn the brightness down first.',
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
      'This 1 hour meditation timer rings a soft bell every 20 minutes, then once more at the end. An hour is the kind of sit you’d find on a retreat. It isn’t just a longer ten minutes. Most of the challenge is in the body, not the mind.',
      'Set up your posture well before you start. On a cushion or bench, keep your hips a little higher than your knees. Let your back stack up easily, and rest your hands where they won’t pull your shoulders forward. A chair works well too. If your legs go numb, that usually passes when you move. Sharp or shooting pain is different, so shift your position.',
      'The bells at twenty and forty minutes split the hour into three parts. That gives the hour a gentle shape. Use them to check your posture, switch legs, or change practice. Press Start and take it one bell at a time.',
    ],
    uses: [
      'Retreat-style sitting at home',
      'A long weekend sit in three twenty-minute parts',
      'Practising at the length a retreat day might use',
      'A planned moment to move your legs',
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
        a: 'You can. Numbness from a folded leg is common and usually fades once you move. Sharp pain is a clear sign to shift. The bells at twenty and forty are easy moments to switch legs.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, above the Start button. Thirty minutes gives two halves, and fifteen gives four quarters. Set it to 60 to hear only the end bell, and turn on Start bell if you’d like one at the beginning.',
      },
      {
        q: 'Will my phone last the full hour?',
        a: 'Usually. The screen stays on while the timer runs, which uses battery over an hour. Plug in or turn the brightness down before you start.',
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
