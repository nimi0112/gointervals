import { useEffect, useRef } from 'preact/hooks';
import { Icon } from './Icon';

interface Props {
  id: string;
  label: string;
  /** caption after the number: "seconds", "min", "rounds" */
  unit: string;
  text: string;
  error?: string | undefined;
  atMin: boolean;
  atMax: boolean;
  disabled?: boolean | undefined;
  onText(text: string): void;
  onStep(delta: 1 | -1): void;
}

const HOLD_DELAY = 400;
const HOLD_EVERY = 100;

/**
 * Duration stepper from the canvas: − / editable number / +. Typing uses the numeric
 * keyboard and is never coerced; the buttons move by one, clamp at the bounds and repeat
 * after being held for 400ms.
 */
export function Stepper(p: Props) {
  const hold = useRef<{ t: number; i: number }>({ t: 0, i: 0 });
  const stop = (): void => {
    window.clearTimeout(hold.current.t);
    window.clearInterval(hold.current.i);
    hold.current = { t: 0, i: 0 };
  };
  useEffect(() => stop, []);

  const press = (delta: 1 | -1) => (e: PointerEvent) => {
    if (e.button !== 0) return;
    p.onStep(delta);
    stop();
    hold.current.t = window.setTimeout(() => {
      hold.current.i = window.setInterval(() => p.onStep(delta), HOLD_EVERY);
    }, HOLD_DELAY);
  };
  const errorId = `${p.id}-error`;
  const invalid = !!p.error;

  const btn = (delta: 1 | -1, at: boolean, name: string) => (
    <button
      type="button"
      class="stepper__btn"
      aria-label={`${name} ${p.label}`}
      aria-disabled={p.disabled || at ? 'true' : undefined}
      disabled={p.disabled}
      onPointerDown={at ? undefined : press(delta)}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !at) {
          e.preventDefault();
          p.onStep(delta);
        }
      }}
      onClick={(e) => e.preventDefault()}
    >
      <Icon name={delta > 0 ? 'plus' : 'minus'} size={20} />
    </button>
  );

  return (
    <div class="field">
      <label class="field__label" for={p.id}>
        {p.label}
      </label>
      <div class={`stepper${invalid ? ' is-invalid' : ''}`}>
        {btn(-1, p.atMin, 'Decrease')}
        <span class="stepper__value">
          <input
            id={p.id}
            class="stepper__input"
            type="text"
            inputMode="numeric"
            autocomplete="off"
            value={p.text}
            disabled={p.disabled}
            aria-invalid={invalid ? 'true' : undefined}
            aria-describedby={invalid ? errorId : undefined}
            onInput={(e) => p.onText((e.currentTarget as HTMLInputElement).value)}
          />
          <span class="stepper__unit" aria-hidden="true">
            {p.unit}
          </span>
        </span>
        {btn(1, p.atMax, 'Increase')}
      </div>
      {invalid && (
        <p class="field__error" id={errorId}>
          {p.error}
        </p>
      )}
    </div>
  );
}
