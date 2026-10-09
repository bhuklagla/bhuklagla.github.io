import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absolute } from '../lib/seo';
import { publicationUrl } from '../lib/site';
const xml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!,
  );
export const GET: APIRoute = async () => {
  const entries = (await getCollection('blog')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const items = publicationUrl
    ? entries
        .map(
          (article) =>
            `<item><title>${xml(article.data.title)}</title><link>${xml(absolute(`blog/${article.id}/`)!)}</link><guid isPermaLink="true">${xml(absolute(`blog/${article.id}/`)!)}</guid><description>${xml(article.data.description)}</description><pubDate>${article.data.date.toUTCString()}</pubDate></item>`,
        )
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Bhuk Lagla Kitchen Food Talk</title><link>${xml(absolute('blog/') || '')}</link><description>Local food and festival planning in Sundargarh.</description><language>en-IN</language>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
};
