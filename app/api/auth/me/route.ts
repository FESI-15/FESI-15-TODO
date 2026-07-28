import { NextResponse } from "next/server";

import { getTeamIdUsersMe } from "@/apis/users/users";
import { API_BASE_URL } from "@/constants/auth";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { getAxiosErrorResponse } from "@/utils/getAxiosErrorResponse";

// 내 정보 조회
export async function GET() {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const headers = await getAuthorizationHeaders();
    const response = await getTeamIdUsersMe({ headers: headers ?? undefined });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}
