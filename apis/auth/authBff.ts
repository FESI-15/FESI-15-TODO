import type {
  GetTeamIdUsersMe200,
  PostTeamIdAuthLogin200,
  PostTeamIdAuthLoginBody,
  PostTeamIdAuthLogout200,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface PostAuthLoginVariables {
  data: PostTeamIdAuthLoginBody;
}

// 로그인
export const postAuthLogin = (
  { data }: PostAuthLoginVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdAuthLogin200["user"]>(
    {
      url: "/api/auth/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

// 내 정보 조회
export const getAuthMe = (
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdUsersMe200>(
    {
      url: "/api/auth/me",
      method: "GET",
      signal,
    },
    options,
  );
};

// 로그아웃
export const postAuthLogout = (
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdAuthLogout200>(
    {
      url: "/api/auth/logout",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    options,
  );
};
