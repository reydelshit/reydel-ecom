import { useSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { data: session } = useSession();

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.rewrite(new URL('/', request.url));
    }
  }

  //   if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //     return NextResponse.rewrite(new URL('/dashboard/user', request.url));
  //   }
}
