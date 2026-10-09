import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { readFileSync, mkdirSync } from 'node:fs';
import { createDatabase } from './sqlite.mjs';
import { handleRequest } from './handler.mjs';
let config = '';
try {
  config = readFileSync(new URL('./.dev.vars', import.meta.url), 'utf8');
} catch {}
const vars = Object.fromEntries(
  config
    .split(/\r?\n/)
    .filter((line) => /^\w+=/.test(line))
    .map((line) => {
      const at = line.indexOf('=');
      return [line.slice(0, at), line.slice(at + 1).replace(/^"|"$/g, '')];
    }),
);
mkdirSync(new URL('./data/', import.meta.url), { recursive: true });
const db = createDatabase(fileURLToPath(new URL('./data/journeys.sqlite', import.meta.url)));
const env = {
  ...vars,
  DB: db,
  ALLOWED_ORIGINS: vars.ALLOWED_ORIGINS || 'http://127.0.0.1:4321,http://localhost:4321',
};
const server = createServer(async (req, res) => {
  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
      if (body.length > 1200) {
        res.writeHead(413);
        res.end();
        return;
      }
    }
    const headers = { ...req.headers };
    delete headers.host;
    const request = new Request(`http://127.0.0.1:8787${req.url}`, {
      method: req.method,
      headers,
      ...(body ? { body } : {}),
    });
    const response = await handleRequest(request, env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
  } catch {
    res.writeHead(500);
    res.end('Request failed');
  }
});
server.listen(8787, '127.0.0.1', () => console.log('Journey service: http://127.0.0.1:8787'));
process.on('SIGINT', () => {
  server.close();
  db.close();
  process.exit();
});
