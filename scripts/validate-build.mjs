import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const root = path.resolve('dist');
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const file = path.join(dir, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
const files = walk(root);
const verificationFiles = new Set(
  files.filter(
    (file) => path.dirname(file) === root && /^google[0-9a-f]+\.html$/.test(path.basename(file)),
  ),
);
for (const file of verificationFiles) {
  assert.equal(
    readFileSync(file, 'utf8').trim(),
    `google-site-verification: ${path.basename(file)}`,
    `Exact Google verification response: ${file}`,
  );
}
const html = files.filter((file) => file.endsWith('.html') && !verificationFiles.has(file));
const articleCount = readdirSync('src/content/blog').filter((name) => name.endsWith('.md')).length;
const menuCount = JSON.parse(readFileSync('src/data/menu.json', 'utf8')).filter(
  (item) => item.visible,
).length;
const expectedPages = 19 + menuCount + articleCount;
assert.equal(
  html.length,
  expectedPages,
  `Expected ${expectedPages} complete public and utility pages: ${html.length}`,
);
const base = (process.env.PUBLIC_BASE_PATH || '/').replace(/\/$/, '');
const resolveLink = (href, file) => {
  const address = new URL(
    href,
    `https://test.invalid${base}/${path.relative(root, file).replaceAll('\\', '/')}`,
  );
  let name = decodeURIComponent(address.pathname);
  if (base) {
    assert.ok(name.startsWith(`${base}/`), `Link leaves base: ${href}`);
    name = name.slice(base.length);
  }
  const local = path.join(root, name);
  assert.ok(
    existsSync(local) || existsSync(path.join(local, 'index.html')),
    `${path.relative(root, file)} → missing ${href}`,
  );
  if (address.hash.length > 1) {
    const target = statSync(local).isDirectory() ? path.join(local, 'index.html') : local;
    const id = decodeURIComponent(address.hash.slice(1));
    assert.ok(
      readFileSync(target, 'utf8').includes(`id="${id}"`),
      `Missing linked heading ${href} in ${file}`,
    );
  }
};
for (const file of html) {
  const content = readFileSync(file, 'utf8');
  assert.doesNotMatch(
    content,
    /₹|\b(?:current_price|stock_recipe|NTFY_TOPIC|ADMIN_TOKEN|RATE_LIMIT_SALT)\b/,
  );
  assert.doesNotMatch(content, /bhuk-lagla-kitchen-[0-9a-f]{32}/);
  assert.doesNotMatch(content, /Bhuk\s+Lagla\s+Kitchen|Bhul\s+Lagla\s+Kitchen/i);
  for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(link)) continue;
    resolveLink(link, file);
  }
  const schemas = [];
  for (const match of content.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    schemas.push(JSON.parse(match[1]));
  const graph = schemas.flatMap((schema) => schema['@graph'] || [schema]);
  for (const node of graph) {
    assert.notEqual(node['@type'], 'FAQPage', 'No retired Google FAQ rich-result claim');
    if (node.dateModified) {
      assert.ok(
        node.datePublished && new Date(node.dateModified) >= new Date(node.datePublished),
        `Honest article chronology: ${file}`,
      );
      // A date-only edit stamp is a calendar day in the kitchen's publishing timezone.
      const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date());
      assert.ok(
        /^\d{4}-\d{2}-\d{2}$/.test(node.dateModified)
          ? node.dateModified <= today
          : new Date(node.dateModified) <= new Date(),
        `No future update date: ${file}`,
      );
    }
  }
  if (!content.includes('content="noindex, follow"')) {
    assert.ok(
      content.includes('AI-generated menu illustration'),
      `Visible image provenance: ${file}`,
    );
  }
}
const catalogue = JSON.parse(readFileSync('src/data/menu.json', 'utf8')).filter(
  (item) => item.visible,
);
const menuHtml = readFileSync(path.join(root, 'menu/index.html'), 'utf8');
const menuSchemas = [
  ...menuHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
].map((match) => JSON.parse(match[1]));
const menuSchema = menuSchemas.find((schema) => schema['@type'] === 'Menu');
const schemaItems = menuSchema.hasMenuSection.flatMap((section) => section.hasMenuItem);
assert.equal(schemaItems.length, catalogue.length, 'Complete menu graph');
assert.equal(
  new Set(schemaItems.map((item) => item['@id'])).size,
  catalogue.length,
  'Unique menu entity IDs',
);
for (const item of catalogue) {
  const structured = schemaItems.find((node) => node.name === item.name);
  assert.equal(
    structured?.description,
    item.description,
    `Schema matches the actual menu: ${item.id}`,
  );
  assert.ok(structured?.['@id']?.endsWith(`/menu/${item.id}/#menu-item`));
  const detail = readFileSync(path.join(root, `menu/${item.id}/index.html`), 'utf8');
  assert.ok(
    detail.includes(`"@id":"${structured['@id']}"`),
    `Same entity on item and menu pages: ${item.id}`,
  );
}
for (const route of ['answers', 'choose', 'content-standards']) {
  assert.ok(existsSync(path.join(root, route, 'index.html')), `Answer foundation route: ${route}`);
}
const manifest = JSON.parse(readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
if (process.env.PUBLIC_SITE_URL) {
  const titles = new Set();
  const sitemap = readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
  const imageSitemap = readFileSync(path.join(root, 'sitemap-images.xml'), 'utf8');
  let indexed = 0;
  for (const file of html) {
    const content = readFileSync(file, 'utf8');
    assert.equal((content.match(/<h1(?:\s|>)/g) || []).length, 1, `One main heading: ${file}`);
    const title = content.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title && !titles.has(title), `Unique title: ${file}`);
    titles.add(title);
    const canonical = content.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(
      canonical?.startsWith(`${process.env.PUBLIC_SITE_URL}${base}/`),
      `Production canonical: ${file}`,
    );
    assert.ok(
      content.includes('property="og:image"') && content.includes('name="description"'),
      `Sharing and description: ${file}`,
    );
    const indexedPage = !content.includes('content="noindex, follow"');
    if (indexedPage) {
      indexed++;
      assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `Indexed page in sitemap: ${file}`);
      assert.ok(content.includes('"@type":"BreadcrumbList"'), `Breadcrumb schema: ${file}`);
    } else assert.ok(!sitemap.includes(`<loc>${canonical}</loc>`), `Utility excluded: ${file}`);
    assert.doesNotMatch(content, /"@type":"(?:Event|AggregateRating|Offer)"/);
  }
  assert.equal((imageSitemap.match(/<image:image>/g) || []).length, menuCount);
  assert.equal((sitemap.match(/<loc>/g) || []).length, indexed);
  assert.equal(
    (readFileSync(path.join(root, 'feed.xml'), 'utf8').match(/<item>/g) || []).length,
    articleCount,
  );
  console.log(
    `SEO verified: ${indexed} indexable canonical pages, utility exclusions, unique titles, breadcrumbs, ${menuCount} image entries and ${articleCount} RSS articles.`,
  );
}
assert.equal(manifest.display, 'standalone');
manifest.icons.forEach((icon) => resolveLink(icon.src, path.join(root, 'index.html')));
console.log(
  `Build verified: ${html.length} pages, ${verificationFiles.size} Google verification files, local links/assets, structured data, manifest and public-content boundaries.`,
);
