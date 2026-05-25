'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiteContent } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function HeroSlider({ content }: { content: SiteContent }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % content.heroImages.length), 5000);
    return () => window.clearInterval(timer);
  }, [content.heroImages.length]);

  return (
    <section className="relative h-[50vh] min-h-[480px] overflow-hidden bg-cream md:h-[70vh]">
      {content.heroImages.map((image, imageIndex) => (
        <Image key={image} src={image} alt="Charnish Cookies hero" fill priority={imageIndex === 0} className={cn('object-cover transition-opacity duration-700', imageIndex === index ? 'opacity-100' : 'opacity-0')} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent" />
      <div className="container-page relative z-10 flex h-full items-center">
        <div className="max-w-2xl">
          <span className="pill bg-gold-100 px-4 py-2 text-sm text-gold-700">Fresh daily in Bangalore</span>
          <h1 className="mt-5 font-heading text-[32px] font-bold leading-tight text-choc-800 md:text-5xl">{content.heroTitle}</h1>
          <p className="mt-5 max-w-xl text-lg text-choc-500">{content.heroSubtitle}</p>
          <Link href="/shop"><Button className="mt-8">{content.heroCTA}</Button></Link>
        </div>
      </div>
      <button className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-choc-700 md:grid" onClick={() => setIndex((index - 1 + content.heroImages.length) % content.heroImages.length)} aria-label="Previous hero"><ChevronLeft /></button>
      <button className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-choc-700 md:grid" onClick={() => setIndex((index + 1) % content.heroImages.length)} aria-label="Next hero"><ChevronRight /></button>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {content.heroImages.map((_, dot) => <button key={dot} aria-label={`Go to slide ${dot + 1}`} onClick={() => setIndex(dot)} className={cn('h-3 rounded-full transition-all', dot === index ? 'w-8 bg-choc-700' : 'w-3 bg-cream-dark')} />)}
      </div>
    </section>
  );
}
