import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { CATEGORIES } from "#fe/constants";

export function middleware(request: NextRequest) {
  // 카테고리 페이지 리다이렉트
  if (request.nextUrl.pathname === "/post/category") {
    return NextResponse.redirect(
      new URL(`/post/category/${CATEGORIES[0]?.value}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
