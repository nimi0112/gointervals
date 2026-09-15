import { Icon } from './Icon';

interface Props {
  muted: boolean;
  audioBlocked: boolean;
  footer: string;
  onToggleSound(): void;
  /** return false to keep the person on the page (a session is active) */
  onNavigate(href: string): boolean;
}

/** Subordinate navigation under the controls: ← Timers · About · Sound, then a quiet line. */
export function ShellNav(p: Props) {
  const link = (href: string, children: preact.ComponentChildren, cls: string) => (
    <a
      class={cls}
      href={href}
      onClick={(e) => {
        if (!p.onNavigate(href)) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
  const on = !p.muted && !p.audioBlocked;
  return (
    <div class="shellnav">
      <div class="shellnav__row">
        {link(
          '/',
          <>
            <Icon name="arrow-left" size={18} />
            <span>Timers</span>
          </>,
          'shellnav__link shellnav__back',
        )}
        {link('/about', 'About', 'shellnav__link shellnav__about')}
        <button
          type="button"
          class="shellnav__sound"
          aria-pressed={on ? 'true' : 'false'}
          aria-label={on ? 'Sound on' : 'Sound off'}
          onClick={p.onToggleSound}
        >
          <Icon name={on ? 'volume-2' : 'volume-x'} size={18} />
          <span>{on ? 'On' : 'Off'}</span>
        </button>
      </div>
      <p class="shellnav__footer" role="status">
        {p.footer}
      </p>
    </div>
  );
}
