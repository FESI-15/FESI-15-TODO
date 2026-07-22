import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_MAX_AGE,
  API_BASE_URL,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE,
} from "@/constants/auth";
import { postTeamIdOauthProvider } from "@/apis/auth/auth";

interface OauthRequestBody {
  token?: string;
}

interface RouteContext {
  params: Promise<{
    provider: string;
  }>;
}

const isOauthProvider = (provider: string): provider is "google" =>
  provider === "google";

// OAuth 로그인
export async function POST(request: Request, context: RouteContext) {
  const { provider } = await context.params;
  const { token } = (await request.json()) as OauthRequestBody;

  if (!API_BASE_URL || !token || !isOauthProvider(provider)) {
    return NextResponse.json(
      { message: "Invalid oauth request." },
      { status: 400 },
    );
  }

  const response = await postTeamIdOauthProvider(provider, { token });

  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, response.data.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, response.data.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return NextResponse.json(response.data.user, { status: response.status });
}
