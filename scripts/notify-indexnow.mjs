import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

// Explicit release helper. Default is a preview; --submit sends public changed URLs.
const origin = 'https://bhuklagla.github.io';
const keyFiles = readdirSync('public').filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
assert.equal(keyFiles.length, 1, 'Use the existing unambiguous IndexNow ownership file');
const key = readFileSync(`public/${keyFiles[0]}`, 'utf8').trim();
assert.equal(`${key}.txt`, keyFiles[0], 'Ownership filename matches its content');
const urlList = [
  ...readFileSync('dist/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g),
].map((match) => match[1]);
assert.ok(urlList.length > 0 && urlList.length <= 10000);
assert.ok(
  urlList.every((url) => new URL(url).origin === origin),
  'Only this kitchen host',
);
if (!process.argv.includes('--submit')) {
  console.log(
    JSON.stringify(
      {
        mode: 'preview',
        endpoint: 'https://api.indexnow.org/indexnow',
        urlCount: urlList.length,
        urlList,
      },
      null,
      2,
    ),
  );
} else {
  const keyResponse = await fetch(`${origin}/${keyFiles[0]}`, {
    signal: AbortSignal.timeout(20000),
  });
  assert.equal(keyResponse.status, 200, 'Ownership file is live');
  assert.equal((await keyResponse.text()).trim(), key, 'Live ownership file matches');
  for (const route of ['/answers/', '/choose/', '/content-standards/']) {
    const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 200, `New content is live: ${route}`);
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(origin).host,
      key,
      keyLocation: `${origin}/${keyFiles[0]}`,
      urlList,
    }),
    signal: AbortSignal.timeout(30000),
  });
  const body = await response.text();
  console.log(
    JSON.stringify(
      {
        submittedAt: new Date().toISOString(),
        endpoint: 'https://api.indexnow.org/indexnow',
        urlCount: urlList.length,
        httpStatus: response.status,
        response: body,
        meaning:
          response.status === 202
            ? 'URLs received; key validation pending. Not indexing or ranking confirmation.'
            : 'Receipt only. Not indexing, ranking or AI citation confirmation.',
      },
      null,
      2,
    ),
  );
  assert.ok([200, 202].includes(response.status), 'IndexNow accepted the notification');
}
