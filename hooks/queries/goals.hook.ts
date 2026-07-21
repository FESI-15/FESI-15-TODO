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
  DeleteTeamIdGoalsGoalId401,
  DeleteTeamIdGoalsGoalId403,
  DeleteTeamIdGoalsGoalId404,
  GetTeamIdGoals400,
  GetTeamIdGoals401,
  GetTeamIdGoalsGoalId401,
  GetTeamIdGoalsGoalId403,
  GetTeamIdGoalsGoalId404,
  GetTeamIdGoalsParams,
  PatchTeamIdGoalsGoalId400,
  PatchTeamIdGoalsGoalId401,
  PatchTeamIdGoalsGoalId403,
  PatchTeamIdGoalsGoalId404,
  PatchTeamIdGoalsGoalIdBody,
  PostTeamIdGoals400,
  PostTeamIdGoals401,
  PostTeamIdGoalsBody,
} from "@/apis/model";

import {
  getTeamIdGoals,
  postTeamIdGoals,
  getTeamIdGoalsGoalId,
  patchTeamIdGoalsGoalId,
  deleteTeamIdGoalsGoalId,
} from "@/apis/goals/goals";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGetTeamIdGoalsQueryKey = (
  teamId?: string,
  params?: GetTeamIdGoalsParams,
) => {
  return [`/${teamId}/goals`, ...(params ? [params] : [])] as const;
};

export const getGetTeamIdGoalsQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdGoals>>,
  TError = GetTeamIdGoals400 | GetTeamIdGoals401,
