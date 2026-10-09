import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createDatabase } from '../backend/sqlite.mjs';
import { handleRequest, validateEvent } from '../backend/handler.mjs';

test('Contact intent produces one anonymous notification; browsing/form activity is stored silently', async () => {
  const DB = createDatabase();
  const env = {
    DB,
    ALLOWED_ORIGINS: 'https://kitchen.example',
    RATE_LIMIT_SALT: 'test-salt',
    NTFY_TOPIC: 'test-topic',
  };
  const session = randomUUID();
  const published = [],
    pending = [];
  const send = async (type, detail, route) => {
    const body = { id: randomUUID(), session, type, route, detail, device: 'mobile' };
    const request = new Request('https://service.example/events', {
      method: 'POST',
      headers: { Origin: 'https://kitchen.example', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await handleRequest(
      request,
      env,
      { waitUntil: (promise) => pending.push(promise) },
      async (_url, options) => {
        published.push(options);
        return new Response('ok');
      },
    );
    assert.equal(response.status, 202);
    return request;
  };
  await send('menu_search', '', '/menu/');
  await send('category_view', 'pizza', '/menu/category/pizza/');
  await send('enquiry_started', 'party', '/contact/');
  await send('enquiry_type_selected', 'general', '/contact/');
  await send('enquiry_submit', 'general', '/contact/');
  await send('enquiry_failed', 'general', '/contact/');
  await send('contact_click', 'party', '/about/');
  await Promise.all(pending);
  assert.equal(published.length, 1);
  assert.match(published[0].body, /Contact intent only/);
  assert.match(published[0].body, /menu_search/);
  assert.doesNotMatch(published[0].body, /@|phone|search terms/);
  const old = {
    id: randomUUID(),
    session,
    type: 'menu_search',
    route: '/menu/',
    detail: 'paneer-chataka-pizza',
    device: 'mobile',
  };
  assert.throws(() => validateEvent(old), /Search text/);
  assert.throws(
    () => validateEvent({ ...old, detail: '', phone: '0000000000' }),
    /Unexpected fields/,
  );
  DB.close();
});
