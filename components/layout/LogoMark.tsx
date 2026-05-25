import Image from 'next/image';
import Link from 'next/link';

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full border-2 border-gold-500 bg-gold-100 shadow-warm ring-4 ring-pink-100 transition group-hover:scale-105">
        <Image src="/logo.png" alt="Charnish Cookies logo" fill className="object-cover" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-heading text-3xl font-bold text-choc-800">Charnish</span>
          <span className="block -mt-1 font-heading text-xl font-bold text-pink-500">Cookies</span>
        </span>
      )}
    </Link>
  );
}
