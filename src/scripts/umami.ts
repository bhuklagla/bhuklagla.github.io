import { sanitizeAnalytics } from '../lib/analytics-privacy';

const websiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '';
export const umamiEnabled = /^[a-f0-9-]{36}$/i.test(websiteId);
let allowed = false;
let loaded = false;
const respectsPrivacySignal = () =>
  navigator.doNotTrack === '1' ||
  ('globalPrivacyControl' in navigator && navigator.globalPrivacyControl === true);
const permittedPage = () =>
  location.hostname === 'bhuklagla.github.io' &&
  !/\/(?:insights|offline)(?:\/|$)|\/404\.html$/.test(location.pathname);
const send = (name?: string) => {
  try {
    void Promise.resolve(window.umami?.track(name)).catch(() => {});
  } catch {}
};

declare global {
  interface Window {
    bhukUmamiBeforeSend: (
      type: string,
      payload: Record<string, unknown>,
    ) => ReturnType<typeof sanitizeAnalytics>;
    umami?: { track: (name?: string) => unknown };
  }
}

export function setAnalyticsConsent(value: boolean) {
  const wasAllowed = allowed;
  allowed = value;
  if (!umamiEnabled || !allowed || !permittedPage() || respectsPrivacySignal()) return;
  window.bhukUmamiBeforeSend = (type, payload) =>
    type === 'event'
      ? sanitizeAnalytics(payload, {
          allowed,
          doNotTrack: respectsPrivacySignal(),
          origin: location.origin,
          pathname: location.pathname,
          title: document.title,
        })
      : false;
  if (document.querySelector('script[data-bhuk-umami]')) {
    if (loaded && !wasAllowed) send();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://cloud.umami.is/script.js';
  script.defer = true;
  script.dataset.websiteId = websiteId;
  script.dataset.domains = 'bhuklagla.github.io';
  script.dataset.excludeSearch = 'true';
  script.dataset.excludeHash = 'true';
  script.dataset.doNotTrack = 'true';
  script.dataset.beforeSend = 'bhukUmamiBeforeSend';
  script.dataset.bhukUmami = 'true';
  script.addEventListener('load', () => {
    loaded = true;
  });
  script.addEventListener('error', () => {
    script.remove();
  });
  document.head.append(script);
}

const events: Record<string, string> = {
  zomato_handoff: 'zomato-handoff',
  contact_click: 'contact-click',
  enquiry_reported: 'enquiry-reported',
};
export function trackAnalytics(type: string) {
  if (!allowed || !permittedPage() || respectsPrivacySignal()) return;
  const name = events[type];
  if (name) send(name);
}
