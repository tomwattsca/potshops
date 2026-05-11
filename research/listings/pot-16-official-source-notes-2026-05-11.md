# POT-16 official-source acquisition notes — Mississauga/Barrie — 2026-05-11

Source: AGCO public cannabis retail application status table.

Method:
- Queried the public table with `combine=Mississauga` and `combine=Barrie` using a browser-like user agent.
- Parsed the HTML table and filtered rows by exact city/town (`MISSISSAUGA`, `BARRIE`) rather than trusting text search alone.
- Selected three `Authorized to Open` rows per city to keep the batch small enough for route, utility, schema, and production verification in one run.

Rows added as conservative `current_source` address-context profiles only:

## Mississauga
- WE'D Cannabis — 2400 Dundas St W Unit 14, L5K 2R8.
- Canna Cabana — 2090 Hurontario St Unit 4, L5B 1M8.
- Kindling Cannabis Port Credit — 251 Lakeshore Rd E, L5G 1G8.

## Barrie
- Pop's Cannabis Co. — 534 Bayfield St Unit B, L4M 5A2.
- Spiritleaf Park Place — 120 Park Place Boulevard Unit 1 Building 3, L4N 6P1.
- Emerald Cannabis Co — 102 Bayfield St Unit 2, L4M 3A8.

Editorial/compliance posture:
- Use AGCO only for official address and public-status context.
- Do not add hours, live menus, stock, ordering, delivery, ratings, reviews, licence-promotion copy, or availability claims.
- Keep empty phone fields empty so listing JSON-LD omits `telephone`.
- Future enrichment should verify each profile against current public business pages before adding richer details.
