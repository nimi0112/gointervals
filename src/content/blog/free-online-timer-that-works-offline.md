---
title: Free online timer that works offline (and how PWAs work)
description: An online timer that works offline sounds like a contradiction. Here is how service workers cache a page so it runs with no connection at all.
pubDate: 2026-09-01
tags: [offline, pwa, how-to, focus]
timer: '/timer'
keyword: 'online timer that works offline'
---

An online timer that works offline is not a contradiction, it just means the page was saved to your device the first time you loaded it. After that, the network is optional. This is a browser feature called a service worker, and it has been standard for years.

## What a service worker actually is

When you visit a site, it can register a small script that sits between the browser and the network. From then on, every request the page makes goes to that script first. The script can answer from a local cache, go to the network, or both.

That is the entire trick. There is no app store, no install, no background process eating battery. It is a file the browser keeps and consults.

The practical sequence:

1. You open the [timer](/timer) once with a connection.
2. The service worker installs and caches the pages, the styles, and the code.
3. You close the tab, get on a plane, open the same URL.
4. The browser hands the request to the service worker, which serves the cached copy.

Step four works whether you are in airplane mode, in a gym basement with no signal, or on hotel wifi that has decided to stop.

## Why a timer is a good fit for this

Most web pages need the network because the content lives on a server. A timer does not. Everything it needs is the clock on your device and some arithmetic. Once the code is on your phone, the server has nothing left to contribute.

This is also why there is no account. There is nothing to sync. Presets and history are stored in the browser, on your device, which means they survive going offline and they never travel anywhere.

The tradeoff is real and worth stating: clear your browser data or switch devices and your presets are gone. That is the cost of not having a login.

## PWA, translated

Progressive Web App is a label for a site that does three things: works offline, can be added to your home screen, and behaves like an app once it is there. There is no certification. It is a description.

Adding it to your home screen is worth doing:

| Platform              | How                                          |
| --------------------- | -------------------------------------------- |
| iOS Safari            | Share button, then Add to Home Screen        |
| Android Chrome        | Menu, then Install app or Add to Home screen |
| Desktop Chrome / Edge | Install icon in the address bar              |

Once installed, it opens without browser chrome, so you get the full screen for the digits and no address bar to accidentally tap mid-set.

## Timing accuracy when the phone is asleep

Offline is only half the problem. The other half is that browsers throttle background tabs and stop running code when the screen sleeps.

If a timer counts down by decrementing a number every tick, and the ticks stop, the timer stops. You unlock the phone and it is stuck showing what it showed when the screen went dark.

The fix is to work from timestamps. Record when the timer started, and every time the page is drawn, compute how much time has passed against the system clock. Then a sleeping phone loses nothing except frames. Every timer here does it this way, so a [countdown](/timer) is still correct when you come back to it.

The screen staying on is handled separately with the Screen Wake Lock API, plus a silent looping video as a fallback on older browsers. [Keeping your phone screen on during a workout](/blog/keep-phone-screen-on-workout-timer) covers that in more detail.

## Sound without files

Beeps are generated rather than loaded from audio files, using the browser's own audio synthesis. That means no download, nothing to cache, and no delay when the beep needs to happen right now. It also means the cue fires exactly at the transition rather than whenever a file finished buffering.

## What you get, concretely

- Loads with no connection after the first visit
- No account, nothing sent anywhere
- Accurate through sleep and backgrounded tabs
- Space to start and stop, R to reset, Esc to exit fullscreen
- Remaining time in the tab title, so a background tab still tells you where you are

Fixed durations are preset if you do not want to type anything: [3 minutes](/timer/3-minutes), [20 seconds](/timer/20-seconds), [25 minutes](/timer/25-minutes). For repeating work and rest, the [interval timer](/interval) is the one you want, and it caches the same way.

Try it: [open the countdown timer once, then turn off your wifi](/timer).
