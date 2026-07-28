import { NextResponse } from "next/server";

import {
  deleteTeamIdGoalsGoalId,
  getTeamIdGoalsGoalId,
  patchTeamIdGoalsGoalId,
} from "@/apis/goals/goals";
import { getAxiosErrorResponse } from "@/utils/getAxiosErrorResponse";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";

interface RouteContext {
  params: Promise<{
    goalId: string;
  }>;
}

const getGoalId = async (context: RouteContext) => {
  const { goalId } = await context.params;

  return Number(goalId);
};

// 목표 상세 조회
export async function GET(_request: Request, context: RouteContext) {
  const goalId = await getGoalId(context);

  if (Number.isNaN(goalId)) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const headers = await getAuthorizationHeaders();
    const response = await getTeamIdGoalsGoalId(goalId, {
      headers: headers ?? undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}

// 목표 수정
export async function PATCH(request: Request, context: RouteContext) {
  const goalId = await getGoalId(context);

  if (Number.isNaN(goalId)) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const headers = await getAuthorizationHeaders();
    const data = await request.json();
    const response = await patchTeamIdGoalsGoalId(goalId, data, {
      headers: headers ?? undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}

// 목표 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const goalId = await getGoalId(context);

  if (Number.isNaN(goalId)) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const headers = await getAuthorizationHeaders();
    const response = await deleteTeamIdGoalsGoalId(goalId, {
      headers: headers ?? undefined,
    });

    return new NextResponse(null, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}
