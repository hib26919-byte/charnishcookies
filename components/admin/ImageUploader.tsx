'use client';

import { Upload } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CookieLoader } from '@/components/ui/CookieLoader';
import { compressImageTo500KB } from '@/lib/image-compress';

export function ImageUploader({ onChange }: { onChange?: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const compressed = await compressImageTo500KB(file);
      const form = new FormData();
      form.append('image', compressed);
      const response = await fetch('/api/upload-image', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Upload failed');
      onChange?.(data.url);
      toast.success(`Image uploaded (${Math.round(compressed.size / 1024)}KB)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Image upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gold-500 bg-gold-100/40 p-5 text-center text-choc-700">
      {uploading ? <CookieLoader size={32} /> : <Upload />}
      <span className="mt-2 text-sm font-bold">{uploading ? 'Uploading...' : 'Drag or choose image'}</span>
      <input type="file" className="sr-only" accept="image/*" onChange={(event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        upload(file);
      }} />
    </label>
  );
}
