# POT-47 — Internal handoff measurement for existing Potshops pages

Fresh Maton evidence for 2026-04-01..2026-05-14 kept Potshops in measurement/refinement mode:

- GSC: 16 page rows / 46 query rows / 51 query-page rows.
- Top rows included `/` (1 click / 54 impressions), legacy `www` root (1 / 12), old singular Cannabis Culture URL (0 / 22), `/listings/green-leaf` (0 / 23), `/listings/green-essence-head-shop-dispensary` (0 / 16), and low-row `/locations/calgary` query evidence.
- GA4 property `537632696`: 15 page-view/lifecycle rows in the sampled report, including `/`, `/listings/green-leaf`, `/locations/kahnawake`, `/listings/cannabis-culture-920-davie`, and `/listing/best-buds-forever`; no sampled `listing_update_click` rows yet.

Instead of adding listings or URLs, POT-47 makes existing internal handoffs measurable:

- Homepage current-signal/province/grid links now expose delegated `internal_link_click` hooks.
- Location profile-card/listing/category handoffs now expose delegated `internal_link_click` hooks.
- Listing related city/category links now expose delegated `internal_link_click` hooks.
- The GA4 delegated listener now whitelists `listing_update_click` and `internal_link_click`, sends only same-origin `link_url` paths, and keeps `page_location` to the current path to avoid leaking external URLs or user-entered values.

This should let the next delayed GA4 read distinguish whether visitors are using the existing homepage/listing/location routing even before update-form clicks appear.
