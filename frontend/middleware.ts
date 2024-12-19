import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    try {
        const token = req.cookies.get('token');
        console.log(token);

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

        if (!response.ok) {
            return NextResponse.redirect('/signin');
        }
        console.log('middleware');

        const data = await response.json();

        if (!data.valid) {
            return NextResponse.redirect('/signin');
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.error();
    }
}

export const config = {
    matcher: ['/home/:path*'],
};