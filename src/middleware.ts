// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('authToken')?.value;

  console.log('▶️ hit middleware:', req.nextUrl.pathname);

  if (!authToken) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  if (authToken && req.nextUrl.pathname === '/auth/sign-in') {
    const refererHeader = req.headers.get('referer');
    const target = refererHeader
      ? new URL(refererHeader)
      : new URL('/dashboard/overview', req.url);

    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/sign-in', '/((?!_next|api|favicon\\.ico)(?!.*\\..*).*)']
};
