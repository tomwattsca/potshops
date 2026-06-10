import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = 'https://potshops.ca';
const updateEmail = 'updates@potshops.ca';
const mailtoHref = `mailto:${updateEmail}?subject=Potshops.ca%20listing%20update&body=Listing%20or%20city%3A%0ASource%20URL%3A%0AWhat%20changed%3A%0ARelationship%20to%20the%20listing%20%28owner%2Fstaff%2Freader%29%3A%0A`;

const acceptedExamples = [
  'Official regulator or public registry page showing the business name and address.',
  'Business website or public profile that supports a name, address, or closure correction.',
  'Dated public directory, archived page, or news/document source for historical context.',
];

const notAcceptedExamples = [
  'Menu, stock, price, delivery, or ordering claims without compliance review.',
  'Promotional claims such as best, cheapest, ratings/reviews, medical, or guaranteed availability.',
  'Nearby-town evidence used as if it proves a different exact city or storefront.',
];

export const metadata: Metadata = {
  title: 'Suggest a cannabis listing update',
  description: 'Send Potshops.ca source-backed cannabis listing corrections, official-source updates, and city coverage suggestions without making unsupported commerce claims.',
  alternates: { canonical: '/updates' },
  openGraph: {
    title: 'Potshops.ca',
    description: 'Canadian cannabis store and dispensary directory.',
    url: 'https://potshops.ca/updates',
    siteName: 'Potshops.ca',
    type: 'website',
  },
};

function UpdatesSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/updates#webpage`,
        url: `${siteUrl}/updates`,
        name: 'Suggest a Potshops.ca listing update',
        description: 'A source-first update intake page for cannabis listing corrections and official public-source suggestions.',
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/updates#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What sources can Potshops use for listing updates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Potshops prioritizes official regulator records, business pages, public directories, and dated public documents. Submitted updates should include a source URL so the listing can stay conservative and verifiable.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will Potshops publish hours, menus, delivery, stock, or ordering claims from this form?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Potshops does not add hours, menus, stock, ordering, delivery, availability, ratings, or promotional cannabis claims unless a visible public source and compliance review support the exact fact.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can vendors ask about sponsored placement?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vendors can identify themselves, but Potshops treats corrections and source quality first. Any future sponsorship must remain clearly labelled and cannot override the conservative source-backed listing rules.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens after an update is submitted?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Potshops manually reviews the source URL, checks whether the fact is public and specific to the listing or city, and may publish a conservative update if the evidence supports it. Unsupported commerce, availability, rating, medical, or promotional claims are rejected or held for further review.',
            },
          },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function UpdatesPage() {
  return (
    <main>
      <UpdatesSchema />
      <p className="eyebrow">Source-backed corrections</p>
      <h1>Suggest a Potshops.ca listing update</h1>
      <p className="lede">Help Potshops improve cannabis directory coverage with public-source corrections, official address context, and city-page suggestions. The directory stays conservative: source evidence comes first, and commerce claims are not accepted without compliance review.</p>
      <p className="cta-row hero-update-actions">
        <a className="button" href={mailtoHref} data-event="listing_update_click" data-cta-location="updates_top">Submit an update by email</a>
        <Link className="button secondary" href="/#locations">Find the city or listing first</Link>
      </p>
      <p className="meta">Prefer to copy the address? <a href={`mailto:${updateEmail}`}>{updateEmail}</a></p>

      <div className="split">
        <section className="card">
          <h2>What to send</h2>
          <ul className="clean">
            <li>The listing or city page that needs an update.</li>
            <li>A source URL, ideally an official regulator record, business page, public directory, or dated public document.</li>
            <li>The exact fact to add, correct, or remove.</li>
            <li>Whether you are the business owner, staff member, customer, or independent reader.</li>
          </ul>
          <p className="cta-row">
            <a className="button" href={mailtoHref} data-event="listing_update_click" data-cta-location="updates_hero">Email a source-backed update</a>
            <Link className="button secondary" href="/#locations">Find the city or listing first</Link>
          </p>
        </section>
        <aside className="notice">
          <h3>Compliance guardrail</h3>
          <p>Potshops does not publish unsupported current availability, ordering, delivery, stock, licence, quality, medical, review, or promotional claims. If a source only supports historical or address-context evidence, the visible listing will say that.</p>
        </aside>
      </div>

      <section>
        <h2>Update review rules</h2>
        <div className="grid">
          <article className="card">
            <h3>1. Source quality</h3>
            <p>Official/current public sources are preferred. Historical sources can still help recover legacy pages, but they stay labelled as historical or public-source context.</p>
          </article>
          <article className="card">
            <h3>2. Exact local fit</h3>
            <p>City pages use exact municipality evidence. Nearby towns, street-name matches, and regional service areas are separated rather than blended into unsupported city claims.</p>
          </article>
          <article className="card">
            <h3>3. Conservative publishing</h3>
            <p>Address context can be useful without implying a current menu, live stock, delivery area, opening status, rating, or purchase path.</p>
          </article>
        </div>
      </section>

      <section className="card update-process-card">
        <p className="eyebrow">Manual review workflow</p>
        <h2>What happens after you send an update</h2>
        <div className="process-steps" aria-label="Potshops update review workflow">
          <div>
            <strong>1. Source check</strong>
            <p>Potshops opens the public source URL and checks whether it supports the exact listing, city, or category fact.</p>
          </div>
          <div>
            <strong>2. Conservative edit</strong>
            <p>If the fact is usable, the listing is updated with limited wording that explains what the source does and does not prove.</p>
          </div>
          <div>
            <strong>3. Unsupported claims rejected</strong>
            <p>Availability, ordering, delivery, price, rating, medical, or promotional claims are held back unless compliance review supports them.</p>
          </div>
        </div>
      </section>

      <section className="split examples-split" aria-label="Examples of accepted and rejected Potshops updates">
        <div className="card good-source-card">
          <h2>Good source-backed updates</h2>
          <ul className="clean">
            {acceptedExamples.map((example) => <li key={example}>{example}</li>)}
          </ul>
        </div>
        <div className="card rejected-source-card">
          <h2>Updates Potshops will not publish as-is</h2>
          <ul className="clean">
            {notAcceptedExamples.map((example) => <li key={example}>{example}</li>)}
          </ul>
        </div>
      </section>

      <section className="card">
        <h2>For store owners and sponsors</h2>
        <p>Potshops reviews public evidence before paid placement. If you represent a store, send the same source-backed update first and include an official business website, regulator/public registry URL, or other public evidence that supports the exact factual correction.</p>
        <p>Ownership notes are welcome, but ownership does not guarantee promotional placement, current-service claims, or sponsorship treatment.</p>
        <p className="cta-row"><a className="button" href={mailtoHref} data-event="listing_update_click" data-cta-location="updates_owner_path">Send an ownership note</a></p>
      </section>
    </main>
  );
}
