'use client';

import { Search } from 'lucide-react';
import { categories } from '@/lib/constants';

export function ProductFilter({
  query,
  setQuery,
  category,
  setCategory,
  inStock,
  setInStock
}: {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  inStock: boolean;
  setInStock: (value: boolean) => void;
}) {
  return (
    <div className="brand-card mb-8 grid gap-4 p-4 md:grid-cols-[1fr_220px_150px]">
      <label className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-choc-300" size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cookies, tags, flavours" className="h-12 w-full rounded-full border border-choc-300/30 bg-white pl-11 pr-4 text-sm" />
      </label>
      <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 rounded-full border border-choc-300/30 bg-white px-4 text-sm font-bold text-choc-700">
        <option value="">All categories</option>
        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <label className="flex items-center justify-center gap-2 rounded-full bg-pink-100 px-4 text-sm font-bold text-choc-700">
        <input type="checkbox" checked={inStock} onChange={(event) => setInStock(event.target.checked)} />
        In stock
      </label>
    </div>
  );
}
