import type { NextConfig } from 'next';
import { listingSeeds, priorityCategories, priorityLocations } from './app/data/directory';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      ...listingSeeds.map((listing) => ({
        source: listing.legacyPath.replace(/\/$/, ""),
        destination: `/listings/${listing.slug}`,
        permanent: true,
      })),
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
