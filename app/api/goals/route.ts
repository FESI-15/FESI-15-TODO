import { NextResponse } from "next/server";

import { getTeamIdGoals, postTeamIdGoals } from "@/apis/goals/goals";
import type { GetTeamIdGoalsParams } from "@/apis/model";
import { getAxiosErrorResponse } from "@/utils/getAxiosErrorResponse";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";

// 목표 목록 조회
export async function GET(request: Request) {
  try {
    const headers = await getAuthorizationHeaders();
    const { searchParams } = new URL(request.url);
    const params: GetTeamIdGoalsParams = {
      cursor: searchParams.has("cursor")
        ? Number(searchParams.get("cursor"))
        : undefined,
      limit: searchParams.has("limit")
        ? Number(searchParams.get("limit"))
        : undefined,
    };
    const response = await getTeamIdGoals(params, {
      headers: headers ?? undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}

// 목표 생성
export async function POST(request: Request) {
  try {
    const headers = await getAuthorizationHeaders();
    const data = await request.json();
    const response = await postTeamIdGoals(data, {
      headers: headers ?? undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}
