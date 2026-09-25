import type { Faq } from './types';

export const faqs: Record<string, Faq[]> = {
  '/': [
    {
      q: 'What are meditation interval bells?',
      a: 'They’re soft sounds at set points in a session. In a 30 minute sit, a bell every 10 minutes gently reminds you to come back to your breath.',
    },
    {
      q: 'Can I use the timers offline?',
      a: 'Yes, after your first visit. Your browser saves the app, so the timers keep working without a connection. If you clear your site data, visit once online again before you count on it.',
    },
    {
      q: 'Is gointervals free?',
      a: 'Yes. There’s no account, no ads and no paid version. Your settings stay in your browser, and you can clear them from the About page.',
    },
    {
      q: 'Does the timer keep going if my phone screen locks?',
      a: 'While a session runs, the timer asks your phone to keep the screen on, so it shouldn’t lock. If it does, the time stays right, because it’s read from the clock. Beeps need the page open and on screen, or they can come late or not at all.',
    },
    {
      q: 'What are the keyboard shortcuts?',
      a: 'Space starts, pauses and resumes. Esc asks before stopping, and R asks before resetting. They don’t work while you’re typing in a field.',
    },
  ],
  '/interval': [
    {
      q: 'Can I make it beep every 10 minutes for half an hour?',
      a: 'Yes. Set Work to 10 minutes, Rest to 0 and Rounds to 3. Any "beep every few minutes" timer works the same way, and the ready-made pages open with the numbers filled in.',
    },
    {
      q: 'Is the rest after the last round included?',
      a: 'Yes. Eight rounds of 3 minutes work and 1 minute rest last exactly 32 minutes. The session ends after the final rest, so the last sound you hear is the finish, not a work beep.',
    },
    {
      q: 'What are the limits?',
      a: 'On this page, Work runs from 1 to 60 minutes, Rest from 0 to 60 minutes and Rounds from 1 to 99. Preset pages set Work and Rest in seconds, up to 3,600. A number outside the range stays on screen with a note, so you can fix it yourself.',
    },
    {
      q: 'Will it beep if I switch to another app?',
      a: 'Not reliably. In a background tab, browsers slow timers down, so a beep can come late or not at all. The time stays right because it’s read from the clock, but keep the page on screen for beeps on time.',
    },
  ],
  '/tabata': [
    {
      q: 'What is the Tabata protocol exactly?',
      a: 'It’s 20 seconds of all-out work and 10 seconds of rest, for 8 rounds. That’s 4 minutes in total. It comes from Izumi Tabata’s 1996 study, and this page runs exactly that.',
    },
    {
      q: 'Can I change the work and rest times?',
      a: 'Not on this page. It’s kept simple on purpose. Try a variant page such as 30/15 or 40/20, where you can change Work and Rest in seconds.',
    },
    {
      q: 'How does the timer tell work from rest?',
      a: 'By sound and by sight. A rising pair means work, a falling pair means rest, and ticks count down the last 3 seconds. The phase word and icon change too.',
    },
  ],
  '/emom': [
    {
      q: 'What does EMOM stand for?',
      a: 'Every Minute On the Minute. You start a set at the start of each minute and rest for the time that’s left.',
    },
    {
      q: 'Can I do E2MOM or every 90 seconds?',
      a: 'Yes. Set Interval length to 120 seconds for every 2 minutes, or 90 for every 90 seconds. Anything from 15 to 300 seconds works, and Total minutes goes from 1 to 99.',
    },
    {
      q: 'Does it warn me before the next minute?',
      a: 'Yes. It ticks for the last 3 seconds of each interval, then beeps as the next one starts.',
    },
  ],
  '/pomodoro': [
    {
      q: 'What is the Pomodoro technique?',
      a: 'It’s a way to work in short, focused blocks. You focus for 25 minutes, take a 5 minute break, and after four sessions take a longer 15 to 30 minute break. Francesco Cirillo named it after a tomato-shaped kitchen timer.',
    },
    {
      q: 'Can I change 25/5 to 50/10?',
      a: 'Yes. You can set Focus, Short break and Long break anywhere from 1 to 180 minutes, and Focus sessions from 1 to 12.',
    },
    {
      q: 'What happens after the long break?',
      a: 'The timer stops and shows Done. Run again starts a fresh cycle with the same settings. Nothing restarts on its own.',
    },
  ],
  '/meditation': [
    {
      q: 'What does the bell sound like?',
      a: 'One soft tone that fades over about two seconds. It’s made in your browser, not recorded, so nothing downloads and it works offline. Tap Preview bell to hear it before you start.',
    },
    {
      q: 'Can I have one bell at the end and nothing in between?',
      a: 'Yes. Turn Interval bell off and leave End bell on. The start, interval and end bells each have their own switch.',
    },
    {
      q: 'Will the screen stay on while I sit?',
      a: 'Yes. While the timer runs, it asks your device to keep the screen on, with a backup method for browsers that can’t. Turn the brightness down yourself if the light bothers you.',
    },
    {
      q: 'Does the bell ring if my phone locks or I switch apps?',
      a: 'The timing stays exact, and you’ll be at the right point when you come back. But browsers only play sound from a page that’s open, so keep the tab in front. A timer in a browser tab isn’t a guaranteed alarm.',
    },
    {
      q: 'Why is there no countdown tick before the bell?',
      a: 'Because it would break the quiet. The workout timers tick for the last three seconds so you can get ready for a change. A sit doesn’t need that, so this timer stays silent until the bell.',
    },
  ],
};
