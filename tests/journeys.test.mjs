import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createDatabase } from '../backend/sqlite.mjs';
import { handleRequest, validateEvent } from '../backend/handler.mjs';
const event = (extra = {}) => ({
  id: randomUUID(),
  session: randomUUID(),
  type: 'page_view',
  route: '/',
  detail: '',
  device: 'mobile',
  ...extra,
});
const request = (body, origin = 'https://kitchen.example') =>
  new Request('https://service.example/events', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
test('Reject private fields, typed searches, invalid routes and malformed identifiers', () => {
  for (const change of [
    { email: 'someone@example.com' },
    { phone: '0000000000' },
    { route: '/menu/?q=personal' },
    { detail: 'someone@example.com' },
    { session: 'not-a-session' },
    { type: 'order_completed' },
  ])
    assert.throws(() => validateEvent(event(change)));
});
test('Consent event endpoint rejects unrelated origins and stores idempotently', async () => {
  const DB = createDatabase();
  const env = { DB, ALLOWED_ORIGINS: 'https://kitchen.example', RATE_LIMIT_SALT: 'test-salt' };
  const body = event();
  assert.equal((await handleRequest(request(body, 'https://unrelated.example'), env)).status, 403);
  assert.equal((await handleRequest(request(body), env)).status, 202);
  const repeat = await handleRequest(request(body), env);
  assert.equal((await repeat.json()).duplicate, true);
  assert.equal((await DB.prepare('SELECT COUNT(*) AS count FROM events').first()).count, 1);
  DB.close();
});
test('Handoff notifications describe unknown orders and contain only anonymous journeys', async () => {
  const DB = createDatabase();
  const env = {
    DB,
    ALLOWED_ORIGINS: 'https://kitchen.example',
    RATE_LIMIT_SALT: 'test-salt',
    NTFY_TOPIC: 'test-topic',
  };
  const session = randomUUID();
  await handleRequest(request(event({ session })), env);
  const notifications = [];
  const pending = [];
  const body = event({
    session,
    type: 'zomato_handoff',
    route: '/menu/paneer-chataka-pizza/',
    detail: 'paneer-chataka-pizza',
  });
  await handleRequest(
    request(body),
    env,
    { waitUntil: (task) => pending.push(task) },
    async (_url, options) => {
      notifications.push(options.body);
      return new Response('ok');
    },
  );
  await Promise.all(pending);
  assert.equal(notifications.length, 1);
  assert.match(notifications[0], /Completed order unknown/);
  assert.match(notifications[0], /page_view/);
  assert.doesNotMatch(notifications[0], /@|phone|email:/);
  DB.close();
});
test('Insights require an owner token and remove old events', async () => {
  const DB = createDatabase();
  const env = {
    DB,
    ALLOWED_ORIGINS: 'https://kitchen.example',
    ADMIN_TOKEN: 'owner-test',
    RATE_LIMIT_SALT: 'test-salt',
  };
  await handleRequest(request(event()), env);
  const make = (token) =>
    new Request('https://service.example/insights', {
      headers: { Origin: 'https://kitchen.example', Authorization: `Bearer ${token}` },
    });
  assert.equal((await handleRequest(make('wrong'), env)).status, 401);
  const data = await (await handleRequest(make('owner-test'), env)).json();
  assert.equal(data.zomatoOrders, 'unknown');
  assert.equal(data.enquiryVerification, 'browser-reported');
  assert.equal(data.events.length, 1);
  DB.close();
});
