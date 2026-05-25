import Link from 'next/link';
import { businessInfo } from '@/lib/constants';
import { LogoMark } from '@/components/layout/LogoMark';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-choc-300/20 bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <LogoMark />
          <p className="mt-4 max-w-md text-choc-500">Fresh homemade cookies, custom boxes, and festival gifting from Singasandra, Bangalore.</p>
        </div>
        <div>
          <h3 className="font-bold text-choc-800">Visit</h3>
          <p className="mt-3 text-sm text-choc-500">{businessInfo.address}</p>
          <p className="mt-2 text-sm text-choc-500">{businessInfo.phone1} / {businessInfo.phone2}</p>
          <p className="mt-2 text-sm text-choc-500">{businessInfo.email}</p>
        </div>
        <div>
          <h3 className="font-bold text-choc-800">Explore</h3>
          <div className="mt-3 grid gap-2 text-sm font-bold text-choc-500">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin/login">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
