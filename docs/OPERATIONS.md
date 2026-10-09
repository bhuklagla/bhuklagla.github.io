# Setup and launch

## Current state

Full local website built. Web3Forms free account is owned by `bhuklagla@outlook.com`, with the kitchen enquiry form and that recipient verified in the dashboard. The public form identifier is in `.env.example`; its setup website is currently `localhost`. A clearly labelled party setup submission was accepted by the API and visible in the provider inbox on 9 October 2026. Do not treat that record as a customer enquiry.

A random Bhuk Lagla-specific ntfy channel is subscribed in the owner’s existing browser account. Setup notification and a real anonymous local-test enquiry journey were received. Its URL is saved only in ignored `backend/.dev.vars` and the subscribed browser tab. Existing Oven Vibe channels and settings were not altered. This free channel is unlisted, not access-controlled private.

Static preview: `http://127.0.0.1:4321/`. Journey service: `http://127.0.0.1:8787`. These work only while the local processes run; they are not public deployments.

## Local environment

`.env.local` sets `PUBLIC_WEB3FORMS_KEY` and `PUBLIC_JOURNEY_API`. These values become browser configuration. Never place the ntfy topic/token, owner token or rate-limit salt in a `PUBLIC_` variable.

`backend/.dev.vars` holds `NTFY_TOPIC`, optional `NTFY_TOKEN`, `ADMIN_TOKEN`, `RATE_LIMIT_SALT` and `ALLOWED_ORIGINS`. The local report is `/insights/`; use the existing owner token from this ignored file. It is entered for the request only and is not saved by the report page. Treat it as a private credential.

Local anonymous test data is in ignored `backend/data/journeys.sqlite`. Do not transfer it into a production database. Source CI runs isolated in-memory test databases and stub notification providers.

## Public launch configuration

Owner hosting choice is pending. GitHub holds source and checks. The repository name does not itself provide `bhuklagla.github.io`; the configured hosting account/domain determines the actual URL.

For a static host connected to GitHub: build `npm run build`, output `dist`, Node 24. Configure `PUBLIC_SITE_URL` as the actual approved HTTPS origin, `PUBLIC_BASE_PATH` for any project subpath, `PUBLIC_WEB3FORMS_KEY`, and the deployed HTTPS `PUBLIC_JOURNEY_API`. Without a site URL, preview noindex stays enabled.

For the prepared Worker/D1 service:

1. Create a Bhuk Lagla-specific D1 database and replace the placeholder ID in `backend/wrangler.jsonc`.
2. Apply `backend/migrations/0001.sql` through the official D1 migration command.
3. Set exact website origins in `ALLOWED_ORIGINS`; no wildcard.
4. Store the ntfy destination, owner token and rate-limit salt as Worker secrets. Do not copy another outlet’s configuration.
5. Deploy the Worker, confirm health, negative-origin/auth tests, anonymous event flow and the subscribed ntfy channel.
6. Update Web3Forms’ website setting to the actual contact page. Restrict domains only if the chosen plan supports it; no paid upgrade is authorised.
7. Rebuild the website with the real service/site URL, verify mobile and desktop, sitemap/canonicals/robots, Web3Forms submission, PWA cache update and Zomato mobile handoff before publishing a launch claim.

Daily production cleanup uses the configured scheduled handler. Re-check the retention policy if changing storage. The free Web3Forms dashboard currently allows 250 submissions/month; keep an eye on quota and spam. No auto-responder or webhook paid add-on was enabled.

## Interpretation and maintenance

Zomato clicks show a handoff, not a completed order. The verified partner Outlet info → Smart link drawer for restaurant 22951767 exposes platform-reported menu visits/orders for the supplied default social-media link. Use it for aggregate conversion totals; that link may also be shared elsewhere, so its figures are not exclusive website attribution or a per-session match. Available channel choices were Default, WhatsApp, Instagram, Twitter, Facebook, Google, YouTube and LinkedIn; no website channel was offered. No channel/link setting was changed.

Form success in the journey report is browser-reported; the Web3Forms inbox is the source to review actual enquiries. Visitors who decline measurement are intentionally absent from journeys and ntfy milestones. Notifications can fail without preventing browsing or an enquiry from reaching Web3Forms.

Maintain public catalogue records in `src/data/menu.json`. Current availability remains “Check on Zomato”; hide a dish with `visible: false` only through an authorised content change and update expected catalogue validation deliberately. Never infer stock from old Oven Vibe tracking.

Source changes run GitHub checks. Public deployment is a separate action. Keep rollback as a reviewed Git revert and host rebuild, with service-worker version/update behaviour verified.
