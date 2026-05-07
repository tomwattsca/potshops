# POT-6 source-backed listing enrichment batch — 2026-05-07

Scope: small importer-backed enrichment batch for Potshops legacy listing recovery. These notes support `data/listings.import.json` updates and intentionally avoid purchase, open-now, licensed, delivery, in-stock, rating, or current-availability claims.

## Enriched listings

### Rocket Chronic (`rocket-chronic-2`)
- GSC signal: 2,439 legacy impressions / 6 clicks / average position 6.0.
- Sources:
  - https://rocketchronic.com/contact/
  - https://www.bbb.org/ca/bc/vancouver/profile/marijuana-products/rocket-chronic-0037-2396387
- Imported facts: Vancouver, BC association only; no street address imported.
- Editorial note: Public sources associate Rocket Chronic with Canada and Vancouver, BC, but no street address was verified from accessible source text during this check. Treat as directory evidence only; current licensing and operating status still need confirmation.

### Farm: The Original Farmacy Downtown (`farm-the-original-farmacy-downtown`)
- GSC signal: 1,974 legacy impressions / 2 clicks / average position 25.3.
- Sources:
  - https://the-original-farm.victoriadirect.ca/
  - https://www.leafly.ca/cannabis-store/farm-the-original-farmacy-victoria-johnson
  - https://trustedbud.com/biz/14710-farm-the-original-farmacy-coming-soon-victoria-british-columbia
- Imported facts: 1402 Douglas St, Victoria, BC V8W 2G1.
- Editorial note: Public third-party directory pages associate The Original Farm / Farm - The Original Farmacy with 1402 Douglas St, Victoria, BC V8W 2G1. Leafly data was visibly stale, so treat operating details as historical until independently reverified.

### Mountain Greenery (`mountain-greenery`)
- GSC signal: 1,433 legacy impressions / 15 clicks / average position 8.9.
- Sources:
  - https://mountaingreenery420.com/
  - https://cannawayz.com/dispensaries/mountain-greenery
  - https://cannabisontario.net/stores/mountain-greenery-420/
- Imported facts: 478 Upper Wellington Street, Hamilton, ON.
- Editorial note: The Mountain Greenery website publicly associates the name with Hamilton, Ontario; a third-party Cannawayz page lists 478 Upper Wellington Street. Verify address and compliance details before any promotion.

### Green Essence Head Shop and Dispensary (`green-essence-head-shop-dispensary`)
- GSC signal: 981 legacy impressions / 7 clicks / average position 9.9.
- Sources:
  - https://penticton-bc.findstorenearme.ca/green-essence-head-shop-inc/
  - https://cannawayz.com/dispensaries/green-essence-dispensary
- Imported facts: 409 Martin Street, Penticton, BC V2A 5L1.
- Editorial note: Third-party public directory pages list Green Essence Head Shop Inc. / Green Essence Head Shop & Dispensary at 409 Martin Street in Penticton, BC. Use as public directory evidence only; not a claim of current licensing or availability.

### Ahuevo Premium Marijuana (`ahuevo-premium-marijuana`)
- GSC signal: 539 legacy impressions / 21 clicks / average position 8.3.
- Sources:
  - https://cannawayz.com/deliveries/ahuevo
  - https://tokey.ca/listing/ahuevo/
  - https://www.breken.com/ylm/ylm_comp_detail.aspx?comp_id=643926&f=elgin
- Imported facts: Vancouver, BC association only; no street address imported because third-party sources conflict.
- Editorial note: Public third-party directory pages associate Ahuevo / Ahuevo Premium Marijuana with Vancouver-area locations, but sources conflict on street address. Use only as historical directory evidence and avoid current-status claims.

### The Herb Co Mount Pleasant (`the-herb-co-mount-pleasant`)
- GSC signal: 171 legacy impressions / 4 clicks / average position 30.5.
- Sources:
  - https://thecbd.co/listing/the-herb-co-mount-pleasant/
  - https://humidify.co/listing/the-herb-co-mount-pleasant/
- Imported facts: 1193 Main St, Vancouver, BC V6A 4B6.
- Editorial note: Historical third-party directory pages list The Herb Co. Mount Pleasant at 1193 Main St, Vancouver, BC V6A 4B6. Use as historical public-source evidence only; not a claim of current licensing or availability.

## Compliance posture

- All six rows use `historical_source`, not `current_source`.
- No outbound commercial website fields were added.
- No claims were added about current licensing, hours, ordering, delivery, availability, reviews, ratings, or being open.
- Conflicting address evidence was intentionally not imported for Ahuevo.
- Rocket Chronic was given city/province context only because no accessible source text verified a street address.

## Verification

- `npm run import:listings` returned `Listing import OK: 26 listing(s), 0 warning(s).`
- `npm run build` passed after generation.
