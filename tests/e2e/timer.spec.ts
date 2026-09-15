import { test, expect, type Page } from '@playwright/test';

/** Astro removes the `ssr` attribute once the island has hydrated. Nothing is interactive before that. */
async function open(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await page.locator('astro-island:not([ssr])').first().waitFor();
}
const start = (page: Page) => page.getByRole('button', { name: 'Start', exact: true });
const digits = (page: Page) => page.getByRole('timer');
const phase = (page: Page) => page.locator('.timer__phase');
const context = (page: Page) => page.locator('.timer__context');

async function interval(page: Page, work: number, rest: number, rounds: number): Promise<void> {
  await page.clock.install({ time: new Date('2026-09-15T10:00:00Z') });
  await open(page, '/interval');
  await page.fill('#f-work', String(work));
  await page.fill('#f-rest', String(rest));
  await page.fill('#f-rounds', String(rounds));
}

test.describe('interval', () => {
  test('digits come first in the DOM and nothing sits above them', async ({ page }) => {
    await open(page, '/interval');
    const first = page.locator('main > astro-island .timer > *').first();
    await expect(first).toHaveClass(/timer__stage/);
    await expect(page.locator('header.hdr')).toHaveCount(0);
    await expect(page.locator('h1')).toHaveText('Interval timer');
  });

  test('defaults to 30 min work, 5 min rest, 8 rounds', async ({ page }) => {
    await open(page, '/interval');
    await expect(page.locator('#f-work')).toHaveValue('1800');
    await expect(page.locator('#f-rest')).toHaveValue('300');
    await expect(page.locator('#f-rounds')).toHaveValue('8');
    await expect(digits(page)).toHaveText('30:00');
    await expect(page.locator('.timer__summary')).toHaveText('8 rounds · 280:00 total');
  });

  test('starts straight into work and includes the final rest', async ({ page }) => {
    await interval(page, 40, 20, 8);
    await expect(page.locator('.timer__summary')).toHaveText('8 rounds · 08:00 total');
    await start(page).click();
    await expect(phase(page)).toHaveText('Work');
    await expect(context(page)).toHaveText('Round 1 of 8');
    await page.clock.fastForward(132_000);
    await expect(digits(page)).toHaveText('00:28');
    await expect(context(page)).toHaveText('Round 3 of 8');
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Next · Rest 00:20');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText('05:48 left');
    await page.clock.fastForward(30_000);
    await expect(phase(page)).toHaveText('Rest');
    await expect(page.locator('.timer__guidance')).toHaveText('Take a breath.');
    // the rest after round 8 is the last thing that runs
    await page.clock.fastForward(300_000);
    await expect(phase(page)).toHaveText('Rest');
    await expect(context(page)).toHaveText('Round 8 of 8');
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Next · Done');
    await page.clock.fastForward(20_000);
    await expect(phase(page)).toHaveText('Done');
    await expect(digits(page)).toHaveText('00:00');
    await expect(context(page)).toHaveText('8 of 8 rounds complete');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText('08:00 total');
    await expect(page.getByRole('button', { name: 'Run again' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Change settings' })).toBeVisible();
    await expect(page.locator('.timer__controls button')).toHaveCount(2);
  });

  test('space pauses and resumes; pause freezes the clock', async ({ page }) => {
    await interval(page, 40, 20, 8);
    await start(page).click();
    await page.clock.fastForward(12_000);
    await page.locator('body').press('Space');
    await expect(phase(page)).toHaveText('Paused · Work');
    await expect(page.getByRole('button', { name: 'Resume' })).toBeVisible();
    await page.clock.fastForward(60_000);
    await expect(digits(page)).toHaveText('00:28');
    await page.locator('body').press('Space');
    await expect(phase(page)).toHaveText('Work');
    await page.clock.fastForward(1_000);
    await expect(digits(page)).toHaveText('00:27');
  });

  test('esc asks before stopping; keep going restores the exact state; confirm returns to setup', async ({
    page,
  }) => {
    await interval(page, 40, 20, 8);
    await start(page).click();
    await page.clock.fastForward(12_000);
    await page.locator('body').press('Escape');
    await expect(phase(page)).toHaveText('Stop session?');
    await expect(context(page)).toHaveText('Your timer is paused.');
    await expect(page.getByRole('button', { name: 'Keep going' })).toBeFocused();
    await page.clock.fastForward(5_000);
    await expect(digits(page)).toHaveText('00:28');
    await page.locator('body').press('Escape');
    await expect(phase(page)).toHaveText('Work');
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
    await page.getByRole('button', { name: 'End session' }).click();
    await page.getByRole('button', { name: 'Stop session' }).click();
    await expect(phase(page)).toHaveText('Interval');
    await expect(page.locator('#f-work')).toHaveValue('40');
    await expect(digits(page)).toHaveText('00:40');
  });

  test('R asks before resetting while running, and just restores the preview in setup', async ({
    page,
  }) => {
    await interval(page, 40, 20, 8);
    await page.fill('#f-work', 'abc');
    await page.locator('#f-work').blur();
    await page.keyboard.press('r');
    await expect(page.locator('#f-work')).toHaveValue('40');
    await start(page).click();
    await page.clock.fastForward(5_000);
    await page.locator('body').press('r');
    await expect(phase(page)).toHaveText('Reset timer?');
    await expect(context(page)).toHaveText('This clears your progress.');
    await page.getByRole('button', { name: 'Reset timer' }).click();
    await expect(phase(page)).toHaveText('Interval');
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
  });

  test('invalid typed input stays visible with an inline error and disables Start', async ({
    page,
  }) => {
    await interval(page, 40, 20, 8);
    await page.fill('#f-work', '0');
    await expect(page.locator('#f-work')).toHaveValue('0');
    await expect(page.locator('#f-work')).toHaveAttribute('aria-invalid', 'true');
    const err = page.locator('#f-work-error');
    await expect(err).toHaveText('Work must be at least 1 second.');
    await expect(page.locator('#f-work')).toHaveAttribute('aria-describedby', 'f-work-error');
    const btn = page.getByRole('button', { name: 'Start · unavailable' });
    await expect(btn).toBeDisabled();
    await page.fill('#f-rounds', '1.5');
    await expect(page.locator('#f-rounds-error')).toHaveText('Use a whole number.');
    await page.fill('#f-rounds', '100');
    await expect(page.locator('#f-rounds-error')).toHaveText('Rounds must be 99 rounds or less.');
    // Space on the page focuses the first invalid field instead of starting
    await page.locator('#f-rounds').blur();
    await page.keyboard.press('Space');
    await expect(page.locator('#f-work')).toBeFocused();
    await page.fill('#f-work', '30');
    await page.fill('#f-rounds', '4');
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeEnabled();
  });

  test('steppers move by one and stop at the bounds', async ({ page }) => {
    await interval(page, 40, 0, 1);
    await page.getByRole('button', { name: 'Increase Rounds' }).click();
    await expect(page.locator('#f-rounds')).toHaveValue('2');
    await expect(page.getByRole('button', { name: 'Decrease Rest' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    await page.fill('#f-rounds', '99');
    await expect(page.getByRole('button', { name: 'Increase Rounds' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    await page.getByRole('button', { name: 'Decrease Rounds' }).click();
    await expect(page.locator('#f-rounds')).toHaveValue('98');
  });

  test('keys are ignored while typing in a field', async ({ page }) => {
    await interval(page, 40, 20, 8);
    await page.locator('#f-work').focus();
    await page.keyboard.press('End');
    await page.keyboard.press('r');
    await page.keyboard.press('Space');
    await expect(page.locator('#f-work')).toHaveValue('40r ');
    await expect(phase(page)).toHaveText('Interval');
    await expect(page.getByRole('button', { name: 'Pause' })).toHaveCount(0);
  });

  test('settings persist and survive a reload', async ({ page }) => {
    await open(page, '/interval');
    await page.fill('#f-work', '45');
    await page.fill('#f-rounds', '6');
    await page.reload();
    await page.locator('astro-island:not([ssr])').first().waitFor();
    await expect(page.locator('#f-work')).toHaveValue('45');
    await expect(page.locator('#f-rounds')).toHaveValue('6');
  });

  test('corrupt saved settings fall back to defaults with a quiet notice', async ({ page }) => {
    await open(page, '/interval');
    await page.evaluate(() =>
      localStorage.setItem(
        'gi:settings:interval',
        JSON.stringify({ mode: 'interval', work: 99999 }),
      ),
    );
    await page.reload();
    await page.locator('astro-island:not([ssr])').first().waitFor();
    await expect(page.locator('#f-work')).toHaveValue('1800');
    await expect(page.locator('.shellnav__footer')).toHaveText(
      'Saved settings were reset to the defaults.',
    );
  });

  test('navigating away during a session asks first and continues on confirm', async ({ page }) => {
    await interval(page, 40, 20, 8);
    await start(page).click();
    await page.clock.fastForward(3_000);
    await page.locator('.shellnav__about').click();
    await expect(page).toHaveURL(/\/interval$/);
    await expect(phase(page)).toHaveText('Stop session?');
    await page.getByRole('button', { name: 'Stop session' }).click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test('run again starts a fresh session with the same settings', async ({ page }) => {
    await interval(page, 5, 0, 1);
    await start(page).click();
    await page.clock.fastForward(6_000);
    await expect(phase(page)).toHaveText('Done');
    await page.getByRole('button', { name: 'Run again' }).click();
    await expect(phase(page)).toHaveText('Work');
    await expect(digits(page)).toHaveText('00:05');
  });

  test('sound chip has explicit On/Off text and aria-pressed, and mute persists', async ({
    page,
  }) => {
    await open(page, '/interval');
    const chip = page.locator('.shellnav__sound');
    await expect(chip).toHaveText('On');
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await chip.click();
    await expect(chip).toHaveText('Off');
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await page.reload();
    await page.locator('astro-island:not([ssr])').first().waitFor();
    await expect(page.locator('.shellnav__sound')).toHaveText('Off');
    await page.locator('.shellnav__sound').click();
  });

  test('a blocked audio context shows a quiet notice and the timer keeps running', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      class Blocked {
        state = 'suspended';
        currentTime = 0;
        resume() {
          return Promise.reject(new Error('blocked'));
        }
        createBuffer() {
          throw new Error('blocked');
        }
      }
      // @ts-expect-error test double
      window.AudioContext = Blocked;
      // @ts-expect-error test double
      window.webkitAudioContext = Blocked;
    });
    await interval(page, 40, 20, 8);
    await start(page).click();
    await expect(page.locator('.shellnav__footer')).toHaveText('Sound blocked. Tap On to retry.');
    await page.clock.fastForward(2_000);
    await expect(digits(page)).toHaveText('00:38');
  });

  test('a long sleep lands on the right round without a burst of sound', async ({ page }) => {
    await interval(page, 40, 20, 8);
    await start(page).click();
    await page.clock.fastForward(1_000);
    // jump three boundaries at once
    await page.clock.fastForward(130_000);
    await expect(context(page)).toHaveText('Round 3 of 8');
    await expect(digits(page)).toHaveText('00:29');
  });

  test('a long session shows minutes past 59 without truncation', async ({ page }) => {
    await interval(page, 3600, 3600, 2);
    await expect(digits(page)).toHaveText('60:00');
    await expect(page.locator('.timer__summary')).toHaveText('2 rounds · 240:00 total');
  });
});

test.describe('tabata', () => {
  test('is fixed at 20/10 x 8 with no fields and a 04:00 total', async ({ page }) => {
    await page.clock.install();
    await open(page, '/tabata');
    await expect(page.locator('.stepper')).toHaveCount(0);
    await expect(digits(page)).toHaveText('00:20');
    await expect(context(page)).toHaveText('20s work · 10s rest · 8 rounds');
    await expect(page.locator('.timer__summary')).toHaveText('Classic Tabata · 04:00 total');
    await start(page).click();
    await expect(context(page)).toHaveText('Tabata · Round 1 of 8');
    await page.clock.fastForward(68_000);
    await expect(digits(page)).toHaveText('00:12');
    await expect(context(page)).toHaveText('Tabata · Round 3 of 8');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText('02:52 left');
    await page.locator('body').press('Space');
    await expect(phase(page)).toHaveText('Paused · Work');
    await page.locator('body').press('Space');
    await page.clock.fastForward(180_000);
    await expect(phase(page)).toHaveText('Done');
    await expect(context(page)).toHaveText('Tabata · 8 of 8 rounds complete');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText('04:00 total');
  });

  test('a stale custom tabata in storage is replaced by the classic preset', async ({ page }) => {
    await open(page, '/tabata');
    await page.evaluate(() =>
      localStorage.setItem(
        'gi:settings:tabata',
        JSON.stringify({ mode: 'tabata', work: 30, rest: 15, rounds: 8 }),
      ),
    );
    await page.reload();
    await page.locator('astro-island:not([ssr])').first().waitFor();
    await expect(digits(page)).toHaveText('00:20');
  });
});

test.describe('emom', () => {
  test('counts minutes at 60s, caps the last interval, and validates its ranges', async ({
    page,
  }) => {
    await page.clock.install();
    await open(page, '/emom');
    await expect(page.locator('#f-interval')).toHaveValue('60');
    await expect(page.locator('#f-minutes')).toHaveValue('10');
    await expect(page.locator('.timer__summary')).toHaveText('60s intervals · 10:00 total');
    await page.fill('#f-interval', '14');
    await expect(page.locator('#f-interval-error')).toHaveText(
      'Interval length must be at least 15 seconds.',
    );
    await page.fill('#f-interval', '60');
    await start(page).click();
    await page.clock.fastForward(138_000);
    await expect(digits(page)).toHaveText('00:42');
    await expect(phase(page)).toHaveText('Minute running');
    await expect(context(page)).toHaveText('EMOM · Minute 3 of 10');
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Next · Minute 4');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText('07:42 left');
  });

  test('90 second intervals are labelled as intervals', async ({ page }) => {
    await page.clock.install();
    await open(page, '/emom');
    await page.fill('#f-interval', '90');
    await page.fill('#f-minutes', '2');
    await expect(page.locator('.timer__summary')).toHaveText('90s intervals · 02:00 total');
    await start(page).click();
    await page.clock.fastForward(95_000);
    await expect(phase(page)).toHaveText('Interval running');
    await expect(context(page)).toHaveText('EMOM · Interval 2 of 2');
    await expect(digits(page)).toHaveText('00:25');
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Next · Done');
  });
});

test.describe('pomodoro', () => {
  test('runs one finite cycle and stops after the long break', async ({ page }) => {
    await page.clock.install();
    await open(page, '/pomodoro');
    await expect(page.locator('.timer__summary')).toHaveText('25 / 5 / 15 / 4 · 130 minutes total');
    await expect(context(page)).toHaveText('4 focus sessions · One finite cycle');
    await page.fill('#f-focus', '1');
    await page.fill('#f-shortBreak', '1');
    await page.fill('#f-longBreak', '1');
    await page.fill('#f-sessions', '2');
    await expect(page.locator('.timer__summary')).toHaveText('1 / 1 / 1 / 2 · 4 minutes total');
    await start(page).click();
    await expect(phase(page)).toHaveText('Focus');
    await expect(context(page)).toHaveText('Pomodoro · Focus 1 of 2');
    await page.clock.fastForward(61_000);
    await expect(phase(page)).toHaveText('Short break');
    await expect(context(page)).toHaveText('Pomodoro · After focus 1 of 2');
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Next · Focus 2 of 2');
    await expect(page.locator('.timer__guidance')).toHaveText('Step away for a moment.');
    await page.clock.fastForward(60_000);
    await expect(phase(page)).toHaveText('Focus');
    await page.clock.fastForward(60_000);
    await expect(phase(page)).toHaveText('Long break');
    await expect(context(page)).toHaveText('Pomodoro · 2 of 2 focus sessions done');
    await page.clock.fastForward(61_000);
    await expect(phase(page)).toHaveText('Done');
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Cycle complete');
    await expect(page.locator('.timer__guidance')).toHaveText('That’s the cycle.');
    await page.clock.fastForward(60_000);
    await expect(phase(page)).toHaveText('Done');
    await expect(page.locator('.timer__sessions')).toHaveCount(0);
  });

  test('one session goes focus, long break, done', async ({ page }) => {
    await page.clock.install();
    await open(page, '/pomodoro');
    await page.fill('#f-sessions', '1');
    await expect(page.locator('.timer__summary')).toHaveText('25 / 5 / 15 / 1 · 40 minutes total');
    await start(page).click();
    await page.clock.fastForward(25 * 60_000 + 1000);
    await expect(phase(page)).toHaveText('Long break');
  });
});

test.describe('meditation', () => {
  test('main clock is the whole session; the quiet line is the next bell', async ({ page }) => {
    await page.clock.install();
    await open(page, '/meditation');
    await expect(digits(page)).toHaveText('30:00');
    await expect(page.locator('#f-total')).toHaveValue('30');
    await expect(page.locator('#f-bell')).toHaveValue('10');
    await expect(page.getByRole('button', { name: 'Interval bell · On' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.getByRole('button', { name: 'Start bell · Off' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    await expect(page.getByRole('button', { name: 'End bell · On' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.locator('.timer__summary')).toHaveText(
      'A soft bell every 10 minutes. One at the end.',
    );
    await start(page).click();
    await expect(phase(page)).toHaveText('Meditation');
    await expect(context(page)).toHaveText('30 minute session');
    await page.clock.fastForward(11 * 60_000 + 18_000);
    await expect(digits(page)).toHaveText('18:42');
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Next bell in 08:42');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText(
      '1 of 2 interval bells',
    );
    await page.locator('body').press('Space');
    await expect(phase(page)).toHaveText('Paused');
    await expect(context(page)).toHaveText('Meditation · Timer stopped');
    await expect(page.locator('.shellnav__footer')).toHaveText('Meditation · Bells paused too');
    await page.locator('body').press('Space');
    await page.clock.fastForward(19 * 60_000);
    await expect(phase(page)).toHaveText('Done');
    await expect(context(page)).toHaveText('30 minutes complete');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText('30:00 total');
  });

  test('interval off disables its field but keeps the value; bell cannot exceed the session', async ({
    page,
  }) => {
    await open(page, '/meditation');
    await page.getByRole('button', { name: 'Interval bell · On' }).click();
    await expect(page.locator('#f-bell')).toBeDisabled();
    await expect(page.locator('#f-bell')).toHaveValue('10');
    await expect(page.locator('.timer__summary')).toHaveText(
      'No interval bells. One soft bell at the end.',
    );
    await page.getByRole('button', { name: 'Interval bell · Off' }).click();
    await page.fill('#f-total', '20');
    await page.fill('#f-bell', '25');
    await expect(page.locator('#f-bell-error')).toHaveText(
      'Bell every must be 20 minutes or less.',
    );
    await page.fill('#f-bell', '20');
    await expect(page.locator('.timer__summary')).toHaveText(
      'A soft bell every 20 minutes. One at the end.',
    );
    await page.fill('#f-total', '181');
    await expect(page.locator('#f-total-error')).toHaveText(
      'Session length must be 180 minutes or less.',
    );
  });

  test('muted shows "Bells muted" and the time left', async ({ page }) => {
    await page.clock.install();
    await open(page, '/meditation');
    await page.locator('.shellnav__sound').click();
    await start(page).click();
    await page.clock.fastForward(60_000);
    await expect(page.locator('.progress__details span').nth(0)).toHaveText('Bells muted');
    await expect(page.locator('.progress__details span').nth(1)).toHaveText('29:00 left');
    await page.locator('.shellnav__sound').click();
  });

  test('tab title follows the session', async ({ page }) => {
    await page.clock.install();
    await open(page, '/meditation');
    await start(page).click();
    await page.clock.fastForward(60_000);
    await expect(page).toHaveTitle(/^29:00 Meditation/);
  });
});

test('clear my data removes gi: keys', async ({ page }) => {
  await open(page, '/pomodoro');
  await page.evaluate(() => localStorage.setItem('gi:test', '1'));
  await page.goto('/about');
  await page.getByRole('button', { name: 'Clear my data' }).click();
  await expect(page.locator('#clear-status')).toContainText('Cleared');
  expect(await page.evaluate(() => localStorage.getItem('gi:test'))).toBeNull();
});

test.describe('layout', () => {
  test('no horizontal overflow at 320px and the order holds on a short desktop', async ({
    browser,
  }) => {
    for (const viewport of [
      { width: 320, height: 568 },
      { width: 1280, height: 600 },
    ]) {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await open(page, '/interval');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow).toBe(false);
      const order = await page
        .locator('.timer > *')
        .evaluateAll((els) => els.map((e) => e.className));
      expect(order[0]).toContain('timer__stage');
      expect(order.at(-1)).toContain('shellnav');
      await ctx.close();
    }
  });
});
