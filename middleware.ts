import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  console.log('Middleware - Token:', token);
  console.log('Middleware - Pathname:', pathname);

  // Allow access to login page or static assets without authentication
  if (pathname === '/login' || pathname.startsWith('/api/auth') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Protect /admin routes
  if (pathname.startsWith('/admin') && !token) {
    console.warn('Unauthorized access to admin route. Redirecting to /login...');
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'], // Ensure correct routes are matched
};
