import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategory, getListing, listingSeeds, priorityLocations } from '../../data/directory';

export function generateStaticParams() { return listingSeeds.map((listing) => ({ slug: listing.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const listing = getListing(resolvedParams.slug);
  if (!listing) return { title: 'Listing not found' };
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
  if (!listing) return <main><h1>Listing not found</h1></main>;
  const hasCurrentSource = listing.verificationStatus === 'current_source';
  const relatedLocation = priorityLocations.find((location) => location.city === listing.city && location.province === listing.province);
  const relatedCategories = listing.categories?.map((slug) => getCategory(slug)).filter((category) => Boolean(category)) ?? [];
  const schema = {
    '@context': 'https://schema.org',
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
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="eyebrow">Legacy listing recovery</p>
      <h1>{listing.name}</h1>
      <p className="lede">This Potshops.ca profile is queued for rebuild because its old WordPress URL had measurable Search Console demand.</p>
      <div className="split">
        <section className="card">
          <h2>Search demand evidence</h2>
          <ul className="clean">
            <li>Legacy URL: <code>{listing.legacyPath}</code></li>
            <li>Location hint: {listing.locationHint}</li>
            <li>Legacy impressions: {listing.gscImpressions.toLocaleString()}</li>
            <li>Legacy clicks: {listing.gscClicks.toLocaleString()}</li>
            <li>Average position: {listing.averagePosition.toFixed(1)}</li>
          </ul>
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
      {listing.sourceName && (
        <section className="card">
          <h2>Verified public-source facts</h2>
          <ul className="clean">
            {listing.address && <li>Address: {listing.address}, {listing.city}, {listing.province} {listing.postalCode}</li>}
            {listing.phone && <li>Phone listed by source: {listing.phone}</li>}
            <li>Source: <a href={listing.sourceUrl ?? '#'} rel="nofollow noopener">{listing.sourceName}</a></li>
            <li>Status: {hasCurrentSource ? 'official public-source address context; Potshops still withholds hours, menus, stock, ordering, and service claims until further review.' : 'historical/public-source verification only; current regulatory and operating status still needs confirmation.'}</li>
          </ul>
        </section>
      )}

      <section className="card">
        <h2>Related Potshops pages for this profile</h2>
        <p>Use these internal links to review the city and category context behind this listing. Potshops keeps the links informational until a public source supports stronger business details.</p>
        <ul className="clean">
          {relatedLocation ? (
            <li>City context: <Link href={`/locations/${relatedLocation.slug}`}>{relatedLocation.city}, {relatedLocation.province} cannabis directory notes</Link></li>
          ) : (
            <li>City context: {listing.locationHint} is recorded on the listing, but a dedicated city page is not mapped yet.</li>
          )}
          {relatedCategories.map((category) => category && (
            <li key={category.slug}>Category hub: <Link href={`/categories/${category.slug}`}>{category.title}</Link></li>
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
