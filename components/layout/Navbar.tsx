'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { businessInfo } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { LogoMark } from '@/components/layout/LogoMark';

const links = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['About', '/about'],
  ['Contact', '/contact']
];

export function Navbar() {
  const pathname = usePathname();
  const cart = useCart();
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-choc-300/20 bg-white/95 backdrop-blur md:hidden">
        <nav className="container-page flex h-20 items-center justify-between">
          <LogoMark />
          <Link href="/checkout" className="relative text-choc-700" aria-label="Cart">
            <ShoppingCart />
            {cart.count > 0 && <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-xs font-bold text-white">{cart.count}</span>}
          </Link>
        </nav>
      </header>
      <header className="sticky top-0 z-40 hidden border-b border-choc-300/20 bg-white/95 backdrop-blur md:block">
        <nav className="container-page flex h-20 items-center justify-between">
          <LogoMark />
          <div className="flex items-center gap-8">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className={cn('text-sm font-bold text-choc-700 underline-offset-8 hover:text-pink-700', pathname === href && 'underline decoration-pink-500 decoration-2')}>
                {label}
              </Link>
            ))}
            <Link href="/checkout" className="relative text-choc-700" aria-label="Cart">
              <ShoppingCart />
              {cart.count > 0 && <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-xs font-bold text-white">{cart.count}</span>}
            </Link>
            <a href={businessInfo.socialLinks.whatsapp} className="text-choc-700" aria-label="WhatsApp">
              <MessageCircle />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
