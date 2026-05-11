# POT-17 official-source acquisition notes — Oshawa/Waterloo — 2026-05-11

Source: AGCO public cannabis retail application status table.

Method:
- Queried the public table with `combine=Oshawa` and `combine=Waterloo` using a browser-like user agent.
- Parsed the HTML table and filtered rows by exact city/town (`OSHAWA`, `WATERLOO`) because the Waterloo query also returned street-name matches in Kitchener and Thunder Bay.
- Selected three `Authorized to Open` rows per city to keep the batch small enough for route, utility, schema, and production verification in one run.

Rows added as conservative `current_source` address-context profiles only:

## Oshawa
- The Nug Co. — 514 Ritson Rd S, L1H 5K4.
- Spiritleaf Taunton — 250 Taunton Rd E Unit 12, L1G 7T1.
- Budget Bud Oshawa — 650 King St E Unit 7, L1H 1G5.

## Waterloo
- Value Buds — 628 King St N Unit A4, N2V 0C7.
- Growers Retail — 50 Westmount Rd N, N2L 2R5.
- Phoenix Cannabis — 288 Albert St Unit 101, N2L 0G9.

Editorial/compliance posture:
- Use AGCO only for official address and public-status context.
- Do not add hours, live menus, stock, ordering, delivery, ratings, reviews, licence-promotion copy, or availability claims.
- Keep empty phone fields empty so listing JSON-LD omits `telephone`.
- Future enrichment should verify each profile against current public business pages before adding richer details.
