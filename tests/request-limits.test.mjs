import test from 'node:test';
import assert from 'node:assert/strict';
import { createDatabase } from '../backend/sqlite.mjs';
import { handleRequest } from '../backend/handler.mjs';

test('Chunked oversized UTF-8 payload is cancelled before any database mutation', async () => {
  let cancelled = false;
  const body = new ReadableStream({
    pull(controller) {
      controller.enqueue(new TextEncoder().encode('🍕'.repeat(200)));
    },
    cancel() {
      cancelled = true;
    },
  });
  const request = new Request('https://service.example/events', {
    method: 'POST',
    duplex: 'half',
    body,
    headers: { Origin: 'https://kitchen.example', 'Content-Type': 'application/json' },
  });
  const DB = createDatabase();
  try {
    const response = await handleRequest(request, {
      DB,
      ALLOWED_ORIGINS: 'https://kitchen.example',
    });
    assert.equal(response.status, 413);
    assert.equal(cancelled, true);
    for (const table of ['events', 'rate_limits'])
      assert.equal((await DB.prepare(`SELECT COUNT(*) AS count FROM ${table}`).first()).count, 0);
  } finally {
    DB.close();
  }
});

test('Retention queries use timestamp indexes rather than scanning all stored visits', async () => {
  const DB = createDatabase();
  try {
    for (const [table, column, index] of [
      ['events', 'created_at', 'events_created'],
      ['rate_limits', 'updated_at', 'rate_limits_updated'],
    ]) {
      const plan = await DB.prepare(`EXPLAIN QUERY PLAN DELETE FROM ${table} WHERE ${column} < ?`)
        .bind(0)
        .all();
      assert.ok(plan.results.some((row) => row.detail.includes(`USING INDEX ${index}`)));
      assert.ok(plan.results.every((row) => !row.detail.startsWith('SCAN ')));
    }
  } finally {
    DB.close();
  }
});
