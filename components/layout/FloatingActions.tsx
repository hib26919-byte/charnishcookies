'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { businessInfo } from '@/lib/constants';

export function FloatingActions() {
  return (
    <div className="fixed bottom-24 left-4 z-40 flex flex-col gap-3 md:bottom-6">
      <a
        href={`https://wa.me/${businessInfo.whatsapp}`}
        className="grid h-14 w-14 place-items-center rounded-full bg-green-600 text-white shadow-warm"
        aria-label="WhatsApp Charnish Cookies"
      >
        <MessageCircle />
      </a>
      <a
        href={`tel:${businessInfo.phone1}`}
        className="grid h-14 w-14 place-items-center rounded-full bg-choc-700 text-cream shadow-warm"
        aria-label="Call Charnish Cookies"
      >
        <Phone />
      </a>
    </div>
  );
}
