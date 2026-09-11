export interface KeyHandlers {
  toggle?: () => void;
  reset?: () => void;
  lap?: () => void;
  stop?: () => void;
}

const isTyping = (t: EventTarget | null): boolean => {
  const el = t as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
};

/** Space start/pause, R reset, L lap, Esc stop. Ignored while typing in a field. */
export function bindKeys(h: KeyHandlers): () => void {
  const onKey = (e: KeyboardEvent): void => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (isTyping(e.target) && e.key !== 'Escape') return;
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
      case 'l':
      case 'L':
        h.lap?.();
        break;
      case 'Escape':
        h.stop?.();
        break;
    }
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}
