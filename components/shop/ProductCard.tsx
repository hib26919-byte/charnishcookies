'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  return (
    <article className="brand-card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-warm">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[4/3] bg-cream-dark">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
          {product.discountPrice && <Badge className="absolute left-3 top-3 bg-pink-500 text-white">Offer</Badge>}
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <Badge>{product.weight}</Badge>
          <span className="text-xs font-bold uppercase text-choc-300">{product.category}</span>
        </div>
        <Link href={`/shop/${product.id}`} className="font-heading text-xl font-bold text-choc-800">{product.name}</Link>
        <div className="mt-3 flex items-end gap-2">
          <strong className="text-lg text-choc-700">{formatCurrency(product.discountPrice ?? product.price)}</strong>
          {product.discountPrice && <span className="text-sm text-choc-300 line-through">{formatCurrency(product.price)}</span>}
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            cart.add(product);
            toast.success(`${product.name} added to cart`);
          }}
        >
          <ShoppingBag size={18} /> Add to Cart
        </Button>
      </div>
    </article>
  );
}
