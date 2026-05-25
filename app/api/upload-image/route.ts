import { NextResponse } from 'next/server';
import { uploadBase64ToImgBB } from '@/lib/imgbb';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const image = form.get('image');
    if (typeof image === 'string' && image.startsWith('data:image')) {
      const url = await uploadBase64ToImgBB(image);
      return NextResponse.json({ url });
    }
    if (image instanceof File) {
      if (image.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'Image must be 10MB or smaller' }, { status: 400 });
      }
      const bytes = Buffer.from(await image.arrayBuffer());
      const base64 = `data:${image.type};base64,${bytes.toString('base64')}`;
      const url = await uploadBase64ToImgBB(base64);
      return NextResponse.json({ url });
    }
    return NextResponse.json({ error: 'Send a base64 data URL as image' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
