import type { MetadataRoute } from 'next';
import { listingSeeds, priorityLocations } from './data/directory';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: 'https://potshops.ca/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...priorityLocations.map((location) => ({ url: `https://potshops.ca/locations/${location.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...listingSeeds.map((listing) => ({ url: `https://potshops.ca/listings/${listing.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ];
}
