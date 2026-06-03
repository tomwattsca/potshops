import Link from 'next/link';
import HomeLookup from './HomeLookup';
import { getCategory, getLocation, listingSeeds, priorityCategories, priorityLocations } from './data/directory';

const gscVisibleLocationSlugs = ['calgary', 'nelson', 'kahnawake', 'penticton'];
const gscVisibleListingSlugs = [
  'cannabis-culture-920-davie',
  'green-leaf',
  'green-essence-head-shop-dispensary',
  'compassion-in-motion',
  'rocket-chronic-2',
  'remedy-ice-cream',
  'gulf-island-organics',
  '420-delivery',
  'the-herb-co-mount-pleasant',
];
const gscVisibleCategorySlugs = ['dispensary', 'in-town-delivery'];
const homepageQuickLinks = [
  {
    href: '#province-directory',
    label: 'Browse by province',
    detail: 'Start with Ontario, British Columbia, Nova Scotia, New Brunswick, Quebec, or Alberta.',
    ctaLocation: 'home_quick_province',
  },
  {
    href: '#locations',
    label: 'Find a city page',
    detail: 'Use city pages to check which source-noted profiles are mapped locally.',
    ctaLocation: 'home_quick_city',
  },
  {
    href: '#listings',
    label: 'Look up a store profile',
    detail: 'Open canonical profiles and read the source notes before relying on any store detail.',
    ctaLocation: 'home_quick_listing',
  },
  {
    href: '/updates',
    label: 'Submit an update',
    detail: 'Send regulator, business, or public-directory evidence for a correction or owner note.',
    ctaLocation: 'home_quick_update',
  },
];
const recentQueryNotesBySlug: Record<string, string> = {
  'cannabis-culture-920-davie': 'Davie Street / Vancouver profile with a redirected older Potshops URL',
  'green-leaf': 'Kahnawake profile with older public-source context',
  'green-essence-head-shop-dispensary': 'Penticton profile with source-limit notes',
  'compassion-in-motion': 'Vancouver-area profile with source notes',
  'rocket-chronic-2': 'Greater Vancouver profile with source notes',
  'remedy-ice-cream': 'Calgary profile with older public-source context',
  'gulf-island-organics': 'Victoria profile marked with historical/source-limit context',
  '420-delivery': 'Greater Vancouver profile with cautious delivery-source context',
  'the-herb-co-mount-pleasant': 'Mount Pleasant / Vancouver profile with source notes',
};

const gscVisibleLocations = gscVisibleLocationSlugs.map((slug) => getLocation(slug)).filter((location) => Boolean(location));
const gscVisibleListings = gscVisibleListingSlugs.map((slug) => listingSeeds.find((listing) => listing.slug === slug)).filter((listing) => Boolean(listing));
const gscVisibleCategories = gscVisibleCategorySlugs.map((slug) => getCategory(slug)).filter((category) => Boolean(category));
const sourceBackedListingCount = listingSeeds.filter((listing) => listing.sourceName).length;
const currentSourceListingCount = listingSeeds.filter((listing) => listing.verificationStatus === 'current_source').length;
const provinceNames: Record<string, string> = {
  AB: 'Alberta',
  BC: 'British Columbia',
  NB: 'New Brunswick',
  NS: 'Nova Scotia',
  ON: 'Ontario',
  QC: 'Quebec',
};
const provinceOrder = ['ON', 'BC', 'NS', 'NB', 'QC', 'AB'];
const locationsByProvince = provinceOrder
  .map((province) => ({
    province,
    name: provinceNames[province],
    locations: priorityLocations.filter((location) => location.province === province),
  }))
  .filter((group) => group.locations.length > 0);
const featuredLocationSlugs = ['calgary', 'nelson', 'kahnawake', 'penticton', 'vancouver', 'toronto', 'windsor', 'duncan'];
const featuredLocations = featuredLocationSlugs
  .map((slug) => getLocation(slug))
  .filter((location) => Boolean(location));
