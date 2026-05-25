'use client';

import { FormEvent, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/firebase';

export default function AdminPagesPage() {
  const [page, setPage] = useState('home');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      await setDoc(doc(db, 'siteContent', page), {
        sections: [{
          id: crypto.randomUUID(),
          type: image ? 'text+image' : 'text',
          heading: form.get('heading'),
          body: form.get('body'),
          image,
          order: 1
        }],
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Page content saved');
    } catch {
      toast.error('Could not save page content. Check Firebase auth/rules.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Pages</h1>
      <form onSubmit={submit} className="brand-card mt-6 grid gap-4 p-5">
        <select value={page} onChange={(event) => setPage(event.target.value)} className="h-11 rounded-xl border border-choc-300/30 px-4"><option value="home">Home</option><option value="about">About</option><option value="shop">Shop</option><option value="contact">Contact</option></select>
        <input name="heading" placeholder="Section heading" className="h-11 rounded-xl border border-choc-300/30 px-4" />
        <textarea name="body" placeholder="Section body" className="min-h-40 rounded-xl border border-choc-300/30 p-4" />
        <ImageUploader onChange={setImage} />
        {image && <p className="text-sm font-bold text-choc-700">Image uploaded</p>}
        <Button loading={loading}>Save Page Content</Button>
      </form>
    </AdminLayout>
  );
}
