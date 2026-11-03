import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import { allRoutes } from '../src/data/content';
const origin = 'https://freelance.tracht-digital.de';
const routes = allRoutes();
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const titles = new Set<string>();
for (const route of routes) {
  const html = await readFile(join('dist', route.path, 'index.html'), 'utf8');
  const $ = load(html);
  assert.equal($('html').attr('lang'), route.lang);
  assert.equal($('h1').length, 1, route.path);
  assert.ok(
    $('main').text().trim().length > 150,
    `No static content: ${route.path}`,
  );
  const title = $('title').text();
  assert.ok(!titles.has(title), `Duplicate title: ${title}`);
  titles.add(title);
  assert.ok(($('meta[name=description]').attr('content') ?? '').length > 40);
  assert.equal($('link[rel=canonical]').attr('href'), origin + route.path);
  assert.equal($('link[hreflang]').length, 3);
  assert.ok(sitemap.includes(origin + route.path));
  for (const node of $('script[type="application/ld+json"]').toArray())
    JSON.parse($(node).text());
  for (const node of $('a[href],img[src],link[rel=stylesheet]').toArray()) {
    const href = $(node).attr('href') ?? $(node).attr('src')!;
    assert.ok(!href.toLowerCase().includes('.pdf'), `PDF exposed: ${href}`);
    if (href.startsWith('/') && !href.startsWith('//')) {
      const path = href.split('#')[0].split('?')[0];
      if (!path) continue;
      const target = join('dist', path);
      assert.ok(
        await stat(target).catch(() => false),
        `Broken resource: ${route.path} → ${path}`,
      );
    }
  }
}
async function files(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
      ),
    )
  ).flat();
}
let js = 0,
  css = 0;
for (const file of await files('dist')) {
  assert.ok(!/\.pdf$/i.test(file));
  const size = (await stat(file)).size;
  if (file.endsWith('.js')) js += size;
  if (file.endsWith('.css')) css += size;
  assert.ok(size < 1_200_000, `Oversized file: ${file}`);
}
assert.ok(js < 100_000, `JS budget exceeded: ${js}`);
assert.ok(css < 150_000, `CSS budget exceeded: ${css}`);
assert.ok(
  (await files('dist')).some((f) => f.endsWith('.woff2')),
  'Local fonts missing',
);
assert.ok(await stat('dist/images/og-de.png'));
assert.ok(await stat('dist/images/og-en.png'));
console.log(
  `Verified ${routes.length} static routes, metadata, language pairs, internal assets and PDF exclusion. JS: ${js} bytes; CSS: ${css} bytes.`,
);
