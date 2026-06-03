import Link from 'next/link';

const highSignalListings = [
  { href: '/listings/cannabis-culture-920-davie', label: 'Cannabis Culture - 920 Davie', note: 'older Potshops listing path now resolves to this profile', ctaLocation: 'not_found_recovered_cannabis_culture' },
  { href: '/listings/green-leaf', label: 'Green Leaf', note: 'Kahnawake profile with older public-source context', ctaLocation: 'not_found_recovered_green_leaf' },
  { href: '/listings/green-essence-head-shop-dispensary', label: 'Green Essence Head Shop and Dispensary', note: 'Penticton profile with source-limit notes', ctaLocation: 'not_found_recovered_green_essence' },
  { href: '/listings/compassion-in-motion', label: 'Compassion in Motion', note: 'existing profile with recent search interest', ctaLocation: 'not_found_recovered_compassion' },
];

export default function NotFound() {
  return (
    <main>
      <section className="card not-found-card" aria-labelledby="missing-record-title">
        <p className="eyebrow">Directory record not found</p>
        <h1 id="missing-record-title">This Potshops page is not available yet.</h1>
        <p className="lede">Some older Potshops links point to records that are not ready to show publicly. Potshops hides those pages rather than guessing about a cannabis store.</p>
        <div className="homepage-search-guide not-found-guide" aria-label="Missing Potshops record options">
          <article>
            <span className="guide-step">1</span>
            <h2>Do not assume current status</h2>
            <p>A missing page is not evidence that a business is open, licensed, closed, selling, delivering, or accepting orders.</p>
          </article>
          <article>
            <span className="guide-step">2</span>
            <h2>Use available records first</h2>
            <p>Start with available city, category, and listing pages that show clear public-source limits.</p>
          </article>
          <article>
            <span className="guide-step">3</span>
            <h2>Send public evidence</h2>
            <p>If a record should exist, send regulator, business, or public-directory sources so Potshops can review the update.</p>
          </article>
        </div>
        <div className="cta-row">
          <Link className="button" href="/" data-event="internal_link_click" data-cta-location="not_found_home" data-link-target="/">Browse the directory</Link>
          <Link className="button secondary" href="/updates" data-event="listing_update_click" data-cta-location="not_found">Suggest a public-source correction</Link>
        </div>
      </section>

      <section className="card" aria-labelledby="recovered-records-title">
        <p className="eyebrow">Useful listing paths</p>
        <h2 id="recovered-records-title">Try these useful profile pages</h2>
        <div className="signal-grid">
          {highSignalListings.map((listing) => (
            <article className="mini-card" key={listing.href}>
              <h3><Link href={listing.href} data-event="internal_link_click" data-cta-location={listing.ctaLocation} data-link-target={listing.href}>{listing.label}</Link></h3>
              <p>{listing.note}</p>
            </article>
          ))}
        </div>
        <p className="source-excerpt"><strong>Source limit:</strong> Potshops profiles separate public-source context from unsupported current-operation, licence, menu, stock, delivery, hours, and ordering claims.</p>
      </section>
    </main>
  );
}
