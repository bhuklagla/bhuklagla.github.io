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

Production hosting is GitHub Pages at `https://milanbeherazyx.github.io/bhuklagla.github.io/`. The `main` deployment workflow checks and publishes the static artifact. Source-branch checks use the same origin and project path. Copying `.env.example` selects this production target locally; remove `PUBLIC_SITE_URL` for a noindex preview.

The [SEO launch report](docs/SEO_LAUNCH.md) documents 42 indexable pages, festival sources, canonical metadata, structured data, sitemap/image sitemap/RSS and Search Console follow-up. GitHub Pages cannot run the private journey backend; its Bhuk Lagla Cloudflare account is pending. Contact enquiries still use the configured browser-direct Web3Forms integration.
