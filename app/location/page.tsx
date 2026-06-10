import { permanentRedirect } from 'next/navigation';

export default function LegacyLocationIndexRedirect() {
  permanentRedirect('/updates');
}
