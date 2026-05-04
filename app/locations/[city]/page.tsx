import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocation, priorityLocations } from '../../data/directory';

export function generateStaticParams() { return priorityLocations.map((location) => ({ city: location.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocation(resolvedParams.city);
  if (!location) return { title: 'Location not found' };
  return { title: location.title, description: `${location.description} ${location.gscEvidence}`, alternates: { canonical: `/locations/${location.slug}` } };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const location = getLocation(resolvedParams.city);
  if (!location) return <main><h1>Location not found</h1></main>;
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://potshops.ca/' },
      { '@type': 'ListItem', position: 2, name: `${location.city}, ${location.province}`, item: `https://potshops.ca/locations/${location.slug}` },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <p className="eyebrow">Priority city #{location.priority}</p>
      <h1>{location.title}</h1>
      <p className="lede">{location.description}</p>
      <div className="split">
        <section className="card">
          <h2>Why this page exists</h2>
          <p>{location.gscEvidence}</p>
          <p>Legacy demand signal: {location.legacyImpressions.toLocaleString()} impressions across related Search Console query/page data.</p>
        </section>
        <aside className="notice">
          <h3>Verification needed</h3>
          <p>Before publishing store cards at scale, enrich this page with verified store names, addresses, hours, service type, and outbound/contact links.</p>
        </aside>
      </div>
      <p><Link href="/">← Back to Potshops.ca rebuild priorities</Link></p>
    </main>
  );
}
