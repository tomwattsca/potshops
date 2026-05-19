'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type LookupItem = {
  href: string;
  label: string;
  detail: string;
  kind: 'City' | 'Store profile' | 'Category';
  status?: string;
  keywords: string[];
};

type HomeLookupProps = {
  items: LookupItem[];
};

function matchesQuery(item: LookupItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return false;
  const haystack = [item.label, item.detail, item.kind, item.status ?? '', ...item.keywords].join(' ').toLowerCase();
  return normalizedQuery.split(/\s+/).every((term) => haystack.includes(term));
}

export default function HomeLookup({ items }: HomeLookupProps) {
  const [query, setQuery] = useState('');
  const featuredItems = items.slice(0, 6);
  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return featuredItems;
    return items.filter((item) => matchesQuery(item, trimmed)).slice(0, 8);
  }, [featuredItems, items, query]);
  const showingSearchResults = query.trim().length > 0;

  return (
    <section className="homepage-lookup" aria-labelledby="homepage-lookup-title">
      <div className="lookup-copy">
        <div className="eyebrow">Directory lookup</div>
        <h2 id="homepage-lookup-title">Search the directory</h2>
        <p>Search by city, province, store name, or category. Your search text stays in the browser and is not sent to analytics.</p>
      </div>
      <label className="lookup-search-label" htmlFor="homepage-lookup-input">Search by city, province, store, or category</label>
      <div className="lookup-search-row">
        <input
          id="homepage-lookup-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Calgary, Green Leaf, Windsor, delivery..."
          autoComplete="off"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Clear directory lookup">Clear</button>
        )}
      </div>
      <div className="lookup-results" aria-live="polite">
        <div className="lookup-results-heading">
          <strong>{showingSearchResults ? `${results.length} matching existing page${results.length === 1 ? '' : 's'}` : 'Common starting points'}</strong>
          <span>{showingSearchResults ? 'Open a result, then read the source notes on that page.' : 'Useful pages to start with.'}</span>
        </div>
        {results.length > 0 ? (
          <div className="lookup-result-grid">
            {results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-event="internal_link_click"
                data-cta-location="home_lookup_result"
                className="lookup-result-card"
              >
                <span className="lookup-kind">{item.kind}</span>
                <strong>{item.label}</strong>
                {showingSearchResults && <span>{item.detail}</span>}
                {showingSearchResults && item.status && <em>{item.status}</em>}
              </Link>
            ))}
          </div>
        ) : (
          <div className="lookup-empty" role="status">
            <strong>No directory page found for that search yet.</strong>
            <span>Try a province, city, or known profile name, or send public-source evidence for Potshops to review.</span>
            <Link href="/updates" data-event="listing_update_click" data-cta-location="home_lookup_empty_update">Suggest an update</Link>
          </div>
        )}
      </div>
    </section>
  );
}
