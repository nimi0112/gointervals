// Renders the favicon SVG to the PNG sizes the manifest and iOS need. Run once: node scripts/gen-icons.mjs
import { Resvg } from '@resvg/resvg-js';
import { writeFile, readFile } from 'node:fs/promises';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const out = [
  ['public/icons/icon-192.png', 192],
  ['public/icons/icon-512.png', 512],
  ['public/icons/apple-touch-icon.png', 180],
  ['public/favicon-32.png', 32],
];
for (const [file, size] of out) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  await writeFile(new URL(`../${file}`, import.meta.url), png);
  console.log('wrote', file);
}
