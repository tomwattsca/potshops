import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategory, getListing, getLocation, getLocationUtility, isRegulatorBackedStore, priorityLocations } from '../../data/directory';

type ProfileSourceFact = { label: string; value: string; tone?: 'strong' | 'muted' };

const publicCopy = (copy: string) => copy
  .replace(/Search Console impressions?/gi, 'recent search visibility')
  .replace(/Search Console rows?/gi, 'recent search signals')
  .replace(/Search Console hints?/gi, 'recent search signals')
  .replace(/Search Console evidence/gi, 'recent search evidence')
  .replace(/Search Console/gi, 'search data')
  .replace(/GSC rows?/g, 'recent search signals')
  .replace(/GSC visibility/g, 'recent search visibility')
  .replace(/GSC page data/g, 'recent search data')
  .replace(/query-page rows?/gi, 'search phrase signals')
  .replace(/location-page signal/gi, 'location-page interest')
  .replace(/location-page signals/gi, 'location-page interest')
  .replace(/fresh recent search signals/gi, 'recent search signals')
  .replace(/fresh recent search visibility/gi, 'recent search visibility')
  .replace(/legacy impressions?/gi, 'historic discovery signals')
  .replace(/legacy/gi, 'older')
  .replace(/source-backed rebuild work/gi, 'public-source notes')
    .replace(/rebuild target/gi, 'directory context page')
  .replace(/legacy URL recovery/gi, 'older directory links')
    .replace(/profile recovery/gi, 'profile context')
    .replace(/recovery profile/gi, 'source-backed profile')
  .replace(/recovery page/gi, 'source-limit page');

export const dynamicParams = false;

