import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  AUTH_ONLY_PATHS,
  PROTECTED_PATHS,
} from "@/constants/auth";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const hasAccessToken = Boolean(
    request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value,
  );

  const isAuthOnlyPath = AUTH_ONLY_PATHS.some((path) =>
    pathname.startsWith(path),
  );
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  if (hasAccessToken && isAuthOnlyPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!hasAccessToken && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
