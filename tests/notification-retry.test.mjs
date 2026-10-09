import test from 'node:test';
import assert from 'node:assert/strict';
import { createDatabase } from '../backend/sqlite.mjs';
import { deliverNotification, retryNotifications } from '../backend/notifications.mjs';

test('Failed delivery stays queued and a scheduled retry records provider acceptance', async () => {
  const DB = createDatabase();
  const env = { DB, NTFY_TOPIC: 'test-topic' };
  try {
    await DB.prepare(
      'INSERT INTO notification_outbox (id,title,body,created_at,next_attempt_at) VALUES (?,?,?,?,?)',
    )
      .bind('test', 'Setup', 'Anonymous journey', Date.now(), 0)
      .run();
    await deliverNotification('test', env, async () => new Response('timeout', { status: 522 }));
    let row = await DB.prepare('SELECT * FROM notification_outbox WHERE id=?').bind('test').first();
    assert.equal(row.delivered_at, null);
    assert.equal(row.last_status, 522);
    assert.equal(row.attempts, 1);
    assert.ok(row.next_attempt_at > Date.now());
    await DB.prepare('UPDATE notification_outbox SET next_attempt_at=0 WHERE id=?')
      .bind('test')
      .run();
    let publishes = 0;
    await retryNotifications(env, async () => {
      publishes++;
      return new Response('accepted');
    });
    row = await DB.prepare('SELECT * FROM notification_outbox WHERE id=?').bind('test').first();
    assert.equal(publishes, 1);
    assert.ok(row.delivered_at > 0);
    assert.equal(row.attempts, 2);
    await retryNotifications(env, async () => {
      throw new Error('Already delivered');
    });
  } finally {
    DB.close();
  }
});

test('Concurrent send attempts lease a queued alert once', async () => {
  const DB = createDatabase();
  try {
    await DB.prepare(
      'INSERT INTO notification_outbox (id,title,body,created_at,next_attempt_at) VALUES (?,?,?,?,?)',
    )
      .bind('test', 'Setup', 'Anonymous journey', Date.now(), 0)
      .run();
    let publishes = 0;
    const publish = async (url, options) => {
      assert.equal(url, 'https://ntfy.sh/');
      assert.deepEqual(JSON.parse(options.body), {
        topic: 'test-topic',
        title: 'Setup',
        message: 'Anonymous journey',
      });
      publishes++;
      return new Response('accepted');
    };
    await Promise.all(
      [1, 2].map(() => deliverNotification('test', { DB, NTFY_TOPIC: 'test-topic' }, publish)),
    );
    assert.equal(publishes, 1);
  } finally {
    DB.close();
  }
});
