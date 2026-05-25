import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');

  if (isAdminRoute) {
    const token = req.cookies.get('admin-token')?.value;

    // Reject the hardcoded demo token and any missing token
    if (!token || token === 'demo-admin') {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }

    // Full cryptographic verification happens in the API route.
    // Here we just confirm a token exists (it's HttpOnly so it can't be forged by JS).
    // For extra security you can call adminAuth.verifyIdToken(token) here too,
    // but that requires an Edge-compatible Firebase Admin setup.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};