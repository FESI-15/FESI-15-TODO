import type {
  GetTeamIdUsersCheckNickname200,
  GetTeamIdUsersCheckNicknameParams,
  PatchTeamIdUsersMe200,
  PatchTeamIdUsersMeBody,
  PatchTeamIdUsersMePassword200,
  PatchTeamIdUsersMePasswordBody,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface PatchUserMeVariables {
  data: PatchTeamIdUsersMeBody;
}

export interface PatchUserPasswordVariables {
  data: PatchTeamIdUsersMePasswordBody;
}

export const getUsersCheckNickname = (
  params: GetTeamIdUsersCheckNicknameParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdUsersCheckNickname200>(
    { url: "/api/users/check-nickname", method: "GET", params, signal },
    options,
  );
};

export const patchUserMe = (
  { data }: PatchUserMeVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdUsersMe200>(
    {
      url: "/api/users/me",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const deleteUserMe = (options?: SecondParameter<typeof bffInstance>) => {
  return bffInstance<void>({ url: "/api/users/me", method: "DELETE" }, options);
};

export const patchUserPassword = (
  { data }: PatchUserPasswordVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdUsersMePassword200>(
    {
      url: "/api/users/me/password",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};
