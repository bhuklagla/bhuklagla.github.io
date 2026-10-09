---
name: website-qa
description: Verify the implemented Bhuk Lagla website with meaningful build, content, mobile and browser checks, and diagnose failures. Use after website code exists or when reviewing a website change.
---

# Website verification

Discover the implemented stack and package scripts before choosing checks. No website application currently exists. Do not claim a build passed when only preparation documents were validated.

After implementation, run the relevant project build and data checks. Preview the built result using the actual URL and port printed by the server. Check the changed behaviour and affected routes; do not assume Oven Vibe's routes or selectors exist.

For layout changes, inspect mobile and desktop screenshots. Check readable text, image crops, touch targets, keyboard focus, reduced motion, navigation and overflow. For menu changes, verify current prices, ingredients and availability consistently across cards and structured data.

Verify Zomato buttons lead to the correct outlet. Check missing images, browser errors, metadata and parseable structured data where relevant. Do not submit orders or contact third parties during testing.

Read `.claude/skills/webapp-testing/SKILL.md` when local Playwright testing is useful. From the repository root its server helper is `.claude/skills/webapp-testing/scripts/with_server.py`; run `--help` first. Inspect rendered controls before selecting them. Use readiness checks appropriate to the application rather than arbitrary sleep delays.

Fix original source files, never generated build output. Report what was checked and any remaining limitation. Source examples: `skills/references/oven-vibe/qa-check.md`, `verify-site.md`, and `troubleshoot-build.md`.
