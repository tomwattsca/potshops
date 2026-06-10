import { permanentRedirect } from 'next/navigation';
import { listingSeeds } from '../../data/directory';

type PageParams = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyListingSlugRedirect({ params }: PageParams) {
  const { slug } = await params;
  const normalisedSlug = slug.toLowerCase();

  if (normalisedSlug === 'farm-the-original-farmacy') {
    permanentRedirect('/listings/farm-the-original-farmacy-downtown');
  }

  const mapped = listingSeeds.find((listing) => {
    const legacySource = listing.legacyPath.replace(/\/$/, '');
    return listing.slug === normalisedSlug || legacySource === `/listing/${normalisedSlug}`;
  });

  if (mapped) {
    permanentRedirect(`/listings/${mapped.slug}`);
  }

  permanentRedirect('/updates');
}
