const endpoint = import.meta.env.PUBLIC_JOURNEY_API || '';
const preferenceKey = 'bhuk-lagla-measurement';
let consent = false;
let session = '';
const route = () =>
  location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '') || '/';
export function track(type: string, detail?: string) {
  if (!endpoint || !consent || !session || !navigator.onLine) return;
  const body = JSON.stringify({
    id: crypto.randomUUID(),
    session,
    type,
    route: route(),
    detail: detail || '',
    device: matchMedia('(max-width: 860px)').matches ? 'mobile' : 'desktop',
  });
  void fetch(`${endpoint.replace(/\/$/, '')}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
    credentials: 'omit',
  }).catch(() => {});
}
function start() {
  try {
    session = sessionStorage.getItem('bhuk-lagla-session') || crypto.randomUUID();
    sessionStorage.setItem('bhuk-lagla-session', session);
  } catch {
    session = crypto.randomUUID();
  }
  consent = true;
  track('page_view');
  const dish = document.querySelector<HTMLElement>('[data-detail-id]');
  if (dish) track('dish_view', dish.dataset.detailId);
  if (document.querySelector('[data-menu-browser]')) track('menu_view');
}
export function setupJourney() {
  if (!endpoint) return;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(preferenceKey);
  } catch {}
  const panel = document.createElement('aside');
  panel.className = 'consent-panel';
  panel.setAttribute('aria-label', 'Optional website measurement');
  panel.innerHTML = `<h2>Help us improve?</h2><p>Allow anonymous menu browsing and Zomato click counts? No contact details or typed searches are recorded.</p><div class="consent-actions"><button class="button secondary" data-decline>No thanks</button><button class="button" data-allow>Allow</button></div><a class="text-link" href="${import.meta.env.BASE_URL}privacy/">Privacy details</a>`;
  const choose = (allow: boolean) => {
    try {
      localStorage.setItem(preferenceKey, allow ? 'allow' : 'decline');
    } catch {}
    panel.remove();
    consent = allow;
    if (allow) start();
    else {
      session = '';
      try {
        sessionStorage.removeItem('bhuk-lagla-session');
      } catch {}
    }
  };
  panel.querySelector('[data-allow]')?.addEventListener('click', () => choose(true));
  panel.querySelector('[data-decline]')?.addEventListener('click', () => choose(false));
  if (stored === 'allow') start();
  else if (stored !== 'decline') document.body.append(panel);
  document.querySelector('[data-privacy-settings]')?.addEventListener('click', () => {
    document.body.append(panel);
    panel.querySelector<HTMLButtonElement>('button')?.focus();
  });
}
