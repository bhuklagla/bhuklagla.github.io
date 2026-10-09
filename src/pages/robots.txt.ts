import type { APIRoute } from 'astro';
import { publicationUrl, url } from '../lib/site';
export const GET: APIRoute = () =>
  new Response(
    publicationUrl
      ? `User-agent: *\nAllow: /\nDisallow: ${url('insights/')}\nSitemap: ${new URL(url('sitemap-index.xml'), publicationUrl).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
