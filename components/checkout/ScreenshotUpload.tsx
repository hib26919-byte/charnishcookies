'use client';

import Image from 'next/image';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CookieLoader } from '@/components/ui/CookieLoader';
import { compressImageTo500KB } from '@/lib/image-compress';

export function ScreenshotUpload({ value, onChange }: { value: string; onChange: (value: string) => void }) {
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
      onChange(data.url);
      toast.success(`Payment screenshot uploaded (${Math.round(compressed.size / 1024)}KB)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Screenshot upload failed');
    } finally {
      setUploading(false);
    }
  }
  return (
    <label className="brand-card block cursor-pointer p-5">
      <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} />
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-pink-100 text-pink-700">{uploading ? <CookieLoader size={28} /> : <Upload />}</div>
        <div>
          <h3 className="font-bold text-choc-800">Upload payment screenshot</h3>
          <p className="text-sm text-choc-500">{uploading ? 'Uploading to ImgBB...' : 'JPEG, PNG, or WebP up to 10MB.'}</p>
        </div>
      </div>
      {value && <div className="relative mt-4 h-40 w-40 overflow-hidden rounded-xl bg-cream-dark"><Image src={value} alt="Payment screenshot preview" fill className="object-cover" /></div>}
    </label>
  );
}
