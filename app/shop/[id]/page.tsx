'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { ProductDetail } from '@/components/shop/ProductDetail';
import { CookieLoader } from '@/components/ui/CookieLoader';
import { db } from '@/lib/firebase';
import { sampleProducts, sampleReviews } from '@/lib/sample-data';
import { Product } from '@/types';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(sampleProducts.find((item) => item.id === params.id) ?? null);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'products', params.id));
      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() } as Product);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <CookieLoader fullPage />;
  if (!product) return <div className="container-page py-16 text-choc-500">Product not found.</div>;

  const related = sampleProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  return <ProductDetail product={product} reviews={sampleReviews} related={related} />;
}
