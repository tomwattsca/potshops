import type { Metadata } from 'next';
import CookieSettingsButton from '../CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Privacy and cookies',
  description: 'How Potshops.ca uses cookies and analytics, and how to turn analytics off.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main>
      <h1>Privacy and cookies</h1>
      <p>Potshops.ca is an information directory. We do not run accounts, take orders or sell anything, and we do not ask for personal details on this site. If you email us an update, we use your email only to deal with that update.</p>
      <h2>Analytics cookies</h2>
      <p>We use Google Analytics 4 to count visits and see which pages and store links are used, so we can improve the directory. It sets first-party cookies named <code>_ga</code> and <code>_ga_*</code>. IP addresses are not stored by Google Analytics 4, and we do not use advertising or remarketing cookies.</p>
      <p>Analytics is on by default. You can turn it off at any time: choose <strong>Manage</strong> on the cookie notice, or use the button below. When you turn it off we stop sending analytics, delete the analytics cookies and remember your choice for a year in a cookie named <code>site_consent</code>.</p>
      <p><CookieSettingsButton className="button secondary" /></p>
      <h2>Contact</h2>
      <p>Questions about this page: use the email address on our <a href="/updates">updates page</a>.</p>
    </main>
  );
}
