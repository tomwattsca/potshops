import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategory, getListing, listingSeeds, priorityLocations } from '../../data/directory';

const recentSearchIntentBySlug: Record<string, string[]> = {
  'cannabis-culture-920-davie': ['cannabis culture dispensary', 'cannabis culture', 'cannibis culture', 'canna culture', 'cannabis culture vancouver'],
  'green-leaf': ['green leaf kahnawake', 'kahnawake dispensary', 'kahnawake weed', 'weed dispensary kahnawake', 'canabis kanawake', 'cannabis dispensary near me'],
  'green-essence-head-shop-dispensary': ['green essence', 'green essence penticton', 'green essence penticton bc', 'Green Essence Head Shop', 'Martin Street Penticton source context'],
  'rocket-chronic-2': ['rocket chronic canada'],
  'remedy-ice-cream': ['remedy ice cream'],
  'the-herb-co-mount-pleasant': ['the herb co', 'herb company', 'the herb co mount pleasant'],
  'the-cannabist-shop-king-kitchener': ['the cannabist shop king kitchener', 'king kitchener cannabis retail address context'],
  'canna-cabana-woodlawn-guelph': ['canna cabana guelph woodlawn', 'woodlawn guelph cannabis retail address context'],
  'discounted-cannabis-windsor': ['discount cannabis windsor', 'discounted cannabis', 'discounted cannabis Windsor address context'],
  'greentown-cannabis-discount-hut-windsor': ['greentown discount hut drouillard', 'greentown drouillard', 'Windsor Drouillard Road cannabis address context'],
  'wild-flowerz-sudbury': ['wild flowerz sudbury', 'sudbury cannabis retail address context'],
  '420-delivery': ['420 delivery', 'Greater Vancouver cannabis service context'],
  'compassion-in-motion': ['compassion in motion', 'Greater Vancouver cannabis source context'],
  'farm-the-original-farmacy-downtown': ['farmacy victoria', 'The Original Farm Victoria', 'Douglas Street Victoria source context'],
};


