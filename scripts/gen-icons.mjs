// Renders the favicon SVG to the PNG sizes the manifest and iOS need. Run once: node scripts/gen-icons.mjs
import { Resvg } from '@resvg/resvg-js';
import { writeFile, readFile } from 'node:fs/promises';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');

/**
 * Adaptive launchers crop a maskable icon to a circle, keeping only the middle
 * ~80%. The plain mark touches its own edges, so the maskable one gets the art
 * scaled into the safe zone on a full-bleed square background.
 */
const SAFE = 0.72;
const inner = svg
  .trim()
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  // Drop the rounded background plate; the maskable version is full-bleed.
  .replace(/<rect[^>]*\/>/, '');
const offset = (64 - 64 * SAFE) / 2;
const maskableSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
  `<rect width="64" height="64" fill="#F7F8F5"/>` +
  `<g transform="translate(${offset} ${offset}) scale(${SAFE})">${inner}</g>` +
  `</svg>`;

const out = [
  [svg, 'public/icons/icon-192.png', 192],
  [svg, 'public/icons/icon-512.png', 512],
  [maskableSvg, 'public/icons/icon-maskable-512.png', 512],
  [svg, 'public/icons/apple-touch-icon.png', 180],
  [svg, 'public/favicon-32.png', 32],
];
for (const [source, file, size] of out) {
  const png = new Resvg(source, { fitTo: { mode: 'width', value: size } }).render().asPng();
  await writeFile(new URL(`../${file}`, import.meta.url), png);
  console.log('wrote', file);
}