>(
  teamId: string,
  params?: GetTeamIdGoalsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdGoals>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdGoalsQueryKey(teamId, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTeamIdGoals>>> = ({
    signal,
  }) => getTeamIdGoals(teamId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdGoals>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdGoalsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdGoals>>
>;
export type GetTeamIdGoalsQueryError = GetTeamIdGoals400 | GetTeamIdGoals401;

/**
 * @summary 목표 목록 조회
 */

export function useGetTeamIdGoals<
  TData = Awaited<ReturnType<typeof getTeamIdGoals>>,
  TError = GetTeamIdGoals400 | GetTeamIdGoals401,
>(
  teamId: string,
  params?: GetTeamIdGoalsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdGoals>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdGoalsQueryOptions(teamId, params, options);

  const query = useQuery(queryOptions);

  return {
    ...query,

    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };
}

export const getPostTeamIdGoalsMutationOptions = <
  TError = PostTeamIdGoals400 | PostTeamIdGoals401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdGoals>>,
    TError,
    { teamId: string; data: PostTeamIdGoalsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdGoals>>,
  TError,
  { teamId: string; data: PostTeamIdGoalsBody },
  TContext
> => {
  const mutationKey = ["postTeamIdGoals"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdGoals>>,
    { teamId: string; data: PostTeamIdGoalsBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdGoals(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdGoalsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdGoals>>
>;
export type PostTeamIdGoalsMutationBody = PostTeamIdGoalsBody;
export type PostTeamIdGoalsMutationError =
  PostTeamIdGoals400 | PostTeamIdGoals401;

/**
 * @summary 목표 생성
 */
export const usePostTeamIdGoals = <
  TError = PostTeamIdGoals400 | PostTeamIdGoals401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdGoals>>,
    TError,
    { teamId: string; data: PostTeamIdGoalsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdGoals>>,
  TError,
  { teamId: string; data: PostTeamIdGoalsBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdGoalsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getGetTeamIdGoalsGoalIdQueryKey = (
  teamId?: string,
  goalId?: number,
) => {
  return [`/${teamId}/goals/${goalId}`] as const;
};

export const getGetTeamIdGoalsGoalIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdGoalsGoalId>>,
  TError =
    GetTeamIdGoalsGoalId401 | GetTeamIdGoalsGoalId403 | GetTeamIdGoalsGoalId404,
>(
  teamId: string,
  goalId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdGoalsGoalId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdGoalsGoalIdQueryKey(teamId, goalId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdGoalsGoalId>>
  > = ({ signal }) =>
    getTeamIdGoalsGoalId(teamId, goalId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!(teamId && goalId),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdGoalsGoalId>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdGoalsGoalIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdGoalsGoalId>>
>;
export type GetTeamIdGoalsGoalIdQueryError =
  GetTeamIdGoalsGoalId401 | GetTeamIdGoalsGoalId403 | GetTeamIdGoalsGoalId404;

/**
 * @summary 목표 상세 조회
 */

export function useGetTeamIdGoalsGoalId<
  TData = Awaited<ReturnType<typeof getTeamIdGoalsGoalId>>,
  TError =
    GetTeamIdGoalsGoalId401 | GetTeamIdGoalsGoalId403 | GetTeamIdGoalsGoalId404,
>(
  teamId: string,
  goalId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdGoalsGoalId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdGoalsGoalIdQueryOptions(
    teamId,
    goalId,
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

export const getPatchTeamIdGoalsGoalIdMutationOptions = <
  TError =
    | PatchTeamIdGoalsGoalId400
    | PatchTeamIdGoalsGoalId401
    | PatchTeamIdGoalsGoalId403
    | PatchTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdGoalsGoalId>>,
    TError,
    { teamId: string; goalId: number; data: PatchTeamIdGoalsGoalIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdGoalsGoalId>>,
  TError,
  { teamId: string; goalId: number; data: PatchTeamIdGoalsGoalIdBody },
  TContext
> => {
  const mutationKey = ["patchTeamIdGoalsGoalId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdGoalsGoalId>>,
    { teamId: string; goalId: number; data: PatchTeamIdGoalsGoalIdBody }
  > = (props) => {
    const { teamId, goalId, data } = props ?? {};

    return patchTeamIdGoalsGoalId(teamId, goalId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdGoalsGoalIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdGoalsGoalId>>
>;
export type PatchTeamIdGoalsGoalIdMutationBody = PatchTeamIdGoalsGoalIdBody;
export type PatchTeamIdGoalsGoalIdMutationError =
  | PatchTeamIdGoalsGoalId400
  | PatchTeamIdGoalsGoalId401
  | PatchTeamIdGoalsGoalId403
  | PatchTeamIdGoalsGoalId404;

/**
 * @summary 목표 수정
 */
export const usePatchTeamIdGoalsGoalId = <
  TError =
    | PatchTeamIdGoalsGoalId400
    | PatchTeamIdGoalsGoalId401
    | PatchTeamIdGoalsGoalId403
    | PatchTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdGoalsGoalId>>,
    TError,
    { teamId: string; goalId: number; data: PatchTeamIdGoalsGoalIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdGoalsGoalId>>,
  TError,
  { teamId: string; goalId: number; data: PatchTeamIdGoalsGoalIdBody },
  TContext
> => {
  const mutationOptions = getPatchTeamIdGoalsGoalIdMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdGoalsGoalIdMutationOptions = <
  TError =
    | DeleteTeamIdGoalsGoalId401
    | DeleteTeamIdGoalsGoalId403
    | DeleteTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdGoalsGoalId>>,
    TError,
    { teamId: string; goalId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdGoalsGoalId>>,
  TError,
  { teamId: string; goalId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdGoalsGoalId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdGoalsGoalId>>,
    { teamId: string; goalId: number }
  > = (props) => {
    const { teamId, goalId } = props ?? {};

    return deleteTeamIdGoalsGoalId(teamId, goalId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdGoalsGoalIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdGoalsGoalId>>
>;

export type DeleteTeamIdGoalsGoalIdMutationError =
  | DeleteTeamIdGoalsGoalId401
  | DeleteTeamIdGoalsGoalId403
  | DeleteTeamIdGoalsGoalId404;

/**
 * @summary 목표 삭제
 */
export const useDeleteTeamIdGoalsGoalId = <
  TError =
    | DeleteTeamIdGoalsGoalId401
    | DeleteTeamIdGoalsGoalId403
    | DeleteTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdGoalsGoalId>>,
    TError,
    { teamId: string; goalId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdGoalsGoalId>>,
  TError,
  { teamId: string; goalId: number },
  TContext
> => {
  const mutationOptions = getDeleteTeamIdGoalsGoalIdMutationOptions(options);

  return useMutation(mutationOptions);
};
