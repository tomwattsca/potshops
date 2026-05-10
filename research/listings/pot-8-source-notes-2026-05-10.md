# POT-8 source-backed listing enrichment notes — 2026-05-10

Goal: enrich another importer-backed Potshops batch without adding purchase, order, current-availability, current-licence, ratings/reviews, or outbound cannabis CTAs.

## Rows updated

1. `leagle-dreams` — L’Eagle Dreams, Shannonville, ON
   - Source: MapQuest public business listing, `https://www.mapquest.com/ca/ontario/leagle-dreams-marijuana-dispensary-429548106`.
   - Imported: Old Highway 2 address context and phone.
   - Caveat: historical directory evidence only; current operating/licence status still needs official confirmation.

2. `clone-corner` — Clone Corner, Duncan, BC
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/clone-corner/`.
   - Imported: Sahilton Road address and phone.
   - Caveat: historical directory evidence only; no current hours, licence, or availability claims.

3. `gulf-island-organics` — Gulf Island Organics, Victoria, BC
   - Source: Google Business Profile result for the exact brand query.
   - Imported: Fort Street address and phone.
   - Caveat: source result labels the business permanently closed, so Potshops keeps this as a historical row and avoids current-store claims.

4. `tribal-releaf` — Tribal ReLeaf, Tobique Narrows, NB
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/tribal-releaf/`.
   - Imported: NB-105 address and phone.
   - Caveat: historical directory evidence only; no current hours, licence, or availability claims.

5. `piff-express` — Piff Express, Toronto, ON
   - Source: Ontario court decision summary, `https://www.minicounsel.ca/2022/01/17/r-v-morrison-and-raguette-2022-onsc-17/`.
   - Imported: Dundas Street West address context.
   - Caveat: enforcement-context source only; do not use as current service or commercial evidence.

6. `remedy-ice-cream` — Remedy Ice Cream, Calgary, AB
   - Source: CBC Calgary reporting, `https://www.cbc.ca/news/canada/calgary/remedy-ice-cream-cannabis-1.4059691`.
   - Imported: Calgary association only, no contact fields.
   - Caveat: historical media evidence with legality concerns; no current service or commerce claims.

## Location utility updates

- Added new route/utility footprint for Shannonville, Tobique Narrows, and Duncan because each now has one source-backed listing.
- Expanded Victoria, Toronto, and Calgary utility copy/internal links around the newly enriched rows.

## Compliance posture

All updated rows remain `historical_source`. No website/outbound cannabis CTA fields were added. `commercial_claims` remains empty for every updated row.
