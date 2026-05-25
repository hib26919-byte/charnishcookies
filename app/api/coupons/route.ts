import { NextResponse } from 'next/server';
import { sampleCoupons } from '@/lib/sample-data';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

const ADMIN_EMAIL = 'cookies@gmail.com';

async function assertAdmin(request: Request) {
  const cookie = request.headers.get('cookie') ?? '';
  const token = cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith('admin-token='))?.split('=')[1];
  if (!token) throw new Error('Missing admin token');
  const decoded = await adminAuth().verifyIdToken(decodeURIComponent(token));
  if (decoded.email !== ADMIN_EMAIL) throw new Error('Forbidden');
}

export async function POST(request: Request) {
  const { code, subtotal } = await request.json();
  const coupon = sampleCoupons.find((item) => item.code === String(code).toUpperCase());
  if (!coupon || !coupon.active) return NextResponse.json({ error: 'Coupon is not active' }, { status: 400 });
  if (coupon.expiresAt < new Date()) return NextResponse.json({ error: 'Coupon expired' }, { status: 400 });
  if (coupon.usedCount >= coupon.maxUses) return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
  if (subtotal < coupon.minOrder) return NextResponse.json({ error: `Minimum order is ₹${coupon.minOrder}` }, { status: 400 });
  const discount = coupon.discountType === 'percentage' ? Math.round((subtotal * coupon.discountValue) / 100) : coupon.discountValue;
  return NextResponse.json({ code: coupon.code, discount });
}

export async function GET() {
  try {
    const snapshot = await adminDb().collection('coupons').orderBy('createdAt', 'desc').get();
    return NextResponse.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch {
    return NextResponse.json(sampleCoupons);
  }
}

export async function PUT(request: Request) {
  try {
    await assertAdmin(request);
    const body = await request.json();
    const { id, ...payload } = body;
    if (id) {
      await adminDb().collection('coupons').doc(id).update({ ...payload, updatedAt: new Date() });
      return NextResponse.json({ id, ...payload });
    }
    const doc = await adminDb().collection('coupons').add({ ...payload, createdAt: new Date(), updatedAt: new Date() });
    return NextResponse.json({ id: doc.id, ...payload }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Coupon save failed' }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    await assertAdmin(request);
    const { id } = await request.json();
    await adminDb().collection('coupons').doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Coupon delete failed' }, { status: 401 });
  }
}
