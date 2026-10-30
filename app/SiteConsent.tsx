'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// House consent default: analytics on at first load, a small notice (Manage / OK), and an
// explicit opt-out that is honoured everywhere (ga-disable, consent denied, _ga cookies removed,
// remembered for a year). The early part (ga-disable before any hit) runs in the inline
// bootstrap in layout.tsx; this component is the visible notice and the settings panel.

type Choice = { v: 1; analytics: boolean; updated_at: number };

declare global {
  interface Window {
    potshopsConsent?: { get: () => Choice | null; set: (analytics: boolean) => void; open: () => void };
  }
}

export default function SiteConsent() {
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const api = window.potshopsConsent;
    const current = api ? api.get() : null;
    if (!current) setOpen(true);
    else setAnalytics(current.analytics);
    const reopen = () => {
      const c = window.potshopsConsent?.get();
      setAnalytics(c ? c.analytics : true);
      setManage(true);
      setOpen(true);
    };
    window.addEventListener('potshops-consent:open', reopen);
    return () => window.removeEventListener('potshops-consent:open', reopen);
  }, []);

  // Debounced manual page_view on client-side route changes (enhanced measurement page changes is off,
  // so the first load's config page_view is the only automatic one).
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) { firstPath.current = false; return; }
    const t = window.setTimeout(() => {
      const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof g === 'function') {
        g('event', 'page_view', { page_location: window.location.origin + window.location.pathname, page_title: document.title });
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [pathname]);

  if (!open) return null;

  const save = (value: boolean) => {
    window.potshopsConsent?.set(value);
    setAnalytics(value);
    setOpen(false);
    setManage(false);
  };

  return (
    <div className="consent" role="region" aria-label="Cookie notice">
      {!manage ? (
        <>
          <p>We use cookies to understand how the directory is used. <a href="/privacy">Privacy</a></p>
          <div className="consent-actions">
            <button type="button" className="consent-link" onClick={() => setManage(true)}>Manage</button>
            <button type="button" className="consent-ok" onClick={() => save(true)}>OK</button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Cookie settings</strong></p>
          <label className="consent-toggle">
            <input type="checkbox" name="analytics" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            Analytics (Google Analytics, anonymous usage statistics)
          </label>
          <div className="consent-actions">
            <button type="button" className="consent-link" onClick={() => save(false)}>Reject</button>
            <button type="button" className="consent-ok" data-consent-save onClick={() => save(analytics)}>Save</button>
          </div>
        </>
      )}
    </div>
  );
}

