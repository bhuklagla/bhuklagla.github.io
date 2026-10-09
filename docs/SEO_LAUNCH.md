# SEO launch — 9 October 2026

10 October update: the owner requires `https://bhuklagla.github.io/` as the customer address. The current personal-account project site is temporary; the target is not live because signup is blocked on GitHub's Outlook validation. Once the account and repository move are complete, rebuild at the root base and verify root robots, sitemap/canonicals, PWA scope and Search Console on that actual host. Cloudflare's separate free journey service is now deployed; ntfy delivery still needs resolution. See `NOTIFICATIONS_SETUP.md`.

Approved free hosting: GitHub Pages, `https://milanbeherazyx.github.io/bhuklagla.github.io/`. No domain purchase or Cloudflare website is needed. Source and deployment are in this repository. Cloudflare Workers/D1 remain a separate optional notification service; the available CLI account belongs to The Oven Vibe and must not be used for this release. Bhuk Lagla's account setup is pending with the owner.

## Implemented

- 42 indexable pages: home, browseable menu, five categories, 23 individual dishes, local/kitchen/contact/privacy pages, Food Talk with six original articles, and the festival hub. Offline, 404 and the private insights shell are noindex and excluded from sitemaps.
- Unique titles/descriptions, consistent HTTPS canonical URLs using the actual GitHub project path, Open Graph/Twitter previews and article publication dates.
- Shared Restaurant, WebSite, WebPage and BreadcrumbList JSON-LD with stable identities. BlogPosting includes the author, publisher, dish image, actual publication date and page URL. MenuItem includes the actual description, image and vegetarian diet. No fabricated reviews, prices, discounts, event schedules or geographic coverage.
- XML sitemap index and `sitemap.xml` alias, a 23-dish image sitemap, RSS feed and generated `robots.txt`. Internal links connect articles, categories, dishes, the local page and party enquiries. Search/filter parameters do not create indexable duplicate URLs.
- Three new guides: Navratri/Garba, Durga Puja/Dussehra and Diwali gathering planning. Public calendar/organiser sources are linked in the articles and dated 9 October 2026. Regular vegetarian food is explicitly distinguished from fasting food. Rourkela's announced event is clearly labelled Rourkela, with no kitchen affiliation or delivery claim. No Sundargarh-town Garba schedule was verified.
- Static HTML, responsive WebP photographs, self-hosted fonts, lazy non-hero images, mobile navigation, motion preference support and an offline experience. No extra SEO JavaScript, keyword stuffing, fake freshness or mass-produced location pages.
- Automated production-build checks enforce canonicals, unique titles, one H1, sitemap coverage and noindex exclusions, JSON-LD parsing, image-sitemap/feed counts, real local links and private-content boundaries. The deployment workflow repeats checks and six backend privacy/notification tests before publishing.

## Important GitHub Pages detail

A project-level `robots.txt` at `/bhuklagla.github.io/robots.txt` is a delivered configuration artifact, but crawlers consult **the host-root** `/robots.txt` for crawl rules. The existing host-root file was read and allows crawling; it currently references another root sitemap. It was not changed. Noindex meta tags protect utility pages from indexing; owner data additionally requires backend authentication. Submit this project's sitemap directly in a verified Search Console URL-prefix property. Do not claim the project file controls the entire host or overwrite the root website.

## Launch follow-up that needs the owner's account/facts

1. In Google Search Console, add the URL-prefix property `https://milanbeherazyx.github.io/bhuklagla.github.io/`, verify it with Google's supplied HTML file or meta tag, then submit `sitemap.xml` and `sitemap-images.xml`. Inspect the home, menu and festival hub and request indexing once. Verification codes must be supplied by the actual account; do not invent one. Bing Webmaster Tools can import a verified Search Console property.
2. Add the live website to **Bhuk Lagla's own** verified Google Business Profile and Zomato profile when authorised. A business profile link and approval for the exact street address, hours and business phone remain pending. Preserve the approved Sundargarh + email publication policy meanwhile. City-only structured data does not meet all Google's LocalBusiness rich-result required fields; no eligibility claim is made.
3. Share the useful guide or a favourite dish link through the owner's existing local channels. Ask real customers for honest reviews; never fabricate, buy or incentivise reviews. No social posts/messages were sent by this workflow.
4. Obtain original posters/organiser URLs for actual Sundargarh-town Garba programmes. Update the guide only after verifying venue, date and source. Review festival pages after the season; keep dated useful guides or update substantive content honestly.
5. Connect the new Bhuk Lagla Cloudflare backend once its account is ready. Anonymous measurement is opt-in. Zomato handoffs are click intent, not completed orders; use Zomato's own aggregate reports to assess conversions.

## First seven days

Launch day: verify live navigation, photos, form configuration, sitemap and canonical URLs; verify Search Console and submit the sitemap. Days 1–2: add the website to the verified business profiles and share one relevant festival guide. Days 3–4: review Search Console indexing/status and any verified organiser updates. Days 5–7: inspect real queries, impressions and Zomato link reports, then improve pages that answer actual local demand. A few days may be too early for meaningful search data; organic ranking or virality is not guaranteed.

Google's guidance: [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [spam policies](https://developers.google.com/search/docs/essentials/spam-policies). Sitemap submission is a discovery hint, not guaranteed indexing. No special AI file or paid campaign is required.
