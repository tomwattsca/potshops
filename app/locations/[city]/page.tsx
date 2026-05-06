import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategory, getListing, getLocation, getLocationUtility, priorityLocations } from '../../data/directory';

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
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://potshops.ca/' },
      { '@type': 'ListItem', position: 2, name: `${location.city}, ${location.province}`, item: `https://potshops.ca/locations/${location.slug}` },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
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
        <>
          <section className="card">
            <h2>{location.city} search intent Potshops should satisfy</h2>
            <p>These phrases are used as directional demand signals from Search Console and should guide safe enrichment, not unsupported commercial claims.</p>
            <ul className="clean">
              {utility.searchIntent.map((intent) => <li key={intent}>{intent}</li>)}
            </ul>
          </section>

          <section className="card">
            <h2>Mapped listings and internal links</h2>
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
              <p className="meta">Related hubs: {relatedCategories.map((category, index) => category && (
                <span key={category.slug}>{index > 0 ? ', ' : ''}<Link href={`/categories/${category.slug}`}>{category.title}</Link></span>
              ))}</p>
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

      <p><Link href="/">← Back to Potshops.ca rebuild priorities</Link></p>
    </main>
  );
}