const listingPageFocusBySlug: Record<string, { title: string; summary: string; bullets: string[] }> = {
  'cannabis-culture-920-davie': {
    title: 'Davie Street Cannabis Culture legacy profile status',
    summary: 'Fresh Search Console still surfaces the old singular /listing/ Cannabis Culture URL and brand/dispensary variants. This canonical profile keeps that legacy demand recoverable while making the source limits more explicit.',
    bullets: [
      'Canonical path: /listings/cannabis-culture-920-davie; the old /listing/cannabis-culture-920-davie/ path redirects here.',
      'Current evidence is a public directory record for the historical Davie Street listing, not proof of current licensing, menus, stock, delivery, hours, or storefront operation.',
      'Use the Vancouver city page and dispensary category hub for broader context before assuming the profile represents a current Cannabis Culture store.',
    ],
  },
  'green-essence-head-shop-dispensary': {
    title: 'Penticton Green Essence source-limit context',
    summary: 'Fresh Search Console now makes Green Essence the strongest non-Green-Leaf canonical listing signal in the Potshops sample. This existing profile should answer Green Essence / Penticton variants quickly while keeping the 409 Martin Street evidence framed as third-party historical context.',
    bullets: [
      'Search fit: the 2026-04-03..2026-05-17 sample shows /listings/green-essence-head-shop-dispensary with 20 impressions, including 15 for green essence penticton plus broader green essence variants.',
      'Source posture: the 409 Martin Street Penticton address comes from third-party public-directory evidence; Potshops is not claiming current licensing, menus, stock, delivery, hours, ordering, availability, or storefront operation.',
      'Next step for users: review the Penticton location page and dispensary category hub, then send regulator, business, or public-directory sources through /updates if this record needs correction.',
    ],
  },
  'green-leaf': {
    title: 'Kahnawake Green Leaf profile and historical-source context',
    summary: 'Fresh Search Console now makes Green Leaf the strongest canonical listing row in the Potshops sample. This existing profile needs to answer Green Leaf/Kahnawake variants quickly while staying clear that the source evidence is historical and not proof of current cannabis-store operation.',
    bullets: [
      'Search fit: the 2026-04-02..2026-05-17 sample shows /listings/green-leaf with 82 impressions, including green leaf kahnawake, cannabis kahnawake, canabis kanawake, and near-me-style dispensary wording.',
      'Source posture: local reporting identifies Green Leaf in Kahnawake and enforcement history, but Potshops has not verified a current public operating address, licence, menu, stock, delivery, hours, ordering path, or availability.',
      'Next step for users: use the Kahnawake location page for mapped historical-source context, and use /updates for regulator or business sources that can improve the record.',
    ],
  },
  'the-herb-co-mount-pleasant': {
    title: 'Mount Pleasant Herb Co profile and historical address context',
    summary: 'Fresh Search Console shows The Herb Co Mount Pleasant still receiving brand and generic herb-company impressions. This canonical listing now separates the Vancouver address evidence from any unsupported current-store, menu, licence, or availability claims.',
    bullets: [
      'Search fit: recent final-data rows include the herb co and herb company variants, while the existing page also has anonymized listing-level impressions that should land on this canonical profile rather than broad homepage copy.',
      'Source posture: public third-party directory evidence associates The Herb Co Mount Pleasant with 1193 Main St in Vancouver, but Potshops has not verified current licensing, menus, stock, delivery, hours, ordering, or storefront operation.',
      'Next step for users: use the Vancouver location page and dispensary category hub for broader source-backed context, then send regulator, business, or public-directory evidence through /updates if the record should be corrected.',
    ],
  },
  'rocket-chronic-2': {
    title: 'Rocket Chronic Canada profile and homepage query handoff',
    summary: 'Fresh Search Console shows Rocket Chronic Canada searches landing on the homepage even though a canonical source-backed profile already exists. This page now makes the brand/source context explicit so the homepage can hand that demand to the profile without adding new directory rows.',
    bullets: [
      'Search fit: recent final-data rows include rocket chronic canada, with most sampled impressions landing on the homepage rather than this canonical profile.',
      'Source posture: Potshops has historical/public-source brand-region evidence only, not a verified current address, licence, menu, stock, delivery, hours, ordering path, or storefront operation.',
      'Next step for users: review this profile as Greater Vancouver context, then use /updates for stronger regulator, business, or public-directory evidence if the record should change.',
    ],
  },
  'the-cannabist-shop-king-kitchener': {
    title: 'King Kitchener Cannabist Shop official-source context',
    summary: 'Fresh Search Console surfaced the old singular The Cannabist Shop King Kitchener URL even though a canonical official-source profile already exists. This page now makes the Kitchener/King Street source context easier to scan without adding current-store or commerce claims.',
    bullets: [
      'Search fit: recent final-data rows include the legacy /listing/the-cannabist-shop-king-kitchener path, so the canonical profile should clearly identify the King Street West Kitchener record.',
      'Source posture: AGCO public status-table evidence supports official address context only; Potshops is not claiming current hours, menus, stock, delivery, ordering, pricing, or storefront-operation details.',
      'Next step for users: use the Kitchener location page and dispensary category hub for nearby source-backed context, then send updated regulator or business sources through /updates if the record should change.',
    ],
  },
  'canna-cabana-woodlawn-guelph': {
    title: 'Woodlawn Guelph Canna Cabana official-source context',
    summary: 'Fresh Search Console showed a Canna Cabana Woodlawn Guelph query landing on this existing canonical listing. The page now aligns that brand/location intent with source limits and routes users to existing Guelph directory context.',
    bullets: [
      'Search fit: recent final-data rows include canna cabana guelph woodlawn for this canonical profile.',
      'Source posture: AGCO public status-table evidence supports the Woodlawn Road West address context only; Potshops is not claiming current hours, menus, stock, delivery, ordering, pricing, or availability.',
      'Next step for users: review the Guelph location page and dispensary category hub, then use /updates if stronger public evidence should change the listing.',
    ],
  },
  'discounted-cannabis-windsor': {
    title: 'Wyandotte Windsor Discounted Cannabis official-source context',
    summary: 'Fresh Search Console now shows this existing canonical Windsor listing earning low-row impressions for Discounted Cannabis terms. The page should answer the brand/Wyandotte context while keeping the AGCO evidence limited to official address context.',
    bullets: [
      'Search fit: the 2026-04-03..2026-05-17 sample shows /listings/discounted-cannabis-windsor with 8 impressions, including discount cannabis windsor, discounted cannabis, and discounted query variants.',
      'Source posture: AGCO public status-table evidence supports the Wyandotte Street West address context only; Potshops is not claiming current hours, menus, stock, delivery, ordering, pricing, availability, or storefront-operation details.',
      'Next step for users: use the Windsor location page and dispensary category hub for nearby source-backed context, then send regulator or business updates through /updates if this record needs correction.',
    ],
  },
  'greentown-cannabis-discount-hut-windsor': {
    title: 'Drouillard Windsor Greentown Discount Hut official-source context',
    summary: 'Fresh Search Console also surfaces Greentown Discount Hut and Drouillard Road variants. This existing canonical listing now makes the Windsor official-source address context easier to scan without adding unsupported commerce claims.',
    bullets: [
      'Search fit: recent final-data rows include greentown discount hut drouillard and greentown drouillard for this canonical profile.',
      'Source posture: AGCO public status-table evidence supports Drouillard Road address context only; Potshops is not claiming current hours, menus, stock, delivery, ordering, pricing, availability, or storefront-operation details.',
      'Next step for users: review the Windsor location page and source-backed dispensary category context, then use /updates for stronger public evidence if the listing should change.',
    ],
  },
  'wild-flowerz-sudbury': {
    title: 'Wild Flowerz Sudbury official-source context',
    summary: 'Fresh Search Console showed the old singular Wild Flowerz Sudbury path still receiving impressions. This canonical listing now makes the Sudbury/Kathleen Street source-backed context explicit while keeping regulated-store claims limited.',
    bullets: [
      'Search fit: recent final-data rows include the legacy /listing/wild-flowerz-sudbury path, so the canonical profile should answer the brand and city context quickly.',
      'Source posture: AGCO public status-table evidence supports address context only; Potshops is not claiming current hours, menus, stock, delivery, ordering, pricing, or storefront-operation details.',
      'Next step for users: use the Sudbury location page for mapped official-source context, and send newer regulator or business evidence through /updates if this record needs correction.',
    ],
  },
  '420-delivery': {
    title: '420 Delivery Greater Vancouver source-limit context',
    summary: 'Fresh Search Console now shows the canonical 420 Delivery listing appearing for the exact 420 delivery query. This existing profile should make the brand-region evidence useful while avoiding any claim that Potshops has verified active delivery service, ordering, stock, contact, or availability.',
    bullets: [
      'Search fit: the 2026-04-03..2026-05-17 sample shows /listings/420-delivery with an exact 420 delivery query impression around position 5, while the historical GSC seed carried 353 impressions and 7 clicks.',
      'Source posture: Call 420 public-website evidence supports Greater Vancouver brand/region context only; Potshops has not verified current delivery availability, licence, menus, stock, ordering path, hours, contact details, or storefront operation.',
      'Next step for users: review the Vancouver location page and in-town-delivery category context, then use /updates if regulator, business, or public-directory evidence can improve this record.',
    ],
  },
  'compassion-in-motion': {
    title: 'Greater Vancouver Compassion in Motion source context',
    summary: 'Fresh Search Console and GA4 rows show this existing canonical profile still receives low-row brand interest. The page now separates Compassion in Motion brand-region context from unsupported current address, licence, menu, delivery, hours, ordering, or availability claims.',
    bullets: [
      'Search fit: the 2026-04-04..2026-05-17 sample showed /listings/compassion-in-motion with 3 impressions and one GA4 page view, making a profile-context update preferable to new rows.',
      'Source posture: public websites support broad Compassion in Motion / Greater Vancouver context only; Potshops has not verified a current public storefront address or regulated retail-operation details.',
      'Next step for users: use the Vancouver location page, related category context, and /updates if regulator, business, or public-directory evidence can improve the record.',
    ],
  },
  'farm-the-original-farmacy-downtown': {
    title: 'Victoria Original Farmacy source-limit context',
    summary: 'Fresh Search Console showed farmacy victoria demand on this existing canonical listing. The page now explains the Farm/Farmacy/Douglas Street Victoria context while treating the public directory evidence as stale until stronger current sources are reviewed.',
    bullets: [
      'Search fit: recent final-data rows include farmacy victoria, and the canonical listing has low-row impressions around page-one average position.',
      'Source posture: third-party public directory pages associate Farm: The Original Farmacy Downtown with 1402 Douglas St in Victoria, but those sources are stale and do not verify current licensing, menus, stock, delivery, hours, ordering, or availability.',
      'Next step for users: use the Victoria location page and /updates for stronger regulator, business, or public-directory evidence if the profile should be corrected.',
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() { return listingSeeds.map((listing) => ({ slug: listing.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const listing = getListing(resolvedParams.slug);
  if (!listing) return { title: 'Listing not found', robots: { index: false, follow: true } };
  const hasCurrentSource = listing.verificationStatus === 'current_source';
  const description = listing.sourceName
    ? hasCurrentSource
      ? `${listing.name} has official public-source address facts from ${listing.sourceName}. Potshops shows source-backed context without hours, menu, stock, ordering, or service claims.`
      : `${listing.name} has public-source listing facts from ${listing.sourceName}. Potshops labels these as historical until current licensing is confirmed.`
    : `${listing.name} was a high-priority legacy Potshops.ca listing with ${listing.gscImpressions} Search Console impressions. Profile data is queued for verification.`;
  const locationLabel = listing.city && listing.province ? `${listing.city}, ${listing.province}` : listing.locationHint;
  const titleSuffix = hasCurrentSource ? 'source-backed cannabis profile' : 'historical cannabis listing';
  return { title: `${listing.name} in ${locationLabel} | ${titleSuffix}`, description, alternates: { canonical: `/listings/${listing.slug}` } };
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const listing = getListing(resolvedParams.slug);
  if (!listing) notFound();
  const hasCurrentSource = listing.verificationStatus === 'current_source';
  const relatedLocation = priorityLocations.find((location) => location.city === listing.city && location.province === listing.province);
  const relatedCategories = listing.categories?.map((slug) => getCategory(slug)).filter((category) => Boolean(category)) ?? [];
  const addressLine = [listing.address, listing.city, [listing.province, listing.postalCode].filter(Boolean).join(' ')].filter(Boolean).join(', ');
  const statusLabel = hasCurrentSource ? 'Official/public address context' : listing.sourceName ? 'Historical public-source context' : 'Needs source verification';
  const sourceLimit = hasCurrentSource
    ? 'Address context only; no hours, menus, stock, ordering, delivery, ratings, or service details.'
    : listing.sourceName
      ? 'Useful legacy/profile evidence only; not proof of current licensing, availability, or operation.'
      : 'The old Potshops record has demand, but stronger public-source facts are still missing.';
  const sourceSummary = listing.sourceName
    ? `${listing.sourceName} checked ${listing.lastVerified ?? 'during rebuild'}`
    : 'No source has been attached to this listing yet';
  const recentSearchIntent = recentSearchIntentBySlug[listing.slug] ?? [];
  const listingPageFocus = listingPageFocusBySlug[listing.slug];
  const locationLabel = listing.city && listing.province ? `${listing.city}, ${listing.province}` : listing.locationHint;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://potshops.ca/listings/${listing.slug}#webpage`,
        url: `https://potshops.ca/listings/${listing.slug}`,
        name: `${listing.name} source-backed Potshops profile`,
        description: listing.sourceNote ?? `Legacy Potshops profile for ${listing.name} with Search Console recovery context.`,
        isPartOf: { '@id': 'https://potshops.ca/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://potshops.ca/listings/${listing.slug}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Potshops.ca', item: 'https://potshops.ca/' },
          { '@type': 'ListItem', position: 2, name: listing.name, item: `https://potshops.ca/listings/${listing.slug}` },
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `https://potshops.ca/listings/${listing.slug}#localbusiness`,
        name: listing.name,
        url: `https://potshops.ca/listings/${listing.slug}`,
        areaServed: listing.locationHint,
        ...(listing.verificationStatus === 'current_source' && listing.address ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: listing.address,
            addressLocality: listing.city,
            addressRegion: listing.province,
            postalCode: listing.postalCode,
            addressCountry: 'CA',
          },
          ...(listing.phone ? { telephone: listing.phone } : {}),
        } : {}),
      },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="eyebrow">Legacy listing recovery</p>
      <h1>{listing.name}</h1>
      <p className="profile-location-note">{locationLabel} source notes and search-recovery context</p>
      <p className="lede">This Potshops.ca profile is queued for rebuild because its old WordPress URL had measurable Search Console demand. The summary below separates what is source-backed from what Potshops is still not claiming.</p>
      <section className="card listing-evidence-card">
        <div>
          <p className="eyebrow">Evidence at a glance</p>
          <h2>Source status and rebuild priority</h2>
          <p>Use this page as a conservative profile note: it records visible public-source context and routes users to city/category pages without implying current store operations.</p>
        </div>
        <div className="listing-proof-grid" aria-label="Listing evidence summary">
          <div className="mini-card">
            <strong>{statusLabel}</strong>
            <span>{sourceSummary}</span>
          </div>
          <div className="mini-card">
            <strong>{listing.gscImpressions.toLocaleString()} legacy impressions</strong>
            <span>{listing.gscClicks.toLocaleString()} legacy clicks, average legacy position {listing.averagePosition.toFixed(1)}</span>
          </div>
          <div className="mini-card">
            <strong>{relatedLocation ? `${relatedLocation.city} context mapped` : 'City context not mapped'}</strong>
            <span>{relatedCategories.length ? `${relatedCategories.length} category link${relatedCategories.length === 1 ? '' : 's'} available` : 'No category hub attached yet'}</span>
          </div>
        </div>
        <p className="source-excerpt"><strong>Limit:</strong> {sourceLimit}</p>
      </section>
      <div className="split">
        <section className="card">
          <h2>Search demand evidence</h2>
          <ul className="clean">
            <li>Legacy URL: <code>{listing.legacyPath}</code></li>
            <li>Location hint: {listing.locationHint}</li>
            <li>Legacy impressions: {listing.gscImpressions.toLocaleString()}</li>
            <li>Legacy clicks: {listing.gscClicks.toLocaleString()}</li>
            <li>Average legacy position: {listing.averagePosition.toFixed(1)}</li>
            {recentSearchIntent.length > 0 && (
              <li>Recent final-data query fit: {recentSearchIntent.join(', ')}</li>
            )}
          </ul>
          {recentSearchIntent.length > 0 && (
            <p className="source-excerpt"><strong>Snippet focus:</strong> these recent low-row Search Console terms are now exposed on the page so visitors can quickly connect the listing to its city/brand context while Potshops keeps the source limits visible.</p>
          )}
        </section>
        <aside className="notice">
          <h3>{listing.sourceName ? (hasCurrentSource ? 'Official-source verification' : 'Public-source verification') : 'Claim or verify this listing'}</h3>
          {listing.sourceName ? (
            <>
              <p><strong>Last checked:</strong> {listing.lastVerified}</p>
              <p>{listing.sourceNote}</p>
            </>
          ) : (
            <p>The rebuild needs source-backed address, city, category, and compliance-friendly context before any stronger current-status or commercial promotion.</p>
          )}
        </aside>
      </div>
      {listingPageFocus && (
        <section className="card listing-intent-card">
          <p className="eyebrow">GSC-led profile focus</p>
          <h2>{listingPageFocus.title}</h2>
          <p>{listingPageFocus.summary}</p>
          <ul className="clean">
            {listingPageFocus.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      )}
      {listing.sourceName && (
        <section className="card source-facts-card">
          <div>
            <p className="eyebrow">Source-backed facts</p>
            <h2>What the visible source supports</h2>
            <p>This section keeps the source note scannable for visitors coming from brand or city searches while avoiding unsupported regulated claims.</p>
          </div>
          <dl className="fact-list">
            {addressLine && (
              <div>
                <dt>Address context</dt>
                <dd>{addressLine}</dd>
              </div>
            )}
            {listing.phone && (
              <div>
                <dt>Phone listed by source</dt>
                <dd>{listing.phone}</dd>
              </div>
            )}
            <div>
              <dt>Source reviewed</dt>
              <dd><a href={listing.sourceUrl ?? '#'} rel="nofollow noopener">{listing.sourceName}</a>{listing.lastVerified ? ` · ${listing.lastVerified}` : ''}</dd>
            </div>
            <div>
              <dt>Status label</dt>
              <dd>{hasCurrentSource ? 'Official public-source address context; Potshops still withholds hours, menus, stock, ordering, and service claims until further review.' : 'Historical/public-source verification only; current regulatory and operating status still needs confirmation.'}</dd>
            </div>
            <div>
              <dt>Source note</dt>
              <dd>{listing.sourceNote}</dd>
            </div>
          </dl>
        </section>
      )}

      <section className="card">
        <h2>Related Potshops pages for this profile</h2>
        <p>Use these internal links to review the city and category context behind this listing. Potshops keeps the links informational until a public source supports stronger business details.</p>
        <ul className="clean">
          {relatedLocation ? (
            <li>City context: <Link href={`/locations/${relatedLocation.slug}`} data-event="internal_link_click" data-cta-location="listing_related_location">{relatedLocation.city}, {relatedLocation.province} cannabis directory notes</Link></li>
          ) : (
            <li>City context: {listing.locationHint} is recorded on the listing, but a dedicated city page is not mapped yet.</li>
          )}
          {relatedCategories.map((category) => category && (
            <li key={category.slug}>Category hub: <Link href={`/categories/${category.slug}`} data-event="internal_link_click" data-cta-location="listing_related_category">{category.title}</Link></li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>What Potshops is not claiming yet</h2>
        <p>This profile is intentionally limited to source-backed directory context. It does not verify current hours, menus, stock, ordering, delivery, prices, reviews, ratings, or whether a storefront is operating today.</p>
      </section>

      <section className="card update-card">
        <div>
          <p className="eyebrow">Keep this profile accurate</p>
          <h2>Know a better public source for {listing.name}?</h2>
          <p>Send Potshops a regulator, business, or public-directory source so this listing can improve without adding unsupported hours, menu, delivery, availability, licence, rating, or promotional claims.</p>
        </div>
        <p className="cta-row">
          <Link className="button" href="/updates" data-event="listing_update_click" data-cta-location="listing_detail">Suggest a source-backed correction</Link>
        </p>
      </section>
      <p><Link href="/">← Back to Potshops.ca rebuild priorities</Link></p>
    </main>
  );
}
