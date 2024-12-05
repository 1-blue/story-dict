import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routes } from "#fe/constants";

export const authenticatedRoutes = [
  routes.post.write.url,
  routes.post.edit.url(""),
];
export const unauthenticatedRoutes = [
  routes.login.url,
  routes.signup.url,
] as string[];

export function middleware(request: NextRequest) {
  // FIXME: 로그인중에 서버가 꺼진경우 쿠키만 남아있는 문제가 있어서 임시 주석
  // const isLoggedIn = request.cookies.get("sd_logged_in")?.value;
  // const { pathname } = request.nextUrl;

  // // 로그인 후 접근 가능한 페이지인데
  // if (authenticatedRoutes.some((route) => pathname.includes(route))) {
  //   // 로그인 안된 경우
  //   if (!isLoggedIn) {
  //     return NextResponse.redirect(new URL(routes.login.url, request.url));
  //   }
  // }

  // // 로그인 전 접근 가능한 페이지인데
  // if (unauthenticatedRoutes.includes(pathname)) {
  //   // 로그인 된 경우
  //   if (isLoggedIn) {
  //     return NextResponse.redirect(new URL(routes.post.url, request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
