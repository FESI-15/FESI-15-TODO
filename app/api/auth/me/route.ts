import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  API_BASE_URL,
  TEAM_ID,
} from "@/constants/auth";
import { getTeamIdUsersMe } from "@/apis/users/users";

/**
 * @summary 사용자 정보 조회
 */
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!API_BASE_URL || !TEAM_ID || !accessToken) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }
  const response = await getTeamIdUsersMe(TEAM_ID, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json(response.data, { status: response.status });
}
