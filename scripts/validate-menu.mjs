import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const menu = JSON.parse(readFileSync('src/data/menu.json', 'utf8'));
const fields = [
  'id',
  'name',
  'category',
  'description',
  'image',
  'availability',
  'visible',
  'featured',
  'method',
].sort();
assert.equal(menu.length, 23, 'Expected the approved 23-item catalogue');
assert.equal(new Set(menu.map((item) => item.id)).size, 23, 'Dish IDs must be unique');
for (const item of menu) {
  assert.deepEqual(Object.keys(item).sort(), fields);
  assert.match(item.id, /^[a-z0-9-]+$/);
  assert.ok(['pizza', 'sandwiches', 'snacks', 'maggi', 'pasta'].includes(item.category));
  assert.equal(item.availability, 'check-zomato');
  assert.doesNotMatch(item.description, /₹|\b(?:rs\.?|inr|recipe|preheat|supplier|costing)\b/i);
  for (const size of [320, 640, 960])
    assert.ok(
      existsSync(`public/images/menu/${item.id}-${size}.webp`),
      `Missing photo: ${item.id}`,
    );
}
console.log('Menu verified: 23 unique dishes, approved fields and 69 responsive photos.');
