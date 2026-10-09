# Website validation — 9 October 2026

Environment: Windows, Node 24.19.0, Astro static build served at `127.0.0.1:4321`, local SQLite journey backend at `127.0.0.1:8787`, Chrome browser.

## Verified

- `astro check`: no errors; catalogue validation covers 23 unique dishes, allowed public fields and 69 responsive photo derivatives.
- `npm test`: five tests cover event privacy/input validation, origin rejection, duplicate event suppression, anonymous ntfy message contents, private report authentication and removal of expired events.
- `npm run build`: 41 HTML pages; all generated local links/assets resolve, structured JSON parses, manifest and public-content checks pass.
- Browser: approved complete top-left logo and large mascot/Paneer pizza gallery; real images load; menu search “paneer” finds two dishes, sandwich filter narrows to one, and going back from the dish preserves the query/filter.
- Mobile Home/Menu/More navigation and Contact link work. Party selection reveals birthday, anniversary and other occasion fields.
- Real setup-only party enquiry: API success displayed, Web3Forms dashboard inbox contains the labelled test, ntfy shows its anonymous page/menu/dish/enquiry journey without contact details. This is test activity, not a customer conversion.
- Offline browser emulation: cached menu reloads; offline status explains stale content; Order on Zomato is blocked with a reconnect message. Network conditions were restored afterwards.

- Chrome layouts at 320px: home, menu, party contact, pizza detail and blog article all have no horizontal overflow and no broken loaded images. Also checked a normal 390px phone and the standard desktop viewport. The mobile mascot/food gallery remains usable below the initial screen.
- Landscape at 844×390 has no horizontal overflow and a compact 61px navigation dock. Reduced-motion emulation leaves the headline visible. Browser logs contain no errors; the initial deprecated Three.js Clock warning came from the replaced prototype, and the final module no longer uses it.
- Root and `/bhuklagla.github.io/` base-path builds both pass asset/link validation; the latter uses a temporary validation origin and generates sitemap/robots/canonicals. The preview build was restored with noindex afterwards.
- Owned implementation files pass formatting and whitespace checks. Copied upstream Claude packages retain their original whitespace and are excluded from the formatter.

Evidence files are outside the repository in the workspace demo output folder, so the unlisted ntfy URL is not published in GitHub artifacts. Offline/device overrides are reset after browser QA. Lighthouse scores and real-device installation are not claimed from these checks.

## Launch limitations

No public host/domain or production journey database is configured. Preview noindex is deliberate. Mobile Zomato app/outlet handoff still needs a real device check; the supplied smart link redirects desktop Chrome to Zomato’s mobile app-download page. No order was placed. The partner Smart Link drawer for Bhuk Lagla Kitchen (22951767) confirms the exact supplied link and offers aggregate menu-visit/order reporting. Automated per-website-session paid-order attribution remains unavailable.

Lighthouse/field Core Web Vitals and Google indexing/ranking have not been measured on a production origin. PRD performance goals remain targets. Search ranking within a few days is not guaranteed. Full Google local-business rich results require further owner-approved publication facts; only city/email were authorised here.
