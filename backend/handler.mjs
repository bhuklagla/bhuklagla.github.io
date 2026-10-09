import menu from '../src/data/menu.json' with { type: 'json' };
const dishIds = new Set(menu.map((item) => item.id));
const categories = new Set(['all', 'pizza', 'sandwiches', 'snacks', 'maggi', 'pasta']);
const blogs = new Set([
  'pizza-sandwich-or-snack',
  'air-fryer-pizza-and-fries',
  'party-food-enquiries-sundargarh',
]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const TYPES = new Set([
  'page_view',
  'menu_view',
  'dish_view',
  'category_filter',
  'zomato_handoff',
  'enquiry_reported',
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
    !/^\/(?:|(?:menu(?:\/category)?|blog)(?:\/[a-z0-9-]+)?\/|(?:about|contact|privacy|sundargarh|offline)\/)$/.test(
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
    !['party', 'general'].includes(raw.detail)
  )
    throw new Error('Unknown detail');
  if (!['mobile', 'desktop'].includes(raw.device)) throw new Error('Invalid device');
  if (raw.type === 'enquiry_reported' && !['party', 'general'].includes(raw.detail))
    throw new Error('Invalid enquiry');
  return Object.fromEntries(allowed.map((key) => [key, raw[key]]));
}
export async function sha256(value) {
  return Array.from(
    new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))),
  )
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
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
      if (!env.ADMIN_TOKEN || !token || (await sha256(token)) !== (await sha256(env.ADMIN_TOKEN)))
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
      return json(
        {
          metrics: metrics.results,
          events: events.results,
          retentionDays: 30,
          zomatoOrders: 'unknown',
          enquiryVerification: 'browser-reported',
        },
        200,
        headers,
      );
    }
    if (route !== '/events' || request.method !== 'POST')
      return json({ error: 'Not found' }, 404, headers);
    if (!request.headers.get('Content-Type')?.startsWith('application/json'))
      return json({ error: 'Expected JSON' }, 415, headers);
    const text = await request.text();
    if (text.length > 1200) return json({ error: 'Event too large' }, 413, headers);
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
      ['zomato_handoff', 'enquiry_reported'].includes(event.type) &&
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
          : 'Bhuk Lagla - enquiry reported';
      const body = `Anonymous visit ${event.session.slice(0, 8)} (${event.device})\n${recent.results
        .reverse()
        .map((row) => `${row.type}: ${row.route}${row.detail ? ` (${row.detail})` : ''}`)
        .join(
          '\n',
        )}\n${event.type === 'zomato_handoff' ? 'Outbound click only. Completed order unknown.' : 'Web3Forms success reported by browser. Check the email inbox.'}`;
      ctx.waitUntil(
        publish(`${(env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '')}/${env.NTFY_TOPIC}`, {
          method: 'POST',
          headers: {
            Title: title,
            ...(env.NTFY_TOKEN ? { Authorization: `Bearer ${env.NTFY_TOKEN}` } : {}),
          },
          body,
        })
          .then(async (response) => {
            if (!response.ok)
              console.error('Notification provider returned an error', response.status);
          })
          .catch(() => console.error('Notification delivery failed')),
      );
    }
    return json({ ok: true, duplicate: !inserted.meta.changes }, 202, headers);
  } catch {
    console.error('Journey service request failed');
    return json({ error: 'Service unavailable' }, 503, headers);
  }
}
