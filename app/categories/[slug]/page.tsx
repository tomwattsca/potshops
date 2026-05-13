import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategory, listingSeeds, priorityCategories, priorityLocations } from '../../data/directory';

export function generateStaticParams() { return priorityCategories.map((category) => ({ slug: category.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategory(resolvedParams.slug);
  if (!category) return { title: 'Category not found' };
  return { title: category.title, description: `${category.description} ${category.gscEvidence}`, alternates: { canonical: `/categories/${category.slug}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = getCategory(resolvedParams.slug);
  if (!category) return <main><h1>Category not found</h1></main>;
  const categoryListings = listingSeeds
    .filter((listing) => listing.categories?.includes(category.slug))
    .sort((a, b) => b.gscImpressions - a.gscImpressions);
  const visibleListings = categoryListings.slice(0, category.slug === 'dispensary' ? 12 : 8);
  const linkedLocations = priorityLocations
    .filter((location) => categoryListings.some((listing) => listing.city === location.city && listing.province === location.province))
    .slice(0, 10);
  const sourceBackedCount = categoryListings.filter((listing) => listing.sourceName).length;
  const currentSourceCount = categoryListings.filter((listing) => listing.verificationStatus === 'current_source').length;
  const historicalSourceCount = categoryListings.filter((listing) => listing.verificationStatus === 'historical_source').length;
  const statusLabel = (status?: string) => {
    if (status === 'current_source') return 'Official address-context source';
    if (status === 'historical_source') return 'Historical public-source context';
    return 'Verification queued';
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://potshops.ca/categories/${category.slug}#webpage`,
        url: `https://potshops.ca/categories/${category.slug}`,
        name: category.title,
        description: category.description,
        isPartOf: { '@id': 'https://potshops.ca/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://potshops.ca/' },
          { '@type': 'ListItem', position: 2, name: category.title, item: `https://potshops.ca/categories/${category.slug}` },
        ],
      },
      ...(visibleListings.length > 0 ? [{
        '@type': 'ItemList',
        name: `${category.title} source-backed Potshops profiles`,
        numberOfItems: visibleListings.length,
        itemListElement: visibleListings.map((listing, index) => ({
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="eyebrow">Priority category #{category.priority}</p>
      <h1>{category.title}</h1>
      <p className="lede">{category.description}</p>
      <section className="card category-evidence-card">
        <div>
          <p className="eyebrow">Category evidence at a glance</p>
          <h2>What this {category.slug === 'dispensary' ? 'dispensary' : 'delivery'} hub can safely prove</h2>
          <p>{category.gscEvidence}</p>
        </div>
        <div className="listing-proof-grid" aria-label={`${category.title} source-backed coverage summary`}>
          <div className="mini-card">
            <strong>{category.legacyImpressions.toLocaleString()} legacy impressions</strong>
            <span>Old category-path demand before the Potshops rebuild; current GSC still shows broad cannabis-store and dispensary queries.</span>
          </div>
          <div className="mini-card">
            <strong>{categoryListings.length.toLocaleString()} mapped profiles</strong>
            <span>{sourceBackedCount.toLocaleString()} source-backed rows: {currentSourceCount.toLocaleString()} official/current-source and {historicalSourceCount.toLocaleString()} historical-source.</span>
          </div>
          <div className="mini-card">
            <strong>{linkedLocations.length.toLocaleString()} city paths linked</strong>
            <span>Internal links point to exact city pages that have mapped profile evidence, not generic doorway copy.</span>
          </div>
        </div>
        <p className="source-excerpt"><strong>Limit:</strong> Potshops keeps this category informational. It does not verify current hours, menus, stock, ordering, delivery, prices, reviews, ratings, licensing, or whether a storefront is operating today.</p>
      </section>

      <section className="card category-profile-card">
        <div>
          <p className="eyebrow">Source-backed profiles</p>
          <h2>Start with verifiable listing evidence</h2>
          <p>These cards make the category page easier to scan for visitors and crawlers without adding unsupported cannabis commerce claims. Each profile explains what the public source does and does not support.</p>
        </div>
        <div className="profile-grid">
          {visibleListings.map((listing) => (
            <article className="profile-card" key={listing.slug}>
              <p className={`status-badge ${listing.verificationStatus === 'current_source' ? 'status-current' : 'status-historical'}`}>{statusLabel(listing.verificationStatus)}</p>
              <h3><Link href={`/listings/${listing.slug}`}>{listing.name}</Link></h3>
              <p className="meta">{listing.city && listing.province ? `${listing.city}, ${listing.province}` : listing.locationHint} · {listing.gscImpressions.toLocaleString()} legacy impressions</p>
              {listing.sourceName ? <p>Source: {listing.sourceName}</p> : <p>Source verification still queued.</p>}
              {listing.sourceNote && <p className="source-excerpt">{listing.sourceNote}</p>}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Start with city pages</h2>
        <p>Category coverage is strongest where Potshops has mapped listing evidence into a city page. These are informational paths, not availability or ordering claims.</p>
        <div className="grid">
          {linkedLocations.map((location) => (
            <article className="card" key={location.slug}>
              <h3><Link href={`/locations/${location.slug}`}>{location.city}, {location.province}</Link></h3>
              <p>{location.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card update-card">
        <div>
          <p className="eyebrow">Improve this category</p>
          <h2>Know a better public source for a {category.slug === 'dispensary' ? 'dispensary' : 'delivery'} profile?</h2>
          <p>Send a regulator, business, or public-directory source so Potshops can improve this category without adding unsupported hours, menu, delivery, availability, licence, rating, or promotional claims.</p>
        </div>
        <p className="cta-row">
          <Link className="button" href="/updates" data-event="listing_update_click" data-cta-location="category_detail">Suggest a source-backed update</Link>
        </p>
      </section>
      <p><Link href="/">Back to Potshops.ca rebuild priorities</Link></p>
    </main>
  );
}
