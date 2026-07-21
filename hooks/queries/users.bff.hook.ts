import { useMutation, useQuery } from "@tanstack/react-query";

import type { GetTeamIdUsersCheckNicknameParams } from "@/apis/model";
import type {
  PatchUserMeVariables,
  PatchUserPasswordVariables,
} from "@/apis/users/usersBff";
import {
  deleteUserMe,
  getUsersCheckNickname,
  patchUserMe,
  patchUserPassword,
} from "@/apis/users/usersBff";

export const useGetUsersCheckNickname = (
  params: GetTeamIdUsersCheckNicknameParams,
) => {
  return useQuery({
    queryKey: ["/api/users/check-nickname", params],
    queryFn: ({ signal }) => getUsersCheckNickname(params, undefined, signal),
    enabled: !!params.name,
  });
};

export const usePatchUserMe = () => {
  return useMutation({
    mutationKey: ["patchUserMe"],
    mutationFn: (variables: PatchUserMeVariables) => patchUserMe(variables),
  });
};

export const useDeleteUserMe = () => {
  return useMutation({
    mutationKey: ["deleteUserMe"],
    mutationFn: () => deleteUserMe(),
  });
};

export const usePatchUserPassword = () => {
  return useMutation({
    mutationKey: ["patchUserPassword"],
    mutationFn: (variables: PatchUserPasswordVariables) =>
      patchUserPassword(variables),
  });
};
