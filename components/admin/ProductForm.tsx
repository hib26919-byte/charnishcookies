'use client';

import { FormEvent, useEffect, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { db } from '@/lib/firebase';
import { Product } from '@/types';

const initial = {
  name: '',
  category: 'chocolate',
  description: '',
  price: '',
  discountPrice: '',
  weight: '',
  ingredients: '',
  allergens: '',
  tags: '',
  inStock: true,
  featured: false
};

export function ProductForm({ product, onSaved, onCancel }: { product?: Product | null; onSaved?: () => void; onCancel?: () => void }) {
  const [form, setForm] = useState(initial);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) {
      setForm(initial);
      setImages([]);
      return;
    }
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: String(product.price),
      discountPrice: product.discountPrice ? String(product.discountPrice) : '',
      weight: product.weight,
      ingredients: product.ingredients,
      allergens: product.allergens,
      tags: product.tags?.join(', ') ?? '',
      inStock: product.inStock,
      featured: product.featured
    });
    setImages(product.images ?? []);
  }, [product]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.name || !form.price || !images.length) {
      toast.error('Product name, price, and image are required');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        category: form.category,
        description: form.description,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        weight: form.weight,
        ingredients: form.ingredients,
        allergens: form.allergens,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        inStock: form.inStock,
        featured: form.featured,
        images,
        updatedAt: serverTimestamp()
      };
      if (product?.id) {
        await updateDoc(doc(db, 'products', product.id), payload);
      } else {
        await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() });
      }
      toast.success(product?.id ? 'Product updated' : 'Product saved');
      setForm(initial);
      setImages([]);
      onSaved?.();
    } catch {
      toast.error('Could not save product. Check Firebase auth/rules.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="brand-card grid gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-bold text-choc-800">{product?.id ? 'Edit Product' : 'Product Form'}</h2>
        {product?.id && <button type="button" className="text-sm font-bold text-pink-700" onClick={onCancel}>Cancel</button>}
      </div>
      <label className="text-sm font-bold text-choc-800">Product Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <label className="text-sm font-bold text-choc-800">Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <label className="text-sm font-bold text-choc-800">Price<input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <label className="text-sm font-bold text-choc-800">Discount Price<input type="number" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <label className="text-sm font-bold text-choc-800">Weight / Size variants<input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <label className="text-sm font-bold text-choc-800">Ingredients<input value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <label className="text-sm font-bold text-choc-800">Allergens<input value={form.allergens} onChange={(e) => setForm({ ...form, allergens: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <label className="text-sm font-bold text-choc-800">Tags<input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" /></label>
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="min-h-28 rounded-xl border border-choc-300/30 p-4" />
      <div className="grid gap-3 md:grid-cols-2">
        <label className="font-bold text-choc-800"><input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} /> In Stock</label>
        <label className="font-bold text-choc-800"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured Product</label>
      </div>
      <ImageUploader onChange={(url) => setImages((current) => [...current, url])} />
      {!!images.length && <p className="text-sm font-bold text-choc-700">{images.length} image uploaded</p>}
      <Button loading={loading}>Save Product</Button>
    </form>
  );
}
