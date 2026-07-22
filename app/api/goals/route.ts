import { NextResponse } from "next/server";

import { getTeamIdGoals, postTeamIdGoals } from "@/apis/goals/goals";
import type { GetTeamIdGoalsParams } from "@/apis/model";
import { getAxiosErrorResponse } from "@/utils/getAxiosErrorResponse";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";

// 목표 목록 조회
export async function GET(request: Request) {
  const headers = await getAuthorizationHeaders();

  if (!headers) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const params: GetTeamIdGoalsParams = {
      cursor: searchParams.has("cursor")
        ? Number(searchParams.get("cursor"))
        : undefined,
      limit: searchParams.has("limit")
        ? Number(searchParams.get("limit"))
        : undefined,
    };
    const response = await getTeamIdGoals(params, { headers });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}

// 목표 생성
export async function POST(request: Request) {
  const headers = await getAuthorizationHeaders();

  if (!headers) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const data = await request.json();
    const response = await postTeamIdGoals(data, { headers });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}
