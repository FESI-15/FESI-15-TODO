import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type {
  PostTeamIdAuthRefresh200,
  PostTeamIdAuthRefreshBody,
} from "@/apis/model";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRY_BUFFER_MS,
  ACCESS_TOKEN_MAX_AGE,
  API_BASE_URL,
  AUTH_ONLY_PATHS,
  PROTECTED_PATHS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE,
} from "@/constants/auth";

const isAccessTokenExpired = (accessToken: string) => {
  try {
    const payload = accessToken.split(".")[1];
    const { exp } = JSON.parse(atob(payload)) as { exp?: number };

    if (!exp) {
      return true;
    }

    return Date.now() >= exp * 1000 - ACCESS_TOKEN_EXPIRY_BUFFER_MS;
  } catch {
    return true;
  }
};

const refreshTokens = async (refreshToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
      } satisfies PostTeamIdAuthRefreshBody),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as PostTeamIdAuthRefresh200;
  } catch {
    return null;
  }
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (accessToken && isAccessTokenExpired(accessToken) && refreshToken) {
    const refreshed = await refreshTokens(refreshToken);
    const secure = process.env.NODE_ENV === "production";

    if (refreshed) {
      const response = NextResponse.redirect(request.url);

      response.cookies.set(ACCESS_TOKEN_COOKIE_NAME, refreshed.accessToken, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });

      if (refreshed.refreshToken) {
        response.cookies.set(
          REFRESH_TOKEN_COOKIE_NAME,
          refreshed.refreshToken,
          {
            httpOnly: true,
            secure,
            sameSite: "lax",
            path: "/",
            maxAge: REFRESH_TOKEN_MAX_AGE,
          },
        );
      }

      return response;
    }

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
    response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
    return response;
  }

  const hasAccessToken = Boolean(accessToken);

  const isAuthOnlyPath = AUTH_ONLY_PATHS.some((path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path),
  );

  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  if (hasAccessToken && isAuthOnlyPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!hasAccessToken && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
