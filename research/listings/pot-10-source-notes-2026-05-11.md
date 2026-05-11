# POT-10 source-backed listing enrichment notes — 2026-05-11

Goal: continue the Potshops importer-backed rebuild with a smaller, stronger-source batch rather than adding unsupported page volume. This batch uses accessible public directory pages only for basic historical profile context and keeps all rows non-commercial.

All rows below are imported as `historical_source`. Source pages were checked on 2026-05-11 and used for name, city/province, address, and phone where visible. Potshops should not render outbound cannabis-commerce CTAs for these rows.

## Rows enriched

1. `cannabis-convenience` — Cannabis Convenience
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/cannabis-convenience/`
   - Extracted context: Deseronto, ON; 406 Hwy #49; phone shown as 613-243-7242.
   - Caveat: supports a cautious Deseronto/Bay of Quinte recovery page only; do not infer current licensing, availability, delivery, ordering, or hours.

2. `okanagan-cannabinoid-therapy-vernon` — Okanagan Cannabinoid Therapy - Vernon
   - Source: WeedsFarm public directory, `https://weedsfarm.com/store/okanagan-cannabinoid-therapy-vernon/`
   - Extracted context: Vernon, BC; 3116 30th Avenue; phone shown as 1 (236) 426-2837.
   - Caveat: supports a cautious North Okanagan recovery page only; do not infer current licensing, availability, delivery, ordering, or hours.

## Location utility changes

- Added Deseronto to the static location footprint/sitemap source with exact internal linking to Cannabis Convenience.
- Added Vernon to the static location footprint/sitemap source with exact internal linking to Okanagan Cannabinoid Therapy - Vernon.
- Kept both city pages visibly thin/verification-oriented so they do not become doorway pages.

## Compliance notes

- No row is marked `current_source`.
- No website/outbound commerce URLs were imported.
- Source notes avoid purchase, order, availability, delivery, stock, rating/review, and licence-promotion claims.
