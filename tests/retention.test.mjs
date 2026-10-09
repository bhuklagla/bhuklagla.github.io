import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createDatabase } from '../backend/sqlite.mjs';
import { handleRequest } from '../backend/handler.mjs';
test('Owner reports exclude events older than the retention period', async () => {
  const DB = createDatabase();
  await DB.prepare(
    'INSERT INTO events (id,session,type,route,detail,device,created_at) VALUES (?,?,?,?,?,?,?)',
  )
    .bind(randomUUID(), randomUUID(), 'page_view', '/', '', 'mobile', Date.now() - 31 * 86400000)
    .run();
  const request = new Request('https://service.example/insights', {
    headers: { Origin: 'https://kitchen.example', Authorization: 'Bearer owner-test' },
  });
  const response = await handleRequest(request, {
    DB,
    ALLOWED_ORIGINS: 'https://kitchen.example',
    ADMIN_TOKEN: 'owner-test',
  });
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).events, []);
  assert.equal((await DB.prepare('SELECT COUNT(*) AS count FROM events').first()).count, 0);
  DB.close();
});
