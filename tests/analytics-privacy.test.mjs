import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeAnalytics } from '../src/lib/analytics-privacy.ts';

const context = {
  allowed: true,
  doNotTrack: false,
  origin: 'https://bhuklagla.github.io',
  pathname: '/menu/',
  title: 'Menu | Bhuk Lagla',
};
const payload = {
  website: 'site-id',
  hostname: 'example.invalid',
  url: '/contact/?email=private@example.invalid#secret',
  referrer: 'https://example.invalid/private?token=secret#hash',
  screen: '390x844',
  language: 'en-IN',
  id: 'private-id',
  data: { email: 'private@example.invalid', message: 'private message' },
};

test('Umami refuses sends before consent, after withdrawal, with privacy signals and on private routes', () => {
  assert.equal(sanitizeAnalytics(payload, { ...context, allowed: false }), false);
  assert.equal(sanitizeAnalytics(payload, { ...context, doNotTrack: true }), false);
  for (const pathname of ['/insights/', '/offline/', '/404.html'])
    assert.equal(sanitizeAnalytics(payload, { ...context, pathname }), false);
});
test('Umami strips query, hash, referrer path, form data and identifiers from analytics', () => {
  const result = sanitizeAnalytics(payload, {
    ...context,
    pathname: '/contact/?email=private@example.invalid#secret',
  });
  assert.equal(result.url, '/contact/');
  assert.equal(result.referrer, 'https://example.invalid/');
  assert.equal(result.hostname, 'bhuklagla.github.io');
  assert.equal(result.data, undefined);
  assert.equal(result.id, undefined);
  assert.doesNotMatch(JSON.stringify(result), /private@|secret|token=|private message/);
});
test('Only anonymous approved action names can reach Umami', () => {
  assert.equal(sanitizeAnalytics({ ...payload, name: 'arbitrary-private-value' }, context), false);
  const result = sanitizeAnalytics({ ...payload, name: 'enquiry-reported' }, context);
  assert.equal(result.name, 'enquiry-reported');
  assert.equal(result.data, undefined);
  assert.equal(result.id, undefined);
});
