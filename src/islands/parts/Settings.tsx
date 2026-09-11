import type { ModeConfig } from '@/engine/schedule';
import { DurationField, NumberField } from './DurationField';
import { describeConfig } from '@/engine/describe';

interface Props {
  config: ModeConfig;
  onChange(c: ModeConfig): void;
  disabled: boolean;
}

const COUNTDOWN_PRESETS = [1, 3, 5, 10, 15, 20, 30, 45, 60];

function Fields({ config, onChange, disabled }: Props) {
  switch (config.mode) {
    case 'countdown':
      return (
        <div class="settings">
          <div class="chips" role="group" aria-label="Quick durations">
            {COUNTDOWN_PRESETS.map((m) => (
              <button
                key={m}
                type="button"
                class={`chip${config.seconds === m * 60 ? ' is-active' : ''}`}
                disabled={disabled}
                aria-pressed={config.seconds === m * 60}
                onClick={() => onChange({ mode: 'countdown', seconds: m * 60 })}
              >
                {m} min
              </button>
            ))}
          </div>
          <div class="fields">
            <DurationField
              label="Custom"
              value={config.seconds}
              min={1}
              disabled={disabled}
              onChange={(seconds) => onChange({ mode: 'countdown', seconds: Math.max(1, seconds) })}
            />
          </div>
        </div>
      );
    case 'interval':
      return (
        <div class="settings">
          <div class="fields">
            <DurationField
              label="Work"
              value={config.work}
              min={1}
              disabled={disabled}
              onChange={(work) => onChange({ ...config, work: Math.max(1, work) })}
            />
            <DurationField
              label="Rest"
              value={config.rest}
              hint="0 for none"
              disabled={disabled}
              onChange={(rest) => onChange({ ...config, rest })}
            />
            <NumberField
              label="Rounds"
              value={config.rounds}
              disabled={disabled}
              onChange={(rounds) => onChange({ ...config, rounds })}
            />
            <NumberField
              label="Sets"
              value={config.sets}
              max={99}
              disabled={disabled}
              onChange={(sets) => onChange({ ...config, sets })}
            />
            <DurationField
              label="Rest between sets"
              value={config.setRest}
              disabled={disabled || config.sets < 2}
              onChange={(setRest) => onChange({ ...config, setRest })}
            />
            <DurationField
              label="Get ready"
              value={config.prep}
              hint="countdown before round 1"
              disabled={disabled}
              onChange={(prep) => onChange({ ...config, prep })}
            />
          </div>
        </div>
      );
    case 'tabata':
      return (
        <div class="settings">
          <div class="fields">
            <DurationField
              label="Work"
              value={config.work}
              min={1}
              disabled={disabled}
              onChange={(work) => onChange({ ...config, work: Math.max(1, work) })}
            />
            <DurationField
              label="Rest"
              value={config.rest}
              disabled={disabled}
              onChange={(rest) => onChange({ ...config, rest })}
            />
            <NumberField
              label="Rounds"
              value={config.rounds}
              disabled={disabled}
              onChange={(rounds) => onChange({ ...config, rounds })}
            />
            <DurationField
              label="Get ready"
              value={config.prep}
              disabled={disabled}
              onChange={(prep) => onChange({ ...config, prep })}
            />
          </div>
        </div>
      );
    case 'emom':
      return (
        <div class="settings">
          <div class="fields">
            <NumberField
              label="Total minutes"
              value={config.minutes}
              max={180}
              disabled={disabled}
              onChange={(minutes) => onChange({ ...config, minutes })}
            />
            <DurationField
              label="Every"
              value={config.interval}
              min={5}
              hint="60 = on the minute"
              disabled={disabled}
              onChange={(interval) => onChange({ ...config, interval: Math.max(5, interval) })}
            />
            <DurationField
              label="Get ready"
              value={config.prep}
              disabled={disabled}
              onChange={(prep) => onChange({ ...config, prep })}
            />
          </div>
        </div>
      );
    case 'pomodoro':
      return (
        <div class="settings">
          <div class="fields">
            <NumberField
              label="Focus (min)"
              value={config.focus}
              max={180}
              disabled={disabled}
              onChange={(focus) => onChange({ ...config, focus })}
            />
            <NumberField
              label="Short break (min)"
              value={config.shortBreak}
              max={60}
              disabled={disabled}
              onChange={(shortBreak) => onChange({ ...config, shortBreak })}
            />
            <NumberField
              label="Long break (min)"
              value={config.longBreak}
              max={120}
              disabled={disabled}
              onChange={(longBreak) => onChange({ ...config, longBreak })}
            />
            <NumberField
              label="Long break after"
              value={config.sessionsBeforeLong}
              max={12}
              hint="sessions"
              disabled={disabled}
              onChange={(sessionsBeforeLong) => onChange({ ...config, sessionsBeforeLong })}
            />
          </div>
        </div>
      );
    case 'meditation':
      return (
        <div class="settings">
          <div class="fields">
            <DurationField
              label="Bell every"
              value={config.bell}
              min={30}
              disabled={disabled}
              onChange={(bell) => onChange({ ...config, bell: Math.max(30, bell) })}
            />
            <DurationField
              label="Total"
              value={config.total}
              min={30}
              disabled={disabled}
              onChange={(total) => onChange({ ...config, total: Math.max(30, total) })}
            />
            <DurationField
              label="Settle in"
              value={config.prep}
              hint="before the first bell"
              disabled={disabled}
              onChange={(prep) => onChange({ ...config, prep })}
            />
          </div>
        </div>
      );
    case 'stopwatch':
      return null;
  }
}

export function Settings(props: Props) {
  if (props.config.mode === 'stopwatch') return null;
  return (
    <>
      <p class="settings__summary" aria-live="polite">
        {describeConfig(props.config)}
      </p>
      <Fields {...props} />
    </>
  );
}
