# Bhuk Lagla Kitchen — product requirements

9 October 2026. Build authorised by Milan. Selected visual direction: Kitchen Studio.

The website introduces a newly opened local kitchen to Sundargarh residents, particularly school and college customers looking for affordable pizza, sandwiches and snacks. Its primary journey is discover food, browse the menu, then order on Zomato through https://link.zomato.com/xqzv/rshare?id=15027983430563a88. Zomato controls transactions, current availability, prices and offer eligibility.

## Brand and experience

- Headline: **Big cravings. Small budget.**
- White, ink and brand-orange Kitchen Studio layout; Outfit headings and Work Sans body text.
- One complete approved logo (mascot and Bhuk Lagla Kitchen lettering) at the top-left. Mascot face favicon and install icons from the approved kit.
- Large hero mascot directly below the two-line food introduction, before the action buttons. Paneer Chataka Pizza is the hero’s sole food photo; the Maggi/sandwich/fries preview rows are removed. Those categories remain in the menu. Use `Zomato/Menu Images v2 - Natural Serving Angle` throughout. Preserve original assets.
- Mobile first, responsive through desktop, icon-and-text Home / Menu / More navigation and an obvious Order on Zomato action. No forced installation or animation gates.
- Controlled GSAP entrances and progressive Three.js matrix-based perspective enhancement on pointer devices; static photos and reduced-motion fallback remain fully useful. No WebGL context or idle rendering loop. Photos are not reconstructed 3D dishes.

## Launch scope

Home, searchable/filterable menu, five category pages, 23 individual dish pages, About, Sundargarh, blog index and useful original articles, Contact/FAQ, privacy, offline fallback and 404. All key content is statically rendered and available without JavaScript. Dish links are shareable; filters/search enhance ordinary browsing.

Menu availability is labelled **Check on Zomato**, not a fabricated live feed. Provide a typed manual visibility/availability field for future owner maintenance without reviving stock tracking. Zomato offers copy must be conditional. No cart, checkout, payments, customer account system, WhatsApp orders, fake reviews or artificial scarcity.

Milan additionally requested Web3Forms contact enquiries, party enquiries (birthday, anniversary and other gatherings), ntfy notifications and customer-journey measurement. Free Web3Forms submissions go directly from the browser to its API; the public form key is intended for client use. A separate backend validates anonymous journey events and protects the ntfy destination and owner-report token. Measurement requires visitor opt-in. Enquiry success in the report is browser-reported Web3Forms acceptance, not independently verified by the journey backend. Completed Zomato orders remain unknown without a verified platform data source. Never label an outbound click as a completed order. The free ntfy topic is random and unlisted, not access-controlled private; never include customer contact details in its messages.

## Public content boundaries

Do not include prices anywhere in HTML, public JSON, scripts, metadata, structured data or search indexes. Export only item names, categories, public descriptions and approved photos from the catalogue. Never publish recipes, quantities used in cooking, preparation steps/settings, timings, suppliers, costing or private operational documents.

Use accurate methods: pizza and fries are air-fryer cooked; fries use a light oil drizzle instead of deep frying; sandwiches are grilled. Do not call the entire menu zero-oil or make blanket health claims. Publicly stated serving size is customer-facing menu information, not a recipe.

Milan confirmed publication of Sundargarh, `bhuklagla@outlook.com` and the Zomato smart link only. Do not publish the saved phone, street address or hours. Never reuse The Oven Vibe's Maps profile, ratings, domain or accounts. Use English initially; local-language expansion remains a later decision.

## Architecture and operations

Static Astro + strict TypeScript, shared validated public menu/business configuration, reusable layout/components, Markdown content collections, local font files and responsive WebP images. Separate optional animation and PWA modules so basic browsing works without them. A later availability/content API can replace the data provider without rewriting page components.

GitHub is the source and CI workflow. Produce a tested static build artifact; production host/domain are a separate launch configuration. Unconfigured previews must be noindex. Canonicals, sitemap, robots and structured data must use the actual configured publication URL. No public deployment is claimed from a successful local build.

PWA manifest, approved icons, optional installation help, network-first navigation and a useful cached offline menu/fallback. Never imply offline Zomato ordering or current platform availability. Update handling must not trap visitors on an old app.

## SEO and acceptance

Original page-specific titles/descriptions; crawlable dish/category content; Restaurant/Menu schema using only visible verified facts; sitemap when a publication URL is set; social previews, proper headings/alt text, internal links and original Sundargarh-focused blog content. No ranking or timeframe guarantee.

Build and TypeScript checks pass. Menu validation verifies 23 unique items, corresponding natural-angle photos and no price/private fields. All local links/assets resolve; keyboard controls and search/filter/back flows work. Check narrow phones, normal phones and desktop for overflow, readable content, accurate crops, tap targets, mascot/header logo placement and favicon. Verify PWA registration/offline behavior without placing orders.

Target mobile Lighthouse performance ≥90 and accessibility/SEO ≥95 on representative publication routes. Field goals LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 remain measurement targets, not unmeasured claims. Report test conditions and any remaining limitations.

## Delivery stages

1. Document decisions; prepare schema, catalogue and approved asset derivatives.
2. Implement the selected design, menu and indexable pages.
3. Add blog, SEO, progressive motion and PWA.
4. Build, validate and inspect mobile/desktop preview.
5. Preserve the result in GitHub source/CI and resolve production URL/hosting before public launch.
