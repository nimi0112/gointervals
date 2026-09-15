import type { ModeConfig } from '@/engine/schedule';
import { Stepper } from './Stepper';
import { Icon } from './Icon';
import { bounds, type Draft, type FieldDef } from '../fields';

export interface SettingsProps {
  config: ModeConfig;
  defs: FieldDef[];
  /** the summary line; meditation places it between the chips and the preview */
  summary?: preact.ComponentChildren;
  draft: Draft;
  errors: Draft;
  disabled: boolean;
  onText(key: string, text: string): void;
  onStep(key: string, delta: 1 | -1): void;
  /** meditation chips */
  onToggle(key: 'intervalBell' | 'startBell' | 'endBell'): void;
  onPreview(): void;
}

const LABEL: Record<string, string> = {
  work: 'Work',
  rest: 'Rest',
  rounds: 'Rounds',
  interval: 'Interval length',
  minutes: 'Total minutes',
  focus: 'Focus',
  shortBreak: 'Short break',
  longBreak: 'Long break',
  sessions: 'Focus sessions',
  total: 'Session length',
  bell: 'Bell every',
};

/** The setup fields for a mode. Tabata has none: it is deliberately the fewest-settings path. */
export function Settings(p: SettingsProps) {
  const med = p.config.mode === 'meditation' ? p.config : null;
  if (!p.defs.length && !med) return null;
  return (
    <div class={`settings settings--${p.config.mode}`} data-count={p.defs.length}>
      <div class="settings__fields">
        {p.defs.map((f) => {
          const b = bounds(p.config, p.draft, f.key, p.defs);
          const off = p.disabled || (med !== null && f.key === 'bell' && !med.intervalBell);
          return (
            <Stepper
              key={f.key}
              id={`f-${f.key}`}
              label={
                off && med && f.key === 'bell' ? `${LABEL[f.key]} · unavailable` : LABEL[f.key]!
              }
              unit={f.unit}
              text={p.draft[f.key] ?? ''}
              error={p.errors[f.key]}
              atMin={b.atMin}
              atMax={b.atMax}
              disabled={off}
              onText={(t) => p.onText(f.key, t)}
              onStep={(d) => p.onStep(f.key, d)}
            />
          );
        })}
      </div>
      {med && (
        <>
          <div class="settings__chips" role="group" aria-label="Bells">
            {(
              [
                ['intervalBell', 'Interval bell'],
                ['startBell', 'Start bell'],
                ['endBell', 'End bell'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                class="chip"
                aria-pressed={med[key] ? 'true' : 'false'}
                disabled={p.disabled}
                onClick={() => p.onToggle(key)}
              >
                {label} · {med[key] ? 'On' : 'Off'}
              </button>
            ))}
          </div>
          {p.summary}
          <button type="button" class="btn btn--quiet settings__preview" onClick={p.onPreview}>
            <Icon name="volume-2" size={18} />
            <span>Preview bell</span>
          </button>
        </>
      )}
    </div>
  );
}
