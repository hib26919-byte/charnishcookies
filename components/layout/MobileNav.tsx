'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Phone, ShoppingBag, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Shop', href: '/shop', icon: ShoppingBag },
  { label: 'Chat', href: '#chat', icon: Bot },
  { label: 'Contact', href: '/contact', icon: Phone },
  { label: 'Cart', href: '/checkout', icon: ShoppingCart }
];

export function MobileNav() {
  const pathname = usePathname();
  const cart = useCart();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-choc-300/20 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid h-16 grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;
          return (
            <Link key={tab.label} href={tab.href} className={cn('relative flex flex-col items-center justify-center gap-1 text-xs font-bold text-choc-500', active && 'text-choc-700')}>
              <Icon size={21} />
              <span>{tab.label}</span>
              {tab.label === 'Cart' && cart.count > 0 && <span className="absolute right-4 top-1 grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-[10px] text-white">{cart.count}</span>}
              {active && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-pink-500" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
