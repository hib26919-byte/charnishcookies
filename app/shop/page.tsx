'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, orderBy, query as firestoreQuery } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { ProductFilter } from '@/components/shop/ProductFilter';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { sampleProducts } from '@/lib/sample-data';
import { db } from '@/lib/firebase';
import { Product } from '@/types';

export default function ShopPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(sampleProducts);

  useEffect(() => {
    return onSnapshot(firestoreQuery(collection(db, 'products'), orderBy('createdAt', 'desc')), (snapshot) => {
      const products = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Product);
      if (products.length) setAllProducts(products);
    }, () => toast.error('Could not load live products; showing starter products.'));
  }, []);

  const products = useMemo(() => allProducts.filter((product) => {
    const haystack = `${product.name} ${product.tags.join(' ')}`.toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (!category || product.category === category) && (!inStock || product.inStock);
  }), [allProducts, query, category, inStock]);

  return (
    <div className="container-page py-10">
      <h1 className="font-heading text-4xl font-bold text-choc-800">Shop Cookies</h1>
      <p className="mt-3 max-w-2xl text-choc-500">Browse homemade cookies, gift boxes, and seasonal specials. Add your favourites to cart and pay by UPI.</p>
      <div className="mt-8">
        <ProductFilter query={query} setQuery={setQuery} category={category} setCategory={setCategory} inStock={inStock} setInStock={setInStock} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
