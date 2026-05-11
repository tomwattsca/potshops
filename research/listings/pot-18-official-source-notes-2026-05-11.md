# POT-18 official-source acquisition notes — Kitchener/Guelph — 2026-05-11

Source: AGCO public cannabis retail application status table.

Method:
- Queried the public table with `combine=Kitchener` and `combine=Guelph` using a browser-like user agent.
- Parsed the HTML table and filtered rows by exact city/town (`KITCHENER`, `GUELPH`) and `Authorized to Open` status.
- Exact-city filtering was especially important for Guelph because the query also returned `GUELPH LINE` street-name matches in Burlington and Georgetown.
- Selected three `Authorized to Open` rows per city to keep the batch small enough for route, utility, schema, and production verification in one run.

Rows added as conservative `current_source` address-context profiles only:

## Kitchener
- Highland Cannabis — 370 Highland Rd W Unit 15B, N2M 5J9.
- The Cannabist Shop - King — 201 King St W, N2G 1B1.
- Canna Cabana — 1375 Weber St E Unit 111, N2A 3Y7.

## Guelph
- Value Buds — 73 Gordon St, N1H 4H5.
- Canna Cabana — 3 Woodlawn Rd W, N1H 1G8.
- Spiritleaf Guelph — 492 Edinburgh Rd S Unit B2B, N1G 4Z1.

Editorial/compliance posture:
- Use AGCO only for official address and public-status context.
- Do not add hours, live menus, stock, ordering, delivery, ratings, reviews, licence-promotion copy, or availability claims.
- Keep empty phone fields empty so listing JSON-LD omits `telephone`.
- Future enrichment should verify each profile against current public business pages before adding richer details.
