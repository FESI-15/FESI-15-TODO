import { NextResponse } from "next/server";

import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { getAxiosErrorResponse } from "@/utils/getAxiosErrorResponse";

// JSON 응답이 있는 백엔드 요청을 BFF route에서 공통으로 처리합니다.
// 헤더 유무 검증은 apiClient의 request 인터셉터가 담당합니다.
export const handleRouteRequest = async <T>(
  request: (headers: { Authorization: string } | undefined) => Promise<{
    data: T;
    status: number;
  }>,
) => {
  try {
    const headers = await getAuthorizationHeaders();
    const response = await request(headers ?? undefined);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
};

// DELETE처럼 응답 body가 없는 백엔드 요청을 BFF route에서 공통으로 처리합니다.
export const handleEmptyRouteRequest = async (
  request: (headers: { Authorization: string } | undefined) => Promise<{
    status: number;
  }>,
) => {
  try {
    const headers = await getAuthorizationHeaders();
    const response = await request(headers ?? undefined);

    return new NextResponse(null, { status: response.status });
  } catch (error) {
    const { data, status } = getAxiosErrorResponse(error);

    return NextResponse.json(data, { status });
  }
};
