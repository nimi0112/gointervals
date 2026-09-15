---
title: 'Boxing round timer: 3 minute rounds, 1 minute rest'
description: A boxing round timer runs 3 minutes of work and 1 minute of rest. Round counts for amateur and pro, and how to build a real training session.
pubDate: 2026-09-03
tags: [boxing, hiit, workouts, how-to]
timer: '/interval/boxing-rounds-3-1'
keyword: 'boxing round timer'
---

A boxing round timer runs 3 minutes of work followed by 1 minute of rest, and that 3:1 ratio has been the standard in professional boxing since the Marquess of Queensberry rules formalised it in the 1860s. Almost every gym on earth runs its clock on it, whether the session involves gloves or not.

## Round counts, by context

| Context                             | Rounds | Round length | Rest  |
| ----------------------------------- | ------ | ------------ | ----- |
| Men's professional championship     | 12     | 3 min        | 1 min |
| Men's professional, non-title       | 4-10   | 3 min        | 1 min |
| Women's professional                | 10     | 2 min        | 1 min |
| Olympic and amateur (men and women) | 3      | 3 min        | 1 min |
| Typical gym session                 | 8-15   | 3 min        | 1 min |

The 12-round championship distance replaced 15 rounds in the early 1980s, after Duk Koo Kim died following a 14th-round stoppage against Ray Mancini in 1982. The WBC moved to 12 that year and the other bodies followed by 1988.

Women's professional bouts run 2-minute rounds over 10, a format that has been contested for years by fighters who want parity with the men's distance.

## What a training session actually looks like

Nobody trains twelve rounds of the same thing. A standard gym session is a rotation, with the clock running continuously and the work changing every round or two:

- **Rounds 1-2:** skipping. Warm-up, footwork, getting the shoulders loose.
- **Rounds 3-4:** shadowboxing. Technique with no resistance, full range.
- **Rounds 5-7:** bag work. Heavy bag for power, or a rotation of heavy, double-end, and speed bag.
- **Rounds 8-9:** pads or sparring, if there is a partner.
- **Rounds 10-12:** conditioning. Burpees, sprawls, core, whatever is left.

Twelve rounds at 3:1 is 48 minutes of clock. That is the session. The clock runs the whole time and nobody negotiates with it, which is exactly why the format survives.

The [boxing round timer](/interval/boxing-rounds-3-1) is preset at 3 minutes on, 1 minute off, so you start it once at the beginning and change the activity at the bell rather than touching the phone.

## Why 3 minutes and not something else

Three minutes is roughly the point where a trained athlete transitions from predominantly anaerobic to predominantly aerobic energy supply. A round is long enough to demand real conditioning and short enough that output does not collapse into a shuffle.

The one-minute rest is deliberately incomplete. You recover some, not all, and the deficit compounds across rounds. That is why fighters fade in the championship rounds and why the last three rounds of a session feel nothing like the first three even though the numbers are identical.

## Using it without boxing

The 3:1 structure is genuinely good for general conditioning, because three minutes is long enough to fit a circuit inside. Three or four exercises at 45 seconds each, then a minute off, repeat. You get the pacing discipline of round work without needing a bag.

It also works for anything that benefits from a hard stop and a forced pause: circuit training, rowing blocks, hill repeats on a long enough hill.

## Practical setup

Audio cues are the whole interface. You will not be looking at a screen during a round, and if you are wearing gloves you are not touching one either. The bell at the start and end of the round is what you train to.

The screen stays awake with the Screen Wake Lock API, with a silent video fallback on older browsers, so the timer does not go dark on round four. Timing runs off timestamps, so if the phone does sleep, the round count is still correct when it wakes.

Keyboard shortcuts if the laptop is closer than the phone: Space to start and pause, R to reset, Esc to stop.

## Adjusting the numbers

New to it? Start at 2 minutes on, 1 off, for 6 rounds. The three-minute round is longer than it reads and the first honest session is humbling.

Want it harder? Keep 3 minutes and cut rest to 30 seconds. Professional fighters do variations of this deliberately in camp so that a real one-minute rest feels generous.

Either way you can set your own numbers on the [interval timer](/interval) if the preset is not the shape you want. For shorter and more brutal, [what a tabata timer does](/blog/what-is-a-tabata-timer) is the other end of the spectrum.

Try it: [start 12 rounds of 3 and 1](/interval/boxing-rounds-3-1).
