import { NextResponse } from "next/server";

import { getTeamIdUsersMe } from "@/apis/users/users";
import { API_BASE_URL, TEAM_ID } from "@/constants/auth";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";

/**
 * @summary 사용자 정보 조회
 */
export async function GET() {
  const headers = await getAuthorizationHeaders();

  if (!API_BASE_URL || !TEAM_ID || !headers) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }
  const response = await getTeamIdUsersMe(TEAM_ID, { headers });

  return NextResponse.json(response.data, { status: response.status });
}
