import { createStorage } from '@/platform/storage';

function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    get length() {
      return m.size;
    },
    clear: () => m.clear(),
    getItem: (k) => m.get(k) ?? null,
    key: (i) => [...m.keys()][i] ?? null,
    removeItem: (k) => void m.delete(k),
    setItem: (k, v) => void m.set(k, String(v)),
  };
}

function brokenStorage(): Storage {
  const boom = () => {
    throw new DOMException('QuotaExceededError');
  };
  return { length: 0, clear: boom, getItem: boom, key: boom, removeItem: boom, setItem: boom };
}

describe('storage', () => {
  it('namespaces keys and round-trips JSON', () => {
    const backing = memoryStorage();
    const s = createStorage(() => backing);
    s.set('settings:interval', { work: 30 });
    expect(backing.getItem('gi:settings:interval')).toBe('{"work":30}');
    expect(s.get('settings:interval', null)).toEqual({ work: 30 });
  });

  it('returns the fallback on missing or corrupt values', () => {
    const backing = memoryStorage();
    backing.setItem('gi:muted', '{oops');
    const s = createStorage(() => backing);
    expect(s.get('muted', false)).toBe(false);
    expect(s.get('nothing', 'x')).toBe('x');
  });

  it('never throws when localStorage is broken or absent', () => {
    const s = createStorage(brokenStorage);
    expect(() => s.set('a', 1)).not.toThrow();
    expect(s.get('a', 'fb')).toBe('fb');
    expect(s.available()).toBe(false);
    const none = createStorage(() => {
      throw new Error('no window');
    });
    expect(none.get('a', 2)).toBe(2);
    expect(() => none.clearAll()).not.toThrow();
  });

  it('clearAll removes only gi: keys', () => {
    const backing = memoryStorage();
    backing.setItem('other', '1');
    const s = createStorage(() => backing);
    s.set('a', 1);
    s.set('b', 2);
    s.clearAll();
    expect(backing.getItem('other')).toBe('1');
    expect(backing.length).toBe(1);
  });
});
