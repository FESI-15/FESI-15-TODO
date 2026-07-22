import { NextResponse } from "next/server";

import { getTeamIdUsersMe } from "@/apis/users/users";
import { API_BASE_URL } from "@/constants/auth";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";

// 내 정보 조회
export async function GET() {
  const headers = await getAuthorizationHeaders();

  if (!API_BASE_URL || !headers) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }
  const response = await getTeamIdUsersMe({ headers });

  return NextResponse.json(response.data, { status: response.status });
}
