// Fails CI if any built page is missing SEO essentials or links to a page that does not exist.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = join(process.cwd(), 'dist');
const problems = [];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const known = new Set(files.map((f) => '/' + relative(DIST, f).replace(/\\/g, '/')));

function resolves(href) {
  const path = href.split('#')[0].split('?')[0];
  if (!path || path === '/') return known.has('/index.html');
  const clean = path.replace(/\/$/, '');
  return (
    known.has(clean) ||
    known.has(clean + '.html') ||
    known.has(clean + '/index.html') ||
    known.has(clean.replace(/\.html$/, '') + '.html')
  );
}

for (const file of html) {
  const rel = '/' + relative(DIST, file).replace(/\\/g, '/');
  const doc = parse(await readFile(file, 'utf8'));
  const need = (sel, label) => {
    if (!doc.querySelector(sel)) problems.push(`${rel}: missing ${label}`);
  };
  need('title', '<title>');
  need('meta[name="description"]', 'meta description');
  need('link[rel="canonical"]', 'canonical');
  need('script[type="application/ld+json"]', 'JSON-LD');
  need('meta[property="og:image"]', 'og:image');
  need('h1', '<h1>');
  const title = doc.querySelector('title')?.text ?? '';
  if (title.length > 70) problems.push(`${rel}: title is ${title.length} chars: "${title}"`);
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (desc.length < 50 || desc.length > 160)
    problems.push(`${rel}: description is ${desc.length} chars`);
  if (doc.querySelectorAll('h1').length !== 1) problems.push(`${rel}: expected exactly one h1`);
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      JSON.parse(s.text);
    } catch {
      problems.push(`${rel}: invalid JSON-LD`);
    }
  }
  const og = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
  const ogPath = og.replace(/^https?:\/\/[^/]+/, '');
  if (ogPath && !known.has(ogPath)) problems.push(`${rel}: og:image ${ogPath} not built`);
  for (const a of doc.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('/')) continue;
    if (!resolves(href)) problems.push(`${rel}: dead link ${href}`);
  }
  for (const img of doc.querySelectorAll('img')) {
    if (!img.getAttribute('width') || !img.getAttribute('height'))
      problems.push(`${rel}: <img> without dimensions`);
  }
}

for (const f of [
  'robots.txt',
  'llms.txt',
  'humans.txt',
  'sitemap-index.xml',
  'manifest.webmanifest',
  'sw.js',
  '_headers',
  '404.html',
  'rss.xml',
]) {
  try {
    await stat(join(DIST, f));
  } catch {
    problems.push(`missing dist/${f}`);
  }
}

if (problems.length) {
  console.error(
    `check-build: ${problems.length} problem(s)\n` + problems.map((p) => '  - ' + p).join('\n'),
  );
  process.exit(1);
}
console.log(`check-build: ${html.length} pages OK, ${known.size} files, no dead links`);
