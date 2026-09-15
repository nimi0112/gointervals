import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE } from './site';

let fonts: { medium: ArrayBuffer; semi: ArrayBuffer; digits: ArrayBuffer } | null = null;

const buf = (b: Buffer): ArrayBuffer => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);

async function loadFonts() {
  if (fonts) return fonts;
  const dir = join(process.cwd(), 'src/assets/fonts');
  const [medium, semi, digits] = await Promise.all([
    readFile(join(dir, 'DMSans-Medium.ttf')),
    readFile(join(dir, 'DMSans-SemiBold.ttf')),
    readFile(join(dir, 'AzeretMono-Medium.ttf')),
  ]);
  fonts = { medium: buf(medium), semi: buf(semi), digits: buf(digits) };
  return fonts;
}

const PAPER = '#F7F8F5';
const INK = '#202722';
const MUTED = '#58615A';

/**
 * 1200x630 PNG in the social card layout (canvas r5UgD3): wordmark top-left, title and
 * kicker on the left, a clock reading on the right, domain line at the bottom.
 */
export async function renderOg(title: string, kicker: string, clock = '00:40'): Promise<Uint8Array> {
  const f = await loadFonts();
  const size = title.length > 48 ? 52 : title.length > 28 ? 64 : 76;
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 56px 52px',
          background: PAPER,
          color: INK,
          fontFamily: 'DM Sans',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: '26px', color: SITE.accent, fontWeight: 500 },
              children: 'gointervals',
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '640px' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: `${size}px`, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em' },
                          children: title,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: '26px', lineHeight: 1.35, color: MUTED, maxWidth: '520px' },
                          children: kicker,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', flexShrink: 0 },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { fontFamily: 'Azeret Mono', fontSize: '112px', fontWeight: 500, letterSpacing: '-0.02em' },
                          children: clock,
                        },
                      },
                      { type: 'div', props: { style: { fontSize: '20px', color: MUTED }, children: 'Your pace. Your time.' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '12px', fontSize: '20px', color: MUTED },
              children: [
                { type: 'div', props: { style: { color: INK }, children: SITE.domain } },
                { type: 'div', props: { children: '·  Free. Open source. No account.' } },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'DM Sans', data: f.medium, weight: 500, style: 'normal' },
        { name: 'DM Sans', data: f.semi, weight: 600, style: 'normal' },
        { name: 'Azeret Mono', data: f.digits, weight: 500, style: 'normal' },
      ],
    },
  );
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
