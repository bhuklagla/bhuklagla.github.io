# Current decisions — 9 October 2026

Kitchen Studio is selected and the full build is explicitly authorised. The headline is Big cravings. Small budget. Use the complete approved mascot-and-name logo in the header and the approved face favicon. Milan’s latest hero revision places the large mascot directly below “Air-fryer pizzas, grilled sandwiches and snacks. / Made for Sundargarh cravings.” and removes the Maggi/sandwich/fries preview rows. Paneer Chataka Pizza remains the hero food photo; all 23 natural-serving-angle photos remain in the site’s menu. No prices or private recipes. Publish Sundargarh, bhuklagla@outlook.com and the supplied Zomato smart link only.

Web3Forms general/party enquiries, ntfy anonymous journey notifications and the owner report are now requested. Free Web3Forms signup was approved and completed. The new random ntfy channel received setup and local enquiry-journey tests. Completed Zomato orders are unknown. Current requirements are in ../PRD.md; implementation and setup are in ARCHITECTURE.md, OPERATIONS.md and QA_REPORT.md. Public hosting is awaiting the owner choice. The discussion below is historical and does not override these later decisions.

---

# Website discussion — Bhuk Lagla Kitchen

Updated: 9 October 2026. Status: visual demo review; this is not the final PRD or approval to build the full website.

## Confirmed

- Repository: `milanbeherazyx/bhuklagla.github.io`.
- Local workspace: `D:\Bhuk Lagla\bhuklagla.github.io`.
- Discuss the website with Milan before building it.
- Main purpose: **browse the menu and order on Zomato**, confirmed by Milan on 9 October 2026.
- Reuse relevant development skills from The Oven Vibe, including its Claude skills.
- Decide the technology stack, features, architecture, pages and other requirements together, one topic at a time. Document the decisions, produce a PRD, and only then implement step by step, as requested on 9 October 2026.
- Audience: Sundargarh residents seeking budget pizza, sandwiches and snacks, especially school and college students.
- Goals: local recognition, organic discovery and traffic to the Zomato menu. Aim to outperform The Oven Vibe in mobile usability, presentation, speed and measurable engagement.
- Primary destination: `https://link.zomato.com/xqzv/rshare?id=15027983430563a88`.
- Launch features: menu browsing, search, filters, item details, availability information and a blog; a Zomato-exclusive ordering journey.
- No website prices: exclude prices from visible UI, public JSON, structured data, search indexes and client bundles.
- Visual ambition: eye-catching 3D animation and motion graphics, mobile-first and app-like, with very simple navigation and familiar icons.
- Preserve the approved logo and use the existing Bhuk Lagla food photos; create a distinct website rather than copying The Oven Vibe's appearance.
- Use public Zomato descriptions only. Never publish recipes, quantities, preparation instructions, timings, equipment settings, suppliers or costing.
- Milan confirmed the documented cooking methods remain accurate. Public copy may describe pizza/fries as air-fryer cooked, fries as using a light oil drizzle instead of deep-frying, and sandwiches as grilled. Do not label every category air-fried.
- Desired USP is air-fryer-focused food. Exact wording remains to be discussed; blanket zero-oil or health claims are not supported by the public descriptions.
- Milan delegated what to hide for marketing hype. Proposed approach: keep prices and eligible offer details on Zomato, protect recipes, and stage reveals only for genuinely approved future specials. Keep launch menu information discoverable.
- No ads or paid campaigns. Rapid local traction is an ambition; first-place ranking for every search or within a few days cannot be guaranteed.
- GitHub preference for source, content, version control and workflow. Production hosting needs discussion of Pages limits and the actual owner/domain arrangement.
- Future architecture should permit a separate backend without requiring one at launch.

## Existing context to verify for publication

`D:\Bhuk Lagla\Bhuk_Lagla_Codex_Handoff.md` describes an affordable, pure-veg, egg-free brand for students and price-sensitive customers in Sundargarh, with a customer identity separate from The Oven Vibe. It is background context, not a current price feed.

Existing brand references are in `D:\Bhuk Lagla\Bhuk_Lagla_Brand_Handoff_Kit` and `D:\Bhuk Lagla\Bhuk_Lagla_Brand_Asset_Handoff.md`. Inspect the approved assets before choosing website colours or typography. Preserve masters; derive web assets separately.

## Still to discuss

