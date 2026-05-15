import Link from 'next/link';

const highSignalListings = [
  { href: '/listings/cannabis-culture-920-davie', label: 'Cannabis Culture - 920 Davie', note: 'legacy singular listing path still appears in Search Console' },
  { href: '/listings/green-leaf', label: 'Green Leaf', note: 'Kahnawake profile with historical-source context' },
  { href: '/listings/green-essence-head-shop-dispensary', label: 'Green Essence Head Shop and Dispensary', note: 'Penticton profile with source-limit notes' },
  { href: '/listings/compassion-in-motion', label: 'Compassion in Motion', note: 'existing profile row in recent Search Console data' },
];

export default function NotFound() {
  return (
    <main>
      <section className="card not-found-card" aria-labelledby="missing-record-title">
        <p className="eyebrow">Directory record not found</p>
        <h1 id="missing-record-title">This Potshops page is not in the source-backed rebuild.</h1>
        <p className="lede">Some old WordPress listing URLs and unsupported slugs still receive visits. Potshops now returns a true 404 for those paths instead of showing an unverified cannabis profile.</p>
        <div className="homepage-search-guide not-found-guide" aria-label="Missing Potshops record options">
          <article>
            <span className="guide-step">1</span>
            <h2>Do not assume current status</h2>
            <p>A missing page is not evidence that a business is open, licensed, closed, selling, delivering, or accepting orders.</p>
          </article>
          <article>
            <span className="guide-step">2</span>
            <h2>Use rebuilt records first</h2>
            <p>Start with existing source-backed city, category, and listing pages before relying on old search-result URLs.</p>
          </article>
          <article>
            <span className="guide-step">3</span>
            <h2>Send public evidence</h2>
            <p>If a record should exist, send regulator, business, or public-directory sources so Potshops can review the update.</p>
          </article>
        </div>
        <div className="cta-row">
          <Link className="button" href="/">Browse the rebuilt directory</Link>
          <Link className="button secondary" href="/updates" data-event="listing_update_click" data-cta-location="not_found">Suggest a source-backed correction</Link>
        </div>
      </section>

      <section className="card" aria-labelledby="recovered-records-title">
        <p className="eyebrow">Recovered listing paths</p>
        <h2 id="recovered-records-title">Try these rebuilt profiles showing recent search demand</h2>
        <div className="signal-grid">
          {highSignalListings.map((listing) => (
            <article className="mini-card" key={listing.href}>
              <h3><Link href={listing.href}>{listing.label}</Link></h3>
              <p>{listing.note}</p>
            </article>
          ))}
        </div>
        <p className="source-excerpt"><strong>Source limit:</strong> rebuilt profiles separate source-backed context from unsupported current-operation, licence, menu, stock, delivery, hours, and ordering claims.</p>
      </section>
    </main>
  );
}
