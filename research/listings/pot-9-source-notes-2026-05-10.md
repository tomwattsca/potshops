# POT-9 source-backed listing enrichment notes — 2026-05-10

Goal: add another conservative importer-backed Potshops batch that supports thin city pages without making purchase, current-operation, delivery, rating, review, or licensing claims.

All rows below are imported as `historical_source`. Source pages were checked on 2026-05-10 and used only for basic directory context (name, city/province, address and/or phone where visible). Potshops should not render outbound cannabis-commerce CTAs for these rows.

## Rows enriched

1. `mount-zion-rastafarian-church` — Mount Zion Rastafarian Church
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/mount-zion-rastafarian-church/`
   - Extracted context: Toronto, ON; 534 Annette St.; phone shown as 416-551-8926.
   - Caveat: overlaps with Blessed Herbs Cafe address/phone, so entity history needs future verification.

2. `maritime-medicinal` — Maritime Medicinal
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/maritime-medicinal/`
   - Extracted context: Bible Hill, NS; 27 Main St.; phone shown as 902-895-9827.
   - Caveat: used as historical Nova Scotia profile context only.

3. `mr-greens` — Mr. Green’s
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/mr-greens/`
   - Extracted context: Nanaimo, BC; 129 Nicol Street; phone shown as (250) 591-0406.
   - Caveat: supports Nanaimo recovery page, not comprehensive city coverage.

4. `tpd-boutique` — TPD Boutique
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/tpd-boutique/`
   - Extracted context: Penticton, BC; 101 151 Front St; phone shown as 1-778-622-1455.
   - Caveat: supports Penticton depth alongside Green Essence; no current-status claim.

5. `blessed-herbs-cafe` — Blessed Herbs Cafe
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/blessed-herbs-cafe/`
   - Extracted context: Toronto, ON; 534 Annette St.; phone shown as 416-551-8926.
   - Caveat: overlaps Mount Zion details; both should remain clearly historical until entity relationship is verified.

6. `eden` — Eden
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/eden/`
   - Extracted context: Salmon Arm, BC; 30 Lakeshore Dr NW; phone shown as 1-778-489-3399.
   - Caveat: creates a small Interior BC recovery page; needs fresher current-status source later.

7. `the-kootenays-medicine-tree` — The Kootenay’s Medicine Tree
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/the-kootenays-medicine-tree/`
   - Extracted context: Nelson, BC; 601 Front Street, Office #102; phone shown as (250) 442-8248.
   - Caveat: supports Nelson recovery page; keep as historical context until fresher sources are found.

## Location utility changes

- Expanded Penticton utility to include TPD Boutique.
- Expanded Toronto utility to include Mount Zion Rastafarian Church and Blessed Herbs Cafe alongside Piff Express.
- Added/updated utility coverage for Nanaimo, Nelson, Bible Hill, and Salmon Arm, each with explicit thin-coverage caveats and next verification steps.
- Added `bible-hill` and `salmon-arm` to the static location footprint/sitemap source.

## Compliance notes

- No row is marked `current_source`.
- No website/outbound commerce URLs were imported.
- Source notes avoid purchase, order, availability, delivery, stock, rating/review, and licence-promotion claims.
