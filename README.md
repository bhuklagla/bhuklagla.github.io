# Bhuk Lagla Kitchen

Kitchen Studio website for Sundargarh: approved mascot/logo, 23 real dishes, search and categories, dish pages, local blog, party enquiries and optional anonymous journey notifications. Orders go to Zomato. No website prices, recipes or direct checkout.

Requirements: [PRD](PRD.md). Current implementation: [architecture](docs/ARCHITECTURE.md). Setup and launch: [operations](docs/OPERATIONS.md). Validation: [QA report](docs/QA_REPORT.md).

## Run locally

Use Node 24 and `npm ci`. Copy `.env.example` to `.env.local` and configure the public form key and optional journey API.

```powershell
npm run check
npm test
npm run build
npm run preview -- --port 4321
```

For the optional journey backend, copy `backend/.dev.vars.example` to `backend/.dev.vars`, supply your own ntfy destination, long random owner token and rate-limit salt, then run `npm run backend:dev`. Those values stay outside Git. The local service listens only on `127.0.0.1:8787` and stores anonymous events in ignored `backend/data/`.

Production hosting is GitHub Pages at `https://bhuklagla.github.io/`, owned by the free `bhuklagla` organization. Milan's existing GitHub account owns and manages the organization. The repository was transferred with its history intact. The `main` deployment workflow checks and publishes the root-path static artifact. Copying `.env.example` selects this production target locally; remove `PUBLIC_SITE_URL` for a noindex preview. Consult the release report for actual deployment verification.

The [SEO launch report](docs/SEO_LAUNCH.md) documents 42 indexable pages, festival sources, canonical metadata, structured data, sitemap/image sitemap/RSS and Search Console follow-up. The separate free Bhuk Lagla Cloudflare Worker/D1 provides consented anonymous journey measurement and ntfy alerts; see [notification setup](docs/NOTIFICATIONS_SETUP.md). Contact enquiries use browser-direct Web3Forms.
