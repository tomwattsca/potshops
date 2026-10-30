// Inline GA4 + consent bootstrap (runs before gtag.js): consent default, ga-disable for an opted-out
// visitor, the potshopsConsent API used by SiteConsent.tsx, and the data-event click tracking.
export function analyticsBootstrap(id: string): string {
  return `(function (w, d, id) {
  var NAME = 'site_consent', YEAR = 31536000;
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = gtag;
  function read() {
    var c = null, m = d.cookie.match(/(?:^|;\\s*)site_consent=([^;]*)/);
    try { c = JSON.parse(m ? decodeURIComponent(m[1]) : w.localStorage.getItem(NAME)); } catch (e) { c = null; }
    return c && c.v === 1 && typeof c.analytics === 'boolean' ? c : null;
  }
  function erase(n) {
    var parts = w.location.hostname.split('.');
    d.cookie = n + '=; Max-Age=0; Path=/';
    for (var i = 0; i < parts.length - 1; i++) { d.cookie = n + '=; Max-Age=0; Path=/; Domain=.' + parts.slice(i).join('.'); }
  }
  function apply(allowed) {
    w['ga-disable-' + id] = !allowed;
    if (!allowed) { d.cookie.split(';').forEach(function (v) { var n = v.trim().split('=')[0]; if (/^_ga(?:_|$)|^_gid$|^_gat/.test(n)) erase(n); }); }
  }
  var c = read(), allowed = c ? c.analytics : true;
  apply(allowed);
  gtag('consent', 'default', { analytics_storage: allowed ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  w.potshopsConsent = {
    get: read,
    set: function (a) {
      var v = JSON.stringify({ v: 1, analytics: !!a, updated_at: Math.floor(Date.now() / 1000) });
      d.cookie = NAME + '=' + encodeURIComponent(v) + '; Path=/; Max-Age=' + YEAR + '; SameSite=Lax' + (w.location.protocol === 'https:' ? '; Secure' : '');
      try { w.localStorage.setItem(NAME, v); } catch (e) {}
      gtag('consent', 'update', { analytics_storage: a ? 'granted' : 'denied' });
      apply(!!a);
      w.dataLayer.push({ event: 'site_consent_update', analytics: !!a });
    },
    open: function () { w.dispatchEvent(new Event('potshops-consent:open')); }
  };
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true, page_location: w.location.origin + w.location.pathname });
  d.addEventListener('click', function (event) {
    var target = event.target && event.target.closest ? event.target.closest('[data-event]') : null;
    if (!target) return;
    var eventName = target.getAttribute('data-event');
    var allowedEvents = { listing_update_click: true, internal_link_click: true, store_click: true };
    if (!eventName || !allowedEvents[eventName]) return;
    var linkUrl, linkDomain;
    if (target.href) {
      try {
        var parsed = new URL(target.href, w.location.origin);
        if (parsed.origin === w.location.origin) { linkUrl = parsed.pathname + parsed.search; }
        else if (/^https?:$/.test(parsed.protocol)) { linkDomain = parsed.hostname; }
      } catch (error) { linkUrl = undefined; }
    }
    gtag('event', eventName, {
      cta_location: target.getAttribute('data-cta-location') || undefined,
      store_slug: target.getAttribute('data-store') || undefined,
      link_url: linkUrl,
      link_domain: linkDomain,
      outbound: linkDomain ? true : undefined,
      transport_type: 'beacon'
    });
  });
})(window, document, ${JSON.stringify(id)});
`;
}
