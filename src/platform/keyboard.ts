export interface KeyHandlers {
  /** Space: start, pause or resume */
  toggle?: () => void;
  /** R */
  reset?: () => void;
  /** Esc: ask to stop, or cancel an open question. Works inside fields too. */
  escape?: () => void;
}

/** The slice of KeyboardEvent the handler reads, so it can be tested without a DOM. */
export interface KeyLike {
  key: string;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  target: EventTarget | null;
  preventDefault(): void;
}

const isTyping = (t: EventTarget | null): boolean => {
  const el = t as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
};

/** Space start/pause/resume, R reset, Esc stop. Space and R are ignored while typing in a field. */
export function handleKey(e: KeyLike, h: KeyHandlers): void {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === 'Escape') {
    h.escape?.();
    return;
  }
  if (isTyping(e.target)) return;
  switch (e.key) {
    case ' ':
      e.preventDefault();
      h.toggle?.();
      break;
    case 'r':
    case 'R':
      e.preventDefault();
      h.reset?.();
      break;
  }
}

export function bindKeys(h: KeyHandlers): () => void {
  const onKey = (e: KeyboardEvent): void => handleKey(e, h);
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}
