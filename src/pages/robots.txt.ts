import type { APIRoute } from 'astro';
import { publicationUrl, url } from '../lib/site';
export const GET: APIRoute = () =>
  new Response(
    publicationUrl
      ? `User-agent: *\nAllow: ${url('')}\nDisallow: ${url('insights/')}\nDisallow: ${url('offline/')}\nSitemap: ${new URL(url('sitemap.xml'), publicationUrl).href}\nSitemap: ${new URL(url('sitemap-images.xml'), publicationUrl).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
