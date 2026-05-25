'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BannerForm } from '@/components/admin/BannerForm';
import { db } from '@/lib/firebase';
import { Banner } from '@/types';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Banner | null>(null);

  useEffect(() => {
    return onSnapshot(query(collection(db, 'banners'), orderBy('createdAt', 'desc')), (snapshot) => {
      setBanners(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Banner));
    }, () => toast.error('Could not load banners. Check Firebase auth/rules.'));
  }, []);

  async function toggle(id: string, active: boolean) {
    try {
      await updateDoc(doc(db, 'banners', id), { active });
      toast.success('Banner updated');
    } catch {
      toast.error('Could not update banner');
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this banner?')) return;
    try {
      await deleteDoc(doc(db, 'banners', id));
      toast.success('Banner deleted');
    } catch {
      toast.error('Could not delete banner');
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Festival Banners</h1>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="brand-card p-5">
          {banners.map((banner) => (
            <div key={banner.id} className="flex items-center gap-4 border-b border-choc-300/20 py-4">
              <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-cream-dark">
                {banner.image && <Image src={banner.image} alt={banner.title} fill className="object-cover" />}
              </div>
              <div><strong className="text-choc-800">{banner.title}</strong><p className="text-sm text-choc-500">{banner.subtitle}</p></div>
              <input className="ml-auto" type="checkbox" checked={banner.active} onChange={(event) => toggle(banner.id, event.target.checked)} />
              <button className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-700" onClick={() => setEditing(banner)}>Edit</button>
              <button className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700" onClick={() => remove(banner.id)}>Delete</button>
            </div>
          ))}
          {!banners.length && <p className="py-8 text-center text-choc-500">No banners saved yet.</p>}
        </div>
        <BannerForm banner={editing} onSaved={() => setEditing(null)} onCancel={() => setEditing(null)} />
      </div>
    </AdminLayout>
  );
}
