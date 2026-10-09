import type { APIRoute } from 'astro';
import { url } from '../lib/site';
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      id: url(''),
      name: 'Bhuk Lagla Kitchen',
      short_name: 'Bhuk Lagla',
      description: 'Your local hunger fix in Sundargarh. Browse here, order on Zomato.',
      start_url: url(''),
      scope: url(''),
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      lang: 'en',
      icons: [
        { src: url('icons/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: url('icons/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
