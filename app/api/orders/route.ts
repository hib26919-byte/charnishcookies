import { NextResponse } from 'next/server';

const memoryOrders: unknown[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  const order = { id: crypto.randomUUID(), ...body, createdAt: new Date(), updatedAt: new Date() };
  memoryOrders.push(order);
  return NextResponse.json(order, { status: 201 });
}

export async function GET() {
  return NextResponse.json(memoryOrders);
}
