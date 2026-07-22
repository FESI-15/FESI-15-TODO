import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  API_BASE_URL,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/constants/auth";
import { postTeamIdAuthLogout } from "@/apis/auth/auth";

// 로그아웃
export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!API_BASE_URL || !refreshToken) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
    cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);

    return NextResponse.json({ message: "Logged out." });
  }

  const response = await postTeamIdAuthLogout({
    refreshToken,
  });

  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);

  return NextResponse.json(response.data, { status: response.status });
}
