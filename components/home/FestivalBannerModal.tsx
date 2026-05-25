'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Banner } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export function FestivalBannerModal({ banners }: { banners: Banner[] }) {
  const [open, setOpen] = useState(false);
  const toDate = (value: unknown) => {
    if (value instanceof Date) return value;
    if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') return (value as { toDate: () => Date }).toDate();
    return new Date(String(value));
  };
  const banner = banners.find((item) => item.active && toDate(item.startDate) <= new Date() && toDate(item.endDate) >= new Date());
  useEffect(() => {
    if (banner && !sessionStorage.getItem(`charnish-banner-seen-${banner.id}`)) setOpen(true);
  }, [banner]);

  if (!banner) return null;
  return (
    <Modal
      open={open}
      label="Festival banner"
      onClose={() => {
        sessionStorage.setItem(`charnish-banner-seen-${banner.id}`, 'true');
        setOpen(false);
      }}
    >
      <div className="overflow-hidden rounded-b-2xl border-t border-gold-300 bg-gradient-to-br from-pink-100 via-cream to-gold-100">
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[340px]">
            <Image src={banner.image} alt={banner.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-choc-900/45 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full border border-gold-300 bg-white/90 px-4 py-2 text-xs font-black uppercase text-choc-800 shadow-warm backdrop-blur">
              Festival Special
            </div>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden border-l border-gold-300 p-8">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border-[18px] border-pink-300/35" />
            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full border-[22px] border-gold-300/45" />
            <div className="relative">
              <span className="rounded-full bg-gold-100 px-4 py-2 text-xs font-black uppercase text-gold-700">Limited time</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-choc-800 md:text-5xl">{banner.title}</h2>
              <p className="mt-4 text-lg text-choc-500">{banner.subtitle}</p>
              <Link href={banner.ctaLink}><Button variant="pink" className="mt-7">{banner.ctaText}</Button></Link>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-choc-900 via-choc-800 to-pink-900 p-5 text-center text-white">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold-300">Mandatory Website Credit</p>
          <p className="mt-1 font-heading text-3xl font-black md:text-4xl">Website made by WayzenTech</p>
          <a href="tel:9398724704" className="mt-3 inline-flex rounded-full border border-gold-300 bg-gold-100 px-5 py-2 text-sm font-black text-choc-900 shadow-warm">
            Call 9398724704
          </a>
        </div>
      </div>
    </Modal>
  );
}
