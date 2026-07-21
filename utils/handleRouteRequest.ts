import { NextResponse } from "next/server";

import { TEAM_ID } from "@/constants/auth";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { getAxiosErrorResponse } from "@/utils/getAxiosErrorResponse";

export const getTeamId = () => TEAM_ID;

export const createUnauthorizedResponse = () => {
  return NextResponse.json(
    { message: "Authentication is required." },
    { status: 401 },
  );
};

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
