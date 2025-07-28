// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

// ไม่ต้อง export config เลย ถ้าไม่กรอง route ใดๆ
