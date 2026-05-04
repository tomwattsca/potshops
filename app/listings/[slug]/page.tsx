import type { Metadata } from 'next';
import Link from 'next/link';
import { getListing, listingSeeds } from '../../data/directory';

export function generateStaticParams() { return listingSeeds.map((listing) => ({ slug: listing.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const listing = getListing(resolvedParams.slug);
  if (!listing) return { title: 'Listing not found' };
  return { title: `${listing.name} cannabis listing`, description: `${listing.name} was a high-priority legacy Potshops.ca listing with ${listing.gscImpressions} Search Console impressions. Profile data is queued for verification.`, alternates: { canonical: `/listings/${listing.slug}` } };
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const listing = getListing(resolvedParams.slug);
  if (!listing) return <main><h1>Listing not found</h1></main>;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://potshops.ca/listings/${listing.slug}#localbusiness`,
    name: listing.name,
    url: `https://potshops.ca/listings/${listing.slug}`,
    areaServed: listing.locationHint,
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
          <h3>Claim or verify this listing</h3>
          <p>The rebuild needs verified address, hours, service area, official website, and compliance-friendly description before commercial promotion.</p>
        </aside>
      </div>
      <p><Link href="/">← Back to Potshops.ca rebuild priorities</Link></p>
    </main>
  );
}
