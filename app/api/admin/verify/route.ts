import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

const ADMIN_EMAIL = 'cookies@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    // adminAuth is a function — call it first, then verifyIdToken
    const decoded = await adminAuth().verifyIdToken(idToken);

    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin-token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Admin verify error:', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}