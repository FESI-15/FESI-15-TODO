import { NextResponse } from "next/server";

import {
  deleteTeamIdGoalsGoalId,
  getTeamIdGoalsGoalId,
  patchTeamIdGoalsGoalId,
} from "@/apis/goals/goals";
import { TEAM_ID } from "@/constants/auth";
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

/**
 * @summary 목표 ID로 목표 조회
 */
export async function GET(_request: Request, context: RouteContext) {
  const headers = await getAuthorizationHeaders();
  const goalId = await getGoalId(context);

  if (!headers || !TEAM_ID || Number.isNaN(goalId)) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const response = await getTeamIdGoalsGoalId(TEAM_ID, goalId, { headers });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}

/**
 * @summary 목표 ID로 목표 수정
 */
export async function PATCH(request: Request, context: RouteContext) {
  const headers = await getAuthorizationHeaders();
  const goalId = await getGoalId(context);

  if (!headers || !TEAM_ID || Number.isNaN(goalId)) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const data = await request.json();
    const response = await patchTeamIdGoalsGoalId(TEAM_ID, goalId, data, {
      headers,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}

/**
 * @summary 목표 ID로 목표 삭제
 */
export async function DELETE(_request: Request, context: RouteContext) {
  const headers = await getAuthorizationHeaders();
  const goalId = await getGoalId(context);

  if (!headers || !TEAM_ID || Number.isNaN(goalId)) {
    return NextResponse.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  }

  try {
    const response = await deleteTeamIdGoalsGoalId(TEAM_ID, goalId, {
      headers,
    });

    return new NextResponse(null, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
}
