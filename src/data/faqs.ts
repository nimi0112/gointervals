import type { Faq } from './types';

export const faqs: Record<string, Faq[]> = {
  '/': [
    {
      q: 'Is Go Intervals free?',
      a: 'Yes. No account, no ads, no premium tier. Presets and history live in your browser, not on a server.',
    },
    {
      q: 'Does the timer keep going if my phone screen locks?',
      a: 'The timer works from timestamps, so when you come back it is on the right second and plays a catch-up tone for anything you missed. While the page is open it asks the phone to keep the screen on, so it should not lock in the first place.',
    },
    {
      q: 'Does it work offline?',
      a: 'After your first visit, yes. The pages are cached by a service worker so the timers load with no connection.',
    },
    {
      q: 'What are the keyboard shortcuts?',
      a: 'Space starts and pauses. R resets. L records a lap on the stopwatch. Esc pauses a running timer and leaves fullscreen.',
    },
    {
      q: 'How do I delete my saved presets and history?',
      a: 'Use "Clear my data" on the About page. It removes everything this site stored in your browser.',
    },
  ],
  '/interval': [
    {
      q: 'What is the difference between rounds and sets?',
      a: 'Rounds are work/rest pairs. Sets are groups of rounds with a longer rest between them. 8 rounds x 3 sets with 2 minutes between sets is a typical class layout.',
    },
    {
      q: 'Can I make it beep every 10 minutes for half an hour?',
      a: 'Yes, that is the first preset. It is a 10 minute work block, no rest, 3 rounds. Any "beep every N minutes" timer works the same way: set Work to N and Rest to 0.',
    },
    {
      q: 'Are my saved presets synced anywhere?',
      a: 'No. They live in this browser only. Clearing site data removes them.',
    },
    {
      q: 'Will it beep if I switch to another app?',
      a: 'Browsers mute pages in the background, so the beep plays when you come back and the timer will be on the right round. Keep the page in front for live beeps.',
    },
  ],
  '/timer': [
    {
      q: 'How do I set a custom time?',
      a: 'Tap a preset or type minutes and seconds in the Custom field, then press Start. The last duration you used is remembered.',
    },
    {
      q: 'Does it ring at the end?',
      a: 'It plays a three-note finish tone and vibrates on phones that support it. Unmute with the speaker button if you turned sound off.',
    },
    {
      q: 'Can I see the time left in the browser tab?',
      a: 'Yes. The tab title counts down while the timer runs, so you can keep it in a background tab on desktop.',
    },
  ],
  '/stopwatch': [
    {
      q: 'How accurate is the stopwatch?',
      a: 'It reads the system clock rather than counting ticks, so it does not drift. Display resolution is a tenth of a second. Laps are recorded to the millisecond.',
    },
    {
      q: 'What is the difference between split and total?',
      a: 'Split is the time for that lap alone. Total is the time since you pressed Start. Fastest and slowest laps are marked.',
    },
    {
      q: 'Is there a keyboard shortcut for laps?',
      a: 'L records a lap. Space starts and pauses. R resets.',
    },
  ],
  '/tabata': [
    {
      q: 'What is the Tabata protocol exactly?',
      a: '20 seconds of maximal work, 10 seconds rest, 8 rounds, 4 minutes. From Izumi Tabata’s 1996 study with Japanese speed skaters. This page is preset to that.',
    },
    {
      q: 'Can I change the work and rest times?',
      a: 'Yes, everything is editable in the settings. Common variants are 30/15, 40/20 and 45/15. There are ready-made pages for those too.',
    },
    {
      q: 'How does the timer tell work from rest?',
      a: 'Different sounds: a rising pair for work, a falling pair for rest, a tick for the last 3 seconds. The digits also change colour.',
    },
  ],
  '/emom': [
    {
      q: 'What does EMOM stand for?',
      a: 'Every Minute On the Minute. You start a set at the top of each minute and rest for whatever is left.',
    },
    {
      q: 'Can I do E2MOM or every 90 seconds?',
      a: 'Yes. Change "Every" to 2:00 or 1:30. The timer divides the total time into intervals of that length.',
    },
    {
      q: 'Does it warn me before the next minute?',
      a: 'It ticks for the last 3 seconds of each interval and beeps at the top of the minute.',
    },
  ],
  '/pomodoro': [
    {
      q: 'What is the Pomodoro technique?',
      a: '25 minutes of focused work, a 5 minute break, and a longer 15 to 30 minute break after four sessions. Francesco Cirillo named it after a tomato-shaped kitchen timer.',
    },
    {
      q: 'Can I change 25/5 to 50/10?',
      a: 'Yes. Focus, short break, long break and the number of sessions before a long break are all editable.',
    },
    {
      q: 'Is the session counter saved?',
      a: 'It is stored in your browser and survives reloads. Reset it any time with the link under the timer.',
    },
    {
      q: 'Can I skip a break?',
      a: 'Press Skip to jump to the next block. It counts as taking the break as far as the session counter is concerned.',
    },
  ],
};
