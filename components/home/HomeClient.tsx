'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FestivalBannerModal } from '@/components/home/FestivalBannerModal';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HeroSlider } from '@/components/home/HeroSlider';
import { Testimonials } from '@/components/home/Testimonials';
import { WhyUs } from '@/components/home/WhyUs';
import { Button } from '@/components/ui/Button';
import { businessInfo } from '@/lib/constants';
import { db } from '@/lib/firebase';
import { homeContent, sampleBanners, sampleProducts, sampleReviews } from '@/lib/sample-data';
import { Banner, Product, SiteContent } from '@/types';

export function HomeClient() {
  const [content, setContent] = useState<SiteContent>(homeContent);
  const [banners, setBanners] = useState<Banner[]>(sampleBanners);
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  useEffect(() => {
    const unsubHome = onSnapshot(doc(db, 'siteContent', 'home'), (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.data() as Partial<SiteContent>;
      setContent({
        heroImages: data.heroImages?.length ? data.heroImages : homeContent.heroImages,
        heroTitle: data.heroTitle || homeContent.heroTitle,
        heroSubtitle: data.heroSubtitle || homeContent.heroSubtitle,
        heroCTA: data.heroCTA || homeContent.heroCTA,
        sections: data.sections || []
      });
    });
    const unsubBanners = onSnapshot(query(collection(db, 'banners'), orderBy('createdAt', 'desc')), (snapshot) => {
      const live = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Banner);
      setBanners(live.length ? live : sampleBanners);
    });
    const unsubProducts = onSnapshot(query(collection(db, 'products'), orderBy('createdAt', 'desc')), (snapshot) => {
      const live = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Product);
      setProducts(live.length ? live : sampleProducts);
    });
    return () => {
      unsubHome();
      unsubBanners();
      unsubProducts();
    };
  }, []);

  return (
    <>
      <FestivalBannerModal banners={banners} />
      <HeroSlider content={content} />
      <FeaturedProducts products={products.filter((product) => product.featured)} />
      <WhyUs />
      <Testimonials reviews={sampleReviews} />
      <section className="container-page rounded-2xl bg-pink-100 p-8 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-choc-800">Need custom cookies?</h2>
          <p className="mt-2 text-choc-500">Message us for birthdays, events, and festival boxes.</p>
        </div>
        <Link href={businessInfo.socialLinks.whatsapp}><Button variant="pink" className="mt-5 md:mt-0"><MessageCircle size={18} /> WhatsApp Lalitha</Button></Link>
      </section>
    </>
  );
}
