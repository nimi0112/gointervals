import type { ProgrammaticPage } from './types';

export const uses: ProgrammaticPage[] = [
  {
    path: '/timer/kitchen-timer',
    h1: 'Online kitchen timer',
    title: 'Kitchen Timer – Free Online Cooking Timer',
    description:
      'A kitchen timer that runs in your browser. Set it, walk away, hear the beep. The screen stays on so you can read it across the room.',
    intro: [
      'A kitchen timer has one job, and most of the ones built into ovens do it badly. This one runs in a browser tab, so it is on the device already sitting on your counter. Set the minutes, press start, and go back to the pan. It beeps with a three-note tone at zero rather than a single click you can miss over an extractor fan.',
      'The numbers people actually need are small and repeat: a soft-boiled egg is 6 to 7 minutes from the boil, dried pasta is 8 to 12 depending on shape, rice wants a 10 minute rest off the heat with the lid on, and a steak needs about 5 minutes resting before you cut it. None of those are worth unlocking a phone and tapping through an app for. Load the page, type the number, leave the tab open.',
      'The practical part is that the screen stays awake while it runs, so you can prop the phone or laptop against the tiles and read the count from the other side of the kitchen. Wet or floury hands are the catch. The buttons are large enough to hit with a knuckle, and Space starts and pauses, but a keyboard is not where you want your hands mid-recipe, so set it before the flour comes out.',
    ],
    uses: [
      'Eggs, pasta and anything else with a hard cut-off',
      'Resting meat and proving dough',
      'A timer you can read from across the kitchen',
      'Second timer when the oven one is already in use',
      'Reminding yourself to stir',
    ],
    config: { mode: 'countdown', seconds: 600 },
    faq: [
      {
        q: 'How long do I boil an egg?',
        a: 'Roughly 6 to 7 minutes from boiling water for a soft yolk, 8 to 9 for jammy, 10 to 12 for hard. Fridge-cold eggs run at the longer end.',
      },
      {
        q: 'Will it keep time if I switch tabs or open a recipe?',
        a: 'Yes. The countdown is worked out from timestamps, not from counting, so it stays right in the background. The beep plays if the tab is open, or the moment you come back to it.',
      },
      {
        q: 'Can I run two timers at once?',
        a: 'Open the page in a second tab and set a different length. Each tab counts independently, and each tab title shows its own remaining time.',
      },
      {
        q: 'Is the alarm loud enough for a noisy kitchen?',
        a: 'It plays through whatever your device volume is set to, so turn media volume up first. Over a loud fan or hob, a speaker helps more than the phone speaker does.',
      },
    ],
    related: ['/timer/10-minutes', '/timer/5-minutes', '/timer/loud-timer', '/timer'],
  },
  {
    path: '/timer/classroom-timer',
    h1: 'Classroom timer for teachers',
    title: 'Classroom Timer for Teachers – No Ads',
    description:
      'A classroom timer for transitions, tests and quiet time. Fullscreen on the projector, no ads, no signup. Beeps at zero and counts down in the tab.',
    intro: [
      'A classroom timer needs to be readable from the back row and free of anything that will embarrass you on a projector. This one goes fullscreen with the digits filling the screen, and there are no ads, no autoplaying video and no signup wall, which is the whole reason to use it rather than a search-result timer in front of thirty children.',
      'The lengths that get used most are short. Two minutes for a pack-up or a transition between activities, five for a starter task or a think-pair-share, ten for silent reading or independent work, fifteen for a longer task or a test section. Set the number once and it is remembered next time you open the page, so the timer you use every lesson is already there.',
      'Press Space to start and pause, R to reset, and Esc to leave fullscreen when you are done. On a laptop with the browser behind a slide deck, the remaining time shows in the tab title, so you can glance at it without switching windows. It reads the clock rather than counting frames, so a lesson that runs over a screen sleep still has the right number on it.',
    ],
    uses: [
      'Transitions and pack-up time',
      'Timed test or exam sections',
      'Silent reading and independent work',
      'Group tasks and think-pair-share',
      'Fullscreen on a projector or interactive whiteboard',
    ],
    config: { mode: 'countdown', seconds: 300 },
    faq: [
      {
        q: 'Are there ads or anything I need to block?',
        a: 'No ads, no third-party video, no account. That is deliberate, because a timer on a projector is in front of a whole class.',
      },
      {
        q: 'Can I make it fill the screen?',
        a: 'Yes. Use the fullscreen button and the digits scale to the display. Esc leaves fullscreen.',
      },
      {
        q: 'Does it work on a school network with no internet in the room?',
        a: 'After the first visit it runs offline, because everything is in the browser. There is nothing to call home to.',
      },
      {
        q: 'Can the class see the time without me switching windows?',
        a: 'On a projector, fullscreen is the answer. If the browser is behind a slide deck on your own laptop, the tab title carries the countdown.',
      },
    ],
    related: ['/timer/5-minutes', '/timer/15-minutes', '/timer/study-timer', '/timer'],
  },
  {
    path: '/timer/meditation-timer',
    h1: 'Meditation timer with a gentle bell',
    title: 'Meditation Timer with a Gentle Bell',
    description:
      'A meditation timer with a soft bell at the start and end. No app, no account, no subscription. Set 5, 10 or 20 minutes and close your eyes.',
    intro: [
      'A meditation timer should tell you when to start and when to stop, then stay out of the way. This one plays a bell when you press start and a bell at the end, so you can settle without one eye on the clock. The finish is a three-note tone rather than a struck gong, generated in the browser. It is soft, and it is the same tone every time, which is the point.',
      'Five minutes is a workable daily sit and the length most people actually keep up. Ten is where a practice starts to feel like one. Twenty is the classic length for mantra or breath work and long enough that the last few minutes are the useful ones. Set whichever, and it is remembered next time the page opens, so the number you sit for is already loaded.',
      'Two honest notes. The last three seconds tick before the end tone, and there is currently no way to mute just those ticks without muting the whole timer, so the finish arrives with a small countdown attached. And the screen wake lock only keeps the display on, it cannot dim it, so if the light bothers you turn your brightness down before you start.',
    ],
    uses: [
      'A five or ten minute daily sit',
      'Twenty minute breath or mantra practice',
      'Body scan and yoga nidra',
      'Timed breathwork rounds',
      'A quiet end to the working day',
    ],
    config: { mode: 'countdown', seconds: 600 },
    faq: [
      {
        q: 'Is there a bell at the start as well as the end?',
        a: 'Yes. A tone plays when you start and a three-note tone at the finish, so you do not have to watch the numbers in between.',
      },
      {
        q: 'Is the end sound a gong?',
        a: 'No. It is a soft three-note tone generated by the browser, not a recorded gong or singing bowl. There are no audio files on the site.',
      },
      {
        q: 'Can I turn off the ticks in the last three seconds?',
        a: 'Not on their own yet. The mute button silences everything, including the end tone. If the ticks bother you, muting and watching the screen is the current workaround.',
      },
      {
        q: 'Can I dim the screen while it runs?',
        a: 'Lower your device brightness before you start. The timer can keep the screen awake, but it cannot dim it for you.',
      },
    ],
    related: ['/timer/10-minutes', '/timer/20-minutes', '/timer/nap-timer', '/timer/5-minutes'],
  },
  {
    path: '/timer/plank-timer',
    h1: 'Plank timer',
    title: 'Plank Timer – Free Online Countdown',
    description:
      'A plank timer that counts down to a beep and ticks the last three seconds. Set 30, 60 or 120 seconds. Screen stays on, no account needed.',
    intro: [
      'A plank timer exists because holding a plank without one turns into guessing, and the guess is always generous. Set the hold, get on the floor, and the last three seconds tick so you know it is nearly over without lifting your head to check the screen. The beep at zero is the only permission to drop.',
      'For most beginners a first honest plank is 20 to 30 seconds with a flat back and no sagging hips. Sixty seconds is a solid target and the number worth training towards. Two minutes with good form is genuinely strong, and past that you are mostly testing patience rather than adding much. Form fails before the clock does, so stop when the hips drop rather than riding the timer to zero.',
      'A simple progression: hold your current best three times with a minute of rest, and add five seconds a session until 60 feels routine, then work on side planks and longer holds. If you would rather train planks as repeated sets with the rest timed too, the interval timer runs work and rest pairs on a loop so you never touch the screen mid-set.',
    ],
    uses: [
      'A 30 or 60 second plank hold',
      'Side planks and dead bugs',
      'Adding five seconds a session',
      'Plank challenges and tests',
      'Any hold where form beats duration',
    ],
    config: { mode: 'countdown', seconds: 60 },
    faq: [
      {
        q: 'How long should I hold a plank?',
        a: 'Beginners hold 20 to 30 seconds with good form. Sixty seconds is a solid target and two minutes is strong. Stop when your hips drop, not when the clock says so.',
      },
      {
        q: 'Is a five minute plank worth training for?',
        a: 'Not really for most people. Past about two minutes you are training endurance of a static hold rather than much core strength. Harder variations beat longer holds.',
      },
      {
        q: 'Do I get a warning before it ends?',
        a: 'Yes. The last three seconds tick, then a three-note tone at zero, so you can keep your head down and still know where you are.',
      },
      {
        q: 'Can I do repeated planks with rest between?',
        a: 'Use the interval timer. Set work and rest and it loops, so you are not restarting a countdown from the floor.',
      },
    ],
    related: [
      '/blog/plank-timer-how-long-to-hold',
      '/timer/60-seconds',
      '/interval',
      '/timer/rest-timer',
      '/interval/beep-every-30-seconds',
    ],
  },
  {
    path: '/timer/sauna-timer',
    h1: 'Sauna timer',
    title: 'Sauna Timer – Free Online Countdown',
    description:
      'A sauna timer for 10 to 20 minute rounds. Leave the phone outside the door with the sound up. Free, no account, works offline after first load.',
    intro: [
      'A sauna timer keeps a round honest, because heat makes time useless. A typical round is 10 to 20 minutes at 70 to 90 °C on the bench, then out for a cold rinse or fresh air, then back in. Fifteen minutes is a reasonable default for a second or third round. Set it, start it, and let the beep decide rather than your sense of how long you have been sweating.',
      'Do not take the phone in with you. Sauna heat is well past what a phone is designed for, and the battery and screen are the parts that go first. Leave it on the bench outside, or on a shelf by the door, with the media volume up and the timer running. The alarm is loud enough through a sauna door in a quiet changing room, less so in a busy gym, which is worth testing on a round you do not mind cutting short.',
      'Between rounds, cool down for at least as long as you were in, and drink water before you go back. Most of the discomfort people blame on the heat is dehydration showing up a round late. Three rounds with proper cool-downs beats one long sit, and the timer is more useful for the cool-down than the heat, because that is the part everyone shortens.',
    ],
    uses: [
      '10 to 20 minute sauna rounds',
      'Timing the cool-down between rounds',
      'Steam room and infrared sessions',
      'Contrast therapy with a cold plunge',
      'Keeping a first sauna session sensible',
    ],
    config: { mode: 'countdown', seconds: 900 },
    faq: [
      {
        q: 'How long should I stay in a sauna?',
        a: 'For most people 10 to 20 minutes per round at 70 to 90 °C. Start shorter if it is new to you, and leave early if you feel lightheaded rather than waiting for the beep.',
      },
      {
        q: 'Can I take my phone into the sauna?',
        a: 'No. The heat is well outside what a phone tolerates. Run the timer on a shelf outside the door with the volume up.',
      },
      {
        q: 'Will I hear it through the door?',
        a: 'In a quiet changing room, usually. In a busy gym, probably not. Test it once before you rely on it.',
      },
      {
        q: 'How long between rounds?',
        a: 'At least as long as the round itself, cooling down properly and drinking water. Rushing the cool-down is what makes the next round feel worse.',
      },
    ],
    related: [
      '/timer/15-minutes',
      '/timer/20-minutes',
      '/timer/10-minutes',
      '/timer',
      '/interval/beep-every-10-minutes',
    ],
  },
  {
    path: '/timer/nap-timer',
    h1: 'Nap timer',
    title: 'Nap Timer – 20 Minute Power Nap Alarm',
    description:
      'A nap timer set to 20 minutes, the power nap length that skips grogginess. Runs in the browser, beeps at zero, no account and no app to install.',
    intro: [
      'A nap timer is really a sleep-inertia timer. Ten to twenty minutes keeps you in light sleep, so you wake up sharper rather than worse, which is why the power nap number is what it is. Go to 30 or 40 and you are likely to surface out of deep sleep feeling heavier than before you lay down. The other clean option is a full 90 minute cycle, which wakes you at the end of one rather than the middle.',
      'Twenty minutes is the default here because it is the version that works on a sofa, in a car park, or at a desk. Give yourself a few minutes to actually fall asleep and lie down knowing the clock is running. The screen stays awake while it runs, so the digits are there if you surface early and want to know how much is left.',
      'Be honest with yourself about the alarm. It is a browser tone, so the tab has to stay open and the volume has to be up, and it will not push through a locked phone the way a system alarm does. If you sleep deeply or the nap actually matters, set your phone alarm as well and use this as the visible countdown. It is a timer in a tab, not an alarm clock.',
    ],
    uses: [
      'A 20 minute power nap',
      'A 10 minute reset between meetings',
      'A full 90 minute sleep cycle',
      'Lying down without oversleeping',
      'Timed rest before a night shift',
    ],
    config: { mode: 'countdown', seconds: 1200 },
    faq: [
      {
        q: 'How long should a power nap be?',
        a: 'Ten to twenty minutes. That keeps you in light sleep so you wake up alert rather than groggy. Thirty to sixty often produces the heavy feeling people blame on napping.',
      },
      {
        q: 'Why is 90 minutes the other option?',
        a: 'It is roughly one full sleep cycle, so you wake near the end of one instead of out of deep sleep. Anything in between is the worst of both.',
      },
      {
        q: 'Will it wake me if my phone locks?',
        a: 'Not reliably. The alarm is a browser tone, so keep the tab open and the volume up. If you sleep deeply, use your phone alarm as the backup.',
      },
      {
        q: 'Should I count the time it takes to fall asleep?',
        a: 'Add a few minutes for that. Most people take five to ten to drop off, so a 20 minute timer is usually closer to a 12 minute nap.',
      },
    ],
    related: [
      '/timer/20-minutes',
      '/timer/90-minutes',
      '/timer/meditation-timer',
      '/timer/10-minutes',
    ],
  },
  {
    path: '/timer/study-timer',
    h1: 'Study timer',
    title: 'Study Timer – 50 Minute Focus Countdown',
    description:
      'A study timer set to 50 minutes, then a 10 minute break. Runs in your browser, counts down in the tab title, no account and no ads.',
    intro: [
      'A study timer works because the session has an end you agreed to before you started. Fifty minutes on, ten off is the rhythm that suits real study: long enough to get into a reading or a problem set and finish a thought, short enough that you will actually sit down for it. Two of those is a solid morning, four is a full day of work, and a fifth rarely produces anything you would keep.',
      'One task per block is the rule that makes it work. Decide what the fifty minutes is for before you start it, and let anything else that turns up go on a list for the break rather than into the block. Put the phone face down and out of reach. On a laptop, the tab title carries the remaining time, so the countdown is visible without a timer window sitting on top of your notes.',
      'If fifty is too long to start with, twenty-five and five is the pomodoro rhythm, and it is a better entry point when the problem is starting rather than finishing. The pomodoro timer runs those cycles back to back, including the breaks, so you are not resetting a countdown every time a block ends.',
    ],
    uses: [
      '50 minute study blocks with 10 minute breaks',
      'Problem sets and past papers',
      'Reading that needs an unbroken run',
      'Essay drafting sessions',
      'Revision with a fixed finish time',
    ],
    config: { mode: 'countdown', seconds: 3000 },
    faq: [
      {
        q: 'Is 50/10 better than 25/5 for studying?',
        a: 'For reading, essays and problem sets, usually yes, because the first ten minutes of a block are the slowest. For getting started at all, 25/5 is easier to commit to.',
      },
      {
        q: 'How many blocks can I do in a day?',
        a: 'Four is a full day of real study for most people. The fifth block tends to be time spent rather than work done.',
      },
      {
        q: 'Does it run the break too?',
        a: 'This page is a single 50 minute countdown. The pomodoro timer loops work and break automatically if you want the break timed as well.',
      },
      {
        q: 'Can I see the time without switching windows?',
        a: 'The tab title shows the remaining time while it runs, so you can leave the timer behind your notes and still glance at it.',
      },
    ],
    related: [
      '/pomodoro/50-10',
      '/blog/study-timer-vs-pomodoro',
      '/pomodoro',
      '/timer/classroom-timer',
      '/blog/best-pomodoro-length',
    ],
  },
  {
    path: '/timer/rest-timer',
    h1: 'Rest timer for between sets',
    title: 'Rest Timer for Between Sets – 90 Seconds',
    description:
      'A rest timer for between sets, set to 90 seconds. It remembers your last length, beeps when rest is over, and keeps the screen on in the gym.',
    intro: [
      'A rest timer between sets stops the two failure modes of training without one: cutting rest short because you feel ready, and losing four minutes to your phone. Ninety seconds is the default here because it sits in the middle of the useful range and covers most accessory and moderate compound work. Set it, rack the bar, and go again on the beep.',
      'The rough numbers: 60 to 90 seconds for hypertrophy work, 2 to 5 minutes for heavy strength sets where the point is moving the weight rather than fatiguing the muscle, and about 30 seconds for circuits and conditioning where the short rest is the stimulus. Longer rest on heavy compounds is not laziness, it is how the next set stays heavy.',
      'It remembers the last length you set, so the timer opens on your rest rather than a default you have to change every session. The screen stays awake while it runs so the numbers are there when your hands are chalked. If you want rests that restart themselves between every set, the interval timer loops work and rest so you never touch the phone between reps.',
    ],
    uses: [
      '60 to 90 second rests for hypertrophy sets',
      '2 to 5 minute rests on heavy squats, bench and deadlifts',
      '30 second rests in circuits',
      'Keeping supersets honest',
      'A rest length that is already set when you open it',
    ],
    config: { mode: 'countdown', seconds: 90 },
    faq: [
      {
        q: 'How long should I rest between sets?',
        a: '60 to 90 seconds for hypertrophy, 2 to 5 minutes for heavy strength work, around 30 seconds for circuits. Heavier and closer to failure means longer rest.',
      },
      {
        q: 'Does it remember my rest length?',
        a: 'Yes. The last duration you set is saved in the browser, so the page opens on your number next session.',
      },
      {
        q: 'Can it restart itself after every set?',
        a: 'Use the interval timer for that. Set work and rest and it repeats, so the rest starts without you tapping anything.',
      },
      {
        q: 'Will it keep time with the screen off or the phone in a pocket?',
        a: 'The countdown is timestamp based, so the time stays correct. The beep plays while the tab is open, or as soon as you come back to it.',
      },
    ],
    related: [
      '/timer/90-seconds',
      '/interval',
      '/timer/plank-timer',
      '/timer/2-minutes',
      '/interval/beep-every-2-minutes',
    ],
  },
  {
    path: '/timer/loud-timer',
    h1: 'Loud online timer',
    title: 'Loud Timer – Alarm You Can Actually Hear',
    description:
      'A loud timer for noisy rooms. Clear three-note alarm at zero, plus vibration on supported phones. Free, no account, nothing to install.',
    intro: [
      'A loud timer is what you want when the room is not quiet: a workshop, a kitchen with an extractor running, a garage gym with music on. The alarm here is a generated three-note tone rather than a soft chime, and the last three seconds tick so the end is not a surprise. On supported phones it also vibrates at zero, which often beats volume in a noisy room.',
      'The honest limit is that a web page cannot be louder than the device lets it be. Browser audio is capped by your system and media volume, and there is no separate loudness setting on this page to turn up, because one would not do anything. Anything advertising a timer that is louder than your phone is either playing a harsher sound or exaggerating.',
      'So the fix is on the device. Turn media volume to maximum, not ringer volume, since they are separate on most phones. Check the device is not muted or in silent mode, and on iPhone check the physical switch. Plug into or pair a speaker if you have one, because a Bluetooth speaker is many times louder than a phone. Keep the tab open and in the foreground, and leave vibration on as a backup.',
    ],
    uses: [
      'Noisy kitchens, workshops and garages',
      'A gym with music playing',
      'Anywhere a soft chime gets missed',
      'Paired with a Bluetooth speaker',
      'Phones where vibration carries further than sound',
    ],
    config: { mode: 'countdown', seconds: 300 },
    faq: [
      {
        q: 'Can I make the alarm louder than my device volume?',
        a: 'No. Browsers cap page audio at your system and media volume, so there is no loudness setting here to raise. Turn media volume up instead.',
      },
      {
        q: 'Why is the alarm quiet on my phone?',
        a: 'Usually media volume rather than ringer volume is low, or the phone is on silent. Check both, then the physical mute switch if you are on an iPhone.',
      },
      {
        q: 'How do I make it as loud as possible?',
        a: 'Media volume to maximum, not muted, and play it through a speaker rather than the phone. A cheap Bluetooth speaker is the biggest single improvement.',
      },
      {
        q: 'Does it vibrate as well?',
        a: 'On phones that support vibration from a web page, yes. It is worth leaving on as a backup when you cannot rely on hearing it.',
      },
    ],
    related: ['/timer/5-minutes', '/timer/kitchen-timer', '/timer/rest-timer', '/timer'],
  },
];
