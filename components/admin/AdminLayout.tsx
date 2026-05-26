'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, Gift, Home, Image, Inbox, LogOut, MessageSquare, Package, ReceiptText, Settings, Ticket, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ReceiptText },
  { href: '/admin/banners', label: 'Banners', icon: Gift },
  { href: '/admin/hero', label: 'Hero Images', icon: Image },
  { href: '/admin/pages', label: 'Pages', icon: FileText },
  { href: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { href: '/admin/messages', label: 'Messages', icon: Inbox },
  { href: '/admin/chatbot', label: 'Chatbot', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings }
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href} className={cn('flex shrink-0 items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-choc-500 hover:bg-pink-100', pathname === link.href && 'bg-pink-100 text-choc-700')}>
            <Icon size={18} /> {link.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-cream md:grid md:grid-cols-[240px_1fr]">
      <header className="sticky top-0 z-40 border-b border-choc-300/20 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 font-heading text-2xl font-bold text-choc-800"><Home size={22} /> Charnish Admin</Link>
          <button
            className="rounded-full bg-pink-100 px-3 py-2 text-xs font-bold text-choc-700"
            onClick={() => {
              document.cookie = 'admin-token=; Max-Age=0; path=/';
              router.push('/admin/login');
            }}
          >
            Logout
          </button>
        </div>
        <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">{nav}</nav>
      </header>
      <aside className="hidden border-r border-choc-300/20 bg-white p-4 md:block">
        <Link href="/" className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-choc-800"><Home size={22} /> Charnish</Link>
        <nav className="grid gap-1">
          {nav}
          <button
            className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-choc-500 hover:bg-pink-100"
            onClick={() => {
              document.cookie = 'admin-token=; Max-Age=0; path=/';
              router.push('/admin/login');
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
