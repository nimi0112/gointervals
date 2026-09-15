import type { Faq } from './types';

export const faqs: Record<string, Faq[]> = {
  '/': [
    {
      q: 'What are meditation interval bells?',
      a: 'They are brief sound cues at regular points during a session. In a 30-minute session, a gentle beep every 10 minutes marks the intervals so you can return attention to your breath.',
    },
    {
      q: 'Can I use the timers offline?',
      a: 'After the first online visit, timers can work offline once the app has been cached by your browser. Clearing site data removes that cache; visit online again before relying on offline use.',
    },
    {
      q: 'Is gointervals free?',
      a: 'Yes. No account, no ads, no premium tier. Your settings stay in your browser, not on a server, and you can clear them from the About page.',
    },
    {
      q: 'Does the timer keep going if my phone screen locks?',
      a: 'The timer works from timestamps, so when you come back it is on the right second. While a session runs it asks the phone to keep the screen on, so it should not lock in the first place. Sound only plays while the page is open.',
    },
    {
      q: 'What are the keyboard shortcuts?',
      a: 'Space starts, pauses and resumes. Esc asks to stop. R asks to reset. They are ignored while you are typing in a field.',
    },
  ],
  '/interval': [
    {
      q: 'Can I make it beep every 10 minutes for half an hour?',
      a: 'Yes. Set Work to 600, Rest to 0 and Rounds to 3. Any "beep every N minutes" timer works the same way, and the ready-made pages below open with those numbers filled in.',
    },
    {
      q: 'Is the rest after the last round included?',
      a: 'Yes. Eight rounds of 40 on, 20 off run for exactly eight minutes and end after the final rest, so the last thing you hear is the finish, not a work beep.',
    },
    {
      q: 'What are the limits?',
      a: 'Work 1 to 3,600 seconds, Rest 0 to 3,600 seconds, Rounds 1 to 99. Typed values outside that stay on screen with a note so you can fix them; nothing is changed for you.',
    },
    {
      q: 'Will it beep if I switch to another app?',
      a: 'Browsers mute pages in the background, so the beep plays when you come back and the timer will be on the right round. Keep the page in front for live beeps.',
    },
  ],
  '/tabata': [
    {
      q: 'What is the Tabata protocol exactly?',
      a: '20 seconds of maximal work, 10 seconds rest, 8 rounds, 4 minutes. From Izumi Tabata’s 1996 study with Japanese speed skaters. This page is fixed to exactly that.',
    },
    {
      q: 'Can I change the work and rest times?',
      a: 'Not here, on purpose: this is the fewest-settings timer on the site. Use one of the variant pages, such as 30/15 or 40/20, or set your own numbers on the interval timer.',
    },
    {
      q: 'How does the timer tell work from rest?',
      a: 'Different sounds: a rising pair for work, a falling pair for rest, a tick for the last 3 seconds. The phase word and icon change too.',
    },
  ],
  '/emom': [
    {
      q: 'What does EMOM stand for?',
      a: 'Every Minute On the Minute. You start a set at the top of each minute and rest for whatever is left.',
    },
    {
      q: 'Can I do E2MOM or every 90 seconds?',
      a: 'Yes. Set Interval length to 120 or 90 seconds. Anything from 15 to 300 seconds works, and Total minutes runs from 1 to 99.',
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
      a: 'Yes. Focus, short break, long break and the number of focus sessions are all editable, in whole minutes from 1 to 180 and from 1 to 12 sessions.',
    },
    {
      q: 'What happens after the long break?',
      a: 'The cycle is finite: it ends after the long break and shows Done. Run again starts a fresh cycle with the same settings; nothing restarts on its own.',
    },
  ],
  '/meditation': [
    {
      q: 'What does the bell sound like?',
      a: 'One soft, generated tone with a two-second decay. Not a recorded singing bowl, so nothing has to download and it works offline. Preview bell plays it once before you start.',
    },
    {
      q: 'Can I have one bell at the end and nothing in between?',
      a: 'Yes. Turn Interval bell off and leave End bell on. The start bell, interval bells and end bell are three independent switches.',
    },
    {
      q: 'Will the screen stay on while I sit?',
      a: 'Yes. The timer holds a screen wake lock while it runs, on phones and desktops, with a fallback for browsers without the API. Turn the brightness down by hand if the light bothers you.',
    },
    {
      q: 'Does the bell ring if my phone locks or I switch apps?',
      a: 'The timing stays exact because it is based on timestamps, and you will land on the right bell when you come back. But browsers only play sound from a page that is open, so leave the tab in front. A timer in a tab is not a guaranteed alarm.',
    },
    {
      q: 'Why is there no countdown tick before the bell?',
      a: 'On purpose. The other timers tick for the last three seconds so you can brace for a change. In a sit that is the opposite of the point, so the meditation timer is silent until the bell.',
    },
  ],
};
