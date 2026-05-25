import { NextResponse } from 'next/server';
import { sampleProducts } from '@/lib/sample-data';

export async function GET() {
  return NextResponse.json(sampleProducts);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ id: crypto.randomUUID(), ...body, createdAt: new Date(), updatedAt: new Date() }, { status: 201 });
}
