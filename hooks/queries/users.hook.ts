import { useMutation, useQuery } from "@tanstack/react-query";

import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  DeleteTeamIdUsersMe401,
  DeleteTeamIdUsersMe404,
  GetTeamIdUsersCheckNicknameParams,
  GetTeamIdUsersMe401,
  GetTeamIdUsersMe404,
  PatchTeamIdUsersMe400,
  PatchTeamIdUsersMe401,
  PatchTeamIdUsersMe404,
  PatchTeamIdUsersMeBody,
  PatchTeamIdUsersMePassword400,
  PatchTeamIdUsersMePassword401,
  PatchTeamIdUsersMePassword404,
  PatchTeamIdUsersMePasswordBody,
} from "@/apis/model";

import {
  getTeamIdUsersCheckNickname,
  getTeamIdUsersMe,
  patchTeamIdUsersMe,
  deleteTeamIdUsersMe,
  patchTeamIdUsersMePassword,
} from "@/apis/users/users";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGetTeamIdUsersCheckNicknameQueryKey = (
  teamId?: string,
  params?: GetTeamIdUsersCheckNicknameParams,
) => {
  return [
    `/${teamId}/users/check-nickname`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetTeamIdUsersCheckNicknameQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdUsersCheckNickname>>,
  TError = unknown,
>(
  teamId: string,
  params: GetTeamIdUsersCheckNicknameParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdUsersCheckNickname>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetTeamIdUsersCheckNicknameQueryKey(teamId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdUsersCheckNickname>>
  > = ({ signal }) =>
    getTeamIdUsersCheckNickname(teamId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdUsersCheckNickname>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdUsersCheckNicknameQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdUsersCheckNickname>>
>;
export type GetTeamIdUsersCheckNicknameQueryError = unknown;

/**
 * @summary 닉네임 중복 확인
 */

export function useGetTeamIdUsersCheckNickname<
  TData = Awaited<ReturnType<typeof getTeamIdUsersCheckNickname>>,
  TError = unknown,
>(
  teamId: string,
  params: GetTeamIdUsersCheckNicknameParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdUsersCheckNickname>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdUsersCheckNicknameQueryOptions(
    teamId,
    params,
    options,
  );

  const query = useQuery(queryOptions);

  return {
    ...query,

    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };
}

export const getGetTeamIdUsersMeQueryKey = (teamId?: string) => {
  return [`/${teamId}/users/me`] as const;
};

export const getGetTeamIdUsersMeQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdUsersMe>>,
  TError = GetTeamIdUsersMe401 | GetTeamIdUsersMe404,
>(
  teamId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdUsersMe>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdUsersMeQueryKey(teamId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdUsersMe>>
  > = ({ signal }) => getTeamIdUsersMe(teamId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdUsersMe>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdUsersMeQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdUsersMe>>
>;
export type GetTeamIdUsersMeQueryError =
  GetTeamIdUsersMe401 | GetTeamIdUsersMe404;

/**
 * @summary 내 프로필 조회
 */

export function useGetTeamIdUsersMe<
  TData = Awaited<ReturnType<typeof getTeamIdUsersMe>>,
  TError = GetTeamIdUsersMe401 | GetTeamIdUsersMe404,
>(
  teamId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdUsersMe>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdUsersMeQueryOptions(teamId, options);

  const query = useQuery(queryOptions);

  return {
    ...query,

    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };
}

export const getPatchTeamIdUsersMeMutationOptions = <
  TError =
    PatchTeamIdUsersMe400 | PatchTeamIdUsersMe401 | PatchTeamIdUsersMe404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdUsersMe>>,
    TError,
    { teamId: string; data: PatchTeamIdUsersMeBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdUsersMe>>,
  TError,
  { teamId: string; data: PatchTeamIdUsersMeBody },
  TContext
> => {
  const mutationKey = ["patchTeamIdUsersMe"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdUsersMe>>,
    { teamId: string; data: PatchTeamIdUsersMeBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return patchTeamIdUsersMe(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdUsersMeMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdUsersMe>>
>;
export type PatchTeamIdUsersMeMutationBody = PatchTeamIdUsersMeBody;
export type PatchTeamIdUsersMeMutationError =
  PatchTeamIdUsersMe400 | PatchTeamIdUsersMe401 | PatchTeamIdUsersMe404;

/**
 * @summary 내 프로필 수정
 */
export const usePatchTeamIdUsersMe = <
  TError =
    PatchTeamIdUsersMe400 | PatchTeamIdUsersMe401 | PatchTeamIdUsersMe404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdUsersMe>>,
    TError,
    { teamId: string; data: PatchTeamIdUsersMeBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdUsersMe>>,
  TError,
  { teamId: string; data: PatchTeamIdUsersMeBody },
  TContext
> => {
  const mutationOptions = getPatchTeamIdUsersMeMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdUsersMeMutationOptions = <
  TError = DeleteTeamIdUsersMe401 | DeleteTeamIdUsersMe404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdUsersMe>>,
    TError,
    { teamId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdUsersMe>>,
  TError,
  { teamId: string },
  TContext
> => {
  const mutationKey = ["deleteTeamIdUsersMe"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdUsersMe>>,
    { teamId: string }
  > = (props) => {
    const { teamId } = props ?? {};

    return deleteTeamIdUsersMe(teamId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdUsersMeMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdUsersMe>>
>;

export type DeleteTeamIdUsersMeMutationError =
  DeleteTeamIdUsersMe401 | DeleteTeamIdUsersMe404;

/**
 * @summary 계정 삭제
 */
export const useDeleteTeamIdUsersMe = <
  TError = DeleteTeamIdUsersMe401 | DeleteTeamIdUsersMe404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdUsersMe>>,
    TError,
    { teamId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdUsersMe>>,
  TError,
  { teamId: string },
  TContext
> => {
  const mutationOptions = getDeleteTeamIdUsersMeMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPatchTeamIdUsersMePasswordMutationOptions = <
  TError =
    | PatchTeamIdUsersMePassword400
    | PatchTeamIdUsersMePassword401
    | PatchTeamIdUsersMePassword404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdUsersMePassword>>,
    TError,
    { teamId: string; data: PatchTeamIdUsersMePasswordBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdUsersMePassword>>,
  TError,
  { teamId: string; data: PatchTeamIdUsersMePasswordBody },
  TContext
> => {
  const mutationKey = ["patchTeamIdUsersMePassword"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdUsersMePassword>>,
    { teamId: string; data: PatchTeamIdUsersMePasswordBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return patchTeamIdUsersMePassword(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdUsersMePasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdUsersMePassword>>
>;
export type PatchTeamIdUsersMePasswordMutationBody =
  PatchTeamIdUsersMePasswordBody;
export type PatchTeamIdUsersMePasswordMutationError =
  | PatchTeamIdUsersMePassword400
  | PatchTeamIdUsersMePassword401
  | PatchTeamIdUsersMePassword404;

/**
 * @summary 비밀번호 변경
 */
export const usePatchTeamIdUsersMePassword = <
  TError =
    | PatchTeamIdUsersMePassword400
    | PatchTeamIdUsersMePassword401
    | PatchTeamIdUsersMePassword404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdUsersMePassword>>,
    TError,
    { teamId: string; data: PatchTeamIdUsersMePasswordBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdUsersMePassword>>,
  TError,
  { teamId: string; data: PatchTeamIdUsersMePasswordBody },
  TContext
> => {
  const mutationOptions = getPatchTeamIdUsersMePasswordMutationOptions(options);

  return useMutation(mutationOptions);
};
