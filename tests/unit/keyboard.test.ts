import { handleKey, type KeyHandlers, type KeyLike } from '@/platform/keyboard';

function ev(key: string, extra: Partial<KeyLike> = {}): KeyLike & { prevented: boolean } {
  const e = {
    key,
    metaKey: false,
    ctrlKey: false,
    altKey: false,
    target: null,
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
    ...extra,
  };
  return e;
}
const field = { tagName: 'INPUT', isContentEditable: false } as unknown as EventTarget;

function spy(): KeyHandlers & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    toggle: () => calls.push('toggle'),
    reset: () => calls.push('reset'),
    escape: () => calls.push('escape'),
  };
}

describe('handleKey', () => {
  it('Space toggles, R resets, Escape escapes', () => {
    const h = spy();
    handleKey(ev(' '), h);
    handleKey(ev('r'), h);
    handleKey(ev('R'), h);
    handleKey(ev('Escape'), h);
    expect(h.calls).toEqual(['toggle', 'reset', 'reset', 'escape']);
  });

  it('prevents the page from scrolling on Space', () => {
    const e = ev(' ');
    handleKey(e, spy());
    expect(e.prevented).toBe(true);
  });

  it('ignores Space and R while typing in a field, but Escape still works there', () => {
    const h = spy();
    handleKey(ev(' ', { target: field }), h);
    handleKey(ev('r', { target: field }), h);
    handleKey(ev('Escape', { target: field }), h);
    expect(h.calls).toEqual(['escape']);
  });

  it('ignores modifier combinations', () => {
    const h = spy();
    handleKey(ev(' ', { metaKey: true }), h);
    handleKey(ev('r', { ctrlKey: true }), h);
    handleKey(ev('Escape', { altKey: true }), h);
    expect(h.calls).toEqual([]);
  });

  it('has no lap key any more', () => {
    const h = spy();
    handleKey(ev('l'), h);
    expect(h.calls).toEqual([]);
  });
});
