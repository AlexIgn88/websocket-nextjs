import { NextResponse } from 'next/server';

export function middleware(request) {
    if (request.nextUrl.pathname === '/secret') {
        const apiUrl = new URL('/api/secret', request.url);

        apiUrl.searchParams.set('key', request.nextUrl.searchParams.get('key'));

        return NextResponse.rewrite(apiUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/secret'],
};
