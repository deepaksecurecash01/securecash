import { NextResponse } from 'next/server';

export function middleware(request)
{
    const response = NextResponse.next();

    // Content Security Policy
    const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://player.vimeo.com https://www.google.com https://maps.googleapis.com https://maps.gstatic.com https://assets.calendly.com https://calendly.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com;
    img-src 'self' data: https: blob:;
    font-src 'self' data: https://fonts.gstatic.com;
    frame-src 'self' https://player.vimeo.com https://www.google.com https://calendly.com;
    connect-src 'self' https://vimeo.com https://*.vimeo.com https://maps.googleapis.com https://calendly.com https://*.calendly.com;
    media-src 'self' https: blob:;
  `.replace(/\s{2,}/g, ' ').trim();

    response.headers.set('Content-Security-Policy', csp);

    // Strict Transport Security
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
    );

    // Cross-Origin Opener Policy
    response.headers.set(
        'Cross-Origin-Opener-Policy',
        'same-origin-allow-popups'
    );

    // Additional security headers
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)|images/).*)',
    ],
};