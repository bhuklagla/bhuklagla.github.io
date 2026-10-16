import assert from 'node:assert/strict';

// Read-only public checks. Does not submit forms, change profiles or advance dates.
const origin = 'https://bhuklagla.github.io';
async function get(path) {
  const expected = new URL(path, origin);
  assert.equal(expected.origin, origin);
  let response;
  for (let attempt = 0; attempt < 2; attempt++) {
    response = await fetch(expected, { signal: AbortSignal.timeout(20000) });
    if (response.ok || response.status < 500) break;
  }
  assert.equal(response.status, 200, `${expected.pathname}: HTTP ${response.status}`);
  assert.equal(new URL(response.url).origin, origin, 'No unexpected host redirect');
  return response.text();
}
const index = await get('/sitemap.xml');
const sitemapPaths = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(sitemapPaths.length > 0, 'Sitemap index has entries');
const pages = [];
for (const sitemap of sitemapPaths) {
  const xml = await get(sitemap);
  pages.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
}
assert.ok(pages.length >= 45, 'Expected public content is discoverable');
for (const page of pages) {
  const html = await get(page);
  assert.ok(html.includes(`rel="canonical" href="${page}"`), `Canonical: ${page}`);
  assert.doesNotMatch(html, /content="noindex/);
  assert.doesNotMatch(html, /Bhuk\s+Lagla\s+Kitchen|Bhul\s+Lagla\s+Kitchen/i);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Main heading: ${page}`);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length > 0, `Structured data: ${page}`);
  for (const script of scripts) JSON.parse(script[1]);
}
const robots = await get('/robots.txt');
assert.match(robots, /User-agent: \*\s+Allow: \/\s/);
assert.ok(robots.includes(`${origin}/sitemap.xml`));
for (const path of ['/answers/', '/choose/', '/content-standards/']) {
  assert.ok(pages.includes(`${origin}${path}`), `New guide in sitemap: ${path}`);
}
const result = {
  checkedAt: new Date().toISOString(),
  origin,
  publicPagesChecked: pages.length,
  result: 'passed',
  scope:
    'HTTP, canonical, noindex, brand name, headings, JSON-LD and sitemap discovery; not ranking or AI citation verification',
};
console.log(JSON.stringify(result, null, 2));
