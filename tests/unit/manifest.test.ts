import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
interface Icon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}
interface Shortcut {
  name: string;
  url: string;
}
interface Manifest {
  id: string;
  name: string;
  short_name: string;
  start_url: string;
  scope: string;
  display: string;
  theme_color: string;
  background_color: string;
  icons: Icon[];
  shortcuts: Shortcut[];
}
const manifest = JSON.parse(
  readFileSync(join(root, 'public/manifest.webmanifest'), 'utf8'),
) as Manifest;
const sw = readFileSync(join(root, 'public/sw.js'), 'utf8');

describe('web app manifest', () => {
  it('declares a stable id so installed apps never orphan when start_url changes', () => {
    expect(typeof manifest.id).toBe('string');
    expect(manifest.id.length).toBeGreaterThan(0);
  });

  it('is installable: name, start_url, scope, display and icons', () => {
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name.length).toBeLessThanOrEqual(12);
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.scope).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(Array.isArray(manifest.icons)).toBe(true);
  });

  it('ships a plain icon and a separately padded maskable icon', () => {
    const purposes = manifest.icons.map((i) => i.purpose ?? 'any');
    // A single "any maskable" icon gets cropped by adaptive launchers; they must be distinct.
    expect(purposes).toContain('any');
    expect(purposes).toContain('maskable');
    expect(purposes).not.toContain('any maskable');

    const maskable = manifest.icons.find((i) => i.purpose === 'maskable');
    expect(maskable?.sizes).toBe('512x512');
    const plain = manifest.icons.find((i) => (i.purpose ?? 'any') === 'any');
    expect(maskable?.src).not.toBe(plain?.src);
  });

  it('requires both a 192 and a 512 icon', () => {
    const sizes = manifest.icons.map((i) => i.sizes);
    expect(sizes).toContain('192x192');
    expect(sizes).toContain('512x512');
  });

  it('keeps the light theme AGENTS.md mandates', () => {
    expect(manifest.theme_color).toBe('#ffffff');
    expect(manifest.background_color).toBe('#ffffff');
  });

  it('points every shortcut at a route the service worker precaches', () => {
    for (const s of manifest.shortcuts) {
      expect(s.name).toBeTruthy();
      expect(sw).toContain(`'${s.url}'`);
    }
  });
});

describe('service worker', () => {
  it('takes its cache version from a build-time stamp so old caches evict', () => {
    // A hardcoded 'gi-v1' never changes, so stale assets accumulate forever.
    expect(sw).toMatch(/__BUILD_VERSION__/);
    expect(sw).not.toMatch(/const VERSION = 'gi-v1'/);
  });

  it('precaches every timer route', () => {
    for (const route of [
      '/',
      '/interval',
      '/timer',
      '/stopwatch',
      '/tabata',
      '/emom',
      '/pomodoro',
    ]) {
      expect(sw).toContain(`'${route}'`);
    }
  });

  it('precaches the fonts the digits depend on', () => {
    expect(sw).toContain('/fonts/bricolage-latin.woff2');
    expect(sw).toContain('/fonts/jetbrains-mono-latin.woff2');
  });

  it('ignores non-GET and cross-origin requests', () => {
    expect(sw).toContain("req.method !== 'GET'");
    expect(sw).toContain('url.origin !== self.location.origin');
  });
});
