import type { ProgrammaticPage } from './types';

export const meditations: ProgrammaticPage[] = [
  {
    path: '/meditation/5-minutes',
    h1: '5 minute meditation timer',
    title: '5 Minute Meditation Timer – One Soft Bell',
    description:
      'A 5 minute meditation timer with a bell to start and a bell at the end. Ten seconds to settle first. Free, runs in the browser, no account.',
    intro: [
      'A 5 minute meditation timer is the length to use for a first sit, and the length to come back to on the days you have already decided you do not have time. Five minutes is short enough that the excuse does not survive contact with it, and long enough that you will notice your attention moving.',
      'If you want something to do rather than nothing, count breaths. One on the out-breath, up to ten, then start again at one. You will lose the count somewhere around four. Losing it is not the failure; noticing that you lost it is the entire exercise, and five minutes gives you several goes at that.',
      'The other instruction, which sounds unhelpful until it is not, is to just sit. No counting, no technique, nothing to get right. Ten seconds of settle-in, one bell, five minutes, one bell. Nothing in between asks anything of you.',
    ],
    uses: [
      'A first attempt at sitting, before committing to anything longer',
      'A morning sit that fits before leaving the house',
      'Resetting between meetings without lying down',
      'Days when the honest choice is five minutes or nothing',
    ],
    config: { mode: 'meditation', prep: 10, bell: 300, total: 300 },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'A single soft tone generated in the browser, with a slow decay. It is not a recorded singing bowl or a struck gong, and it will not pretend to be one. It is the same tone every time, which is what you want from something that marks a boundary.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'Yes, while the page is in front. It requests a screen wake lock when you start and drops it when you stop, so the phone should not sleep mid-sit. Turn the brightness down by hand first if a lit screen bothers you with your eyes closed.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes. The bell interval and the total length are both editable in Settings under the timer. At five minutes they are the same number, so there is one bell at the start and one at the end.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'The timing stays right either way, because position comes from timestamps rather than counted ticks. The bell only plays while the page is open, so keep the tab in front rather than switching away or locking the screen.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/10-minutes',
      '/timer/5-minutes',
      '/blog/how-long-to-meditate',
    ],
  },
  {
    path: '/meditation/10-minutes',
    h1: '10 minute meditation timer',
    title: '10 Minute Meditation Timer – Bell, No App',
    description:
      'A 10 minute meditation timer with one soft bell to start and one at the end. Ten seconds to settle in. Free in the browser, nothing to install.',
    intro: [
      'A 10 minute meditation timer is the length most apps open on, and the reason is less mystical than it looks: ten minutes is the shortest sit that does not feel like a token gesture, and it still fits in a day without negotiation.',
      'What ten minutes buys you over five is time to get past the first settling. The first two or three minutes tend to be admin — shifting position, noticing the room, running through the day. The interesting part starts after that, when the mind has nothing new to file and begins wandering off on its own. Watching that happen, and coming back, is the thing you are practising.',
      'You do not need to fill it. A breath to rest attention on is enough, and when you notice you have been somewhere else for a while, that noticing is the rep. Ten minutes gives you a decent number of them.',
    ],
    uses: [
      'A daily sit that is realistic on a weekday',
      'The default length if you are not sure what to pick',
      'Winding down at the end of the working day',
      'Building from five minutes without a big jump',
    ],
    config: { mode: 'meditation', prep: 10, bell: 600, total: 600 },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'One soft generated tone that fades out, not a recorded bowl or bell. It is deliberately plain: loud enough to reach you with your eyes shut, quiet enough that it does not startle you out of the sit.',
      },
      {
        q: 'Is ten minutes long enough to be worth doing?',
        a: 'Long enough to practise noticing and returning, which is the mechanism most instructions are pointing at. Some studies of daily practice in roughly this range report measurable effects, though the research is mixed and the effects are modest. Consistency at ten minutes beats an occasional hour.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, in Settings. Set the bell interval to 5 minutes and the total to 10 if you want a mid-point bell, or leave them equal for start and end only.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'The clock stays accurate through a lock or a dimmed screen because the position is derived from timestamps. The sound is the part that needs the page open, so keep the tab in front if you want to hear the end.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/20-minutes',
      '/timer/10-minutes',
      '/blog/how-long-to-meditate',
    ],
  },
  {
    path: '/meditation/20-minutes',
    h1: '20 minute meditation timer',
    title: '20 Minute Meditation Timer with Mid Bell',
    description:
      'A 20 minute meditation timer with a bell at ten and twenty minutes. Use the middle bell as a posture check. Free, browser-based, no signup.',
    intro: [
      'A 20 minute meditation timer matches the length that turns up again and again in practice instructions. Transcendental Meditation teaches twenty minutes twice a day as a standard, and twenty to twenty-five minutes is a common sitting period in many Zen and Vipassana settings, though the specifics vary a great deal between teachers and lineages. Nobody arrived at twenty by measurement; it seems to be roughly where a sit stops being brief and stays comfortable without training.',
      'This preset rings at ten minutes as well as at the end. The middle bell is a posture check, not an instruction to do something new. Notice where you have slumped, let the spine come back up, unclench the jaw, drop the shoulders, then carry on with whatever you were doing. Ten minutes in is about when the body starts giving way.',
      'If twenty feels like a stretch, it probably is at first, and the second half is where the restlessness shows up. That is the part worth sitting through rather than shortening. Ten seconds to settle, a bell, ten minutes, a bell, ten more, a bell.',
    ],
    uses: [
      'A full-length daily sit once ten minutes feels short',
      'Matching the twenty-minute convention in many practices',
      'Morning and evening sits, twice a day',
      'A sit long enough to need a posture correction halfway',
    ],
    config: { mode: 'meditation', prep: 10, bell: 600, total: 1200 },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'A single soft tone generated by the browser, the same one at ten minutes and at the end. It is not a recorded singing bowl. Every bell here is one strike, so you never have to work out whether a sound meant start or stop.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'Yes while the page is in front, using the Wake Lock API with an inline fallback for browsers without it. Dim the brightness manually before you start; the wake lock keeps the screen awake but will not make it darker.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, in Settings. Set the bell interval to 20 minutes for start and end only, or to 5 for a bell every five. The total stays at twenty unless you change that too.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'The timing stays right, because nothing counts ticks and the position is recalculated from the clock. The bell only plays while the page is open, so keep the tab in front for the whole sit.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/30-minutes',
      '/meditation/10-minutes',
      '/blog/meditation-timer-with-interval-bells',
    ],
  },
  {
    path: '/meditation/30-minutes',
    h1: '30 minute meditation timer with bells every 10',
    title: '30 Minute Meditation Timer, Bell Every 10',
    description:
      'A 30 minute meditation timer with bells every 10 minutes. Use the three segments for body scan, breath and open awareness. Free, no account.',
    intro: [
      'A 30 minute meditation timer with bells every 10 gives you three segments instead of one long stretch, and that structure is most of why half an hour is easier to sit than it sounds.',
      'One common way to use the three: body scan for the first ten, moving attention slowly from feet to head; breath for the second ten, attention resting in one place; open awareness for the last ten, letting sound and thought and sensation arrive without picking any of them up. Plenty of traditions sequence practice roughly this way, but the ordering here is a practical suggestion rather than anything canonical, and swapping the order or using all thirty minutes for one practice is fine.',
      'Even if you keep one practice throughout, the bell every ten does something useful on its own. It is a gentle re-anchor: after ten minutes you are usually somewhere else, and a single tone puts you back without telling you off. That beats discovering at minute twenty-six that you have been planning dinner since minute twelve.',
    ],
    uses: [
      'Splitting a longer sit into three named phases',
      'Body scan, breath and open awareness in one session',
      'A weekend sit when there is more time than on a weekday',
      'Practising with a re-anchor rather than one unbroken stretch',
    ],
    config: { mode: 'meditation', prep: 10, bell: 600, total: 1800 },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'One soft generated tone, identical at ten, twenty and thirty minutes. Not a recorded singing bowl, and not a rising-then-falling pair: a single strike each time, so a bell never means anything other than "a segment just ended".',
      },
      {
        q: 'How do I know which segment I am in?',
        a: 'By counting the bells, which is easier than it sounds when there are only three. The screen also shows elapsed and remaining time if you open your eyes, though the point of the bells is that you do not have to.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, in Settings. Fifteen minutes gives you two halves instead of three thirds, and setting the interval equal to the total gives you start and end bells only.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'The timing stays right through a lock, a dimmed screen or a backgrounded tab, since position comes from timestamps. The bell only plays while the page is open, so keep the tab in front if you want to hear all three.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/45-minutes',
      '/meditation/20-minutes',
      '/blog/meditation-timer-with-interval-bells',
    ],
  },
  {
    path: '/meditation/45-minutes',
    h1: '45 minute meditation timer',
    title: '45 Minute Meditation Timer, Bells Every 15',
    description:
      'A 45 minute meditation timer with a soft bell every 15 minutes. Sit through, or walk between bells. Free, runs in your browser, no login.',
    intro: [
      'A 45 minute meditation timer is a long sit by everyday standards, and the kind of thing you grow into rather than start with. Three quarters of an hour is past the point where willpower carries you; the body has to be comfortable enough that you are not negotiating with a knee for the last ten minutes.',
      'The bells at fifteen and thirty minutes break it into thirds. Used as a single sit, they are re-anchors and posture checks. Used the other way, they are a schedule: sit for fifteen, walk slowly for fifteen, sit for fifteen. Alternating sitting and walking is standard in many retreat settings, partly because it keeps the legs from becoming the only thing you can think about, and a bell is the usual way the change is signalled.',
      'Walking meditation does not need space. A few metres back and forth, slowly, with attention on the feet, does the job. When the bell goes, stop where you are and go back to the cushion.',
    ],
    uses: [
      'A long sit once thirty minutes feels comfortable',
      'Alternating sitting and walking in fifteen-minute blocks',
      'A retreat-style session at home on a free morning',
      'Sitting with a group where a bell marks the changes',
    ],
    config: { mode: 'meditation', prep: 10, bell: 900, total: 2700 },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'A single soft tone, generated in the browser rather than sampled, with a long fade. It is honestly a synthesised bell and not a recorded singing bowl, but it is quiet and consistent, which is what a forty-five minute sit needs.',
      },
      {
        q: 'Does it keep the screen on?',
        a: 'Yes for as long as the page is in front. The wake lock is requested on start and released when you stop or reset. Over forty-five minutes a bright screen will drain a phone noticeably, so turn the brightness down manually first.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, in Settings. Twenty-two and a half minutes is not a round number, so if you want two halves instead of three thirds, set the total to 45 and the interval to 22 and accept the extra minute at the end.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'The clock is right regardless, because it is derived from timestamps rather than counted. The sound is not: the bell only plays while the page is open, so keep the tab in front, especially if you are using the bells to time walking.',
      },
    ],
    related: [
      '/meditation',
      '/meditation/1-hour',
      '/meditation/30-minutes',
      '/blog/meditation-timer-with-interval-bells',
    ],
  },
  {
    path: '/meditation/1-hour',
    h1: '1 hour meditation timer',
    title: '1 Hour Meditation Timer, Bells Every 20',
    description:
      'A 1 hour meditation timer with a soft bell every 20 minutes. Retreat-length sitting, with re-anchors at twenty and forty. Free, no account.',
    intro: [
      'A 1 hour meditation timer is retreat territory. An hour on a cushion is not a longer version of ten minutes; it is a different problem, and most of the difficulty is physical rather than mental. Longer sits of roughly this length are common in intensive retreat schedules, though what a given tradition asks for varies widely.',
      'Get the posture sorted before you start, because you will not fix it at minute forty. Hips above knees on a cushion or bench, spine stacked rather than held, hands somewhere they can rest without pulling the shoulders forward. A chair is fine. Legs go numb; numb is usually tolerable and passes when you move, while sharp or shooting pain is a reason to shift position rather than something to sit through.',
      'The bells at twenty and forty minutes split the hour into three, which is enough structure to keep it from becoming featureless. Use them as posture checks, as permission to change legs, or as boundaries between practices. Ten seconds to settle, then one bell at a time.',
    ],
    uses: [
      'Retreat-style sitting at home',
      'A long weekend sit with three twenty-minute blocks',
      'Practising at the length an intensive schedule would use',
      'Sitting with legs that need permission to move at a marked point',
    ],
    config: { mode: 'meditation', prep: 10, bell: 1200, total: 3600 },
    faq: [
      {
        q: 'What does the bell sound like?',
        a: 'One soft generated tone, the same at twenty, forty and sixty minutes. It is a synthesised bell, not a recording of a singing bowl, and there is no rising or falling pair to interpret. One strike means one boundary.',
      },
      {
        q: 'Should I move if my legs go numb?',
        a: 'Numbness from a folded leg is common and generally passes once you move. Sharp pain is different, and shifting position is the sensible response rather than sitting it out. The bells at twenty and forty are convenient moments to change legs without feeling like you broke the sit.',
      },
      {
        q: 'Can I change the interval?',
        a: 'Yes, in Settings. Thirty minutes gives two halves, fifteen gives four quarters, and setting the interval to 60 gives you an hour with nothing but a start and an end bell.',
      },
      {
        q: 'Will it sound if the phone locks?',
        a: 'The timing holds up over an hour of a locked or dimmed screen, because position is recalculated from timestamps every time the page wakes. The bell only plays while the page is open, so leave the tab in front for the whole sit.',
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
