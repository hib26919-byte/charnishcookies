'use client';

import { FormEvent, useEffect, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { db } from '@/lib/firebase';
import { Banner } from '@/types';

export function BannerForm({ banner, onSaved, onCancel }: { banner?: Banner | null; onSaved?: () => void; onCancel?: () => void }) {
  const [form, setForm] = useState({ title: '', subtitle: '', ctaText: 'Shop Now', ctaLink: '/shop', startDate: '', endDate: '', active: true });
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const toInputDate = (value: unknown) => {
    if (!value) return '';
    const date = value instanceof Date ? value : value && typeof value === 'object' && 'toDate' in value ? (value as { toDate: () => Date }).toDate() : new Date(String(value));
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!banner) {
      setForm({ title: '', subtitle: '', ctaText: 'Shop Now', ctaLink: '/shop', startDate: '', endDate: '', active: true });
      setImage('');
      return;
    }
    setForm({
      title: banner.title,
      subtitle: banner.subtitle,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      startDate: toInputDate(banner.startDate),
      endDate: toInputDate(banner.endDate),
      active: banner.active
    });
    setImage(banner.image);
  }, [banner]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.title || !image || !form.startDate || !form.endDate) return toast.error('Title, image, start date, and end date are required');
    setLoading(true);
    try {
      const payload = {
        ...form,
        image,
        startDate: Timestamp.fromDate(new Date(form.startDate)),
        endDate: Timestamp.fromDate(new Date(form.endDate)),
        updatedAt: serverTimestamp()
      };
      if (banner?.id) {
        await updateDoc(doc(db, 'banners', banner.id), payload);
      } else {
        await addDoc(collection(db, 'banners'), { ...payload, createdAt: serverTimestamp() });
      }
      toast.success(banner?.id ? 'Banner updated' : 'Banner saved');
      onSaved?.();
    } catch {
      toast.error('Could not save banner. Check Firebase auth/rules.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="brand-card grid gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-bold text-choc-800">{banner?.id ? 'Edit Banner' : 'Banner Form'}</h2>
        {banner?.id && <button type="button" className="text-sm font-bold text-pink-700" onClick={onCancel}>Cancel</button>}
      </div>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="h-11 rounded-xl border border-choc-300/30 px-4" />
      <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Subtitle" className="h-11 rounded-xl border border-choc-300/30 px-4" />
      <input value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} placeholder="CTA Button Text" className="h-11 rounded-xl border border-choc-300/30 px-4" />
      <input value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} placeholder="CTA Link" className="h-11 rounded-xl border border-choc-300/30 px-4" />
      <input type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="h-11 rounded-xl border border-choc-300/30 px-4" />
      <input type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="h-11 rounded-xl border border-choc-300/30 px-4" />
      <ImageUploader onChange={setImage} />
      {image && (
        <div className="overflow-hidden rounded-2xl border border-gold-300 bg-cream-dark">
          <div className="relative aspect-video">
            <Image src={image} alt="Festival banner preview" fill className="object-cover" />
          </div>
          <p className="p-3 text-sm font-bold text-choc-700">Image uploaded and ready to save</p>
        </div>
      )}
      <label className="font-bold text-choc-800"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
      <p className="text-sm text-choc-500">Banner will automatically show or hide based on start and end dates. It appears once per user session.</p>
      <Button loading={loading}>Save Banner</Button>
    </form>
  );
}
