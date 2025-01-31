import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/measure',
  '/monitoring',
  '/api',
  '/pricing',
  '/docs'
] as const;

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Add pathname to headers for use in layout
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Check if the current path is public
  const isPublicPath = PUBLIC_ROUTES.some(path => pathname === path || pathname.startsWith(`${path}/`));

  // Handle authentication
  if (pathname.startsWith('/app')) {
    // App routes require authentication
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (isPublicPath && token) {
    // Redirect authenticated users away from public pages
    return NextResponse.redirect(new URL('/app/stockton-street-co/monitors', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Update config to match all relevant routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
