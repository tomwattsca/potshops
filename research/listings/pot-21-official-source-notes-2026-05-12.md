# Potshops POT-21 official-source acquisition — Pickering / Ajax

Session: 2026-05-12 hourly owned-sites work block.

## Source

AGCO public cannabis retail application status table. Queries used:

- https://www.agco.ca/en/cannabis/status-current-cannabis-retail-store-applications?combine=Pickering
- https://www.agco.ca/en/cannabis/status-current-cannabis-retail-store-applications?combine=Ajax

Rows were selected only when the AGCO city/town field exactly matched Pickering or Ajax and the public status was `Authorized to Open`.

## Rows added

### Pickering

- Montrose — 1755 Pickering Pkwy Unit A-021B — Authorized to Open.
- HOLLAND DAZE — 981 Brock Rd Unit 2 — Authorized to Open.
- CANNABIS XPRESS — 1692 Central St Unit 1 — Authorized to Open.

### Ajax

- The 6ix Cannabis — 475 Westney Rd N Unit 13 — Authorized to Open.
- One Plant — 20 Kingston Rd W Unit 3A — Authorized to Open.
- Cannaverse — 314 Harwood Ave S Unit 16 — Authorized to Open.

## Compliance posture

Potshops records these as conservative `current_source` address-context rows only. Do not add hours, menus, stock, ordering, delivery, ratings, review, licence-promotion, or availability claims unless future visible sources and compliance review explicitly support those exact facts.

## Utility added

- `/locations/pickering` with exact mapped profile links and Durham Region caveats.
- `/locations/ajax` with exact mapped profile links and Ajax/Pickering overlap caveats.
