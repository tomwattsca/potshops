import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategory, getListing, listingSeeds, priorityLocations } from '../../data/directory';

const recentSearchIntentBySlug: Record<string, string[]> = {
  'cannabis-culture-920-davie': ['cannabis culture dispensary', 'cannabis culture', 'cannibis culture', 'canna culture', 'cannabis culture vancouver'],
  'green-leaf': ['green leaf kahnawake', 'kahnawake dispensary', 'kahnawake weed', 'weed dispensary kahnawake'],
  'green-essence-head-shop-dispensary': ['green essence', 'green essence penticton'],
  'compassion-in-motion': ['compassion in motion'],
  'rocket-chronic-2': ['rocket chronic canada'],
  'remedy-ice-cream': ['remedy ice cream'],
  'the-herb-co-mount-pleasant': ['the herb co', 'herb company', 'the herb co mount pleasant'],
  '420-delivery': ['420 delivery', 'Greater Vancouver cannabis service context'],
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
    title: 'Penticton Green Essence profile and source limits',
    summary: 'Fresh Search Console keeps showing Green Essence and Penticton-specific demand for this existing canonical listing. The page now makes the Penticton/source-backed context explicit without implying current store operations.',
    bullets: [
      'Search fit: recent final-data rows include green essence and green essence penticton, so the profile should quickly connect the brand to Penticton, BC.',
      'Source posture: the 409 Martin Street address is third-party public-directory evidence, not proof of current licensing, menus, stock, delivery, hours, or storefront operation.',
      'Next step for users: review the Penticton location page and dispensary category hub, then send stronger public sources through /updates if this record needs correction.',
    ],
  },
  'green-leaf': {
    title: 'Kahnawake Green Leaf profile and historical-source context',
    summary: 'Fresh Search Console still surfaces Green Leaf and Kahnawake query variants for this existing canonical listing. The page now highlights what is known from local reporting and what remains unverified.',
    bullets: [
      'Search fit: recent final-data rows include green leaf kahnawake, kahnawake dispensary, and cannabis kahnawake, so the profile should clearly route readers to the Kahnawake directory context.',
      'Source posture: local reporting identifies Green Leaf in Kahnawake and enforcement history, but Potshops has not verified a current public operating address, licence, menu, stock, delivery, hours, or availability.',
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
