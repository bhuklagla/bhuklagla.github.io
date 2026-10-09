# Cloudflare and notifications — 10 October 2026

Milan requested official Cloudflare skills/setup, real journey notifications, deployment and Android guidance. Everything must remain free. No paid upgrade, payment method or domain purchase was added.

## Verified Cloudflare setup

- The owner created the account using `bhuklagla@outlook.com`. Account ID: `d803c0afae21051499a05fc6cc4fe82c`. The dashboard shows **Free, $0, Current plan**; D1 uses that free account.
- Wrangler 4.149.0 is a pinned project development dependency. The `bhuk-lagla` authentication profile is bound only to `backend/`. The previous default Oven Vibe profile is preserved. `wrangler whoami --cwd backend --json` confirmed the correct email/account before resource creation.
- Worker: `https://bhuk-lagla-journeys.bhuklagla.workers.dev`. Version `917c4675-61a0-4b67-9e49-770aaa99afd9` is deployed. Production D1: `bhuk-lagla-journeys`, ID `aa24d297-1b88-4e3b-8b24-52b20500927f`. Staging D1: `bhuk-lagla-journeys-staging`, ID `17bcced6-0230-478c-92ae-a07c3cb811fc`. Migrations 0001–0003 were applied to staging before production; the queue and retention query plans use indexes.
- Production owner token, rate-limit salt and ntfy destination are in ignored `backend/.dev.vars.production` and Worker secrets. Local QA data was not copied to D1. Never put these values into `PUBLIC_` variables or public screenshots.
- Anonymous setup events were accepted and returned in the owner-authenticated report. Health returned 200, an unrelated origin 403, missing owner access 401 and an oversized request 413. Completed Zomato orders remain `unknown`.
- Origin allowlist covers the current personal-account Pages host and the requested future `https://bhuklagla.github.io` host. Enabling a new origin does not create that website.

## Official agent setup

Followed [Cloudflare's agent setup prompt](https://developers.cloudflare.com/agent-setup/prompt.md). Installed all 16 [official skills](https://github.com/cloudflare/skills) from commit `ff91b2df2ed968eca50b5982c277d13351ed93e8` under `C:\Users\milan\.codex\skills`, using Codex's skill installer. Applied cloudflare, wrangler and workers-best-practices plus the D1 references to this service. The existing Wrangler configuration remains authoritative; the optional beta cf CLI was unnecessary.

Registered Codex's official MCP server `cloudflare` at `https://mcp.cloudflare.com/mcp`. Its default broad OAuth request was cancelled. The owner completed the narrowed grant: User Read, Account Read, Background Access, Workers Scripts Read/Write and D1 Read/Write. Codex confirmed successful MCP login; `codex mcp get cloudflare` verifies the enabled HTTP server. Restart/reload Codex to load its new MCP tools. Credentials remain outside Git.

For future Wrangler OAuth login, start a fresh matching request and listener. Do not reuse expired callbacks or bypass state/PKCE checks. The MCP manual callback mode can display connection refused in the browser; the matching URL must be returned to the waiting CLI, which performs validation.

## Verified delivery and retries

Initial direct ntfy.sh publishing from the owner machine worked, while the production Worker returned HTTP 522. That delivery issue is resolved by the separate free server `https://bhuk-lagla-notifications.onrender.com`, deployed in the owner-created kitchen-email Render account. A live Worker milestone was accepted by that server and visible in its subscribed web app/cache. D1 records provider acceptance separately from phone receipt.

The [ntfy maintainer's issue](https://github.com/binwiederhier/ntfy/issues/1832) explains the original shared-IP timeout. Bhuk Lagla now uses its own ntfy v2.29.0 server, Render service `srv-db4kloui0phs73d23n40`, Free $0/month, Singapore. No payment method or upgrade was added; Oven Vibe infrastructure is unchanged. `ops/ntfy/render.yaml` records deployment settings. A five-minute health check helps keep it ready; free hosting can still restart or suspend on quota exhaustion. Its cache is ephemeral and can disappear on restart.

Milestone alerts now enter a D1 outbox before asynchronous delivery. Each attempt leases the record, stores provider status and retries with backoff through a five-minute cron. Queue records expire after 24 hours; journey events after 30 days. Successful provider acceptance is recorded separately from physical phone receipt. A response lost after provider acceptance can cause a repeated alert on retry; exactly-once phone delivery is not claimed. The owner report exposes accepted/pending alerts. The earlier failed setup alert remains retryable; a new live setup alert has confirmed provider acceptance.

Ten automated tests cover privacy, validation, origins, duplicate events, owner access, byte-limited streaming bodies, indexed retention, failed-delivery retry and concurrent alert leases. Stub-provider success is not a substitute for live ntfy verification.

## Website and account handoff

The website is currently published at `https://milanbeherazyx.github.io/bhuklagla.github.io/`. Milan explicitly rejected that as the final customer address and requested **`https://bhuklagla.github.io/`**, using a separate GitHub user account like The Oven Vibe. GitHub confirms The Oven Vibe's owner is a User named `theovenvibe`, not an organisation.

The `bhuklagla` signup was prepared, but GitHub rejects `bhuklagla@outlook.com` with “Email domain could not be verified”. Outlook MX records are valid. A different signup email or the owner's explicit choice of a free organisation is needed. Do not claim the short URL is live yet. The deployment workflows derive the GitHub origin/base from repository ownership so the root site can build correctly after an authorised transfer.

The current repository's `PUBLIC_JOURNEY_API` is set to the verified Worker URL. The next checked Pages build activates its visitor opt-in measurement. Record the actual deployment/live consent test before calling website integration complete. Visitors who decline remain untracked. No fake party enquiry or completed order should be submitted for QA.

## Android

Install the official [ntfy Android app](https://play.google.com/store/apps/details?id=io.heckel.ntfy), allow notifications, and subscribe using the server/topic in the owner's private `../outputs/website-demo/ntfy-mobile-setup.md`. Use custom server `https://bhuk-lagla-notifications.onrender.com`; old ntfy.sh subscriptions do not receive these alerts. Keep the topic out of public posts. Enable Instant delivery if needed, following [ntfy's phone documentation](https://docs.ntfy.sh/subscribe/phone/).

The owner confirmed subscribing on Android. Physical receipt of the labelled test still needs confirmation. Browser/server acceptance cannot establish Android receipt. Contact intent is not an enquiry submission; Web3Forms success is browser-reported; a Zomato handoff is not a completed order.

## Laptop

Added the dedicated Render server as an external subscription in the existing ntfy.sh web app, with display name **Bhuk Lagla Kitchen**. The labelled setup test appeared in that feed. Existing subscriptions were preserved. Web-app settings show notifications are received while the app is running via WebSocket; keep its tab open. The laptop recheck test is explicitly synthetic. Browser feed receipt does not prove a Windows notification toast or Android receipt.
