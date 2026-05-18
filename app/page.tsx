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
    detail: 'Use rebuilt city pages to check which source-backed profiles are mapped locally.',
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
  'cannabis-culture-920-davie': 'top non-homepage row: old /listing/ URL plus Cannabis Culture brand variants',
  'green-leaf': 'recent Kahnawake and dispensary query rows',
  'green-essence-head-shop-dispensary': 'recent Green Essence and Penticton query rows',
  'compassion-in-motion': 'recent brand query row',
  'rocket-chronic-2': 'recent Rocket Chronic Canada query rows landing on the homepage',
  'remedy-ice-cream': 'recent Remedy Ice Cream query row and Calgary location context',
  'gulf-island-organics': 'recent existing-profile page row',
  '420-delivery': 'recent existing-profile page row',
  'the-herb-co-mount-pleasant': 'recent herb company query row',
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

const homepageLookupItems = [
  ...priorityLocations.map((location) => ({
    href: `/locations/${location.slug}`,
    label: `${location.city}, ${location.province}`,
    detail: location.description,
    kind: 'City' as const,
    status: location.legacyImpressions > 0 ? `${location.legacyImpressions} legacy impressions in the rebuild data` : 'Source-backed city page in the current rebuild',
    keywords: [location.city, location.province, provinceNames[location.province] ?? '', location.title, location.gscEvidence],
  })),
  ...listingSeeds.map((listing) => ({
    href: `/listings/${listing.slug}`,
    label: listing.name,
    detail: listing.locationHint,
    kind: 'Store profile' as const,
    status: listing.verificationStatus === 'current_source' ? 'Official/public-source address context' : 'Historical or public-source context',
    keywords: [listing.name, listing.slug, listing.city ?? '', listing.province ?? '', (listing.categories ?? []).join(' '), listing.sourceName ?? '', listing.sourceNote ?? ''],
  })),
  ...priorityCategories.map((category) => ({
    href: `/categories/${category.slug}`,
    label: category.title,
    detail: category.description,
    kind: 'Category' as const,
    status: `${category.legacyImpressions} legacy impressions in the rebuild data`,
    keywords: [category.title, category.slug, category.description],
  })),
];

