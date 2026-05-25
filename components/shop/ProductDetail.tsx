'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Minus, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { Product, Review } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

export function ProductDetail({ product, reviews, related }: { product: Product; reviews: Review[]; related: Product[] }) {
  const [qty, setQty] = useState(1);
  const cart = useCart();
  return (
    <div className="container-page py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-dark">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority />
        </div>
        <section>
          <Badge>{product.category}</Badge>
          <h1 className="mt-4 font-heading text-4xl font-bold text-choc-800">{product.name}</h1>
          <div className="mt-4 flex items-end gap-3">
            <strong className="text-3xl text-choc-700">{formatCurrency(product.discountPrice ?? product.price)}</strong>
            {product.discountPrice && <span className="text-lg text-choc-300 line-through">{formatCurrency(product.price)}</span>}
          </div>
          <div className="prose mt-6 max-w-none text-choc-500" dangerouslySetInnerHTML={{ __html: product.description }} />
          <dl className="mt-6 grid gap-3 text-sm text-choc-500">
            <div><dt className="font-bold text-choc-800">Weight</dt><dd>{product.weight}</dd></div>
            <div><dt className="font-bold text-choc-800">Ingredients</dt><dd>{product.ingredients}</dd></div>
            <div><dt className="font-bold text-choc-800">Allergens</dt><dd>{product.allergens}</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex h-12 items-center rounded-full border border-choc-300/30 bg-white">
              <button className="grid h-12 w-12 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button className="grid h-12 w-12 place-items-center" onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
            </div>
            <Button onClick={() => { cart.add(product, qty); toast.success('Added to cart'); }}>Add to Cart</Button>
            <Link href="/checkout" onClick={() => cart.add(product, qty)}><Button variant="pink">Order Now</Button></Link>
          </div>
        </section>
      </div>
      <section className="mt-16">
        <h2 className="font-heading text-3xl font-bold text-choc-800">Reviews</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="brand-card p-5">
              <div className="flex text-gold-500">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
              <p className="mt-3 text-sm text-choc-500">{review.comment}</p>
              <p className="mt-3 font-bold text-choc-800">{review.name}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-16">
        <h2 className="font-heading text-3xl font-bold text-choc-800">Related Cookies</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {related.map((item) => <Link key={item.id} href={`/shop/${item.id}`} className="brand-card p-4 font-bold text-choc-700">{item.name}</Link>)}
        </div>
      </section>
    </div>
  );
}
