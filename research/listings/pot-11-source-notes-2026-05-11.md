# POT-11 source notes — Greater Vancouver service-profile cleanup

Date: 2026-05-11

## Summary

POT-11 reviewed the last two `needs_verification` Potshops import rows. Both had enough public-source evidence to move out of the unverified bucket, but neither had address-level/regulator-grade proof suitable for `current_source`, outbound CTAs, hours, maps, or stronger availability/licence claims.

Rows promoted as `historical_source` / source-backed brand-region context only:

1. `420-delivery` / 420 Delivery
   - Source: `https://call420delivery.io/`
   - Evidence used: public website metadata identifies Call 420 as a Greater Vancouver-area cannabis brand.
   - Import posture: city/province set to Vancouver, BC as broad regional context; no street address, phone, or outbound website rendered.
   - Caveat: source supports brand/region context only, not current availability, licence, or contact proof.

2. `compassion-in-motion` / Compassion in Motion
   - Sources: `https://compassioninmotion.io/`, `https://compassioninmotion.wordpress.com/`
   - Evidence used: public websites identify Compassion in Motion with Greater Vancouver-area cannabis context and long-running service history.
   - Import posture: city/province set to Vancouver, BC as broad regional context; no street address, phone, or outbound website rendered.
   - Caveat: source supports brand/region context only, not current availability, licence, or contact proof.

## Compliance notes

- No purchase/order/open-now/licensed/same-day/in-stock/24-7 claims were added to import notes.
- No outbound cannabis commerce links were added to the public listing data; `website` remains blank for both rows.
- The Vancouver utility page was updated to say these are Greater Vancouver region-service profiles and not precise storefront/location proof.

## Remaining data gap

The seed import now has 0 `needs_verification` rows, but the two POT-11 rows should stay conservative until an official regulator/current business source can provide address-level and status-level confirmation.
