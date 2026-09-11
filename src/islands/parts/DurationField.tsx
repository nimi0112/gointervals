interface Props {
  label: string;
  /** seconds */
  value: number;
  onChange(seconds: number): void;
  min?: number;
  max?: number;
  disabled?: boolean;
  hint?: string;
}

/** Minutes + seconds pair. Stores seconds. */
export function DurationField({
  label,
  value,
  onChange,
  min = 0,
  max = 86400,
  disabled,
  hint,
}: Props) {
  const m = Math.floor(value / 60);
  const s = value % 60;
  const set = (mm: number, ss: number): void => {
    const total = Math.min(
      max,
      Math.max(min, (Number.isFinite(mm) ? mm : 0) * 60 + (Number.isFinite(ss) ? ss : 0)),
    );
    onChange(total);
  };
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div class="field">
      <label class="field__label" for={`${id}-m`}>
        {label}
        {hint && <span class="field__hint"> {hint}</span>}
      </label>
      <div class="field__pair">
        <span class="field__unit" data-unit="min">
          <input
            id={`${id}-m`}
            class="field__input"
            type="number"
            inputMode="numeric"
            min={0}
            max={1440}
            value={m}
            disabled={disabled}
            aria-label={`${label} minutes`}
            onInput={(e) => set(parseInt((e.currentTarget as HTMLInputElement).value, 10), s)}
          />
        </span>
        <span class="field__sep" aria-hidden="true">
          :
        </span>
        <span class="field__unit" data-unit="sec">
          <input
            class="field__input"
            type="number"
            inputMode="numeric"
            min={0}
            max={59}
            value={s}
            disabled={disabled}
            aria-label={`${label} seconds`}
            onInput={(e) => set(m, parseInt((e.currentTarget as HTMLInputElement).value, 10))}
          />
        </span>
      </div>
    </div>
  );
}

interface NumProps {
  label: string;
  value: number;
  onChange(n: number): void;
  min?: number;
  max?: number;
  disabled?: boolean;
  hint?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  min = 1,
  max = 999,
  disabled,
  hint,
}: NumProps) {
  const id = `n-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div class="field">
      <label class="field__label" for={id}>
        {label}
        {hint && <span class="field__hint"> {hint}</span>}
      </label>
      <input
        id={id}
        class="field__input field__input--single"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onInput={(e) => {
          const n = parseInt((e.currentTarget as HTMLInputElement).value, 10);
          onChange(Math.min(max, Math.max(min, Number.isFinite(n) ? n : min)));
        }}
      />
    </div>
  );
}
