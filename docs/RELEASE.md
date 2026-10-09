# Live release — 9 October 2026

Website: [Bhuk Lagla Kitchen](https://milanbeherazyx.github.io/bhuklagla.github.io/).

Release commit: `40a278b825a1b104a94b2badf5bd8dd337a1649e` on `main`, merged through [PR #1](https://github.com/milanbeherazyx/bhuklagla.github.io/pull/1). Review commit: `1a55e15887f0f7323c1dab3362d1aba18e33dbd4`.

[Pages deployment 37966728855](https://github.com/milanbeherazyx/bhuklagla.github.io/actions/runs/37966728855) succeeded. Its build repeated dependency installation, formatting, Astro/catalogue checks, six backend privacy/journey tests and production-build validation before publishing. [Main checks 37966728793](https://github.com/milanbeherazyx/bhuklagla.github.io/actions/runs/37966728793) also passed. Source checks and GitGuardian passed before merge. HTTPS is enforced; no custom domain is configured.

## Live evidence

- All 42 indexable sitemap URLs returned HTTP 200 with the matching canonical URL and no preview noindex tag. All 23 image-sitemap URLs returned images. Six RSS entries and all five XML files parsed successfully.
- Manifest start URL/icons, favicons, logo, robots and service worker returned successfully with the project path. Offline and insights retain noindex. Checked HTML contained no private destination/token markers. Order links contain the approved Zomato smart link.
- The browser showed the approved hero/logo/mascot/paneer photo. Public menu search for paneer returned two dishes. Contact defaults to party first, general second; Phone is required and the form key is configured. No new enquiry or order was submitted during launch.
- Festival hub and article fit 320px and 390px without horizontal overflow; desktop was checked. Images are outside Git under `../outputs/website-demo`: `live-home-desktop.jpg`, `seo-festivals-mobile.png`, `seo-festivals-desktop.jpg`. The read-only live verifier is `verify-live-seo.py` in that folder. Keep ntfy screenshots outside public Git because they contain the unlisted destination.
- Web3Forms' Website URL was updated from localhost to the live contact page. Its recipient remains the verified kitchen email; the earlier setup record is not customer activity.

## Remaining account setup

The available Cloudflare CLI belongs to The Oven Vibe; nothing was deployed there. The owner needs to create/sign into the separate free Bhuk Lagla account using `bhuklagla@outlook.com`, then configure the prepared Worker/D1 and backend-only secrets. Public ntfy/journey measurement remains disabled until the real HTTPS endpoint is set. Local test records are not production customer data.

Google Search Console verification and sitemap submission need the owner's Google account and actual verification file/tag. Additional public street address/hours/phone and Bhuk Lagla's Google Business Profile link are pending; the site keeps Sundargarh + email. Rankings, virality and completed Zomato orders are not guaranteed or invented. See [SEO launch](SEO_LAUNCH.md).

The local preview is now `http://127.0.0.1:4321/bhuklagla.github.io/`; local journeys remain at `http://127.0.0.1:8787`. Existing Oven Vibe repositories/accounts/channels and the root website were unchanged. Historical pre-launch evidence is retained in Git history and `BUILD_HANDOFF.md`.
