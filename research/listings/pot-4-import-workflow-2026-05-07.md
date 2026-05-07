# POT-4 listing import workflow — 2026-05-07

Goal: make Potshops listing expansion safer before adding more cannabis-directory pages.

## Files

- `data/listings.import.json` — editable import source using conservative, source-first field names.
- `scripts/generate-listings.mjs` — validates import rows and writes app-consumed JSON.
- `app/data/listings.generated.json` — generated app-shape data consumed by `app/data/directory.ts`.
- `package.json` — `npm run import:listings` regenerates the app data.

## Import schema

Required fields:

- `slug` — lowercase kebab-case, unique.
- `name` — public listing name.
- `status` — one of `needs_verification`, `historical_source`, `current_source`.

Recommended fields:

- `address`, `city`, `province`, `postal_code`.
- `website`, `phone`.
- `categories` — currently `dispensary` and/or `in-town-delivery`; unknown categories fail so the category hub must be added intentionally first.
- `source_urls` — absolute public source URLs. Required for `historical_source` and `current_source`.
- `source_name`, `source_note` — visible editorial context for sourced facts.
- `last_verified_at` — `YYYY-MM-DD`; required for `current_source`.
- `legacy_path`, `location_hint`, `gsc_impressions`, `gsc_clicks`, `average_position` — preserve GSC/import context for recovery pages.
- `commercial_claims` — optional array used to catch risky claims before import.

## Validation rules

The validator rejects:

- missing or duplicate slug/name;
- invalid status, province, category, URL, or date formats;
- sourced statuses without `source_urls`;
- `current_source` rows without `last_verified_at`, address, city, and province;
- commercial/current-operation claims such as buy, order, open now, licensed, same-day delivery, 24/7, or in stock for every status. Current-source rows may store factual address/status context, but not purchase, availability, delivery, or licence-promotion wording in listing data.

It warns, but does not fail, for low-risk incompleteness such as missing categories or contact fields without source URLs.

## Safe scaling workflow

1. Add or edit rows in `data/listings.import.json`.
2. Keep the default status `needs_verification` unless there is a public source URL.
3. Use `historical_source` for old directory/licence/news records that support legacy context but not current operation.
4. Use `current_source` only after confirming current official/regulator/business information.
5. Run `npm run import:listings`.
6. Run `npm run build` and smoke the affected `/listings/<slug>` pages.
7. Do not add purchase/order/delivery/outbound CTAs until compliance and current-status checks are explicit.

## Current baseline

The initial import file contains the 26 listing seeds already in the app before POT-4. `npm run import:listings` generated 26 app rows with 0 warnings on 2026-05-07.
