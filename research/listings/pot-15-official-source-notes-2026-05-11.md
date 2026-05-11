# POT-15 official-source notes — 2026-05-11

Source: AGCO public cannabis retail application status table. Queried `combine=London` and `combine=Windsor`, then filtered HTML table rows by exact city/town and selected `Authorized to Open` rows for conservative address-context import.

Added current-source address-context rows only; no hours, menu, stock, ordering, delivery/service availability, ratings, reviews, or licence-promotion claims were added. Empty phone values remain empty so listing JSON-LD omits `telephone`.

## London selected rows

- The Cannabist Shop - Wharncliffe N — 60 Wharncliffe Rd N Unit B, London, ON N6H 2A3 — AGCO row `CRSA1211175`.
- Holy Cannabis — 1080 Adelaide St N Suite 9, London, ON N5Y 2N1 — AGCO row `CRSA1205329`.
- Cost Cannabis — 1905 Dundas St E Unit B2, London, ON N5W 3G3 — AGCO row `CRSA1362581`.

## Windsor selected rows

- Value Buds — 1726 Huron Church Rd Suite 4, Windsor, ON N9C 2L4 — AGCO row `CRSA1339026`.
- Discounted Cannabis — 397 Wyandotte St W, Windsor, ON N9A 5X3 — AGCO row `CRSA1377005`.
- Greentown Cannabis Discount Hut — 1519 Drouillard Rd, Windsor, ON N8Y 2S1 — AGCO row `CRSA1221384`.

## Implementation notes

- Added six rows to `data/listings.import.json`.
- Regenerated `app/data/listings.generated.json` via `npm run import:listings`.
- Added `london` and `windsor` to `priorityLocations` and `locationUtilities` so listing pages are linked from exact city pages and sitemap coverage is intentional.
