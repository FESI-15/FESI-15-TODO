import type { GetTeamIdUsersCheckNicknameParams } from "@/apis/model";

export const usersKeys = {
  checkNickname: (params: GetTeamIdUsersCheckNicknameParams) =>
    ["/api/users/check-nickname", params] as const,
  me: () => ["/api/users/me"] as const,
};
