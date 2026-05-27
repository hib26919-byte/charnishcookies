'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Banner } from '@/types';

export function FestivalBannerModal({ banners }: { banners: Banner[] }) {
  const [open, setOpen] = useState(false);
  const toDate = (value: unknown) => {
    if (value instanceof Date) return value;
    if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') return (value as { toDate: () => Date }).toDate();
    return new Date(String(value));
  };
  const banner = banners.find((item) => item.active && toDate(item.startDate) <= new Date() && toDate(item.endDate) >= new Date());

  useEffect(() => {
    setOpen(Boolean(banner));
  }, [banner]);

  if (!banner || !open) return null;

  function close() {
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-choc-900/78 p-4 backdrop-blur-md">
      <section className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#f5f3f7] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <button
          onClick={close}
          className="absolute right-4 top-4 z-20 grid h-12 w-12 place-items-center rounded-full bg-choc-900/55 text-white backdrop-blur transition hover:bg-choc-900"
          aria-label="Close festival banner"
        >
          <X />
        </button>
        <div className="relative aspect-[16/8.2] min-h-[220px] bg-cream-dark">
          <Image src={banner.image} alt={banner.title} fill priority className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f5f3f7] to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-gold-300 bg-white/90 px-4 py-2 text-xs font-black uppercase text-choc-800 shadow-warm">
            Charnish Festival Special
          </div>
        </div>
        <div className="px-6 pb-7 pt-4 text-center md:px-10">
          <h2 className="font-heading text-3xl font-black leading-tight text-choc-800 md:text-4xl">{banner.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-choc-500 md:text-lg">{banner.subtitle}</p>
          <Link
            href="/shop"
            onClick={close}
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-choc-800 to-pink-700 px-10 py-4 text-base font-black text-white shadow-warm transition hover:-translate-y-0.5"
          >
            Continue to Buy
          </Link>
          <div className="mx-auto my-7 h-px max-w-2xl bg-white" />
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-bold text-choc-500">
            <span>Website made by</span>
            <span className="rounded-full bg-pink-100 px-3 py-1 font-black text-pink-900">WayzenTech</span>
            <a href="tel:9398724704" className="rounded-full bg-gold-100 px-3 py-1 font-black text-choc-800">Contact 9398724704</a>
          </div>
        </div>
      </section>
    </div>
  );
}