const homepageFaqs = [
  {
    question: 'Does Potshops.ca sell cannabis?',
    answer: 'No. Potshops.ca is an independent directory rebuild. It does not sell cannabis, take orders, verify menus, or guarantee stock, delivery, hours, or current operating status.',
  },
  {
    question: 'How should I use the Canadian cannabis store directory?',
    answer: 'Start with the province, city, or profile pages that are already rebuilt. Each page separates source-backed facts from items Potshops still needs to verify.',
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
        description: 'A source-backed Canadian cannabis directory rebuild that routes broad searches into existing province, city, category, and listing pages while avoiding unsupported current-commerce claims.',
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
        <div className="hero-inner">
          <div className="eyebrow">Canadian cannabis directory rebuild</div>
          <h1>Find source-backed Canadian cannabis directory pages by city, province, or store name.</h1>
          <p className="lede">Potshops.ca helps visitors navigate rebuilt cannabis directory profiles while keeping source limits clear. Start with an existing province, city, or store profile, then verify current menus, stock, delivery, hours, licensing, and operation with official sources before relying on any detail.</p>
          <div className="cta-row">
            <a className="button" href="#homepage-lookup-title" data-event="internal_link_click" data-cta-location="home_hero_lookup">Search existing pages</a>
            <a className="button secondary" href="#province-directory" data-event="internal_link_click" data-cta-location="home_hero_browse">Browse by province</a>
            <Link className="button secondary" href="/updates" data-event="listing_update_click" data-cta-location="home_hero">Suggest a listing update</Link>
          </div>
          <HomeLookup items={homepageLookupItems} />
          <div className="hero-quick-find" aria-labelledby="hero-quick-find-title">
            <div>
              <div className="eyebrow">Quick find</div>
              <h2 id="hero-quick-find-title">Start with the page type you need</h2>
              <p>Potshops does not guess live store details. These shortcuts take you to existing source-backed directory pages, where each profile or city page explains what is supported and what still needs verification.</p>
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
            <div className="popular-shortcuts" aria-label="Popular rebuilt pages">
              <span>Popular rebuilt paths:</span>
              <Link href="/locations/calgary" data-event="internal_link_click" data-cta-location="home_quick_popular">Calgary</Link>
              <Link href="/locations/nelson" data-event="internal_link_click" data-cta-location="home_quick_popular">Nelson</Link>
              <Link href="/listings/cannabis-culture-920-davie" data-event="internal_link_click" data-cta-location="home_quick_popular">Cannabis Culture Davie</Link>
              <Link href="/listings/green-leaf" data-event="internal_link_click" data-cta-location="home_quick_popular">Green Leaf</Link>
              <Link href="/updates" data-event="listing_update_click" data-cta-location="home_quick_popular_update">Send evidence</Link>
            </div>
          </div>
          <div className="homepage-search-guide" aria-label="How Potshops handles cannabis store searches">
            <article>
              <span className="guide-step">1</span>
              <h2>Search by province or city</h2>
              <p>Use the rebuilt province and city pages as a directory map, especially for broad searches like Canadian dispensary list or cannabis store Canada.</p>
            </article>
            <article>
              <span className="guide-step">2</span>
              <h2>Read the source notes first</h2>
              <p>Profile pages show what public sources support and what Potshops is not claiming yet, including current operation, menus, stock, delivery, hours, or licences.</p>
            </article>
            <article>
              <span className="guide-step">3</span>
              <h2>Send evidence, not promotions</h2>
              <p>Corrections should include regulator, business, or public-directory sources. Promotional, medical, quality, ordering, or availability claims stay out until they are independently supportable.</p>
            </article>
          </div>
        </div>
      </section>
      <main>
        <HomepageSchema />
        <section className="card evidence-panel" aria-labelledby="current-search-signals">
          <div>
            <div className="eyebrow">Current search signals</div>
            <h2 id="current-search-signals">Start with rebuilt pages people are already trying to find</h2>
            <p>Recent search data points to the homepage, older Potshops URLs, city searches, and store-name searches. This section translates those signals into plain-language shortcuts to existing canonical pages before the full directory grid.</p>
          </div>
          <div className="signal-grid">
            <article className="mini-card">
              <h3>City pages with recent search demand</h3>
              <ul className="clean">
                {gscVisibleLocations.map((location) => location && (
                  <li key={location.slug}><Link href={`/locations/${location.slug}`} data-event="internal_link_click" data-cta-location="home_signal_location">{location.city}, {location.province} cannabis directory notes</Link></li>
                ))}
              </ul>
            </article>
            <article className="mini-card">
              <h3>Store profiles people are looking for</h3>
              <ul className="clean">
                {gscVisibleListings.map((listing) => listing && (
                  <li key={listing.slug}>
                    <Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="home_signal_listing">{listing.name}</Link> <span className="meta">({listing.locationHint})</span>
                    {recentQueryNotesBySlug[listing.slug] && <span className="signal-note"> — {recentQueryNotesBySlug[listing.slug]}</span>}
                  </li>
                ))}
              </ul>
            </article>
            <article className="mini-card">
              <h3>Category hubs to browse next</h3>
              <ul className="clean">
                {gscVisibleCategories.map((category) => category && (
                  <li key={category.slug}><Link href={`/categories/${category.slug}`} data-event="internal_link_click" data-cta-location="home_signal_category">{category.title}</Link></li>
                ))}
              </ul>
            </article>
          </div>
          <div className="stats-row" aria-label="Potshops source-backed coverage summary">
            <span><strong>{listingSeeds.length}</strong> total rebuilt profiles</span>
            <span><strong>{sourceBackedListingCount}</strong> source-backed profiles</span>
            <span><strong>{currentSourceListingCount}</strong> current-source address-context profiles</span>
            <span><strong>153</strong> sitemap URLs</span>
          </div>
        </section>

        <section className="card province-directory-panel" aria-labelledby="province-directory">
          <div>
            <div className="eyebrow">Canadian dispensary list by province</div>
            <h2 id="province-directory">Browse rebuilt Potshops city pages by province</h2>
            <p>Use this province view when you know the market but not the exact profile name. It only links to existing rebuilt city pages and does not imply complete provincial coverage or current store availability.</p>
          </div>
          <div className="province-grid">
            {locationsByProvince.map((group) => (
              <article className="mini-card province-card" key={group.province}>
                <h3>{group.name}</h3>
                <p className="meta">{group.locations.length} source-led city page{group.locations.length === 1 ? '' : 's'} in the current rebuild</p>
                <div className="province-links">
                  {group.locations.map((location) => (
                    <Link key={location.slug} href={`/locations/${location.slug}`} data-event="internal_link_click" data-cta-location="home_province_location">{location.city}</Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="source-excerpt"><strong>Source limit:</strong> this is a rebuilt directory map, not a guarantee that every city has complete coverage or that any listed business is currently operating.</p>
        </section>


        <section className="card homepage-faq-panel" aria-labelledby="homepage-directory-faq">
          <div>
            <div className="eyebrow">Search intent and source limits</div>
            <h2 id="homepage-directory-faq">How to use Potshops.ca without over-reading the directory</h2>
            <p>Recent Search Console rows include broad directory phrases and a few searchers who may be looking for store context. Potshops keeps the homepage useful for those searches while making the limits clear before anyone clicks into a city or listing page.</p>
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

        <section id="locations">
          <div className="eyebrow">GSC-led information architecture</div>
          <h2>Priority location pages</h2>
          <p>These are the first city pages because they appeared in Potshops.ca query/page data from 2025-01-02 to 2026-05-03 or because official public-source rows support a cautious local directory page.</p>
          <div className="grid">
            {priorityLocations.map((location) => (
              <article className="card" key={location.slug}>
                <h3><Link href={`/locations/${location.slug}`} data-event="internal_link_click" data-cta-location="home_location_grid">{location.city}, {location.province}</Link></h3>
                <p>{location.description}</p>
                <p className="meta">Priority {location.priority} · {location.legacyImpressions.toLocaleString()} legacy impressions signal</p>
              </article>
            ))}
          </div>
        </section>
        <section id="categories">
          <div className="eyebrow">Commercial-intent recovery</div>
          <h2>Priority category pages</h2>
          <p>These legacy category URLs had Search Console demand and now act as hubs to city and listing pages while Potshops verifies commercial data.</p>
          <div className="grid">
            {priorityCategories.map((category) => (
              <article className="card" key={category.slug}>
                <h3><Link href={`/categories/${category.slug}`} data-event="internal_link_click" data-cta-location="home_category_grid">{category.title}</Link></h3>
                <p>{category.description}</p>
                <p className="meta">Legacy path: <code>{category.legacyPath}</code> · {category.legacyImpressions.toLocaleString()} impressions</p>
              </article>
            ))}
          </div>
        </section>
        <section id="listings">
          <div className="eyebrow">Legacy URL recovery</div>
          <h2>Store profiles to verify first</h2>
          <p>These listing URLs had the most Search Console impressions on the unavailable WordPress site. Rebuilding them first helps recover existing demand while seed data is verified.</p>
          <div className="grid">
            {listingSeeds.map((listing) => (
              <article className="card" key={listing.slug}>
                <h3><Link href={`/listings/${listing.slug}`} data-event="internal_link_click" data-cta-location="home_listing_grid">{listing.name}</Link></h3>
                <p className="meta">{listing.locationHint} · {listing.gscImpressions.toLocaleString()} impressions · {listing.gscClicks.toLocaleString()} clicks</p>
                <p>Legacy path: <code>{listing.legacyPath}</code></p>
              </article>
            ))}
          </div>
        </section>
        <section id="claim" className="split">
          <div>
            <div className="eyebrow">Revenue path</div>
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
            <p>Old WordPress data is unavailable. Early pages are based on Search Console demand signals and public-source acquisition. Potshops needs source-backed address/category corrections before any stronger current-status or paid-placement claims.</p>
          </aside>
        </section>
      </main>
    </>
  );
}
