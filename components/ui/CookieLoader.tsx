import { cn } from '@/lib/utils';

export function CookieLoader({ size = 48, fullPage = false }: { size?: number; fullPage?: boolean }) {
  const cookie = (
    <div className="cookie-bite" style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" aria-label="Loading" role="img">
        <circle cx="32" cy="32" r="27" fill="#C4855A" stroke="#8B4513" strokeWidth="3" />
        <circle cx="22" cy="22" r="4" fill="#3D1A00" />
        <circle cx="42" cy="26" r="3.5" fill="#3D1A00" />
        <circle cx="31" cy="40" r="4" fill="#3D1A00" />
        <circle cx="47" cy="43" r="3" fill="#3D1A00" />
      </svg>
    </div>
  );

  if (!fullPage) return cookie;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-cream/80 backdrop-blur-sm">
      {cookie}
    </div>
  );
}
