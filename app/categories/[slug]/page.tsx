import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategory, priorityCategories, priorityLocations } from '../../data/directory';

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
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://potshops.ca/' },
      { '@type': 'ListItem', position: 2, name: category.title, item: `https://potshops.ca/categories/${category.slug}` },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <p className="eyebrow">Priority category #{category.priority}</p>
      <h1>{category.title}</h1>
      <p className="lede">{category.description}</p>
      <div className="split">
        <section className="card">
          <h2>Search demand evidence</h2>
          <p>{category.gscEvidence}</p>
          <p>Legacy demand signal: {category.legacyImpressions.toLocaleString()} impressions on the old category URL before the rebuild.</p>
        </section>
        <aside className="notice">
          <h3>Compliance-first publishing rule</h3>
          <p>Potshops should only add commercial CTAs or promoted placements here after service eligibility, location, age-gating, and compliance requirements are verified.</p>
        </aside>
      </div>
      <section>
        <h2>Start with city pages</h2>
        <div className="grid">
          {priorityLocations.slice(0, 6).map((location) => (
            <article className="card" key={location.slug}>
              <h3><Link href={`/locations/${location.slug}`}>{location.city}, {location.province}</Link></h3>
              <p>{location.description}</p>
            </article>
          ))}
        </div>
      </section>
      <p><Link href="/">Back to Potshops.ca rebuild priorities</Link></p>
    </main>
  );
}
