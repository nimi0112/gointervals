// Stamps the built service worker with a per-build cache version, so a deploy
// invalidates the old cache instead of serving assets from it forever.
// Runs after `astro build` against dist/, never against public/.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const file = join(process.cwd(), 'dist', 'sw.js');
const src = await readFile(file, 'utf8');

if (!src.includes('__BUILD_VERSION__')) {
  console.error('stamp-sw: no __BUILD_VERSION__ placeholder in dist/sw.js');
  process.exit(1);
}

// Hash the worker body itself so an unchanged worker keeps its cache across rebuilds.
const hash = createHash('sha256').update(src).digest('hex').slice(0, 12);
await writeFile(file, src.replaceAll('__BUILD_VERSION__', `gi-${hash}`));
console.log(`stamp-sw: dist/sw.js -> gi-${hash}`);
