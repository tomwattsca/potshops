import { permanentRedirect } from 'next/navigation';

export default function LegacyListingIndexRedirect() {
  permanentRedirect('/updates');
}
