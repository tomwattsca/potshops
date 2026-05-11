# POT-20 official-source acquisition notes — Niagara Falls / Scarborough — 2026-05-12

Source: AGCO public cannabis retail application status table.

Method:
- Queried the public table with combine=Niagara Falls and combine=Scarborough using a browser-like user agent.
- Parsed the HTML table output and filtered rows by exact city/town field plus Authorized to Open status.
- For Scarborough, treated Markham Road rows as Scarborough only, because broad Markham queries can match street names and do not prove a City of Markham page.
- Selected three rows per city to keep the batch small enough for import validation, city utility, schema, and production verification in one run.

Rows added as conservative current_source address-context profiles only:

## Niagara Falls
- Honeypot Smoke Shop — 6832 Drummond Rd, L2G 4P3.
- Value Buds Portage Niagara Falls — 3714 Portage Rd Unit 210, L2J 2K9.
- Sparkle Cannabis Company Niagara Falls — 7000 McLeod Rd Unit 9, L2G 7K3.

## Scarborough
- Pufftastic Cannabis Company — 2830 Markham Rd, M1X 1E6.
- Green Merchant Cannabis Boutique — 33 Lapsley Rd, M1B 1K1.
- BUDSSMOKE — 1133 Markham Rd Unit 3, M1H 2Y5.

Editorial/compliance posture:
- Use AGCO only for official address and public-status context.
- Do not add hours, live menus, stock, ordering, delivery, ratings, reviews, licence-promotion copy, or availability claims.
- Keep phone fields absent/empty unless a separate source supports them, so listing JSON-LD omits telephone.
- Future enrichment should verify each profile against current public business pages before adding richer details.
