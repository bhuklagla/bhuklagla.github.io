export interface AnalyticsContext {
  allowed: boolean;
  doNotTrack: boolean;
  origin: string;
  pathname: string;
  title: string;
}

const eventNames = new Set(['zomato-handoff', 'contact-click', 'enquiry-reported']);

export function sanitizeAnalytics(payload: Record<string, unknown>, context: AnalyticsContext) {
  const pathname = new URL(context.pathname, context.origin).pathname;
  if (
    !context.allowed ||
    context.doNotTrack ||
    /\/(?:insights|offline)(?:\/|$)|\/404\.html$/.test(pathname)
  )
    return false;
  if (payload.name !== undefined && !eventNames.has(String(payload.name))) return false;
  let referrer = '';
  try {
    const source = new URL(String(payload.referrer || ''));
    if (source.protocol === 'https:' || source.protocol === 'http:') referrer = `${source.origin}/`;
  } catch {}
  // Explicit allowlist: no search/hash, contact fields, custom data, distinct ID or session ID.
  return {
    website: payload.website,
    hostname: new URL(context.origin).hostname,
    url: pathname,
    title: context.title,
    referrer,
    screen: payload.screen,
    language: payload.language,
    ...(payload.name ? { name: payload.name } : {}),
  };
}
