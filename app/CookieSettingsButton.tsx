'use client';

export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('potshops-consent:open'))}>
      Cookie settings
    </button>
  );
}
