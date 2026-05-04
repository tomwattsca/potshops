import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

const siteUrl = 'https://potshops.ca';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Potshops.ca | Canadian Cannabis Store Directory', template: '%s | Potshops.ca' },
  description: 'A rebuilt Canadian cannabis store directory guided by Potshops.ca Search Console demand data.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Potshops.ca', description: 'Canadian cannabis store and dispensary directory.', url: siteUrl, siteName: 'Potshops.ca', type: 'website' },
};

function SiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Potshops.ca', url: siteUrl },
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'Potshops.ca', url: siteUrl, publisher: { '@id': `${siteUrl}/#organization` } },
    ],
  };
  return <script id="potshops-site-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        <SiteSchema />
        <header className="site-header">
          <nav className="nav" aria-label="Main navigation">
            <Link href="/" className="logo">Potshops.ca</Link>
            <div className="nav-links">
              <Link href="/#locations">Priority locations</Link>
              <Link href="/#listings">Legacy listings</Link>
              <Link href="/#claim">Claim a listing</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <div className="footer-inner">
            <p><strong>Potshops.ca</strong> is being rebuilt as an independent Canadian cannabis directory. Listings should be verified before publication or advertising.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
