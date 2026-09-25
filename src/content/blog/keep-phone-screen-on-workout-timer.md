---
title: How to keep your phone screen on during a workout timer
description: Keep your phone screen on during a workout without changing any settings. How screen wake lock works, when it can fail, and what to do on older phones.
pubDate: 2026-08-30
updatedDate: 2026-09-25
tags: [pwa, how-to, offline, workouts]
timer: '/interval'
keyword: 'keep phone screen on'
---

To keep your phone screen on during a workout timer, the page asks your phone to stay awake. That request is called a wake lock. You don't need to change any settings. You just need a timer that asks for one.

## Why the screen goes dark

Your phone turns the screen off after 30 seconds or a minute without a touch. The screen uses more battery than anything else on the phone. Your phone can't tell if you're reading or if it's in your pocket, so it plays it safe.

During a workout, you're not touching the screen. So the phone does what it was built to do, just at an awkward moment, like early in round two.

## Screen wake lock

Browsers now have a proper fix, called the Screen Wake Lock API. A web page asks for a wake lock, and the phone keeps the screen on. It stays on until the page lets go or you switch away. MDN Web Docs has the details if you're curious.

Three things are worth knowing:

1. **The timer asks when you tap Start.** It doesn't ask when the page opens, only when a session begins.
2. **It lets go when you leave the tab.** Switch apps and the lock drops. This saves battery and is on purpose. Come back, and a good timer asks again.
3. **Battery saver can say no.** In low power mode, your phone may refuse the request. The page can't change that.

The [interval timer](/interval) asks for a wake lock when you start. The screen stays on while it runs, and the lock is released when you pause or finish. If you leave the tab and come back mid-session, it asks again.

## The video trick for older browsers

Most browsers support wake lock now, but not all of them. There's an older trick that still works. The page plays a tiny, silent video on a loop. The phone thinks you're watching something, so it keeps the screen on.

It's a simple workaround, and it works. It helps most on older iPhones. The [interval timer](/interval) uses it when wake lock isn't available. The video needs a tap to start playing, which is another reason the timer waits for Start.

## What to do if the screen still sleeps

| Situation                                    | Fix                                                              |
| -------------------------------------------- | ---------------------------------------------------------------- |
| Low power / battery saver on                 | Turn it off for the session. Wake locks can be denied in it      |
| You switched apps mid-workout                | Come back to the tab. The lock is requested again on return      |
| Screen timeout set very short                | Raise it in display settings as a backup                         |
| Older browser, no wake lock                  | Update the browser, or keep the tab in the foreground            |
| iOS with the page in a background Safari tab | Keep it in the foreground. Background tabs are slowed right down |

## Why a dark screen doesn't break the timer

Here's the good news. Even if the screen goes dark, a well-built timer keeps the right time.

Browsers slow down tabs you're not looking at. A timer that counts down one tick at a time can drift or even stop. You come back and it says 40 seconds left when it should say 10.

The fix is to note the start time and check the clock each time the page wakes. Then sleep doesn't lose any time. Nothing gets drawn while the screen is off, and that's all.

Every timer on this site works this way. If your phone dozes off, the time is still right when it wakes.

Sound helps too. The timer beeps at each change, so you can put the phone face down and just listen. A screen that stays on is nice to have. During a set, sound does most of the work.

## A quick setup for your workout

- Tap Start before you put the phone down.
- Check the numbers read well from where you'll be. They're the biggest thing on the page.
- Turn the volume up so you can hear the beeps over music.
- Keep the tab in the foreground.

Your settings are saved in your browser, so they're there next time. There's no account, so no login with chalky hands.

Want the timer to work with no connection at all? [A free online timer that works offline](/blog/free-online-timer-that-works-offline) explains how.

Try it: [start an interval workout and put the phone down](/interval).
