---
title: How to keep your phone screen on during a workout timer
description: Keep phone screen on during a workout without changing settings. How Screen Wake Lock works, why browsers block it, and what to do on older phones.
pubDate: 2026-08-30
tags: [pwa, how-to, offline, workouts]
timer: '/interval'
keyword: 'keep phone screen on'
---

To keep your phone screen on during a workout timer, the page has to ask the operating system for permission to stay awake, and that request is called a wake lock. You do not have to change any settings for this to work, as long as the timer you are using asks for one.

## Why the screen goes dark in the first place

Your phone turns the screen off after 30 seconds or a minute of no touches because the display is the single largest consumer of battery on the device. The OS has no idea whether you are reading something or you put the phone in your pocket, so it assumes the pocket.

During a workout you are, by definition, not touching the screen. So the phone does exactly what it was designed to do, at exactly the wrong moment, roughly eleven seconds into round two.

## The Screen Wake Lock API

Browsers added a proper solution for this: the Screen Wake Lock API. A page calls `navigator.wakeLock.request('screen')` and the OS keeps the display on until the page releases the lock or you switch tabs. It is documented on MDN Web Docs if you want the specifics.

Three things about it that matter in practice:

1. **It needs a user gesture.** A page cannot grab a wake lock on load. You have to tap something first. That is why the lock kicks in when you press start, not when the page opens.
2. **It is released when you leave the tab.** Switch apps and the lock drops. Come back and a well-behaved page reacquires it. This is a privacy and battery decision, not a bug.
3. **It respects low power mode.** If your phone is in battery saver, the request can be rejected outright. Nothing the page can do about that.

The [interval timer](/interval) requests a wake lock when you start a workout, so the screen stays on for the whole session and releases when you finish.

## The video fallback for older browsers

Screen Wake Lock is well supported now, but not universally, and the older trick still works: play a tiny, silent, looping video in the background. The OS sees active video playback and assumes you are watching something, so it keeps the display on.

It is a hack. It works. Pages that care about older iOS versions in particular still ship it as a fallback, and the [interval timer](/interval) uses it when the real API is not available.

## What to do if the screen still sleeps

| Situation                                    | Fix                                                             |
| -------------------------------------------- | --------------------------------------------------------------- |
| Low power / battery saver on                 | Turn it off for the session. Wake locks are denied in this mode |
| You switched apps mid-workout                | Come back to the tab. The lock reacquires on return             |
| Screen timeout set very short                | Raise it in display settings as a backstop                      |
| Older browser, no wake lock                  | Update the browser, or keep the tab in the foreground           |
| iOS with the page in a background Safari tab | Keep it foregrounded. Background tabs get throttled             |

## The thing that actually saves you

Here is the part people skip: the screen going dark should not matter that much, because a timer should not depend on the screen being on to keep time.

Browsers throttle background tabs aggressively. A timer built on a counter that increments every tick will drift, or stall entirely, when the tab is backgrounded or the phone sleeps. You come back and it says 40 seconds remaining when it should say 10.

The fix is to store the start timestamp and compute the remaining time from the clock every time the page wakes up, rather than counting down. That way sleeping does not lose time; it just means nothing was drawn while the screen was off. Every timer on this site works that way, so if your phone does doze off, the elapsed time is still correct when it comes back.

Audio helps too. If the timer beeps at each transition, you can put the phone face down and just listen. A screen that stays on is a convenience; sound is the actual interface during a set.

## Practical setup for a workout

- Tap start before you put the phone down, so the wake lock has its user gesture.
- The digits are the biggest thing on the page, readable from across a mat.
- Turn your volume up enough to hear the cues over music.
- Leave the tab in the foreground.

Everything is stored in the browser, so your settings are still there the next time you open it, with no account to sign into while your hands are covered in chalk.

If you want the timer to keep working with no connection at all, [a free online timer that works offline](/blog/free-online-timer-that-works-offline) covers how that part works.

Try it: [start an interval workout and put the phone down](/interval).
