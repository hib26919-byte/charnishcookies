'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { deleteField, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/firebase';
import { homeContent } from '@/lib/sample-data';

export default function AdminHeroPage() {
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({ heroTitle: '', heroSubtitle: '', heroCTA: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(doc(db, 'siteContent', 'home'), (snapshot) => {
      const data = snapshot.data();
      setForm({
        heroTitle: String(data?.heroTitle ?? homeContent.heroTitle),
        heroSubtitle: String(data?.heroSubtitle ?? homeContent.heroSubtitle),
        heroCTA: String(data?.heroCTA ?? homeContent.heroCTA)
      });
      setImages(Array.isArray(data?.heroImages) ? data.heroImages : []);
    });
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'siteContent', 'home'), {
        heroImages: images,
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        heroCTA: form.heroCTA,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Home hero updated');
    } catch {
      toast.error('Could not save hero. Check Firebase auth/rules.');
    } finally {
      setLoading(false);
    }
  }

  async function clearHero() {
    if (!window.confirm('Clear all home hero text and images?')) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'siteContent', 'home'), {
        heroImages: [],
        heroTitle: deleteField(),
        heroSubtitle: deleteField(),
        heroCTA: deleteField(),
        updatedAt: serverTimestamp()
      });
      setImages([]);
      setForm({ heroTitle: '', heroSubtitle: '', heroCTA: '' });
      toast.success('Home hero cleared');
    } catch {
      toast.error('Could not clear hero');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Home Hero Section</h1>
      <form onSubmit={submit} className="brand-card mt-6 grid gap-5 p-5">
        <div className="rounded-xl bg-gold-100 px-4 py-3 text-sm font-bold text-gold-700">
          Home hero only. Add, delete, edit, and update the images and text shown on the first screen.
        </div>
        <label className="text-sm font-bold text-choc-800">
          Hero Title
          <input value={form.heroTitle} onChange={(event) => setForm({ ...form, heroTitle: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" />
        </label>
        <label className="text-sm font-bold text-choc-800">
          Hero Subtitle
          <input value={form.heroSubtitle} onChange={(event) => setForm({ ...form, heroSubtitle: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" />
        </label>
        <label className="text-sm font-bold text-choc-800">
          CTA Button Text
          <input value={form.heroCTA} onChange={(event) => setForm({ ...form, heroCTA: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-choc-300/30 px-4 font-normal" />
        </label>
        <ImageUploader onChange={(url) => setImages((current) => [...current, url])} />
        <div className="grid gap-4 md:grid-cols-3">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="brand-card overflow-hidden">
              <div className="relative aspect-video bg-cream-dark">
                <Image src={image} alt={`Home hero ${index + 1}`} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <span className="text-xs font-bold text-choc-500">Slide {index + 1}</span>
                <button type="button" className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700" onClick={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!images.length && <div className="rounded-xl border border-dashed border-choc-300/40 p-6 text-center text-sm font-bold text-choc-500 md:col-span-3">No hero images uploaded yet.</div>}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button loading={loading}>Update Home Hero</Button>
          <Button type="button" variant="secondary" onClick={clearHero} disabled={loading}>Delete Hero</Button>
        </div>
      </form>
    </AdminLayout>
  );
}
