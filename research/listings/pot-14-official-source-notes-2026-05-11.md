# POT-14 official-source acquisition notes — 2026-05-11

Source: AGCO public cannabis retail application status table.

Scope added in this batch:

- Ottawa / AGCO query: `https://www.agco.ca/en/cannabis/status-current-cannabis-retail-store-applications?combine=Ottawa`
  - Pakalolo Ottawa — 440 Preston St, K1S 4N6.
  - Buzzed Buds Ottawa — 179 George St Unit 101, K1N 1J8.
  - Electrical Banana Ottawa — 693 Somerset St W, K1R 6P5.
- Kingston / AGCO query: `https://www.agco.ca/en/cannabis/status-current-cannabis-retail-store-applications?combine=Kingston`
  - 710 Kingston — 471 Princess St, K7L 1C3.
  - Giggles Cannabis Kingston — 652 Princess St Suite 108, K7L 1E5.
  - Mary J's Cannabis Kingston — 154 Division St, K7L 3M6.

Editorial posture:

- Rows are `current_source` because they come from the official Ontario regulator public status table and include address-level context.
- Potshops still does **not** add hours, menus, stock, ordering, delivery, reviews, ratings, licence-promotion language, or availability claims.
- Empty phone fields remain intentionally empty; listing JSON-LD omits `telephone` when no source-backed phone value exists.
- Ottawa and Kingston location pages were added with utility/caveat sections and internal links to exact mapped profiles to avoid generic city doorway pages.

Verification checklist for this batch:

- `npm run import:listings`
- unsafe regulated-claim scan over import/generated data and rendered pages
- `npm run build`
- local production smoke for Ottawa/Kingston listings, locations, and sitemap count
- production cache-busted smoke after deploy
