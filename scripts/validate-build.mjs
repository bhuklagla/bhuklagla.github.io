import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const file = path.join(dir, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
const files = walk(root);
const html = files.filter((file) => file.endsWith('.html'));
assert.equal(html.length, 41, `Expected 41 complete public and utility pages: ${html.length}`);
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
};
for (const file of html) {
  const content = readFileSync(file, 'utf8');
  assert.doesNotMatch(
    content,
    /₹|\b(?:current_price|stock_recipe|NTFY_TOPIC|ADMIN_TOKEN|RATE_LIMIT_SALT)\b/,
  );
  assert.doesNotMatch(content, /bhuk-lagla-kitchen-[0-9a-f]{32}/);
  for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = match[1];
    if (/^(?:https?:|mailto:|#|data:)/.test(link)) continue;
    resolveLink(link, file);
  }
  for (const match of content.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(match[1]);
}
const manifest = JSON.parse(readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
assert.equal(manifest.display, 'standalone');
manifest.icons.forEach((icon) => resolveLink(icon.src, path.join(root, 'index.html')));
console.log(
  `Build verified: ${html.length} pages, local links/assets, structured data, manifest and public-content boundaries.`,
);