- Website languages, local expressions and exact public USP wording. Customer-facing name is Bhuk Lagla Kitchen.
- Visual personality and use of the existing logo/brand palette.
- Homepage and menu structure: one browsable page or separate pages.
- Final web image treatment; all 23 named food photos exist in `D:\Bhuk Lagla\Zomato\Menu Images 1800x1200`.
- Language and tone: English, local language, or a combination.
- Current menu reconciliation and availability maintenance; prices are not displayed. Zomato stays authoritative until a verified sync mechanism exists.
- Android/iPhone smart-link tests, desktop fallback and wording/placement of order buttons.
- Contact details, hours, address and useful customer information.
- Domain, hosting setup, analytics and maintenance expectations. Confirm Bhuk Lagla-specific profiles rather than reusing The Oven Vibe's Maps listing.

Milan approved the proposed direction in principle and requested a small visual demo before approving the full build. Final visual treatment, language, availability maintenance, analytics and production hosting still need resolution. There is no approved requirement for direct ordering, a cart, payments, a backend, stock tracking or order notifications. `docs/DISCUSSION_PLAN.md` sets out the discussion sequence. A PRD will be written from agreed decisions after the demo review.

## Research evidence

Saved catalogue: `D:\Bhuk Lagla\Zomato\Food Menu Bhuk Lagla.xlsx`, 23 catalogue rows with public descriptions. It contains prices; extract only fields authorised for publication.

Live partner menu: observed group counts Pizza and Pasta 11, Sandwiches 6, Snacks 2, Maggi 4, matching 23 items. A complete live description/availability reconciliation is still needed. No listing was edited or submitted.

The smart link redirected Chrome desktop to `https://www.zomato.com/mobile`, an app-download page. Mobile outlet handoff and item-specific links are not yet verified.

The Oven Vibe lockfile contains Astro 7.1.6, TypeScript 6.0.3, Tailwind CSS 4.3.3 and Sharp 0.35.4. Its site has GitHub Actions, shared menu/business data, central SEO, a manifest/service worker and a separate Worker backend. Its global styles explicitly preserve a desktop-first legacy design.

The Bhuk Lagla repository is owned by `milanbeherazyx`; its name alone does not provide `bhuklagla.github.io` as a domain. GitHub's Pages endpoint returned 404 in this session; no Pages site was verified and no setting was changed.

Recommendations are in `TECH_AND_DESIGN_PROPOSAL.md`. The visual demo is `D:\Bhuk Lagla\outputs\website-demo\bhuk-lagla-demo.html`, with Cream Pop and After Dark alternatives, real logo/mascot assets, six sample dishes, menu search/filtering, item details and About/blog previews. It uses CSS perspective/depth motion as a small visual demonstration; the proposed Three.js production scene is not implemented. Order buttons show a local handoff preview rather than opening Zomato.

Verified in the browser: search results, retained search focus, category filtering, public item descriptions, navigation, help and ordering previews, alternative switching and image loading. Checked phone viewport widths of 320 and 390 pixels for overflow; restored the browser's original viewport. Browser logs showed no errors. The fragment is under 1 MB and JavaScript syntax checks pass. No prices or private recipes are included.

### Design review update, 9 October 2026

Milan approved After Dark, then requested further demos while retaining After Dark as the approved fallback. Cobalt Canteen and Mint Market are explicitly rejected. The active comparison contains Chilli Club, Cherry Diner and After Dark; neither new direction is approved yet. See `D:\Bhuk Lagla\outputs\website-demo\bhuk-lagla-more-directions.html` and the local browser preview at `http://127.0.0.1:8766/more-options.html`.

Milan identified the orange shape behind the food photo as inconsistent and resembling another plate. The Cream and After Dark reference sources now remove the orange halo and use the same soft neutral photo shadow. Original food and logo assets remain intact. The current approved reference is the single After Dark demo at `bhuk-lagla-demo.html`; older multi-option snapshots are historical references. Full implementation is still held for the discussion and PRD stages.

Milan subsequently rejected Chilli Club and Cherry Diner and requested professional alternatives informed by `https://uupm.cc/`, `https://ui-ux-pro-max-skill.com/`, and `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`. The new review contains Kitchen Studio and Slate Table at `D:\Bhuk Lagla\outputs\website-demo\professional-directions.html`, preview `http://127.0.0.1:8766/professional-preview.html`. Neither is approved; After Dark remains the approved fallback. Research and design reasoning are in `PROFESSIONAL_DESIGN_REVIEW.md`.

## Preparation completed

Copied four Claude skill packages with their supporting resources and licences, plus 19 relevant Oven Vibe reference guides. Added six Bhuk Lagla workflow skills and instructions for both Codex and Claude. No website has been scaffolded or deployed.
