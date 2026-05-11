# POT-19 official-source acquisition notes — Brampton/St. Catharines — 2026-05-11

Source: AGCO public cannabis retail application status table.

Method:
- Queried the public table with `combine=Brampton` and `combine=St.%20Catharines` using a browser-like user agent in the preceding work block.
- Parsed the HTML table output and filtered rows by exact city/town (`BRAMPTON`, `ST CATHARINES`, `ST. CATHARINES`) plus `Authorized to Open` status.
- For St. Catharines, excluded the cancelled duplicate Spiritleaf row and only added authorized public-status rows.
- Selected three rows per city to keep the batch small enough for import validation, location utility, schema, and production verification in one run.

Rows added as conservative `current_source` address-context profiles only:

## Brampton
- MOONWLKR Cannabis — 11685 Mcvean Dr Unit 44, L6P 4N5.
- Value Buds Worthington Brampton — 17 Worthington Ave Unit 7, L7A 2Y7.
- Vibes Cannabis Company Brampton — 117 Inspire Blvd, L6R 3W4.

## St. Catharines
- One Plant St. Catharines — 343 Glendale Ave Suite 520, L2T 0A1.
- Spiritleaf St. Catharines — 400 Scott St Unit C2, L2M 3W4.
- Superbud St. Catharines — 216 Glenridge Ave Unit 11AB, L2T 3J9.

Editorial/compliance posture:
- Use AGCO only for official address and public-status context.
- Do not add hours, live menus, stock, ordering, delivery, ratings, reviews, licence-promotion copy, or availability claims.
- Keep phone fields absent/empty unless a separate source supports them, so listing JSON-LD omits `telephone`.
- Future enrichment should verify each profile against current public business pages before adding richer details.
