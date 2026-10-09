import { setupJourney, track } from './journey';
const status = document.querySelector<HTMLElement>('#app-status');
let statusTimer: ReturnType<typeof setTimeout>;
const notify = (message: string) => {
  if (!status) return;
  status.textContent = message;
  status.hidden = false;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    status.hidden = true;
  }, 6500);
};
const more = document.querySelector<HTMLDialogElement>('#more-dialog');
document.querySelector('[data-open-more]')?.addEventListener('click', () => more?.showModal());
document.querySelector('[data-close-more]')?.addEventListener('click', () => more?.close());
more?.addEventListener('click', (event) => {
  if (event.target === more) {
    const b = more.getBoundingClientRect();
    if (
      event.clientX < b.left ||
      event.clientX > b.right ||
      event.clientY < b.top ||
      event.clientY > b.bottom
    )
      more.close();
  }
});
document.querySelector('[data-install-help]')?.addEventListener('click', () => {
  const help = more?.querySelector<HTMLElement>('.install-help');
  if (help) help.hidden = !help.hidden;
});
document.querySelectorAll<HTMLAnchorElement>('[data-zomato]').forEach((link) =>
  link.addEventListener('click', (event) => {
    if (!navigator.onLine) {
      event.preventDefault();
      notify('Reconnect to open Zomato and order.');
      return;
    }
    track(
      'zomato_handoff',
      document.querySelector<HTMLElement>('[data-detail-id]')?.dataset.detailId,
    );
  }),
);
document.querySelector('[data-share]')?.addEventListener('click', async () => {
  try {
    if (navigator.share) await navigator.share({ title: document.title, url: location.href });
    else {
      await navigator.clipboard.writeText(location.href);
      notify('Dish link copied.');
    }
  } catch (error) {
    if ((error as Error).name !== 'AbortError') notify('Copy the page address to share this dish.');
  }
});
const browser = document.querySelector<HTMLElement>('[data-menu-browser]');
if (browser) {
  const input = browser.querySelector<HTMLInputElement>('[data-menu-search]')!;
  const clear = browser.querySelector<HTMLElement>('[data-clear-search]')!;
  const cards = Array.from(browser.querySelectorAll<HTMLElement>('[data-dish]'));
  let category = browser.dataset.initialCategory || 'all';
  const initial = category;
  const filters = Array.from(browser.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const apply = (write = false) => {
    const query = input.value.trim().toLowerCase();
    let count = 0;
    for (const card of cards) {
      card.hidden = !(
        (category === 'all' || card.dataset.category === category) &&
        query.split(/\s+/).every((part) => card.dataset.search?.includes(part))
      );
      if (!card.hidden) count++;
    }
    filters.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.filter === category)),
    );
    clear.hidden = !input.value;
    browser.querySelector('[data-menu-count]')!.textContent =
      `${count} ${count === 1 ? 'dish' : 'dishes'} · Check availability on Zomato`;
    const empty = browser.querySelector<HTMLElement>('[data-no-results]')!;
    empty.hidden = count !== 0;
    if (write) {
      const next = new URL(location.href);
      query ? next.searchParams.set('q', input.value) : next.searchParams.delete('q');
      category !== initial
        ? next.searchParams.set('category', category)
        : next.searchParams.delete('category');
      history.replaceState(null, '', next);
    }
  };
  const read = () => {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') || '';
    const requested = params.get('category');
    category =
      initial === 'all' && filters.some((button) => button.dataset.filter === requested)
        ? requested!
        : initial;
    apply();
  };
  input.addEventListener('input', () => apply(true));
  clear.addEventListener('click', () => {
    input.value = '';
    apply(true);
    input.focus();
  });
  filters.forEach((button) =>
    button.addEventListener('click', () => {
      category = button.dataset.filter!;
      apply(true);
      track('category_filter', category);
    }),
  );
  browser.querySelector('[data-reset-menu]')?.addEventListener('click', () => {
    input.value = '';
    category = initial;
    apply(true);
    input.focus();
  });
  window.addEventListener('popstate', read);
  read();
}
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (form) {
  const type = form.querySelector<HTMLSelectElement>('[data-enquiry-type]')!;
  const party = form.querySelector<HTMLFieldSetElement>('[data-party-fields]')!;
  const occasion = party.querySelector<HTMLSelectElement>('[name=occasion]')!;
  const sync = () => {
    party.hidden = type.value !== 'party';
    party.disabled = type.value !== 'party';
    occasion.required = type.value === 'party';
  };
  if (new URLSearchParams(location.search).get('type') === 'party') type.value = 'party';
  sync();
  type.addEventListener('change', sync);
  const date = party.querySelector<HTMLInputElement>('[type=date]')!;
  const today = new Date();
  date.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const message = form.querySelector<HTMLElement>('[data-form-status]')!;
    const button = form.querySelector<HTMLButtonElement>('[type=submit]')!;
    if (!navigator.onLine) {
      message.textContent = 'Reconnect before sending your enquiry.';
      return;
    }
    button.disabled = true;
    button.textContent = 'Sending…';
    message.textContent = 'Sending your enquiry…';
    const payload = Object.fromEntries(new FormData(form));
    payload.subject =
      type.value === 'party'
        ? 'Bhuk Lagla Kitchen — party enquiry'
        : 'Bhuk Lagla Kitchen — general enquiry';
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('provider');
      message.textContent =
        'Enquiry sent. We’ll reply by email. This does not confirm an order or party booking.';
      track('enquiry_reported', type.value === 'party' ? 'party' : 'general');
      form.reset();
      sync();
    } catch {
      message.textContent =
        'We couldn’t confirm that your enquiry was sent. Try again, or email bhuklagla@outlook.com.';
    } finally {
      button.disabled = false;
      button.textContent = 'Send enquiry →';
    }
  });
}
setupJourney();
if (!navigator.onLine)
  notify('You’re offline. Cached dishes may be out of date. Reconnect to order.');
