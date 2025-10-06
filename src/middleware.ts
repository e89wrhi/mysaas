import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const PUBLIC_FILE = /\..*$/;
const locales = ['en', 'am', 'ja', 'zh', 'ar'];
const defaultLocale = 'en';
const PROTECTED_PATHS = ['/dashboard'];
const AUTH_PAGES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Skip static files, _next, and API routes ---
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // --- Get Better Auth session ---
  const sessionCookie = getSessionCookie(request);

  // --- Redirect logged-in users away from auth pages ---
  if (sessionCookie && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // --- Redirect unauthenticated users from protected routes ---
  if (
    !sessionCookie &&
    PROTECTED_PATHS.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // --- Locale handling ---
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale = locales.includes(maybeLocale);

  if (hasLocale) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', maybeLocale, { path: '/' });
    return response;
  }

  // Pick locale from cookie or fallback to default
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const targetLocale = locales.includes(cookieLocale ?? '')
    ? cookieLocale
    : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'], // all routes except API/_next/static
};
