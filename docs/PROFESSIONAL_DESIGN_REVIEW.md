> Historical design discussion. Superseded by the approved Kitchen Studio full build; see PRD.md, ARCHITECTURE.md and OPERATIONS.md for current decisions.

# Professional website design review

9 October 2026. Exploratory concepts for owner review; not a production application or an approved replacement for After Dark.

## Sources and method

- Official project site: https://uupm.cc/
- Owner-supplied translation and examples site: https://ui-ux-pro-max-skill.com/ (identifies itself as unofficial).
- Upstream project: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Restaurant gallery example inspected in the browser: https://uupm.cc/demo/restaurant-food
- Repo-local UI UX Pro Max and frontend-design skills.

Ran the local skill's required design-system search, then focused typography, style and accessibility searches. The broad initial query produced an irrelevant enterprise pattern; it was discarded. The focused `restaurant` query supplied a hero-to-menu conversion structure. The geometric typography search returned Outfit / Work Sans; style searches reinforced consistent spacing, restrained effects and clear hierarchy.

These are recommendations requiring judgment, not proof of aesthetic quality. The reference restaurant's table reservations, fine-dining copy, testimonials, prices, operational details and claims do not apply to Bhuk Lagla. Its layout hierarchy and photo grouping informed this review; its assets and business content were not copied.

## Kitchen Studio

White `#FFFFFF`, ink `#202421`, secondary text `#5D645F`, quiet surface `#F2F4F1`, brand orange `#F56A16`, pure-veg indicator `#28633B`.

Outfit headings with Work Sans body. A balanced two-column desktop introduction pairs readable copy with a coordinated real-food gallery. Mobile stacks the introduction and gallery. The mascot moves to the kitchen story, giving the food more room. Category tiles and menu search share one photo treatment and spacing system. Orange identifies primary actions instead of a decorative plate or halo.

## Slate Table

Slate `#1D2B34`, white `#FFFFFF`, paper `#F3F5F6`, quiet surface `#E8EDF0`, muted text `#52606B`, orange `#FF9151`.

Manrope typography. A darker photo showcase introduces the pizza, then a large pizza panel and smaller sandwich/snack rows guide discovery. Mobile shows the actual food photo before the introduction. Its darker palette is a new exploration informed by the approved After Dark direction, not a replacement approval.

## Interaction and disclosure

Both demos include six real sample dishes, local menu search and category filters, keyboard-accessible native dish dialogs, an About/food-talk preview and an ordering handoff simulation. They do not open or place orders on Zomato. Current availability remains a Zomato check rather than invented live data.

No prices, private recipes, preparation settings, costs, supplier details or fake ratings are embedded. Public item descriptions are reused from the existing authorised demo. Existing logos, mascot and food photo originals remain intact. Only the limited preview is built; full pages, SEO implementation, backend, PWA and production 3D remain part of the later discussion and PRD.

## Review status

After Dark: approved fallback. Cobalt Canteen, Mint Market, Chilli Club and Cherry Diner: rejected. Kitchen Studio and Slate Table: awaiting visual feedback. Do not infer that a new preview has been selected from navigation within the demo.
