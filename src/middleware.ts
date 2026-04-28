import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

const PUBLIC_FILE = /\..*$/;
const locales = ['en', 'am', 'ja', 'zh', 'ar'];
const defaultLocale = 'en';

// Routes (without locale prefix)
const AUTH_PAGES = ['/login', '/register', '/verify-2fa'];
const PROTECTED_PATHS = ['/dashboard', '/settings', '/account'];

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Skip locale redirection for API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname) ||
    pathname.includes('favicon.ico')
  ) {
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

  // Path without locale for route matching
  const pathWithoutLocale = `/${segments.slice(1).join('/')}`;

  const isAuthPage = AUTH_PAGES.includes(pathWithoutLocale);
  const isProtected = PROTECTED_PATHS.some((p) =>
    pathWithoutLocale.startsWith(p)
  );

  if (isProtected) {
    await auth.protect();
  }

  const { userId } = await auth();

  if (userId && isAuthPage) {
    const dashboardUrl = new URL(`/${maybeLocale}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
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
