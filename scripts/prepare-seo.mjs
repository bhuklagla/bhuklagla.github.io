import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import menu from '../src/data/menu.json' with { type: 'json' };
if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const site = process.env.PUBLIC_SITE_URL;
if (site) {
  const base = (process.env.PUBLIC_BASE_PATH || '/').replace(/\/$/, '');
  const address = (path) => new URL(`${base}/${path}`, site).href;
  const escape = (text) =>
    text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  writeFileSync('dist/sitemap.xml', readFileSync('dist/sitemap-index.xml'));
  const entries = menu
    .filter((item) => item.visible)
    .map(
      (item) =>
        `<url><loc>${escape(address(`menu/${item.id}/`))}</loc><image:image><image:loc>${escape(address(`images/menu/${item.id}-960.webp`))}</image:loc></image:image></url>`,
    )
    .join('');
  writeFileSync(
    'dist/sitemap-images.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`,
  );
  writeFileSync('dist/.nojekyll', '');
  console.log(
    'Prepared canonical XML sitemap alias, 23-dish image sitemap and GitHub Pages artifact.',
  );
}
