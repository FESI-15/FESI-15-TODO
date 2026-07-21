import { cookies } from "next/headers";

import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/auth";

// 서버에서만 읽을 수 있는 httpOnly 쿠키 토큰을 백엔드 인증 헤더로 변환합니다.
export const getAuthorizationHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return null;
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
