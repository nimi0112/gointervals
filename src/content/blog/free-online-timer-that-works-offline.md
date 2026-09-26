---
title: 'An offline browser timer: what to save and test first'
description: 'Use a browser timer without a connection by preparing its saved files first. Follow an offline reload test and understand the limits of sound and storage.'
pubDate: 2026-09-01
updatedDate: 2026-09-25
tags: [offline, pwa, how-to, focus]
timer: '/meditation'
keyword: 'online timer that works offline'
---

You open a timer at home, then take it to a gym with no signal. The page appears, but that alone does not prove the timer has everything it needs.

An online timer can work offline when the browser has saved the page and its required files. The useful preparation is to test the exact timer without a connection before you need it, rather than assuming one visit was enough.

## A saved page needs its working parts

The browser can use a service worker, a script that handles requests and serves saved responses. [MDN's service worker documentation](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) explains the mechanism. A page's text, styles and interactive code are separate resources, so having one does not necessarily mean having them all.

gointervals attempts to save its main timer pages during service worker installation. Other pages and build assets are cached as they are fetched. Downloads can fail, storage can be cleared, and a new browser profile starts without the previous profile's saved files.

That is why the most useful test is an offline reload of the page you intend to use, followed by a short trial session.

## Prepare the exact timer

1. While connected, open the [interval timer](/interval), [meditation timer](/meditation), or the specific preset you want.
2. Let the page finish loading. Reload once while still online so the installed worker can handle its resources.
3. Turn off your connection and reload that same address.
4. Check that you can change settings and start a short session. Test the sound if you will rely on it.
5. If anything fails, reconnect, reload, and repeat the test before leaving.

Try this in the browser or installed app you will actually use. A successful test in one browser does not prove that another has the files. Likewise, a main timer loading successfully does not establish that every blog article or preset is available.

## Installation is a shortcut, not an alarm guarantee

Adding the site to your home screen gives you a convenient way back to it. Installation options depend on the browser and device. It does not remove the operating system's control over background activity or storage.

You can use a cached timer without installing it. Conversely, an installed icon alone does not prove that all necessary resources are still available offline. Keep the reload test as your check after clearing site data or changing browsers.

## No connection and a sleeping phone are different problems

An offline page can still run while it is open. A suspended page cannot execute its sound cue at the intended moment, even if every file is saved.

This site's timers calculate position from elapsed time. If a page is suspended and later resumes, it can catch up to the current position. It cannot go back and play a missed bell at its original time. Closing or reloading the page also ends the in-memory session; saving settings is not the same as saving a running timer.

For sounds you need to hear, keep the timer visible and test your device. The [screen and sound guide](/blog/keep-phone-screen-on-workout-timer) explains why a wake-lock request can help without guaranteeing delivery.

## Know what stays on the device

Timer settings are saved locally in the browser. There is no account that synchronises them across devices. Clearing site data can remove those settings and cached resources.

Local timer operation is separate from analytics. The site can load usage analytics when configured and connected, so “works offline” should not be read as “the website never makes network requests”. You can find the project and its author on [About](/about).

Try it: [open the interval timer and complete an offline reload test](/interval).
