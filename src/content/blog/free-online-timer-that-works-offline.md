---
title: 'Free online timer that works offline: how it works'
description: An online timer that works offline sounds odd, but it's simple. Here's how your browser saves the timer so it runs with no connection at all.
pubDate: 2026-09-01
updatedDate: 2026-09-25
tags: [offline, pwa, how-to, focus]
timer: '/meditation'
keyword: 'online timer that works offline'
---

An online timer that works offline is simpler than it sounds. The first time you open it, your browser saves a copy on your device. After that, you don't need a connection. This uses a standard browser feature called a service worker.

## What a service worker is

When you visit a site, it can set up a small helper script in your browser. From then on, the page asks that helper first whenever it needs something. The helper can answer from a saved copy, fetch from the internet, or both.

That's the whole idea. There's no app store and nothing running in the background. It's just a file your browser keeps and checks.

Here's how it plays out:

1. You open the [meditation timer](/meditation) once, with a connection.
2. The service worker saves the five timers, the home page and their code.
3. You close the tab, get on a plane and open the same address.
4. The browser asks the service worker, which serves the saved copy.

Step four works in airplane mode, in a gym basement with no signal, or on hotel wifi that has given up.

Other pages, like the preset timers, are saved as you visit them. So open the ones you like once while you're online.

## Why a timer suits this so well

Most web pages need the internet because their content lives on a server. A timer doesn't. All it needs is your device's clock and a little maths. Once the code is on your phone, it has everything it needs.

That's also why there's no account. There's nothing to sync. Your settings live in your browser, on your device. They work offline and never leave your phone.

There is one trade-off. If you clear your browser data or switch devices, your settings are gone. That's the price of not having a login.

## What PWA means

PWA stands for Progressive Web App. It's a name for a website that does three things. It works offline, you can add it to your home screen, and it opens like an app once it's there. It's a description, not a badge.

Adding it to your home screen is worth it:

| Platform              | How                                          |
| --------------------- | -------------------------------------------- |
| iOS Safari            | Share button, then Add to Home Screen        |
| Android Chrome        | Menu, then Install app or Add to Home screen |
| Desktop Chrome / Edge | Install icon in the address bar              |

After you finish your first session, the timer may offer to do this for you. Once added, it opens without the browser bars. You get the whole screen for the numbers, and no address bar to tap by mistake.

## Keeping time while the phone sleeps

Working offline is only half of it. Browsers also slow down tabs in the background, and pause code when the screen sleeps.

Some timers count down by taking away one second at a time. If those ticks stop, the timer stops too. You unlock your phone and it's stuck where it was.

The fix is to use timestamps. The timer notes when it started. Each time it draws the screen, it checks how much time has passed on your device's clock. A sleeping phone loses nothing.

Every timer here works this way. So a [meditation timer](/meditation) is still right when you come back to it.

Keeping the screen on is a separate job. The timer uses the Screen Wake Lock API, plus a tiny silent video on older browsers. [Keeping your phone screen on during a workout](/blog/keep-phone-screen-on-workout-timer) explains more.

## Sound without files

The beeps and bells are made by your browser as they play. There are no sound files. So there's nothing to download or save, and no delay waiting for a file to load. Each sound plays right when the phase changes.

## What you get

- Loads with no connection after your first visit
- No account, and your settings stay on your device
- Keeps the right time through sleep and background tabs
- Space to start and pause, R to reset, Esc to stop
- Time left in the tab title, so a background tab still shows where you are

Some lengths are ready to go if you'd rather not type anything: [10 minutes](/meditation/10-minutes), [20 minutes](/meditation/20-minutes), and [30 minutes with bells every 10](/meditation/30-minutes). For repeating work and rest, try the [interval timer](/interval). It's saved for offline use the same way.

Try it: [open the meditation timer once, then turn off your wifi](/meditation).
