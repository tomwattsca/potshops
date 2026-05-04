import Link from 'next/link';
import { listingSeeds, priorityLocations } from './data/directory';

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
            <a className="button secondary" href="#claim">Claim or sponsor a listing</a>
          </div>
        </div>
      </section>
      <main>
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
            <h2>Claim, update, or sponsor a cannabis listing</h2>
            <p>Near-term monetization should come from verified enhanced listings, sponsored city placements, and compliant affiliate partnerships. The initial rebuild keeps public claims conservative until listing data is validated.</p>
            <ul className="clean">
              <li>Verified profile updates for stores and delivery services.</li>
              <li>Sponsored placements on city and category pages once traffic returns.</li>
              <li>Affiliate/compliance review before any outbound purchase CTAs go live.</li>
            </ul>
          </div>
          <aside className="notice">
            <h3>Data quality note</h3>
            <p>Old WordPress data is unavailable. Early pages are based on Search Console demand signals and should be enriched with verified address, hours, category, and compliance data before aggressive indexation or paid placement.</p>
          </aside>
        </section>
      </main>
    </>
  );
}
