# Website skills

These skills are local to this repository. Codex and Claude can read the same files through `AGENTS.md` and `CLAUDE.md`; no global skill installation is required.

## Bhuk Lagla workflows

| Task | Skill |
| --- | --- |
| Discuss scope, customer journey and design before building | `website-planning/SKILL.md` |
| Add or update menu items, prices, descriptions, combos and availability | `menu-content/SKILL.md` |
| Prepare brand assets and food photos | `food-and-brand-assets/SKILL.md` |
| Maintain business facts, metadata and search information | `business-and-seo/SKILL.md` |
| Build checks, browser verification and troubleshooting | `website-qa/SKILL.md` |
| Review changes, configure deployment and recover releases | `release-and-deploy/SKILL.md` |

## Copied Claude packages

| Skill | Location | Use |
| --- | --- | --- |
| frontend-design | `.claude/skills/frontend-design/SKILL.md` | Distinctive website design from the agreed brief |
| theme-factory | `.claude/skills/theme-factory/SKILL.md` | Optional theme comparisons; includes showcase PDF and 10 themes |
| ui-ux-pro-max | `.claude/skills/ui-ux-pro-max/SKILL.md` | Searchable design, accessibility, typography and stack references |
| webapp-testing | `.claude/skills/webapp-testing/SKILL.md` | Local browser testing; includes server helper and examples |

Read each selected skill before using it. Resolve its bundled resources from its own directory. UI/UX Pro Max examples use `skills/ui-ux-pro-max/scripts/search.py`; here the correct repository-root path is `.claude/skills/ui-ux-pro-max/scripts/search.py`. On Windows use `python`.

Commands to inspect the helpers without choosing a design or starting a site:

```powershell
python .claude/skills/ui-ux-pro-max/scripts/search.py --help
python .claude/skills/webapp-testing/scripts/with_server.py --help
```

Do not use `--persist` to establish a design system until the design discussion has settled the direction. Do not assume native-app guidance applies to this website. Keep generated recommendations subordinate to the actual brief and approved brand assets.

## Source and transfer boundary

Source: `D:\Workbench\The Oven Vibe\theovenvibe.github.io`, checked-out commit `e89e15658b59bc1736189ba378b6fc6b017c1572` on `develop`, copied 9 October 2026. The source working tree was clean.

`references/oven-vibe/` contains 19 unchanged task guides: menu changes, photo handling, business information, delivery charges, blog content, analytics, QA, troubleshooting and release practices. They preserve useful examples for later adaptation. Their source paths, branch policies, contact details, prices, delivery terms and service configuration belong to The Oven Vibe. Follow the Bhuk Lagla workflow skills above instead of treating these references as active instructions. Where an original guide refers to missing source files, consult the original repository only if needed; do not create those dependencies automatically.

Excluded source guides:

- `manage-offers.md`: tied to The Oven Vibe's production Worker/database.
- `setup-order-alerts.md`: specific direct-order notification setup, outside the confirmed Zomato journey.
- `stacked-prs.md`: depends on an external/global gh-stack installation and source branch layout; unnecessary for this preparation.

All four Claude packages were copied with scripts, examples, local data, themes and existing licence files. UI/UX Pro Max's search examples were adjusted to this repository's actual path and Windows `python` command; its other content and resources are unchanged. Python bytecode caches were excluded. No website code, source business config, deployment workflow, analytics identifier, backend service or global Claude setting was copied.
