import { handleRequest } from './handler.mjs';
import { retryNotifications } from './notifications.mjs';
export default {
  fetch: handleRequest,
  async scheduled(_event, env) {
    await retryNotifications(env);
    await env.DB.prepare('DELETE FROM events WHERE created_at < ?')
      .bind(Date.now() - 30 * 86400000)
      .run();
    await env.DB.prepare('DELETE FROM rate_limits WHERE updated_at < ?')
      .bind(Date.now() - 2 * 3600000)
      .run();
  },
};
