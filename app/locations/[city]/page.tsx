import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategory, getListing, getLocation, getLocationUtility, priorityLocations } from '../../data/directory';

type ProfileSourceFact = { label: string; value: string; tone?: 'strong' | 'muted' };

export function generateStaticParams() { return priorityLocations.map((location) => ({ city: location.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocation(resolvedParams.city);
  const utility = location ? getLocationUtility(location.slug) : undefined;
  if (!location) return { title: 'Location not found' };
  const description = utility
    ? `${location.description} ${utility.directoryStatus}`
    : `${location.description} ${location.gscEvidence}`;
  return { title: location.title, description, alternates: { canonical: `/locations/${location.slug}` } };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const location = getLocation(resolvedParams.city);
  if (!location) return <main><h1>Location not found</h1></main>;
  const utility = getLocationUtility(location.slug);
  const relatedListings = utility?.relatedListingSlugs.map((slug) => getListing(slug)).filter((listing) => Boolean(listing)) ?? [];
  const relatedCategories = utility?.internalCategorySlugs.map((slug) => getCategory(slug)).filter((category) => Boolean(category)) ?? [];
  const verifiedListingCount = relatedListings.filter((listing) => listing?.verificationStatus && listing.verificationStatus !== 'needs_verification').length;
  const currentSourceCount = relatedListings.filter((listing) => listing?.verificationStatus === 'current_source').length;
  const historicalSourceCount = relatedListings.filter((listing) => listing?.verificationStatus === 'historical_source').length;
  const statusLabel = (status?: string) => {
    if (status === 'current_source') return 'Official public-source address context';
    if (status === 'historical_source') return 'Historical public-source context';
    return 'Verification queued';
  };
  const sourceFactsFor = (listing: NonNullable<(typeof relatedListings)[number]>): ProfileSourceFact[] => {
    const facts: ProfileSourceFact[] = [
      { label: 'Profile evidence', value: listing.sourceName ? `${listing.sourceName}${listing.lastVerified ? ` · checked ${listing.lastVerified}` : ''}` : 'Public-source review still queued', tone: listing.sourceName ? 'strong' : 'muted' },
      { label: 'Current operation', value: listing.verificationStatus === 'current_source' ? 'Official public-source address context only; Potshops still does not claim hours, menus, stock, delivery, or ordering.' : 'Not confirmed from this historical source; treat as recovery context, not an open-store claim.' },
      { label: 'User action', value: 'Open the listing evidence or send a source-backed correction before relying on broader city-level details.' },
    ];
    return facts;
  };
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://potshops.ca/locations/${location.slug}#webpage`,
        url: `https://potshops.ca/locations/${location.slug}`,
        name: location.title,
        description: utility ? `${location.description} ${utility.directoryStatus}` : location.description,
        isPartOf: { '@id': 'https://potshops.ca/#website' },
        about: `${location.city}, ${location.province} cannabis directory recovery status`,
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
      <p className="eyebrow">Priority city #{location.priority}</p>
      <h1>{location.title}</h1>
      <p className="lede">{location.description}</p>
      <div className="split">
        <section className="card">
          <h2>Why this page exists</h2>
          <p>{location.gscEvidence}</p>
          <p>Legacy demand signal: {location.legacyImpressions.toLocaleString()} impressions across related Search Console query/page data.</p>
          {utility && <p>{utility.summary}</p>}
        </section>
        <aside className="notice">
          <h3>{utility ? `${location.city} directory status` : 'Verification needed'}</h3>
          <p>{utility ? utility.directoryStatus : 'Before publishing store cards at scale, enrich this page with verified store names, addresses, hours, service type, and outbound/contact links.'}</p>
        </aside>
      </div>

      {utility && (
        <section className="card source-action-strip" aria-label={`${location.city} update shortcut`}>
          <div>
            <p className="eyebrow">Source-backed corrections</p>
            <h2>Help verify {location.city} coverage</h2>
            <p>Have a public source for a missing profile, corrected address context, or a clearer historical note? Send the evidence before Potshops adds any stronger city-level claims.</p>
          </div>
          <p className="cta-row">
            <Link className="button secondary" href="/updates" data-event="listing_update_click" data-cta-location="location_top">Send {location.city} source evidence</Link>
          </p>
        </section>
      )}

      {utility && (
        <>
          <section className="card">
            <h2>Searches this page is meant to clarify</h2>
            <p>People are already finding Potshops with these location phrases. The page uses them to explain what is known, what is historical, and what still needs source-backed verification.</p>
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
            </div>
            {relatedListings.length > 0 ? (
              <div className="profile-grid">
                {relatedListings.map((listing) => listing && (
                  <article className="profile-card" key={listing.slug}>
                    <p className={`status-badge ${listing.verificationStatus === 'current_source' ? 'status-current' : 'status-historical'}`}>{statusLabel(listing.verificationStatus)}</p>
                    <h3><Link href={`/listings/${listing.slug}`}>{listing.name}</Link></h3>
                    <p className="meta">{listing.locationHint}</p>
                    {listing.sourceName && (
                      <p>
                        Source note:{' '}
                        {listing.sourceUrl ? (
                          <a href={listing.sourceUrl} rel="nofollow noreferrer" target="_blank">{listing.sourceName}</a>
                        ) : listing.sourceName}
                      </p>
                    )}
                    {listing.sourceNote && <p className="source-excerpt">{listing.sourceNote}</p>}
                    <dl className="profile-source-facts">
                      {sourceFactsFor(listing).map((fact) => (
                        <div key={fact.label} className={fact.tone === 'strong' ? 'source-fact-strong' : undefined}>
                          <dt>{fact.label}</dt>
                          <dd>{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="profile-card-actions">
                      <Link href={`/listings/${listing.slug}`}>View listing evidence</Link>
                      <Link href="/updates" data-event="listing_update_click" data-cta-location="location_profile_card">Send correction</Link>
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p>No listing seeds have been mapped to this city yet.</p>
            )}
          </section>

          <section className="card">
            <h2>{relatedListings.length === 1 ? 'Mapped listing and internal links' : 'Mapped listings and internal links'}</h2>
            {relatedListings.length > 0 ? (
              <ul className="clean">
                {relatedListings.map((listing) => listing && (
                  <li key={listing.slug}>
                    <Link href={`/listings/${listing.slug}`}>{listing.name}</Link> — {listing.locationHint}; {listing.sourceName ? `source note from ${listing.sourceName}` : 'verification queued'}; {listing.gscImpressions.toLocaleString()} legacy impressions.
                  </li>
                ))}
              </ul>
            ) : (
              <p>No listing seeds have been mapped to this city yet.</p>
            )}
            {relatedCategories.length > 0 && (
              <div className="related-hub-row" aria-label={`${location.city} related category hubs`}>
                <span className="meta">Related hubs:</span>
                {relatedCategories.map((category) => category && (
                  <Link className="hub-pill" key={category.slug} href={`/categories/${category.slug}`}>{category.title}</Link>
                ))}
              </div>
            )}
          </section>

          <div className="split">
            <section className="card">
              <h2>Local caveats before monetization</h2>
              <ul className="clean">
                {utility.localCaveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
              </ul>
            </section>
            <aside className="notice">
              <h3>Verification next steps</h3>
              <ul className="clean">
                {utility.verificationNextSteps.map((step) => <li key={step}>{step}</li>)}
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

      <p><Link href="/">← Back to Potshops.ca rebuild priorities</Link></p>
    </main>
  );
}
