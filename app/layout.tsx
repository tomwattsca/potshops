import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import SiteConsent from './SiteConsent';
import CookieSettingsButton from './CookieSettingsButton';
import { analyticsBootstrap } from './analytics-bootstrap';

const siteUrl = 'https://potshops.ca';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Potshops.ca | Canadian Cannabis Store Directory', template: '%s | Potshops.ca' },
  description: 'A Canadian cannabis directory for existing city, province, category, and store-profile pages with public-source notes.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'Potshops.ca', description: 'Canadian cannabis store and dispensary directory.', siteName: 'Potshops.ca', type: 'website' },
};

function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script id="potshops-ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: analyticsBootstrap(measurementId) }} />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    </>
  );
}

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
        <GoogleAnalytics />
        <SiteSchema />
        <header className="site-header">
          <nav className="nav" aria-label="Main navigation">
            <Link href="/" className="logo" aria-label="Potshops.ca home"><span className="logo-mark" aria-hidden="true">P</span><span>Potshops.ca</span></Link>
            <div className="nav-links">
              <Link href="/#province-directory">Browse provinces</Link>
              <Link href="/#listings">Store profiles</Link>
              <Link href="/updates" className="nav-cta" data-event="listing_update_click" data-cta-location="global_nav">Suggest an update</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <div className="footer-inner">
            <p><strong>Potshops.ca</strong> is an independent Canadian cannabis directory that separates public-source context from unverified current-store claims. Listings should be source-verified before publication, updates, or advertising. <Link href="/updates" data-event="listing_update_click" data-cta-location="global_footer">Suggest a correction</Link>.</p>
            <p><Link href="/privacy">Privacy and cookies</Link> · <CookieSettingsButton className="footer-cookie" /></p>
          </div>
        </footer>
        <SiteConsent />
      </body>
    </html>
  );
}
