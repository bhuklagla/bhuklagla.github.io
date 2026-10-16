# Umami traffic analytics

Requested by the owner in the expressly authorised The Oven Vibe WhatsApp conversation on 17 October 2026 while the search release was being completed. The owner completed password/CAPTCHA/email-code steps himself, selected Europe and instructed use of the free plan. No password or verification code belongs in Git, logs or chat.

Account: **bhuklagla@outlook.com**. Region: **European Union**. Website: **Bhuk Lagla**, domain **bhuklagla.github.io**. Public tracking ID: `4842cf9a-b4ce-468c-804d-a5c544a83d42`. Account dashboard: https://cloud.umami.is/analytics/eu/websites/4842cf9a-b4ce-468c-804d-a5c544a83d42 . This requires the owner's login; do not enable a public share URL automatically.

The current official Hobby plan is free, with one website, up to 100,000 events/month and six-month retention. Verify the actual account's selected plan and current quotas rather than assuming future pricing. No paid plan, API key, team member, replay, heatmap or public analytics share is required. Export useful aggregate baselines before retention expires if the owner wants longer comparisons.

## Integration

The non-secret `PUBLIC_UMAMI_WEBSITE_ID` is set as a GitHub Actions repository variable and local public build variable. It is included in check, deploy and monthly search-health builds. The dashboard supplied the official `https://cloud.umami.is/script.js` URL; no proxy or ad-block bypass is used.

`src/scripts/umami.ts` loads that script only on the production domain, after the visitor allows the existing optional measurement choice. The new preference key is `bhuk-lagla-measurement-v2`, so an old choice does not silently opt a visitor into a newly added provider. A consent withdrawal stops later analytics sends through the before-send guard. Analytics failures cannot interrupt menu browsing or Zomato links.

The guard strips search parameters/fragments and reduces referrers to site origins. It allows only standard pageview fields and three anonymous action names: `zomato-handoff`, `contact-click` and `enquiry-reported`. It does not send form values, typed searches, custom identities/session IDs or event properties. No `identify()` call is used. Public pageviews are automatic; no duplicate manual pageview is sent on initial load. Do Not Track and Global Privacy Control are respected. Private insights, offline and 404 routes do not load the tracker.

Umami can derive approximate country, region and city from network requests. The privacy page explains this and links to Umami's policy. Browser blocks, privacy signals and declined consent can make counts lower than total requests. Zomato handoffs are clicks; they do not prove completed sales. `enquiry-reported` is browser-reported form success.

## Verification and owner use

Three analytics privacy tests cover refusal without permission/after withdrawal, private routes/privacy signals, removal of input/URL data and rejection of unapproved event names. Existing ten backend tests remain. Source/build validation and live browser receipt in the owner's Umami dashboard must be checked before calling collection live.

Use Overview for visitors/visits/views, Pages for popular routes, Sources for referring sites, Environment for device/browser groups, Location for approximate geography and Events for the three anonymous actions. Use Realtime to confirm a consented setup visit. Setup visits are QA, not customer traffic or orders. Keep release-specific evidence, exact plan verification and live reception results in `D:/Bhuk Lagla/outputs/2026-10-17-ai-search/SEARCH_RELEASE_HANDOFF.md`.

Official references checked 17 October 2026: [signup](https://docs.umami.is/docs/cloud/sign-up), [tracker configuration](https://docs.umami.is/docs/tracker-configuration), [tracker functions](https://docs.umami.is/docs/tracker-functions), [metric definitions](https://docs.umami.is/docs/metric-definitions), [pricing](https://umami.is/pricing).
