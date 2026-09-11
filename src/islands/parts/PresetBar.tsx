import { useState } from 'preact/hooks';
import type { IntervalPreset } from '@/engine/presets';
import type { IntervalConfig } from '@/engine/schedule';
import { formatDuration } from '@/engine/format';
import { configSeconds } from '@/engine/schedule';

interface Props {
  builtin: readonly IntervalPreset[];
  saved: IntervalPreset[];
  current: IntervalConfig;
  disabled: boolean;
  onLoad(p: IntervalPreset): void;
  onSave(name: string): void;
  onDelete(id: string): void;
}

const same = (a: IntervalConfig, b: IntervalConfig): boolean =>
  a.work === b.work &&
  a.rest === b.rest &&
  a.rounds === b.rounds &&
  a.sets === b.sets &&
  a.setRest === b.setRest &&
  a.prep === b.prep;

export function PresetBar({ builtin, saved, current, disabled, onLoad, onSave, onDelete }: Props) {
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState('');

  const chip = (p: IntervalPreset, deletable: boolean) => (
    <li key={p.id} class="preset">
      <button
        type="button"
        class={`chip chip--preset${same(p.config, current) ? ' is-active' : ''}`}
        disabled={disabled}
        aria-pressed={same(p.config, current)}
        onClick={() => onLoad(p)}
      >
        <span>{p.name}</span>
        <span class="chip__meta">{formatDuration(configSeconds(p.config))}</span>
      </button>
      {deletable && (
        <button
          type="button"
          class="preset__del"
          aria-label={`Delete preset ${p.name}`}
          disabled={disabled}
          onClick={() => onDelete(p.id)}
        >
          ×
        </button>
      )}
    </li>
  );

  return (
    <div class="presets">
      <ul class="presets__list" aria-label="Presets">
        {saved.map((p) => chip(p, true))}
        {builtin.map((p) => chip(p, false))}
      </ul>
      {naming ? (
        <form
          class="presets__form"
          onSubmit={(e) => {
            e.preventDefault();
            const n = name.trim();
            if (!n) return;
            onSave(n);
            setName('');
            setNaming(false);
          }}
        >
          <input
            class="field__input field__input--text"
            type="text"
            maxLength={40}
            placeholder="Preset name"
            aria-label="Preset name"
            value={name}
            onInput={(e) => setName((e.currentTarget as HTMLInputElement).value)}
          />
          <button type="submit" class="btn btn--primary btn--sm">
            Save
          </button>
          <button type="button" class="btn btn--ghost btn--sm" onClick={() => setNaming(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button
          type="button"
          class="btn btn--ghost btn--sm"
          disabled={disabled}
          onClick={() => setNaming(true)}
        >
          Save current as preset
        </button>
      )}
    </div>
  );
}
