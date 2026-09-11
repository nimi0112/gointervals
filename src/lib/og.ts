import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE } from './site';

let fonts: { sans: ArrayBuffer; mono: ArrayBuffer } | null = null;

async function loadFonts() {
  if (fonts) return fonts;
  const [sans, mono] = await Promise.all([
    readFile(join(process.cwd(), 'src/assets/fonts/BricolageGrotesque.ttf')),
    readFile(join(process.cwd(), 'src/assets/fonts/JetBrainsMono.ttf')),
  ]);
  fonts = {
    sans: sans.buffer.slice(sans.byteOffset, sans.byteOffset + sans.byteLength),
    mono: mono.buffer.slice(mono.byteOffset, mono.byteOffset + mono.byteLength),
  };
  return fonts;
}

/** 1200x630 PNG: title in the display face, accent rule, domain in mono. */
export async function renderOg(title: string, kicker: string): Promise<Uint8Array> {
  const f = await loadFonts();
  const size = title.length > 48 ? 64 : title.length > 30 ? 80 : 96;
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
          padding: '72px 80px',
          background: '#ffffff',
          color: '#0a0a0a',
          fontFamily: 'Bricolage',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontFamily: 'JetBrains Mono',
                fontSize: '26px',
                color: '#525252',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '16px',
                      height: '16px',
                      borderRadius: '8px',
                      background: SITE.accent,
                    },
                  },
                },
                { type: 'div', props: { children: kicker } },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: `${size}px`,
                      fontWeight: 700,
                      lineHeight: 1.02,
                      letterSpacing: '-0.03em',
                      maxWidth: '1040px',
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '120px',
                      height: '8px',
                      background: SITE.accent,
                      marginTop: '36px',
                    },
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'JetBrains Mono',
                fontSize: '28px',
                color: '#0a0a0a',
              },
              children: [
                { type: 'div', props: { children: SITE.domain } },
                {
                  type: 'div',
                  props: { style: { color: '#6a6a6a' }, children: 'free · no login · offline' },
                },
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
        { name: 'Bricolage', data: f.sans, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: f.mono, weight: 500, style: 'normal' },
      ],
    },
  );
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return png;
}
