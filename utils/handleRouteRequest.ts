import { NextResponse } from "next/server";

import { TEAM_ID } from "@/constants/auth";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { getAxiosErrorResponse } from "@/utils/getAxiosErrorResponse";

export const getTeamId = () => TEAM_ID;

// 인증 정보가 없을 때 route handler들이 같은 응답 형식을 쓰도록 모읍니다.
export const createUnauthorizedResponse = () => {
  return NextResponse.json(
    { message: "Authentication is required." },
    { status: 401 },
  );
};

// JSON 응답이 있는 백엔드 요청을 BFF route에서 공통으로 처리합니다.
export const handleRouteRequest = async <T>(
  request: (
    teamId: string,
    headers: { Authorization: string },
  ) => Promise<{
    data: T;
    status: number;
  }>,
) => {
  const teamId = getTeamId();
  const headers = await getAuthorizationHeaders();

  if (!teamId || !headers) {
    return createUnauthorizedResponse();
  }

  try {
    const response = await request(teamId, headers);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
};

// DELETE처럼 응답 body가 없는 백엔드 요청을 BFF route에서 공통으로 처리합니다.
export const handleEmptyRouteRequest = async (
  request: (
    teamId: string,
    headers: { Authorization: string },
  ) => Promise<{
    status: number;
  }>,
) => {
  const teamId = getTeamId();
  const headers = await getAuthorizationHeaders();

  if (!teamId || !headers) {
    return createUnauthorizedResponse();
  }

  try {
    const response = await request(teamId, headers);

    return new NextResponse(null, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
};
