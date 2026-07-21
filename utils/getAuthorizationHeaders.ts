import { cookies } from "next/headers";

import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/auth";

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