export function generateStaticParams() { return priorityLocations.map((location) => ({ city: location.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocation(resolvedParams.city);
  const utility = location ? getLocationUtility(location.slug) : undefined;
  const relatedListings = utility?.relatedListingSlugs.map((slug) => getListing(slug)).filter((listing) => Boolean(listing)) ?? [];
  const shouldIndex = relatedListings.some((listing) => listing && isRegulatorBackedStore(listing));
  if (!location) return { title: 'Location not found' };
  const description = utility
    ? `${publicCopy(location.description)} ${publicCopy(utility.directoryStatus)}`
    : `${publicCopy(location.description)} ${publicCopy(location.gscEvidence)}`;
  const canonical = `/locations/${location.slug}`;
  const url = `https://potshops.ca${canonical}`;
  return {
    title: location.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: location.title,
      description,
      url,
      siteName: 'Potshops.ca',
      type: 'website',
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const location = getLocation(resolvedParams.city);
  if (!location) notFound();
  const utility = getLocationUtility(location.slug);
  const relatedListings = utility?.relatedListingSlugs.map((slug) => getListing(slug)).filter((listing) => Boolean(listing)) ?? [];
  const relatedCategories = utility?.internalCategorySlugs.map((slug) => getCategory(slug)).filter((category) => Boolean(category)) ?? [];
  const verifiedListingCount = relatedListings.filter((listing) => listing?.verificationStatus && listing.verificationStatus !== 'needs_verification').length;
  const currentSourceCount = relatedListings.filter((listing) => listing?.verificationStatus === 'current_source').length;
  const historicalSourceCount = relatedListings.filter((listing) => listing?.verificationStatus === 'historical_source').length;
  const regulatorBackboneCount = relatedListings.filter((listing) => listing && isRegulatorBackedStore(listing)).length;
  const primaryListing = relatedListings[0];
  const publicTitle = `${location.city} cannabis directory status`;
  const coverageSummary = utility
    ? (location.slug === 'kahnawake'
      ? publicCopy(utility.directoryStatus)
      : relatedListings.length === 0
        ? publicCopy(utility.directoryStatus)
        : currentSourceCount > 0
          ? `${location.city} currently has ${currentSourceCount} official public-source address-context ${currentSourceCount === 1 ? 'profile' : 'profiles'}${regulatorBackboneCount > 0 ? ` (${regulatorBackboneCount} regulator-backed)` : ''} and ${historicalSourceCount} historical-source ${historicalSourceCount === 1 ? 'profile' : 'profiles'} in the rebuilt directory.`
          : `${location.city} currently has ${historicalSourceCount} historical/source-backed ${historicalSourceCount === 1 ? 'profile' : 'profiles'} in Potshops; current operation is not confirmed from these sources.`)
    : `${location.city} currently has ${historicalSourceCount} historical/source-backed ${historicalSourceCount === 1 ? 'profile' : 'profiles'} in Potshops; current operation is not confirmed from these sources.`;
  const safeLocationDescription = publicCopy(location.description);
  const safeUtilitySummary = utility ? publicCopy(utility.summary) : undefined;
  const safeLocalCaveats = utility?.localCaveats.map(publicCopy) ?? [];
  const statusLabel = (status?: string) => {
    if (status === 'current_source') return 'Official public-source address context';
    if (status === 'historical_source') return 'Historical public-source context';
    return 'Verification queued';
  };
  const sourceFactsFor = (listing: NonNullable<(typeof relatedListings)[number]>): ProfileSourceFact[] => {
    const websiteFactValue = listing.website
      ? `Source-linked research page: ${listing.website}`
      : 'No business webpage confirmed from source-backed evidence.';
    if (listing.slug === 'green-leaf') {
      return [
        { label: 'Profile evidence', value: listing.sourceName ? `${listing.sourceName}${listing.lastVerified ? ` · checked ${listing.lastVerified}` : ''}` : 'Public-source verification still queued', tone: listing.sourceName ? 'strong' : 'muted' },
        { label: 'Business webpage', value: websiteFactValue },
        { label: 'Current operation', value: 'Green Leaf reporting is public-context only and does not confirm an active business page or current storefront status.' },
        { label: 'User action', value: 'Use the linked listing page and /updates before treating this as verified local-store coverage.' },
      ];
    }
    const facts: ProfileSourceFact[] = [
      { label: 'Profile evidence', value: listing.sourceName ? `${listing.sourceName}${listing.lastVerified ? ` · checked ${listing.lastVerified}` : ''}` : 'Public-source verification still queued', tone: listing.sourceName ? 'strong' : 'muted' },
      { label: 'Business webpage', value: websiteFactValue },
      { label: 'Current operation', value: listing.verificationStatus === 'current_source' ? 'Official public-source address context only; Potshops still does not claim current hours, menus, stock, delivery, ordering, or availability.' : 'Not confirmed from this historical source; treat as context only, not an open-store claim.' },
      { label: 'User action', value: 'Open the listing evidence or submit a source-backed correction before relying on local details.' },
    ];
    return facts;
  };
  const getSourceLinks = (listing: NonNullable<(typeof relatedListings)[number]>) => {
    if (listing.sourceUrls && listing.sourceUrls.length > 0) {
      return [...new Set(listing.sourceUrls)];
    }
    return listing.sourceUrl ? [listing.sourceUrl] : [];
  };
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://potshops.ca/locations/${location.slug}#webpage`,
        url: `https://potshops.ca/locations/${location.slug}`,
        name: location.title,
        description: utility ? `${publicCopy(location.description)} ${publicCopy(utility.directoryStatus)}` : publicCopy(location.description),
        isPartOf: { '@id': 'https://potshops.ca/#website' },
        about: `${location.city}, ${location.province} cannabis directory status`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://potshops.ca/' },
          { '@type': 'ListItem', position: 2, name: `${location.city}, ${location.province}`, item: `https://potshops.ca/locations/${location.slug}` },
        ],
      },
      ...(relatedListings.length > 0 ? [{
        '@type': 'ItemList',
        name: `${location.city} source-backed Potshops profiles`,
        numberOfItems: relatedListings.length,
        itemListElement: relatedListings.map((listing, index) => listing && ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://potshops.ca/listings/${listing.slug}`,
          name: listing.name,
        })),
      }] : []),
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <p className="eyebrow">City coverage status</p>
      <h1>{publicTitle}</h1>
      <p className="lede">{coverageSummary}</p>
      {location.slug === 'kahnawake' && primaryListing ? (
        <section className="card notice" aria-label="Kahnawake primary source profile">
          <h2>Primary mapped profile for Kahnawake</h2>
          <p className="meta">
            This page is intentionally sourced-only today and maps to one local evidence record: <Link href={`/listings/${primaryListing.slug}`}>{primaryListing.name}</Link>.
            Potshops does not treat this as a confirmed live storefront until a current public-source verification is attached.
          </p>
          <p><Link className="button secondary" href={`/listings/${primaryListing.slug}`} data-event="internal_link_click" data-cta-location="kahnawake_primary_listing">Open the profile evidence</Link></p>
        </section>
      ) : null}
      <section className="card location-summary-card" aria-label={`${location.city} coverage summary`}>
        <div>
          <p className="eyebrow">Before relying on this page</p>
          <h2>{primaryListing ? `${primaryListing.name}: profile evidence at a glance` : `${location.city}: directory evidence at a glance`}</h2>
          <p>{safeLocationDescription}</p>
        </div>
        <div className="location-status-grid">
          <div className="mini-card">
            <strong>{relatedListings.length}</strong>
            <span>{relatedListings.length === 1 ? 'mapped profile' : 'mapped profiles'} currently linked from this city page</span>
          </div>
          <div className="mini-card">
            <strong>{currentSourceCount}</strong>
            <span>official/current-source address-context profiles; no current menus, stock, delivery, ordering, hours, or availability claims</span>
          </div>
          <div className="mini-card">
            <strong>{historicalSourceCount}</strong>
            <span>historical-source profiles that need fresh public confirmation before stronger local claims</span>
          </div>
          <div className="mini-card">
            <strong>{regulatorBackboneCount}</strong>
            <span>regulator-backed store records used as primary backbone rows</span>
          </div>
        </div>
      </section>
      <div className="split">
        <section className="card">
          <h2>Why this page exists</h2>
          <p>{safeUtilitySummary ?? safeLocationDescription}</p>
          <p className="meta">Potshops uses search demand only to decide which existing pages need clearer public-source notes. It does not turn search interest into a claim that a business is operating, licensed, stocked, open, or available for ordering.</p>
        </section>
        <aside className="notice">
          <h3>{utility ? `${location.city} directory status` : 'Directory status in progress'}</h3>
          <p>{utility ? publicCopy(utility.directoryStatus) : 'Potshops needs source-backed store names, addresses, and context before publishing stronger local directory claims.'}</p>
        </aside>
      </div>

      {utility && (
        <section className="card source-action-strip" aria-label={`${location.city} update shortcut`}>
          <div>
            <p className="eyebrow">Source-backed corrections</p>
            <h2>Help verify {location.city} coverage</h2>
            <p>Have a public source for a missing profile, corrected address context, or a clearer historical note? Send the evidence before Potshops adds any stronger local claims.</p>
          </div>
          <p className="cta-row">
            <Link className="button secondary" href="/updates" data-event="listing_update_click" data-cta-location="location_top">Send {location.city} source evidence</Link>
          </p>
        </section>
      )}

      {utility && (
        <>
          <section className="card">
            <h2>Common searches this page can clarify</h2>
            <p>Visitors may arrive with these phrases, but Potshops uses them as context only. They do not confirm current store operation, licensing, menus, stock, delivery, ordering, hours, or availability.</p>
            <ul className="clean">
              {utility.searchIntent.map((intent) => <li key={intent}>{intent}</li>)}
            </ul>
          </section>

          <section className="card location-proof-card">
            <div>
              <p className="eyebrow">Source-backed profile coverage</p>
              <h2>{location.city} evidence at a glance</h2>
              <p>
                Potshops currently maps <strong>{relatedListings.length}</strong> {relatedListings.length === 1 ? 'profile' : 'profiles'} to {location.city}.{' '}
                <strong>{verifiedListingCount}</strong> {verifiedListingCount === 1 ? 'profile has' : 'profiles have'} public-source context, including{' '}
                <strong>{currentSourceCount}</strong> official/current-source {currentSourceCount === 1 ? 'row' : 'rows'} and{' '}
                <strong>{historicalSourceCount}</strong> historical-source {historicalSourceCount === 1 ? 'row' : 'rows'}.
              </p>
              <p className="meta">Use these cards to inspect the exact evidence behind this location page before relying on broader city-level wording.</p>
            </div>
            <div className="location-status-grid" aria-label={`${location.city} source status summary`}>
              <div className="mini-card">
                <strong>{relatedListings.length}</strong>
                <span>{relatedListings.length === 1 ? 'mapped profile' : 'mapped profiles'} on this city page</span>
              </div>
              <div className="mini-card">
                <strong>{currentSourceCount}</strong>
                <span>official/current-source rows; no unsupported hours, menu, stock, delivery, or ordering claims</span>
              </div>
              <div className="mini-card">
                <strong>{historicalSourceCount}</strong>
                <span>historical-source rows that need fresh public confirmation before stronger city claims</span>
              </div>
              <div className="mini-card">
                <strong>{regulatorBackboneCount}</strong>
                <span>regulator-backed records in this city page set</span>
              </div>
            </div>
            {relatedListings.length > 0 ? (
              <div className="profile-grid">
                {relatedListings.map((listing) => listing && (
                  <article className="profile-card" key={listing.slug}>
                    <p className={`status-badge ${listing.verificationStatus === 'current_source' ? 'status-current' : 'status-historical'}`}>{statusLabel(listing.verificationStatus)}</p>
                    <h3><Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="location_profile_heading">{listing.name}</Link></h3>
                    <p className="meta">{listing.locationHint}</p>
                    {listing.sourceName && (
                      <p>
                        Source note:{' '}
                        {getSourceLinks(listing).length > 0 ? (
                          <a href={getSourceLinks(listing)[0]} rel="nofollow noopener noreferrer" target="_blank">{listing.sourceName}</a>
                        ) : listing.sourceName}
                      </p>
                    )}
                    {listing.sourceName && getSourceLinks(listing).length > 1 && (
                      <div className="source-links-list">
                        <strong>Additional source URLs:</strong>
                        <ul className="clean">
                          {getSourceLinks(listing).slice(1).map((sourceUrl) => (
                            <li key={sourceUrl}>
                              <a href={sourceUrl} rel="nofollow noopener noreferrer" target="_blank">{sourceUrl}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {listing.website && (
                      <p>
                        <strong>Website from research:</strong>{' '}
                        <a href={listing.website} rel="nofollow noopener noreferrer" target="_blank">{listing.website}</a>
                      </p>
                    )}
                    {!listing.website && (
                      <p><strong>Business webpage:</strong> Not confirmed by this source-backed record.</p>
                    )}
                    {listing.sourceNote && <p className="source-excerpt">{listing.sourceNote}</p>}
                    <dl className="profile-source-facts">
                      {sourceFactsFor(listing).map((fact) => (
                        <div key={fact.label} className={fact.tone === 'strong' ? 'source-fact-strong' : undefined}>
                          <dt>{fact.label}</dt>
                          <dd>{fact.value}</dd>
                        </div>
                      ))}
                      <div>
                        <dt>Store backbone</dt>
                        <dd>{isRegulatorBackedStore(listing) ? 'Regulator-backed active record' : 'Public-source context only'}</dd>
                      </div>
                    </dl>
                    <p className="profile-card-actions">
                      <Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="location_profile_card">View listing evidence</Link>
                      <Link href="/updates" data-event="listing_update_click" data-cta-location="location_profile_card">Send correction</Link>
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p>This city page is currently a compact source-backed directory utility with no mapped profile cards yet.</p>
            )}
          </section>

          <section className="card">
            <h2>{relatedListings.length === 1 ? 'Related listing and directory pages' : 'Related listings and directory pages'}</h2>
            {relatedListings.length > 0 ? (
              <ul className="clean">
                {relatedListings.map((listing) => listing && (
                  <li key={listing.slug}>
                    <Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="location_mapped_listing">{listing.name}</Link> — {listing.locationHint}; {listing.sourceName ? `source note from ${listing.sourceName}` : 'verification queued'}.
                  </li>
                ))}
              </ul>
            ) : (
              <p>This city page is currently a compact source-backed directory utility with no mapped profile links yet.</p>
            )}
            {relatedCategories.length > 0 && (
              <div className="related-hub-row" aria-label={`${location.city} related category hubs`}>
                <span className="meta">Related hubs:</span>
                {relatedCategories.map((category) => category && (
                  <Link className="hub-pill" key={category.slug} href={`/categories/${category.slug}`} data-event="internal_link_click" data-cta-location="location_related_category">{category.title}</Link>
                ))}
              </div>
            )}
          </section>

          <div className="split">
            <section className="card">
              <h2>Important source limitations</h2>
              <ul className="clean">
                {safeLocalCaveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
              </ul>
            </section>
            <aside className="notice">
              <h3>Verification next steps</h3>
              <ul className="clean">
                {utility.verificationNextSteps.map((step) => <li key={step}>{publicCopy(step)}</li>)}
              </ul>
            </aside>
          </div>
        </>
      )}

      <section className="card update-card">
        <div>
          <p className="eyebrow">Improve {location.city} coverage</p>
          <h2>Have a source-backed correction for this city?</h2>
          <p>Share exact public-source evidence for missing listings, address corrections, or city coverage gaps. Potshops will keep the page conservative unless the source supports the specific fact.</p>
        </div>
        <p className="cta-row">
          <Link className="button" href="/updates" data-event="listing_update_click" data-cta-location="location_detail">Suggest a {location.city} update</Link>
        </p>
      </section>

      <p><Link href="/">← Back to Potshops.ca directory home</Link></p>
    </main>
  );
}
