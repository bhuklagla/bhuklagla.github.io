export async function deliverNotification(id, env, publish = fetch) {
  if (!env.NTFY_TOPIC) return;
  const now = Date.now();
  const notification = await env.DB.prepare(
    'UPDATE notification_outbox SET next_attempt_at=?, attempts=attempts+1 WHERE id=? AND delivered_at IS NULL AND next_attempt_at<=? RETURNING id,title,body,attempts',
  )
    .bind(now + 60000, id, now)
    .first();
  if (!notification) return;
  let status = 0;
  try {
    const response = await publish(
      `${(env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '')}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(env.NTFY_TOKEN ? { Authorization: `Bearer ${env.NTFY_TOKEN}` } : {}),
        },
        body: JSON.stringify({
          topic: env.NTFY_TOPIC,
          title: notification.title,
          message: notification.body,
        }),
        signal: AbortSignal.timeout(22000),
      },
    );
    status = response.status;
    await response.body?.cancel();
    if (response.ok) {
      await env.DB.prepare('UPDATE notification_outbox SET delivered_at=?,last_status=? WHERE id=?')
        .bind(Date.now(), status, id)
        .run();
      return;
    }
  } catch {
    /* The durable record is retried; never log destination or private credentials. */
  }
  const retryAt = Date.now() + Math.min(60, 2 ** Math.min(notification.attempts, 6)) * 60000;
  await env.DB.prepare('UPDATE notification_outbox SET next_attempt_at=?,last_status=? WHERE id=?')
    .bind(retryAt, status, id)
    .run();
  console.error(JSON.stringify({ event: 'notification_retry_scheduled', status }));
}

export async function retryNotifications(env, publish = fetch) {
  // Keep the dedicated free service ready, even when no alerts are queued.
  if (env.NTFY_SERVER?.endsWith('.onrender.com')) {
    try {
      const health = await publish(`${env.NTFY_SERVER}/v1/health`, {
        signal: AbortSignal.timeout(10000),
      });
      await health.body?.cancel();
      if (!health.ok) console.error(JSON.stringify({ event: 'notification_server_not_ready' }));
    } catch {
      console.error(JSON.stringify({ event: 'notification_server_warming' }));
    }
  }
  const now = Date.now();
  const pending = await env.DB.prepare(
    'SELECT id FROM notification_outbox WHERE delivered_at IS NULL AND next_attempt_at<=? AND created_at>=? ORDER BY next_attempt_at LIMIT 5',
  )
    .bind(now, now - 86400000)
    .all();
  await Promise.all(pending.results.map(({ id }) => deliverNotification(id, env, publish)));
  await env.DB.prepare('DELETE FROM notification_outbox WHERE created_at<?')
    .bind(now - 86400000)
    .run();
}
