'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProductForm } from '@/components/admin/ProductForm';
import { formatCurrency } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    return onSnapshot(query(collection(db, 'products'), orderBy('createdAt', 'desc')), (snapshot) => {
      setProducts(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Product));
    }, () => toast.error('Could not load products. Check Firebase auth/rules.'));
  }, []);

  async function toggle(id: string, field: 'inStock' | 'featured', value: boolean) {
    try {
      await updateDoc(doc(db, 'products', id), { [field]: value, updatedAt: new Date() });
      toast.success('Product updated');
    } catch {
      toast.error('Could not update product');
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product deleted');
    } catch {
      toast.error('Could not delete product');
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Products</h1>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="brand-card overflow-x-auto p-5">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead><tr>{['Image', 'Name', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-choc-300/20">
                  <td className="p-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-cream-dark">
                      {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill className="object-cover" />}
                    </div>
                  </td>
                  <td className="p-3 font-bold">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{formatCurrency(product.discountPrice ?? product.price)}</td>
                  <td className="p-3"><input type="checkbox" checked={product.inStock} onChange={(event) => toggle(product.id, 'inStock', event.target.checked)} /></td>
                  <td className="p-3"><input type="checkbox" checked={product.featured} onChange={(event) => toggle(product.id, 'featured', event.target.checked)} /></td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-700" onClick={() => setEditing(product)}>Edit</button>
                      <button className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700" onClick={() => remove(product.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!products.length && <tr><td colSpan={7} className="p-6 text-center text-choc-500">No products saved yet.</td></tr>}
            </tbody>
          </table>
        </div>
        <ProductForm product={editing} onSaved={() => setEditing(null)} onCancel={() => setEditing(null)} />
      </div>
    </AdminLayout>
  );
}
