---
title: 'Keep your timer screen on: why the request can fail'
description: 'Learn why a workout timer screen can sleep, how to test wake lock and sound, and why correct elapsed time does not guarantee a beep while your phone is locked.'
pubDate: 2026-08-30
updatedDate: 2026-09-25
tags: [pwa, how-to, offline, workouts]
timer: '/interval'
keyword: 'keep phone screen on'
---

The screen goes dark during a round. When you unlock it, the countdown jumps to the right place, but you never heard the rest cue.

Those observations can both be correct. Keeping the screen awake, calculating elapsed time and playing sound are separate jobs. To keep a phone screen on, the timer requests a wake lock; the device decides whether to grant it.

## What the browser is allowed to request

A screen wake lock asks the device not to dim or lock while the page is visible. It is not a permanent change to your display settings. According to [MDN's wake-lock documentation](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API), the system may reject or release a lock because of battery conditions, power-saving settings or page visibility.

The [interval timer](/interval) requests a lock while running, releases it when paused or finished, and requests it again when you return to the visible page during a session. There is also a fallback for browsers without the API, but it is not a guarantee on every device.

## Try a short diagnosis

Start with the simplest setup: one visible timer tab, enough battery, audible device volume and Sound on. Run a short session without changing apps.

If the screen stays awake there but sleeps after switching apps, the change in visibility is the likely explanation. Return to the timer and try again. If it sleeps even while visible, check power-saving settings and whether the browser is current. You can consider a longer display timeout for the session, then restore it afterwards.

Check sound separately. On the [meditation timer](/meditation), Preview bell lets you test the selected audio route and volume. For a workout, test a short transition before starting the real session. Headphones, speakers and device sound settings can change what you hear.

If the utility line reports blocked sound, tap the Sound control to retry. Turning up the device volume does not resolve a browser that has not allowed audio to start.

## Why the countdown can recover

Imagine a timer starts at noon and its page stops executing for two minutes. On returning, it can compare the current time with when the session began and account for pauses. It does not need to subtract every missed second one by one.

That is how this timer recovers its position while the session remains in memory. The screen can jump ahead because the elapsed time changed while the browser was not updating the display.

Sound is different. Code that did not run at the boundary could not deliver that boundary's cue on time. When several boundaries have been missed, the timer uses one catch-up tone rather than a burst of old signals. A catch-up tone is not evidence that you received all earlier cues.

## Choose the setup for the job

For a phone on a gym bench, keeping the page visible is practical. For running with a locked phone in a pocket, a browser timer may not be the right tool if every cue must arrive reliably. Test under your actual conditions, and use a device or app designed for background alerts when that is essential.

Do not treat the timer as a safety alarm. Its large digits and sounds help ordinary sessions, but the browser remains subject to device restrictions.

Offline use is another independent question. A page can have working wake lock but lack cached files for its next offline load. Follow the [offline preparation guide](/blog/free-online-timer-that-works-offline) before relying on it without a connection.

Try it: [test a short interval with the page visible](/interval).
