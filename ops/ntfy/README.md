# Bhuk Lagla notification server

Deployed 10 October 2026 in the owner's separate Bhuk Lagla Kitchen Render workspace, using the kitchen email. Service `srv-db4kloui0phs73d23n40`, first deployment `dep-db4klpmi0phs73d23q50`, endpoint `https://bhuk-lagla-notifications.onrender.com`. Selected compute: Free, $0/month, Singapore. No payment method or upgrade was added.

`render.yaml` records the actual service settings. It uses the official ntfy v2.29.0 Docker image, verified in its GitHub release and Docker Hub. Render's deployed amd64 image digest is `sha256:2384ab26a175f11c90244236e4a1bea7c12ba81273a9c3364461d739a15ad882`. Startup is `ntfy serve`, port 10000, health `/v1/health`, with a 24-hour temporary message cache.

The server uses unlisted topics, not authenticated private subscriptions. Keep the kitchen topic in Worker secrets and owner-only phone instructions. Customer names/email/phone/messages do not pass through it. No public signup or paid storage is needed for the phone subscription.

The Cloudflare cron checks health every five minutes and retries queued alerts. Free hosting can still restart, suspend on quota exhaustion or cold-start. Render's filesystem is ephemeral, so cached notifications can disappear on restart; D1 retains journey evidence and pending deliveries separately. Provider acceptance is not proof of phone receipt. Do not promise guaranteed uptime or exactly-once notification delivery.

Use only this workspace/service; The Oven Vibe's server, channels, accounts and quota are unchanged. See `../../docs/NOTIFICATIONS_SETUP.md` for activation and phone verification.

References: [ntfy Docker installation](https://docs.ntfy.sh/install/#docker), [Render free limits](https://render.com/docs/free), [Render Blueprint format](https://render.com/docs/blueprint-spec).
