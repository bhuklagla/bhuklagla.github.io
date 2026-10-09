---
name: release-and-deploy
description: Prepare, review and verify Bhuk Lagla website releases and recovery using the actual Git repository and chosen hosting configuration. Use for requested version-control or deployment work.
---

# Release and deployment

Check the working tree, origin, upstream and relevant instructions before making Git changes. Preserve unrelated user edits. This repository currently has `main`; do not assume a `develop` branch or copy the source project's historical branch freezes.

When website implementation is approved, agree on hosting and establish a build/deploy workflow for this repository. Do not copy Oven Vibe's custom domain, Worker endpoints, credentials, account settings or production workflow. Never deploy raw framework source accidentally.

Run checks appropriate to the change and inspect the diff. Use focused commits when requested or part of authorized release work. Before an external release, prepare a concrete reviewable result and honour the user's current authorization. Discussion-only work does not authorize website publishing.

For a requested deployment, verify the actual CI run and live pages, images, canonical URL and Zomato destination. A push or successful build alone is not evidence of a live release. Record the commit, checks, deployment evidence and remaining limitations.

For recovery, inspect the failure and recent history first. Prefer a reviewable revert of the faulty change; do not force-push, reset away user edits or operate on another restaurant's services without explicit scope.

Source examples: `skills/references/oven-vibe/deploy-cicd.md`, `release-manager.md`, and `release-recovery.md`. Their historical commands and policies are reference examples only.
