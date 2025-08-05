// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get('authToken')?.value;

  // console.log('▶️ middleware:', pathname, 'token?', !!authToken);

  if (!authToken && pathname !== '/auth/sign-in') {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  if (authToken && pathname === '/auth/sign-in') {
    const referer =
      req.headers.get('referer') || `${req.nextUrl.origin}/dashboard/overview`;
    const target = new URL(referer, req.url);
    return NextResponse.redirect(target);
  }

  // 3) อื่น ๆ ปล่อยผ่าน
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico)(?!.*\\..*).*)']
};
