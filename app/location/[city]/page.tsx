import { permanentRedirect } from 'next/navigation';
import { priorityLocations } from '../../data/directory';

type PageParams = {
  params: Promise<{ city: string }>;
};

export default async function LegacyLocationCityRedirect({ params }: PageParams) {
  const { city } = await params;
  const normalisedCity = city.toLowerCase();
  const mapped = priorityLocations.find((location) => location.slug === normalisedCity);

  if (mapped) {
    permanentRedirect(`/locations/${mapped.slug}`);
  }

  permanentRedirect('/updates');
}
