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
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="eyebrow">Priority category #{category.priority}</p>
      <h1>{category.title}</h1>
      <p className="lede">{category.description}</p>
      <div className="split">
        <section className="card">
          <h2>Search demand evidence</h2>
          <p>{category.gscEvidence}</p>
          <p>Legacy demand signal: {category.legacyImpressions.toLocaleString()} impressions on the old category URL before the rebuild.</p>
          <p>This hub now connects {categoryListings.length.toLocaleString()} mapped listing profiles, including {sourceBackedCount.toLocaleString()} source-backed rows and {currentSourceCount.toLocaleString()} official public-source address-context rows.</p>
        </section>
        <aside className="notice">
          <h3>Compliance-first publishing rule</h3>
          <p>Potshops keeps this category informational. It does not verify current hours, menus, stock, ordering, delivery, prices, reviews, ratings, or whether a storefront is operating today.</p>
        </aside>
      </div>

      <section className="card">
        <h2>Source-backed profiles in this category</h2>
        <p>These internal links make the category page useful for visitors and crawlers without adding unsupported cannabis commerce claims. Each profile explains what the public source does and does not support.</p>
        <ul className="clean directory-list">
          {visibleListings.map((listing) => (
            <li key={listing.slug}>
              <Link href={`/listings/${listing.slug}`}>{listing.name}</Link>
              <span> — {listing.city && listing.province ? `${listing.city}, ${listing.province}` : listing.locationHint}</span>
              <span>; {listing.sourceName ? (listing.verificationStatus === 'current_source' ? 'official address-context source' : 'historical/public-source context') : 'verification queued'}</span>
              <span>; {listing.gscImpressions.toLocaleString()} legacy impressions.</span>
            </li>
          ))}
        </ul>
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
