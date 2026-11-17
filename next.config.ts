import type { NextConfig } from 'next';
import { listingSeeds, priorityCategories, priorityLocations } from './app/data/directory';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  // Browser protections (pentest 17 Nov 2026): no framing by other sites, no MIME sniffing, HTTPS only, and no full
  // URLs leaked to the shops we link out to. No full CSP: GA and the JSON-LD blocks would need nonces.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.potshops.ca' }],
        destination: 'https://potshops.ca/:path*',
        permanent: true,
      },
      {
        source: '/add-listing',
        destination: '/updates',
        permanent: true,
      },
      ...listingSeeds.map((listing) => ({
        source: listing.legacyPath.replace(/\/$/, ""),
        destination: `/listings/${listing.slug}`,
        permanent: true,
      })),
      {
        source: '/listing/farm-the-original-farmacy',
        destination: '/listings/farm-the-original-farmacy-downtown',
        permanent: true,
      },
      {
        source: '/listing/farm-the-original-farmacy/',
        destination: '/listings/farm-the-original-farmacy-downtown',
        permanent: true,
      },
      {
        source: '/listing',
        destination: '/updates',
        permanent: true,
      },
      ...priorityLocations.map((location) => ({
        source: `/location/${location.slug}`,
        destination: `/locations/${location.slug}`,
        permanent: true,
      })),
      ...priorityCategories.map((category) => ({
        source: category.legacyPath.replace(/\/$/, ""),
        destination: `/categories/${category.slug}`,
        permanent: true,
      })),
      { source: '/en/index.php', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
