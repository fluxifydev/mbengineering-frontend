import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Proxy for B2B E-commerce SEO Redirects.
 * Redirects http to https and non-www (mbengineering.online) to www.mbengineering.online
 * with 301 Permanent Redirect to preserve crawl equity.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // Check if the host is non-www
  const isNonWww = host === 'mbengineering.online';

  // Check if the protocol is HTTP (detecting via x-forwarded-proto)
  const xForwardedProto = request.headers.get('x-forwarded-proto');
  const isHttp = xForwardedProto === 'http';

  if (isNonWww || isHttp) {
    const targetUrl = `https://www.mbengineering.online${url.pathname}${url.search}`;
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - assets or images in the public folder with standard extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)',
  ],
};
