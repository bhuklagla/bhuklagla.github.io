import menu from '../src/data/menu.json' with { type: 'json' };
import { deliverNotification } from './notifications.mjs';
const dishIds = new Set(menu.map((item) => item.id));
const categories = new Set(['all', 'pizza', 'sandwiches', 'snacks', 'maggi', 'pasta']);
const blogs = new Set([
  'pizza-sandwich-or-snack',
  'air-fryer-pizza-and-fries',
  'party-food-enquiries-sundargarh',
  'navratri-garba-sundargarh-2026',
  'durga-puja-dussehra-sundargarh-2026',
  'diwali-party-food-sundargarh-2026',
]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const TYPES = new Set([
  'page_view',
  'menu_view',
  'menu_search',
  'category_view',
  'dish_view',
  'category_filter',
  'zomato_handoff',
  'enquiry_reported',
  'contact_click',
  'enquiry_started',
  'enquiry_type_selected',
  'enquiry_submit',
  'enquiry_failed',
]);
const DETAIL = /^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/;
export function validateEvent(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Invalid event');
  const allowed = ['id', 'session', 'type', 'route', 'detail', 'device'];
  if (Object.keys(raw).some((key) => !allowed.includes(key))) throw new Error('Unexpected fields');
  if (!UUID.test(raw.id) || !UUID.test(raw.session) || !TYPES.has(raw.type))
    throw new Error('Invalid identifiers');
  if (
    typeof raw.route !== 'string' ||
    raw.route.length > 120 ||
    !/^\/(?:|(?:menu(?:\/category)?|blog)(?:\/[a-z0-9-]+)?\/|(?:about|contact|privacy|sundargarh|offline|festivals)\/)$/.test(
      raw.route,
    )
  )
    throw new Error('Invalid route');
  if (typeof raw.detail !== 'string' || raw.detail.length > 80 || !DETAIL.test(raw.detail))
    throw new Error('Invalid detail');
  const parts = raw.route.split('/').filter(Boolean);
  if (
    parts[0] === 'menu' &&
    parts[1] &&
    !(parts[1] === 'category' ? categories.has(parts[2]) : dishIds.has(parts[1]))
  )
    throw new Error('Unknown route');
  if (parts[0] === 'blog' && parts[1] && !blogs.has(parts[1])) throw new Error('Unknown article');
  if (
    raw.detail &&
    !dishIds.has(raw.detail) &&
    !categories.has(raw.detail) &&
    !['party', 'general', 'email'].includes(raw.detail)
  )
    throw new Error('Unknown detail');
  if (!['mobile', 'desktop'].includes(raw.device)) throw new Error('Invalid device');
  if (raw.type.startsWith('enquiry_') && !['party', 'general'].includes(raw.detail))
    throw new Error('Invalid enquiry');
  if (raw.type === 'menu_search' && raw.detail !== '')
    throw new Error('Search text is not collected');
  if (raw.type === 'contact_click' && !['party', 'general', 'email'].includes(raw.detail))
    throw new Error('Invalid contact event');
  return Object.fromEntries(allowed.map((key) => [key, raw[key]]));
}
export async function sha256(value) {
  return Array.from(
    new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))),
  )
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
async function matchesOwnerToken(token, expected) {
  const encoder = new TextEncoder();
  const hashes = await Promise.all(
    [token, expected].map((value) => crypto.subtle.digest('SHA-256', encoder.encode(value))),
  );
  if (typeof crypto.subtle.timingSafeEqual === 'function')
    return crypto.subtle.timingSafeEqual(hashes[0], hashes[1]);
  // Node's WebCrypto lacks the Workers extension; verification avoids a JS string comparison.
  const key = await crypto.subtle.importKey(
    'raw',
    hashes[1],
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  const message = encoder.encode('bhuk-lagla-owner-access');
  const signature = await crypto.subtle.sign('HMAC', key, message);
  const candidate = await crypto.subtle.importKey(
    'raw',
    hashes[0],
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  return crypto.subtle.verify('HMAC', candidate, signature, message);
}
async function readEventBody(request) {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 1200) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}
const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });
export async function handleRequest(
  request,
  env,
  ctx = { waitUntil: (promise) => promise.catch(() => {}) },
  publish = fetch,
) {
  const origin = request.headers.get('Origin') || '';
  const origins = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  if (!origins.includes(origin)) return json({ error: 'Origin not allowed' }, 403);
  const headers = {
    'Access-Control-Allow-Origin': origin,
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  const route = new URL(request.url).pathname;
  try {
    if (route === '/health' && request.method === 'GET') return json({ ok: true }, 200, headers);
    if (!env.DB) return json({ error: 'Service is not configured' }, 503, headers);
    if (route === '/insights' && request.method === 'GET') {
      const token = request.headers.get('Authorization')?.replace(/^Bearer /, '') || '';
      if (!env.ADMIN_TOKEN || !token || !(await matchesOwnerToken(token, env.ADMIN_TOKEN)))
        return json({ error: 'Authorisation required' }, 401, headers);
      await env.DB.prepare('DELETE FROM events WHERE created_at < ?')
        .bind(Date.now() - 30 * 86400000)
        .run();
      const metrics = await env.DB.prepare(
        'SELECT type, COUNT(*) AS count, COUNT(DISTINCT session) AS sessions FROM events GROUP BY type',
      ).all();
      const events = await env.DB.prepare(
        'SELECT session, type, route, detail, device, created_at FROM events ORDER BY created_at DESC LIMIT 200',
      ).all();
      const notificationDelivery = await env.DB.prepare(
        'SELECT COUNT(*) AS total, SUM(delivered_at IS NOT NULL) AS delivered, SUM(delivered_at IS NULL) AS pending FROM notification_outbox',
      ).first();
      return json(
        {
          metrics: metrics.results,
          events: events.results,
          retentionDays: 30,
          zomatoOrders: 'unknown',
          enquiryVerification: 'browser-reported',
          notificationDelivery,
        },
        200,
        headers,
      );
    }
    if (route !== '/events' || request.method !== 'POST')
      return json({ error: 'Not found' }, 404, headers);
    if (!request.headers.get('Content-Type')?.startsWith('application/json'))
      return json({ error: 'Expected JSON' }, 415, headers);
    const text = await readEventBody(request);
    if (text === null) return json({ error: 'Event too large' }, 413, headers);
    let event;
    try {
      event = validateEvent(JSON.parse(text));
    } catch {
      return json({ error: 'Invalid event' }, 400, headers);
    }
    if (!env.RATE_LIMIT_SALT) return json({ error: 'Service is not configured' }, 503, headers);
    const now = Date.now();
    const hour = Math.floor(now / 3600000);
    const ip = request.headers.get('CF-Connecting-IP') || 'local';
    const rateKey = await sha256(`${env.RATE_LIMIT_SALT}:${ip}:${hour}`);
    await env.DB.prepare(
      'INSERT INTO rate_limits (key, count, updated_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1, updated_at=excluded.updated_at',
    )
      .bind(rateKey, now)
      .run();
    const rate = await env.DB.prepare('SELECT count FROM rate_limits WHERE key=?')
      .bind(rateKey)
      .first();
    if (rate.count > 240) return json({ error: 'Too many events' }, 429, headers);
    const inserted = await env.DB.prepare(
      'INSERT OR IGNORE INTO events (id,session,type,route,detail,device,created_at) VALUES (?,?,?,?,?,?,?)',
    )
      .bind(event.id, event.session, event.type, event.route, event.detail, event.device, now)
      .run();
    const cutoff = now - 30 * 86400000;
    await env.DB.prepare('DELETE FROM events WHERE created_at < ?').bind(cutoff).run();
    await env.DB.prepare('DELETE FROM rate_limits WHERE updated_at < ?')
      .bind(now - 2 * 3600000)
      .run();
    if (
      inserted.meta.changes &&
      ['zomato_handoff', 'contact_click', 'enquiry_reported'].includes(event.type) &&
      env.NTFY_TOPIC
    ) {
      const recent = await env.DB.prepare(
        'SELECT type, route, detail FROM events WHERE session=? ORDER BY created_at DESC LIMIT 8',
      )
        .bind(event.session)
        .all();
      const title =
        event.type === 'zomato_handoff'
          ? 'Bhuk Lagla - Zomato opened'
          : event.type === 'contact_click'
            ? 'Bhuk Lagla - contact link clicked'
            : 'Bhuk Lagla - enquiry reported';
      const explanation =
        event.type === 'zomato_handoff'
          ? 'Outbound click only. Completed order unknown.'
          : event.type === 'contact_click'
            ? 'Contact intent only. No enquiry has been submitted by this click.'
            : 'Web3Forms success reported by browser. Check the email inbox.';
      const body = `Anonymous visit ${event.session.slice(0, 8)} (${event.device})\n${recent.results
        .reverse()
        .map((row) => `${row.type}: ${row.route}${row.detail ? ` (${row.detail})` : ''}`)
        .join('\n')}\n${explanation}`;
      await env.DB.prepare(
        'INSERT OR IGNORE INTO notification_outbox (id,title,body,created_at,next_attempt_at) VALUES (?,?,?,?,?)',
      )
        .bind(event.id, title, body, now, now)
        .run();
      ctx.waitUntil(deliverNotification(event.id, env, publish));
    }
    return json({ ok: true, duplicate: !inserted.meta.changes }, 202, headers);
  } catch {
    console.error(JSON.stringify({ event: 'journey_request_failed' }));
    return json({ error: 'Service unavailable' }, 503, headers);
  }
}