window.addEventListener('offline', () => notify('You’re offline. Reconnect to order on Zomato.'));
window.addEventListener('online', () => notify('You’re back online.'));
interface InstallEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}
let installPrompt: InstallEvent | null = null;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event as InstallEvent;
  document
    .querySelectorAll<HTMLElement>('[data-install]')
    .forEach((button) => (button.hidden = false));
});
document.querySelectorAll('[data-install]').forEach((button) =>
  button.addEventListener('click', async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    document
      .querySelectorAll<HTMLElement>('[data-install]')
      .forEach((node) => (node.hidden = true));
  }),
);
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .then((reg) => {
        const offer = () => {
          if (!reg.waiting || !status) return;
          status.hidden = false;
          status.replaceChildren(document.createTextNode('A fresh version is ready. '));
          const update = document.createElement('button');
          update.className = 'text-link';
          update.style.color = 'white';
          update.textContent = 'Update';
          update.addEventListener('click', () => reg.waiting?.postMessage('SKIP_WAITING'));
          status.append(update);
        };
        offer();
        reg.addEventListener('updatefound', () =>
          reg.installing?.addEventListener('statechange', () => {
            if (reg.waiting && navigator.serviceWorker.controller) offer();
          }),
        );
      })
      .catch(() => {});
  });
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      location.reload();
    }
  });
}
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
if (!reduced && !connection?.saveData) {
  void import('gsap')
    .then(({ gsap }) => {
      const targets = document.querySelectorAll('[data-reveal]');
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { y: 16, opacity: 0.65 },
                { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
              );
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.08 },
      );
      targets.forEach((target) => observer.observe(target));
    })
    .catch(() => {});
  const hero = document.querySelector<HTMLElement>('[data-hero-depth]');
  if (hero && matchMedia('(hover: hover) and (min-width: 861px)').matches) {
    void import('./hero-depth').then(({ enhanceHero }) => enhanceHero(hero)).catch(() => {});
  }
}
