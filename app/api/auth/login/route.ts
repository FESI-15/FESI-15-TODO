import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_MAX_AGE,
  API_BASE_URL,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE,
  TEAM_ID,
} from "@/constants/auth";
import { postTeamIdAuthLogin } from "@/apis/auth/auth";

interface LoginRequestBody {
  email?: string;
  password?: string;
}

/**
 * @summary 로그인
 */
export async function POST(request: Request) {
  const { email, password } = (await request.json()) as LoginRequestBody;

  if (!API_BASE_URL || !TEAM_ID || !email || !password) {
    return NextResponse.json(
      { message: "Invalid login request." },
      { status: 400 },
    );
  }

  const response = await postTeamIdAuthLogin(TEAM_ID, {
    email,
    password,
  });

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
