---
name: menu-content
description: Maintain Bhuk Lagla menu items, prices, descriptions, combos, add-ons and manual availability using the verified menu source. Use when editing website menu content.
---

# Menu content

Milan confirmed that website prices must not be published. Exclude price fields from public HTML, JSON, search indexes, structured data and client bundles. Use public Zomato descriptions and verify them against the current catalogue. Identify items by Bhuk Lagla's own stable IDs; do not copy Oven Vibe item IDs or dishes.

Once implemented, locate the actual menu source and schema before editing. Keep names, prices, descriptions, ordering destinations and structured data consistent through a shared data source. Preserve approved ingredient descriptions and pure-veg, egg-free wording. Keep raw kitchen quantities, costing and unverified health claims out of customer copy.

For new items or combos, check photos, category and valid references; actual prices and offers are revealed on Zomato. Never publish recipes, quantities, preparation steps, timings, equipment settings, suppliers or costing. For unavailable or retired items, preserve their data and review dependent combos and featured cards. Prefer reversible hiding over deletion. Do not introduce ingredient stock deductions or an inventory subsystem. Do not call a manual/static status live Zomato availability.

Verify the changed menu in the rendered website and validate data using the project's actual checks. Check the relevant Zomato link without placing an order.

Source examples, for adaptation only: `skills/references/oven-vibe/update-price.md`, `update-description.md`, `add-menu-item.md`, `update-combo.md`, and `remove-or-disable-item.md`. Their paths and schema are not yet this website's architecture.
