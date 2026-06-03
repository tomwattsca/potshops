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
  const statusLimit = (status?: string) => {
    if (status === 'current_source') return 'Official or public address context is available; current store details are not verified here.';
    if (status === 'historical_source') return 'Historical source context is available; current store details are not verified here.';
    return 'Source verification is still queued; do not treat this as a current-store claim.';
  };
  const sourceSummary = (note?: string) => {
    if (!note) return 'Open the profile for source notes and current verification limits.';
    const firstSentence = note.includes('. ') ? `${note.split('. ')[0]}.` : note;
    return firstSentence.length > 185 ? `${firstSentence.slice(0, 182)}…` : firstSentence;
  };
  const publicLocationDescription = (description: string) => description
    .replace(/Search Console rows?/gi, 'recent search signals')
    .replace(/Search Console impressions?/gi, 'recent search visibility')
    .replace(/Search Console/gi, 'search')
    .replace(/legacy location-page impressions?/gi, 'older location-page discovery signals')
    .replace(/legacy location-page/gi, 'older location page')
    .replace(/legacy URLs?/gi, 'older directory paths')
    .replace(/legacy listing/gi, 'historical listing')
    .replace(/legacy profile/gi, 'historical profile')
    .replace(/source-backed recovery page/gi, 'source-backed city page')
    .replace(/recovery page/gi, 'directory page')
    .replace(/recovery profile/gi, 'source-backed profile')
    .replace(/rebuild target/gi, 'directory context page')
    .replace(/source-backed Tribal ReLeaf profile/gi, 'public-source Tribal ReLeaf profile')
    .replace(/source-backed Mr\. Green’s source-backed profile/gi, 'public-source Mr. Green’s profile')
    .replace(/source-backed Mr\. Green's source-backed profile/gi, "public-source Mr. Green's profile");
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
      <p className="eyebrow">Source-backed category hub</p>
      <h1>{category.title}</h1>
      <p className="lede">{category.description}</p>
      <p className="cta-row category-hero-actions">
        <Link className="button" href="#category-cities" data-event="internal_link_click" data-cta-location="category_hero_cities">Browse city pages</Link>
        <Link className="button secondary" href="#category-profiles" data-event="internal_link_click" data-cta-location="category_hero_profiles">View source-backed profiles</Link>
        <Link className="button ghost" href="/updates" data-event="listing_update_click" data-cta-location="category_hero_update">Suggest a correction</Link>
      </p>
      <section className="card category-evidence-card">
        <div>
          <p className="eyebrow">Directory coverage at a glance</p>
          <h2>Use this page to find sourced profiles, not live store guarantees</h2>
          <p>{category.gscEvidence}</p>
        </div>
        <div className="listing-proof-grid" aria-label={`${category.title} source-backed coverage summary`}>
          <div className="mini-card">
            <strong>{category.legacyImpressions.toLocaleString()} historical search signals</strong>
            <span>Older category demand helped decide which public directory paths to preserve and clarify.</span>
          </div>
          <div className="mini-card">
            <strong>{categoryListings.length.toLocaleString()} profile links</strong>
            <span>{sourceBackedCount.toLocaleString()} profiles have public-source notes: {currentSourceCount.toLocaleString()} official address-context and {historicalSourceCount.toLocaleString()} historical-source.</span>
          </div>
          <div className="mini-card">
            <strong>{linkedLocations.length.toLocaleString()} city pages</strong>
            <span>City links only appear where this category has mapped profile evidence.</span>
          </div>
        </div>
        <p className="source-excerpt"><strong>Limit:</strong> Potshops keeps this category informational. It does not verify current hours, menus, stock, ordering, delivery, prices, reviews, ratings, licensing, or whether a storefront is operating today.</p>
      </section>

      <section id="category-profiles" className="card category-profile-card">
        <div>
          <p className="eyebrow">Source-backed profiles</p>
          <h2>Start with verifiable listing evidence</h2>
          <p>Each card links to an existing profile and states the public source behind it. Potshops does not turn these sources into current hours, menu, stock, ordering, delivery, licence, price, rating, or operation claims.</p>
          <p className="category-shared-limit"><strong>Shared source limit:</strong> profile cards show public-source context only. Current hours, menus, stock, ordering, delivery, prices, ratings, licensing, availability, and storefront operation still need independent confirmation.</p>
        </div>
        <div className="profile-grid category-profile-grid">
          {visibleListings.map((listing) => (
            <article className="profile-card category-source-card" key={listing.slug}>
              <p className={`status-badge ${listing.verificationStatus === 'current_source' ? 'status-current' : 'status-historical'}`}>{statusLabel(listing.verificationStatus)}</p>
              <h3><Link href={`/listings/${listing.slug}`}>{listing.name}</Link></h3>
              <dl className="category-profile-facts">
                <div>
                  <dt>Location context</dt>
                  <dd>{listing.city && listing.province ? `${listing.city}, ${listing.province}` : listing.locationHint}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>{listing.sourceName || 'Verification still queued'}</dd>
                </div>
                <div>
                  <dt>Search context</dt>
                  <dd>{listing.gscImpressions.toLocaleString()} historical search signals</dd>
                </div>
                <div className="category-current-limit">
                  <dt>Current-store check</dt>
                  <dd>{statusLimit(listing.verificationStatus)}</dd>
                </div>
              </dl>
              <p className="source-excerpt category-source-summary">{sourceSummary(listing.sourceNote)}</p>
              <p className="profile-card-actions category-profile-actions">
                <Link className="profile-action-primary" href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="category_profile_card">View profile</Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="category-cities">
        <h2>Start with city pages</h2>
        <p>Category coverage is clearest where Potshops can connect sourced profiles to an existing city page. These are browse paths for public-source context, not availability or ordering claims.</p>
        <div className="grid">
          {linkedLocations.map((location) => (
            <article className="card" key={location.slug}>
              <h3><Link href={`/locations/${location.slug}`}>{location.city}, {location.province}</Link></h3>
              <p>{publicLocationDescription(location.description)}</p>
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
      <p><Link href="/">Back to Potshops.ca directory home</Link></p>
    </main>
  );
}
