import type { GetTeamIdUsersCheckNicknameParams } from "@/apis/model";
import {
  getTeamIdUsersCheckNickname,
  getTeamIdUsersMe,
} from "@/apis/users/users";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { usersKeys } from "./users.key";

export const getUsersCheckNicknameQueryOptionsServer = (
  params: GetTeamIdUsersCheckNicknameParams,
) => ({
  queryKey: usersKeys.checkNickname(params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdUsersCheckNickname(
      params,
      { headers },
      signal,
    );

    return { data: response.data };
  },
  enabled: !!params.name,
});

export const getUserMeQueryOptionsServer = () => ({
  queryKey: usersKeys.me(),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdUsersMe({ headers }, signal);

    return { data: response.data };
  },
});
