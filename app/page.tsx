import Link from 'next/link';
import { getCategory, getLocation, listingSeeds, priorityCategories, priorityLocations } from './data/directory';

const gscVisibleLocationSlugs = ['nelson', 'kahnawake', 'penticton'];
const gscVisibleListingSlugs = ['green-leaf', 'green-essence-head-shop-dispensary', 'compassion-in-motion'];
const gscVisibleCategorySlugs = ['dispensary', 'in-town-delivery'];

const gscVisibleLocations = gscVisibleLocationSlugs.map((slug) => getLocation(slug)).filter((location) => Boolean(location));
const gscVisibleListings = gscVisibleListingSlugs.map((slug) => listingSeeds.find((listing) => listing.slug === slug)).filter((listing) => Boolean(listing));
const gscVisibleCategories = gscVisibleCategorySlugs.map((slug) => getCategory(slug)).filter((category) => Boolean(category));
const sourceBackedListingCount = listingSeeds.filter((listing) => listing.sourceName).length;
const currentSourceListingCount = listingSeeds.filter((listing) => listing.verificationStatus === 'current_source').length;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Canadian cannabis directory rebuild</div>
          <h1>Find Canadian cannabis stores by city, province, and legacy Potshops demand.</h1>
          <p className="lede">Potshops.ca is being rebuilt from scratch using Google Search Console evidence from the old site. The first launch focuses on the locations and store pages that already showed search demand.</p>
          <div className="cta-row">
            <a className="button" href="#locations">Browse priority cities</a>
            <Link className="button secondary" href="/updates" data-event="listing_update_click" data-cta-location="home_hero">Suggest a listing update</Link>
          </div>
        </div>
      </section>
      <main>
        <section className="card evidence-panel" aria-labelledby="current-search-signals">
          <div>
            <div className="eyebrow">Current search signals</div>
            <h2 id="current-search-signals">Start with the Potshops pages already showing in Google data</h2>
            <p>The latest final-data Search Console sample still shows the homepage, Nelson, Green Leaf, Green Essence, Compassion in Motion, and broad dispensary/category intent. This section gives visitors and crawlers a shorter path to those existing pages before the full directory grid.</p>
          </div>
          <div className="signal-grid">
            <article className="mini-card">
              <h3>GSC-visible city pages</h3>
              <ul className="clean">
                {gscVisibleLocations.map((location) => location && (
                  <li key={location.slug}><Link href={`/locations/${location.slug}`}>{location.city}, {location.province} cannabis directory notes</Link></li>
                ))}
              </ul>
            </article>
            <article className="mini-card">
              <h3>GSC-visible profiles</h3>
              <ul className="clean">
                {gscVisibleListings.map((listing) => listing && (
                  <li key={listing.slug}><Link href={`/listings/${listing.slug}`}>{listing.name}</Link> <span className="meta">({listing.locationHint})</span></li>
                ))}
              </ul>
            </article>
            <article className="mini-card">
              <h3>Category hubs to browse next</h3>
              <ul className="clean">
                {gscVisibleCategories.map((category) => category && (
                  <li key={category.slug}><Link href={`/categories/${category.slug}`}>{category.title}</Link></li>
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

        <section id="locations">
          <div className="eyebrow">GSC-led information architecture</div>
          <h2>Priority location pages</h2>
          <p>These are the first city pages because they appeared in Potshops.ca query/page data from 2025-01-02 to 2026-05-03.</p>
          <div className="grid">
            {priorityLocations.map((location) => (
              <article className="card" key={location.slug}>
                <h3><Link href={`/locations/${location.slug}`}>{location.city}, {location.province}</Link></h3>
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
                <h3><Link href={`/categories/${category.slug}`}>{category.title}</Link></h3>
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
                <h3><Link href={`/listings/${listing.slug}`}>{listing.name}</Link></h3>
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
