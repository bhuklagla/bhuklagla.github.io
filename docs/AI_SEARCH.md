# Bhuk Lagla search and answer foundation

Implemented 17 October 2026 for AEO, GEO, LLMO and conventional search. The canonical public identity remains **Bhuk Lagla**, with root host https://bhuklagla.github.io/. All changes serve customers browsing food or planning an enquiry.

## What is implemented

- `/answers/`: 19 visible, directly linked answers covering food, ingredients, pizza size, ordering, portions, serviceability, pickup enquiries, party enquiries, images and corrections. Answers are static HTML with stable heading anchors.
- `/choose/`: all 23 dishes compared by actual topping/filling/sauce/seasoning, grouped into five website categories. Counts use the shared visible catalogue. No sales popularity, nutrition scores or portion guarantees are inferred.
- `/content-standards/`: publisher, sources, AI assistance, image provenance, date handling and a correction route. Guides identify the business publisher and link to Our kitchen. No human expertise or owner review that has not occurred is claimed.
- Three existing evergreen articles expanded with menu-specific differences and a practical party-enquiry checklist; examples are explicitly illustrative. Original publication dates are preserved and substantive revisions have actual edit dates.
- Shared stable Restaurant/WebSite/WebPage/Menu/MenuSection/MenuItem identities, linked item URLs, category schema and linked article authorship. Schema describes the visible information; no invented offers, ratings, reviews, hours, street address, Person or credentials are added.
- Clear menus, internal navigation, unique metadata, canonical root URLs, native HTML tables/answers, truthful article dates, sitemap coverage, responsive image delivery and no JavaScript requirement for answers/comparisons.
- Food images disclosed as AI-generated menu illustrations, backed by the original private image QA record. Original assets remain unchanged.
- Production build checks and a monthly/manual read-only search-health workflow protect technical quality. Owner follow-ups are in `SEARCH_TODO.md`.

The existing robots allow public pages to be crawled, including by search crawlers. There is no blanket AI block. Private report/utility pages remain excluded/noindex and backend authentication is unchanged. No user data, private recipes, supplier information, costs or website prices are exposed. `llms.txt` is not treated as a Google ranking feature; no hidden instructions or citation-manipulation content are added.

## Evidence and measurement

Before publication: formatting, Astro/catalogue checks, existing tests, production build and browser QA. After publication: CI/deployment success, live HTTP/canonical/schema checks, desktop/mobile browser evidence and an IndexNow notification only after updated URLs are live. Release-specific screenshots/status stay outside Git under `D:/Bhuk Lagla/outputs/2026-10-17-ai-search/`.

For results, compare Search Console impressions/clicks/queries and real enquiries over 28-day periods after sufficient data accumulates. Use Bing AI Performance for observed citations/grounding queries when the account exposes it. A manual AI query is a dated sample, not a ranking guarantee or proof every user will see the same answer. No fabricated baseline or automated customer enquiry is used.

## Why the scope is focused

Google describes AEO/GEO work as part of SEO. E-E-A-T describes qualities of trustworthy content, not a numeric score or a standalone ranking factor. Helpful first-hand evidence has to be collected; code and invented author badges cannot create it. The owner has deferred the founder story. Unrelated statistics, synthetic interviews and generic mass-generated pages would not help a customer choose from this menu.

Google's FAQ rich-result feature is deprecated as of May 2026. The question-and-answer page is for customers and ordinary discovery; no FAQ rich-result eligibility is claimed. No special AI schema, keyword density target or repeated query-variant pages are used.

## Official references checked 17 October 2026

- [Google: optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: helpful content and E-E-A-T](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Google Search documentation updates, including FAQ deprecation](https://developers.google.com/search/updates)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Bing AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)
- [Google Search generative AI control](https://support.google.com/webmasters/answer/16908024)
- [IndexNow submission protocol](https://www.indexnow.org/documentation)

Release helper: `node scripts/notify-indexnow.mjs` previews the sitemap URL set; append `--submit` only after the changed public pages are live. This release changes the shared footer/image provenance across public pages. Do not rerun it repeatedly or treat receipt as indexing. Future releases should notify the URLs actually changed and use the protocol's current limits.

No top position, AI recommendation, indexing deadline or maintenance-free 2–3-year outcome is promised. Review `SEARCH_TODO.md` after each meaningful business change.
