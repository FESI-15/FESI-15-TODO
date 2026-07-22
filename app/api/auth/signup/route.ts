import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_MAX_AGE,
  API_BASE_URL,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE,
} from "@/constants/auth";
import { postTeamIdAuthSignup } from "@/apis/auth/auth";

interface SignupRequestBody {
  name?: string;
  email?: string;
  password?: string;
}

// 회원가입
export async function POST(request: Request) {
  const { name, email, password } = (await request.json()) as SignupRequestBody;

  if (!API_BASE_URL || !name || !email || !password) {
    return NextResponse.json(
      { message: "Invalid signup request." },
      { status: 400 },
    );
  }

  const response = await postTeamIdAuthSignup({
    name,
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