const remainingLocations = priorityLocations.filter((location) => !featuredLocationSlugs.includes(location.slug));

const homepageLookupItems = [
  ...priorityLocations.map((location) => ({
    href: `/locations/${location.slug}`,
    label: `${location.city}, ${location.province}`,
    detail: publicDirectoryCopy(location.description),
    kind: 'City' as const,
    status: 'City directory page with source notes',
    keywords: [location.city, location.province, provinceNames[location.province] ?? '', location.title, publicDirectoryCopy(location.gscEvidence)],
  })),
  ...listingSeeds.map((listing) => ({
    href: `/listings/${listing.slug}`,
    label: listing.name,
    detail: listing.locationHint,
    kind: 'Store profile' as const,
    status: listing.verificationStatus === 'current_source' ? 'Official/public-source address context' : 'Older or public-source context',
    keywords: [listing.name, listing.slug, listing.city ?? '', listing.province ?? '', (listing.categories ?? []).join(' '), listing.sourceName ?? '', listing.sourceNote ?? ''],
  })),
  ...priorityCategories.map((category) => ({
    href: `/categories/${category.slug}`,
    label: category.title,
    detail: publicDirectoryCopy(category.description),
    kind: 'Category' as const,
    status: 'Category hub for existing directory profiles',
    keywords: [category.title, category.slug, publicDirectoryCopy(category.description)],
  })),
];


function publicDirectoryCopy(value: string) {
  return value
    .replace(/Search Console hints?/gi, 'recent search signals')
    .replace(/Search Console rows?/gi, 'recent search signals')
    .replace(/Search Console impressions?/gi, 'recent search visibility')
    .replace(/Search Console/gi, 'search data')
    .replace(/GSC listing demand showed/gi, 'Older directory demand highlighted')
    .replace(/GSC page data showed/gi, 'Older search data highlighted')
    .replace(/GSC/gi, 'search data')
    .replace(/fresh recent search signals/gi, 'recent search signals')
    .replace(/fresh recent search visibility/gi, 'recent search visibility')
    .replace(/fresh low-row/gi, 'recent')
    .replace(/low-row/gi, 'limited')
    .replace(/legacy location-page demand/gi, 'older location-page interest')
    .replace(/legacy location-page impressions/gi, 'older location-page visibility')
    .replace(/legacy impressions/gi, 'older search visibility')
    .replace(/legacy store/gi, 'older store')
    .replace(/legacy page/gi, 'older page')
    .replace(/legacy URLs?/gi, 'older URLs')
    .replace(/legacy/gi, 'older')
    .replace(/historical-source/gi, 'older public-source')
    .replace(/rebuild target/gi, 'directory context page')
    .replace(/recovery profile/gi, 'source-backed profile')
    .replace(/recovery page/gi, 'source-backed page')
    .replace(/source-backed recovery/gi, 'source-backed')
    .replace(/until crawl data accumulates/gi, 'until more public search data is available');
}

const homepageFaqs = [
  {
    question: 'Does Potshops.ca sell cannabis?',
    answer: 'No. Potshops.ca is an independent cannabis directory. It does not sell cannabis, take orders, verify menus, or guarantee stock, delivery, hours, or current operating status.',
  },
  {
    question: 'How should I use the Canadian cannabis store directory?',
    answer: 'Start with a province, city, or profile page. Each page separates source-backed facts from items Potshops still needs to verify.',
  },
  {
    question: 'What if a listing is incomplete or outdated?',
    answer: 'Use the source-backed update path to send regulator, business, or public-directory evidence. Potshops reviews source quality before changing address, category, owner-note, or current-status wording.',
  },
];

function HomepageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://potshops.ca/#webpage',
        url: 'https://potshops.ca/',
        name: 'Potshops.ca Canadian Cannabis Store Directory',
        description: 'Search Canadian cannabis store directory listings by city, province, profile, or category. Potshops.ca explains source-backed details and what still needs verification.',
        isPartOf: { '@id': 'https://potshops.ca/#website' },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://potshops.ca/#homepage-faq',
        mainEntity: homepageFaqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return <script id="potshops-homepage-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">Independent Canadian cannabis directory</div>
            <h1>Search Canadian cannabis store listings by city, province, or name.</h1>
            <p className="lede">Use Potshops to find city pages and store profiles, then check each page's source notes before relying on details like menus, stock, delivery, hours, licences, or current operation.</p>
            <div className="cta-row hero-actions">
              <a className="button" href="#homepage-lookup-title" data-event="internal_link_click" data-cta-location="home_hero_lookup">Search the directory</a>
              <a className="button secondary" href="#province-directory" data-event="internal_link_click" data-cta-location="home_hero_browse">Browse by province</a>
              <Link className="button ghost" href="/updates" data-event="listing_update_click" data-cta-location="home_hero">Suggest an update</Link>
            </div>
            <div className="hero-trust-strip" aria-label="Potshops directory trust summary">
              <span><strong>{listingSeeds.length}</strong> store profiles to search</span>
              <span><strong>{sourceBackedListingCount}</strong> profiles include source notes</span>
              <span><strong>{currentSourceListingCount}</strong> profiles have current public-source address context</span>
              <span>Always verify menus, stock, hours, delivery, and licences directly</span>
            </div>
          </div>
          <HomeLookup items={homepageLookupItems} />
        </div>
      </section>
      <section className="top-paths-band" aria-labelledby="hero-quick-find-title">
        <div className="top-paths-inner">
          <div className="top-paths-copy">
            <div className="eyebrow">Quick paths</div>
            <h2 id="hero-quick-find-title">Start with a search, a province, or a correction.</h2>
            <p>Pick an existing city, profile, or category page. Potshops shows source notes and correction paths instead of guessing live store details.</p>
          </div>
          <div className="quick-link-grid">
            {homepageQuickLinks.map((item) => (
              item.href.startsWith('/') ? (
                <Link key={item.href} href={item.href} data-event="listing_update_click" data-cta-location={item.ctaLocation}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </Link>
              ) : (
                <a key={item.href} href={item.href} data-event="internal_link_click" data-cta-location={item.ctaLocation}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </a>
              )
            ))}
          </div>
          <div className="popular-shortcuts" aria-label="Popular pages">
            <span>Popular starting points:</span>
            <Link href="/locations/calgary" data-event="internal_link_click" data-cta-location="home_quick_popular">Calgary</Link>
            <Link href="/locations/nelson" data-event="internal_link_click" data-cta-location="home_quick_popular">Nelson</Link>
            <Link href="/listings/cannabis-culture-920-davie" data-event="internal_link_click" data-cta-location="home_quick_popular">Cannabis Culture Davie</Link>
            <Link href="/listings/green-leaf" data-event="internal_link_click" data-cta-location="home_quick_popular">Green Leaf</Link>
            <Link href="/updates" data-event="listing_update_click" data-cta-location="home_quick_popular_update">Send evidence</Link>
          </div>
        </div>
      </section>
      <main>
        <HomepageSchema />
        <section className="card evidence-panel" aria-labelledby="current-search-signals">
          <div>
            <div className="eyebrow">Popular searches</div>
            <h2 id="current-search-signals">Popular city and store searches</h2>
            <p>These shortcuts help visitors reach city, profile, and category pages without scrolling through the full directory index.</p>
          </div>
          <div className="signal-grid">
            <article className="mini-card">
              <h3>Popular city pages</h3>
              <ul className="clean">
                {gscVisibleLocations.map((location) => location && (
                  <li key={location.slug}><Link href={`/locations/${location.slug}`} data-event="internal_link_click" data-cta-location="home_signal_location">{location.city}, {location.province} directory page</Link></li>
                ))}
              </ul>
            </article>
            <article className="mini-card signal-profile-card">
              <div className="signal-card-heading">
                <h3>Popular store profiles</h3>
                <span>Top profile shortcuts</span>
              </div>
              <ul className="clean signal-profile-list">
                {gscVisibleListings.slice(0, 5).map((listing) => listing && (
                  <li key={listing.slug}>
                    <Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="home_signal_listing">{listing.name}</Link>
                    <span className="meta">{listing.locationHint}</span>
                    {recentQueryNotesBySlug[listing.slug] && <span className="signal-note">{recentQueryNotesBySlug[listing.slug]}</span>}
                  </li>
                ))}
              </ul>
              <details className="signal-more-details">
                <summary>Show more profile shortcuts</summary>
                <ul className="clean signal-profile-list signal-profile-list-secondary">
                  {gscVisibleListings.slice(5).map((listing) => listing && (
                    <li key={listing.slug}>
                      <Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="home_signal_listing_more">{listing.name}</Link>
                      <span className="meta">{listing.locationHint}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </article>
            <article className="mini-card">
              <h3>Browse common categories</h3>
              <ul className="clean">
                {gscVisibleCategories.map((category) => category && (
                  <li key={category.slug}><Link href={`/categories/${category.slug}`} data-event="internal_link_click" data-cta-location="home_signal_category">{category.title}</Link></li>
                ))}
              </ul>
            </article>
          </div>
          <div className="stats-row" aria-label="Potshops coverage summary">
            <span><strong>{listingSeeds.length}</strong> searchable profiles</span>
            <span><strong>{sourceBackedListingCount}</strong> profiles with source notes</span>
            <span><strong>{currentSourceListingCount}</strong> profiles with public-source address context</span>
            <span><strong>153</strong> directory pages available</span>
          </div>
        </section>

        <section className="card province-directory-panel" aria-labelledby="province-directory">
          <div>
            <div className="eyebrow">Canadian dispensary list by province</div>
            <h2 id="province-directory">Browse Potshops city pages by province</h2>
            <p>Use this province view when you know the area but not the exact profile name. It only links to existing city pages and does not imply complete provincial coverage or current store availability.</p>
          </div>
          <div className="province-grid">
            {locationsByProvince.map((group) => (
              <article className="mini-card province-card" key={group.province}>
                <h3>{group.name}</h3>
                <p className="meta">{group.locations.length} city page{group.locations.length === 1 ? '' : 's'} with source notes</p>
                <div className="province-links">
                  {group.locations.map((location) => (
                    <Link key={location.slug} href={`/locations/${location.slug}`} data-event="internal_link_click" data-cta-location="home_province_location">{location.city}</Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="source-excerpt"><strong>Source limit:</strong> this directory map is not a guarantee that every city has complete coverage or that any listed business is currently operating.</p>
        </section>


        <section className="card homepage-faq-panel" aria-labelledby="homepage-directory-faq">
          <div>
            <div className="eyebrow">Directory source limits</div>
            <h2 id="homepage-directory-faq">How to use Potshops.ca safely</h2>
            <p>Potshops is useful for finding source-noted directory pages, but it should not be treated as proof of live menus, stock, delivery, hours, licences, or current operation.</p>
          </div>
          <div className="faq-grid">
            {homepageFaqs.map((item) => (
              <article className="mini-card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="locations" className="directory-index-section">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">City directory index</div>
              <h2>Start with these city pages</h2>
              <p>These city pages cover the most common starting points and source-note examples. Use the province browser or full city list when you need another area.</p>
            </div>
            <a className="section-jump-link" href="#province-directory" data-event="internal_link_click" data-cta-location="home_city_index_province_jump">Browse all provinces</a>
          </div>
          <div className="grid featured-city-grid">
            {featuredLocations.map((location) => location && (
              <article className="card" key={location.slug}>
                <h3><Link href={`/locations/${location.slug}`} data-event="internal_link_click" data-cta-location="home_location_featured_grid">{location.city}, {location.province}</Link></h3>
                <p>{publicDirectoryCopy(location.description)}</p>
                <p className="meta">City directory page · source notes included where available</p>
              </article>
            ))}
          </div>
          <details className="full-index-details city-index-details">
            <summary>Show all city page links</summary>
            <div className="index-link-cloud">
              {remainingLocations.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`} data-event="internal_link_click" data-cta-location="home_location_details_index">{location.city}, {location.province}</Link>
              ))}
            </div>
          </details>
        </section>
        <section id="categories">
          <div className="eyebrow">Category hubs</div>
          <h2>Browse by directory category</h2>
          <p>These category pages group profiles with source notes and city pages without implying live availability, ordering, delivery, menus, or complete coverage.</p>
          <div className="grid">
            {priorityCategories.map((category) => (
              <article className="card" key={category.slug}>
                <h3><Link href={`/categories/${category.slug}`} data-event="internal_link_click" data-cta-location="home_category_grid">{category.title}</Link></h3>
                <p>{publicDirectoryCopy(category.description)}</p>
                <p className="meta">Links only to existing source-noted profiles and city pages.</p>
              </article>
            ))}
          </div>
        </section>
        <section id="listings">
          <div className="eyebrow">Store profile index</div>
          <h2>Store profiles with source notes</h2>
          <p>Start with visible store profiles, or use the directory search above to find a specific store name. Profile pages separate source-backed facts from unverified current-store details.</p>
          <div className="profile-index-note" role="note">
            <strong>Source note:</strong> profile cards are starting points, not current-store guarantees. Open a profile for source details and verify menus, stock, delivery, hours, licensing, and operation directly with official sources.
          </div>
          <div className="grid compact-grid profile-card-grid">
            {listingSeeds.slice(0, 24).map((listing) => {
              const isCurrentSource = listing.verificationStatus === 'current_source';
              return (
                <article className="card home-profile-card" key={listing.slug}>
                  <h3><Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="home_listing_grid">{listing.name}</Link></h3>
                  <p className="meta">{listing.locationHint}</p>
                  <div className="profile-status-row" aria-label={isCurrentSource ? 'Public-source address context; current details require verification' : 'Older public-source context; current status unverified'}>
                    <span className={`status-badge ${isCurrentSource ? 'status-current' : 'status-historical'}`}>{isCurrentSource ? 'Public-source address' : 'Older public source'}</span>
                    <span className="profile-status-meta">Current details unverified</span>
                  </div>
                </article>
              );
            })}
          </div>
          <details className="full-index-details">
            <summary>Show all profile links</summary>
            <div className="index-link-cloud">
              {listingSeeds.slice(24).map((listing) => (
                <Link key={listing.slug} href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="home_listing_details_index">{listing.name}</Link>
              ))}
            </div>
          </details>
        </section>
        <section id="claim" className="split">
          <div>
            <div className="eyebrow">Corrections and owner notes</div>
            <h2>Suggest a source-backed cannabis listing update</h2>
            <p>Potshops can grow faster when store owners and readers send official-source corrections, but the public directory stays conservative until facts are verified.</p>
            <ul className="clean">
              <li>Address and city corrections backed by regulator, business, or public directory sources.</li>
              <li>Clearly labelled owner notes before any sponsorship conversation.</li>
              <li>No hours, menus, ordering, delivery, availability, rating, or promotional claims without exact source and compliance review.</li>
            </ul>
            <p><Link className="button" href="/updates" data-event="listing_update_click" data-cta-location="home_update_section">Send a source-backed update</Link></p>
          </div>
          <aside className="notice">
            <h3>Data quality note</h3>
            <p>Some older Potshops pages are being reviewed against public-source evidence. Send source-backed address, category, or owner-note corrections before relying on stronger current-status wording.</p>
          </aside>
        </section>
      </main>
    </>
  );
}
