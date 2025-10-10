import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

const PUBLIC_FILE = /\..*$/;
const locales = ['en', 'am', 'ja', 'zh', 'ar'];
const defaultLocale = 'en';

// Routes
const AUTH_PAGES = ['/sign-in', '/sign-up', '/verify-2fa'];
const PROTECTED_PATHS = ['/dashboard', '/settings', '/account'];

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Locale handling
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale = locales.includes(maybeLocale);

  if (!hasLocale) {
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
    const targetLocale = locales.includes(cookieLocale ?? '')
      ? cookieLocale!
      : defaultLocale;

    const url = req.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (isProtected) {
    await auth.protect();
  }

  const { userId } = await auth();

  if (userId && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Run for all pages except Next.js internals and static files
    '/((?!_next/|.*\\..*).*)',
    // Also run for API routes
    '/api/:path*',
  ],
};
