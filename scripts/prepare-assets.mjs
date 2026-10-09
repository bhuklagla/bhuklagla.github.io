import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const repo = process.cwd();
const workspace = process.env.BHUK_ASSET_ROOT || path.resolve(repo, '..');
const catalogue = JSON.parse(
  fs.readFileSync(path.join(workspace, 'outputs/2026-10-07-menu-images-v2/menu.json'), 'utf8'),
);
const photoRoot = path.join(workspace, 'Zomato/Menu Images v2 - Natural Serving Angle');
const brandRoot = path.join(workspace, 'Bhuk-Lagla-Kitchen/approved-a-v1');
const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const categoryMap = (name) =>
  /sandwich/i.test(name)
    ? 'sandwiches'
    : /snack|side/i.test(name)
      ? 'snacks'
      : /pizza/i.test(name)
        ? 'pizza'
        : /maggi/i.test(name)
          ? 'maggi'
          : 'pasta';
const findPhoto = (name) => {
  for (const dir of fs.readdirSync(photoRoot)) {
    const file = path.join(photoRoot, dir, `${name}.png`);
    if (fs.existsSync(file)) return file;
  }
  throw new Error(`Missing approved image: ${name}`);
};
fs.mkdirSync(path.join(repo, 'src/data'), { recursive: true });
fs.mkdirSync(path.join(repo, 'public/images/menu'), { recursive: true });
fs.mkdirSync(path.join(repo, 'public/brand'), { recursive: true });
fs.mkdirSync(path.join(repo, 'public/icons'), { recursive: true });
const items = [],
  manifest = [];
for (const row of catalogue) {
  const name = row['Item Name'],
    id = slug(name),
    source = findPhoto(name),
    sourceHash = hash(source);
  const category = categoryMap(row.Category);
  const description = String(row.Description || '').trim();
  if (!name || !description) throw new Error('Incomplete public menu description');
  for (const width of [320, 640, 960]) {
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 83 })
      .toFile(path.join(repo, `public/images/menu/${id}-${width}.webp`));
  }
  if (hash(source) !== sourceHash) throw new Error('Original image changed');
  items.push({
    id,
    name,
    category,
    description,
    image: `/images/menu/${id}-640.webp`,
    availability: 'check-zomato',
    visible: true,
    featured: [
      'Paneer Chataka Pizza',
      'Corn Cream Grilled Sandwich',
      'Classic Masala Maggi',
      'Peri Peri Fries',
    ].includes(name),
    method:
      category === 'pizza' || category === 'snacks'
        ? 'Air-fryer cooked'
        : category === 'sandwiches'
          ? 'Grilled'
          : null,
  });
  manifest.push({
    id,
    source: path.relative(workspace, source).replaceAll('\\', '/'),
    sha256: sourceHash,
  });
}
for (const [file, output, width] of [
  ['logos/transparent-light/bhuk-lagla-kitchen_light_600w.png', 'logo.webp', 420],
  ['logos/mascot-only/bhuk-lagla-kitchen_logo_mascot-only_1200w_v1.png', 'mascot.webp', 840],
])
  await sharp(path.join(brandRoot, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 94 })
    .toFile(path.join(repo, 'public/brand', output));
fs.copyFileSync(
  path.join(brandRoot, 'icons/favicon/bhuk-lagla-kitchen_favicon_v1.ico'),
  path.join(repo, 'public/favicon.ico'),
);
for (const size of [32, 64])
  fs.copyFileSync(
    path.join(brandRoot, `icons/favicon/bhuk-lagla-kitchen_favicon_${size}x${size}_v1.png`),
    path.join(repo, `public/icons/favicon-${size}.png`),
  );
for (const size of [180, 192, 512])
  fs.copyFileSync(
    path.join(brandRoot, `icons/bhuk-lagla-kitchen_face-charcoal_${size}x${size}_v1.png`),
    path.join(repo, `public/icons/icon-${size}.png`),
  );
fs.writeFileSync(path.join(repo, 'src/data/menu.json'), JSON.stringify(items, null, 2) + '\n');
fs.writeFileSync(
  path.join(repo, 'docs/ASSET_SOURCES.json'),
  JSON.stringify(
    {
      originalsPreserved: true,
      photoCollection: 'Menu Images v2 - Natural Serving Angle',
      items: manifest,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `Prepared ${items.length} public menu items and responsive photos; original files unchanged.`,
);
