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
  return (
    <div className="min-h-screen bg-cream md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-choc-300/20 bg-white p-4">
        <Link href="/" className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-choc-800"><Home size={22} /> Charnish</Link>
        <nav className="grid gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className={cn('flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-choc-500 hover:bg-pink-100', pathname === link.href && 'bg-pink-100 text-choc-700')}>
                <Icon size={18} /> {link.label}
              </Link>
            );
          })}
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
      <main className="p-5 md:p-8">{children}</main>
    </div>
  );
}
