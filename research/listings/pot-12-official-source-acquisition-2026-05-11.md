# POT-12 official-source acquisition — 2026-05-11

## Source

Used the AGCO public cannabis retail application/status table at `https://www.agco.ca/en/cannabis/status-current-cannabis-retail-store-applications` with filtered query URLs for Hamilton, Toronto, and Belleville. Rows were copied manually from the rendered public table and kept as address-context facts only.

## Rows added

- Village Cannabis Co. Hamilton — Hamilton, ON, 275 King St E.
- Neku Cannabis Hamilton — Hamilton, ON, 858 Upper James St Unit 1.
- Canna Savanna Toronto — Toronto, ON, 1149 Queen St W.
- Fogtown Flower Toronto — Toronto, ON, 2152 Yonge St.
- True North Cannabis Co. Belleville — Belleville, ON, 20 Bridge St W.

## Compliance posture

All five rows are marked `current_source` because the source is an official public status table checked on 2026-05-11. Potshops still does not show menus, hours, stock, ordering, delivery, reviews, ratings, or availability claims. Website URLs stay in the import data for provenance but the public listing template does not render outbound commercial CTAs.

## Page/template updates

`app/listings/[slug]/page.tsx` now distinguishes `current_source` from historical rows in metadata, notice heading, and visible status copy. Current-source pages say they are official public-source address context while still withholding commercial/service claims.

## Location updates

- Hamilton utility now links Mountain Greenery plus Village Cannabis Co. Hamilton and Neku Cannabis Hamilton.
- Toronto utility now links the three historical rows plus Canna Savanna Toronto and Fogtown Flower Toronto.
- Added Belleville to the location footprint and utility map, linked to True North Cannabis Co. Belleville and nearby Cannabis Convenience for Bay of Quinte context.
