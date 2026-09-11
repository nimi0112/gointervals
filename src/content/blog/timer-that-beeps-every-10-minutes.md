---
title: Timer that beeps every 10 minutes (and keeps beeping)
description: A timer that beeps every 10 minutes is an interval with the rest set to zero. Here is how to set one up and why phone timers are bad at repeating.
pubDate: 2026-09-14
tags: [emom, focus, how-to, offline]
timer: '/interval/beep-every-10-minutes'
keyword: 'timer that beeps every 10 minutes'
---

A timer that beeps every 10 minutes is a different tool from a ten-minute countdown, and the difference is that it does not stop. You want a repeating cue you can ignore between beeps, running in the background, for an hour or three.

## Who actually needs this

The requests come from oddly unrelated places, and they all want the same thing.

- **Study and work check-ins.** Not a pomodoro. Just a nudge every ten minutes to notice whether you are still on the thing you sat down to do. Cheap attention audit.
- **Sauna and cold exposure.** Rounds you do not want to time by feel, from a bench where you are not holding a phone.
- **Saline soaks and wound care.** Ten minutes on, remove, repeat. The instructions say ten minutes and nobody counts ten minutes accurately while doing something else.
- **Contact lens solutions and cleaning steps.** Multi-stage timings where each stage is the same length.
- **Tattoo aftercare, masks, dye, and anything with a "leave on" step.** Same shape again.
- **Oven and kitchen checks.** Stirring a risotto, turning a tray, checking a slow roast. Not "when is it done", but "look at it again now".
- **Driving or long tasks.** Posture checks, hydration, eye breaks.

None of these need precision beyond the nearest second. All of them need the beep to arrive without you doing anything.

## Why phone timers are bad at this

The stock timer on both iOS and Android is built around one countdown. When it hits zero it rings and it is finished. To get a repeat you have to either dismiss and restart it by hand every ten minutes, which defeats the purpose, or set several alarms at fixed clock times, which means doing arithmetic and then redoing it if you start late.

Clock alarms are the usual workaround and they are worse than they look. Six alarms at 10:00, 10:10, 10:20 and so on are tied to the wall clock, not to when you pressed start. Begin two minutes late and every cue is two minutes off. Stop early and they keep firing tomorrow unless you remember to turn them all off.

A repeating interval solves it properly: one start, cues spaced from that moment, and a defined end.

## How to set it up

The trick is that a repeating beep is just an interval workout with no rest.

1. Open the [beep every 10 minutes timer](/interval/beep-every-10-minutes).
2. Work is 10:00. Rest is **0**.
3. Rounds decide the total length. Six rounds is an hour.
4. Start.

With rest at zero there is nothing between segments, so the timer runs continuously and sounds at each boundary. Internally that is all an EMOM is, which is why [EMOM workouts explained](/blog/emom-workouts-explained) and this page are describing the same mechanism with different labels on it.

To change the interval, change the work value. Five minutes is on [beep every 5 minutes](/interval/beep-every-5-minutes); anything else you type in yourself on [interval](/interval).

## Picking the total

Rounds times interval is your session length. Set it slightly long rather than slightly short, because a timer that ends early in the middle of a soak is more annoying than one that beeps once too many.

| Every  | Rounds | Runs for  |
| ------ | ------ | --------- |
| 10 min | 3      | 30 min    |
| 10 min | 6      | 1 hour    |
| 10 min | 9      | 1.5 hours |
| 10 min | 12     | 2 hours   |
| 10 min | 18     | 3 hours   |

If you genuinely do not know how long you will need, set a high round count and stop it when you are done. There is no cost to an unused round.

## What happens in a background tab

Here is the honest part, because most pages selling you a repeating timer skip it.

The timer does not count ticks. It stores the moment you pressed start and works out the position from the current clock every time it wakes up, so a laptop that slept for forty minutes comes back with the correct elapsed time rather than forty minutes behind. That part is reliable.

What is not fully reliable is **the sound landing at the exact second** while the tab is hidden. Browsers throttle background timers aggressively, and a phone with the screen off may suspend the tab entirely. When it wakes, the timer notices that several boundaries have passed and plays a single catch-up tone rather than a burst of six beeps. That is deliberate, and it means you get told, but you may be told thirty seconds late.

So: for wound care or a sauna round, keep the tab visible and the screen on. The timer requests a wake lock while it runs, which handles the screen on most devices. For a study check-in where a minute either way is irrelevant, background is fine, and the remaining time shows in the tab title so a glance at your tab strip tells you where you are.

It also works with no connection once the page has loaded once, which matters in a basement gym or on a plane. Details in [free online timer that works offline](/blog/free-online-timer-that-works-offline).

Try it: [start a beep every 10 minutes](/interval/beep-every-10-minutes).
