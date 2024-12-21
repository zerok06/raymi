import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    try {
        const token = req.cookies.get('token');

        if (!token) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        const response = await fetch('http://localhost:3001/api/auth/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        console.log(response);

        if (!response.ok) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        const data = await response.json();

        if (!data.valid) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}

export const config = {
    matcher: ['/home/:path*'],
};