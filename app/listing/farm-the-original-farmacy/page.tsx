import { permanentRedirect } from 'next/navigation';

export default function LegacyFarmacyRedirect() {
  permanentRedirect('/listings/farm-the-original-farmacy-downtown');
}
