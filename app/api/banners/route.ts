import { NextResponse } from 'next/server';
import { sampleBanners } from '@/lib/sample-data';

export async function GET() {
  return NextResponse.json(sampleBanners);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ id: crypto.randomUUID(), ...body, createdAt: new Date() }, { status: 201 });
}
