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
  PostTeamIdGoals400,
  PostTeamIdGoals401,
} from "@/apis/model";
import type {
  GoalIdVariables,
  PatchGoalVariables,
  PostGoalsVariables,
} from "@/apis/goals/goalsBff";
import {
  deleteGoal,
  getGoal,
  getGoals,
  patchGoal,
  postGoals,
} from "@/apis/goals/goalsBff";
import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGoalsQueryKey = (params?: GetTeamIdGoalsParams) => {
  return ["/api/goals", ...(params ? [params] : [])] as const;
};

export const getGoalsQueryOptions = <
  TData = Awaited<ReturnType<typeof getGoals>>,
  TError = GetTeamIdGoals400 | GetTeamIdGoals401,
>(
  params?: GetTeamIdGoalsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getGoals>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof bffInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGoalsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getGoals>>> = ({
    signal,
  }) => getGoals(params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof getGoals>>, TError, TData> & {
    queryKey: QueryKey;
  };
};

export function useGetGoals<
  TData = Awaited<ReturnType<typeof getGoals>>,
  TError = GetTeamIdGoals400 | GetTeamIdGoals401,
>(
  params?: GetTeamIdGoalsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getGoals>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof bffInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGoalsQueryOptions(params, options);
  const query = useQuery(queryOptions);

  return {
    ...query,
    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & { queryKey: QueryKey };
}

export const getGoalQueryKey = (goalId?: number) => {
  return [`/api/goals/${goalId}`] as const;
};

export const getGoalQueryOptions = <
  TData = Awaited<ReturnType<typeof getGoal>>,
  TError =
    GetTeamIdGoalsGoalId401 | GetTeamIdGoalsGoalId403 | GetTeamIdGoalsGoalId404,
>(
  goalId: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getGoal>>, TError, TData>;
    request?: SecondParameter<typeof bffInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGoalQueryKey(goalId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getGoal>>> = ({
    signal,
  }) => getGoal({ goalId }, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!goalId,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof getGoal>>, TError, TData> & {
    queryKey: QueryKey;
  };
};

export function useGetGoal<
  TData = Awaited<ReturnType<typeof getGoal>>,
  TError =
    GetTeamIdGoalsGoalId401 | GetTeamIdGoalsGoalId403 | GetTeamIdGoalsGoalId404,
>(
  goalId: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getGoal>>, TError, TData>;
    request?: SecondParameter<typeof bffInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGoalQueryOptions(goalId, options);
  const query = useQuery(queryOptions);

  return {
    ...query,
    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & { queryKey: QueryKey };
}

export const getPostGoalsMutationOptions = <
  TError = PostTeamIdGoals400 | PostTeamIdGoals401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postGoals>>,
    TError,
    PostGoalsVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postGoals>>,
  TError,
  PostGoalsVariables,
  TContext
> => {
  const mutationKey = ["postGoals"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postGoals>>,
    PostGoalsVariables
  > = (variables) => postGoals(variables, requestOptions);

  return { mutationFn, ...mutationOptions };
};

export const usePostGoals = <
  TError = PostTeamIdGoals400 | PostTeamIdGoals401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postGoals>>,
    TError,
    PostGoalsVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postGoals>>,
  TError,
  PostGoalsVariables,
  TContext
> => {
  const mutationOptions = getPostGoalsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPatchGoalMutationOptions = <
  TError =
    | PatchTeamIdGoalsGoalId400
    | PatchTeamIdGoalsGoalId401
    | PatchTeamIdGoalsGoalId403
    | PatchTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchGoal>>,
    TError,
    PatchGoalVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchGoal>>,
  TError,
  PatchGoalVariables,
  TContext
> => {
  const mutationKey = ["patchGoal"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchGoal>>,
    PatchGoalVariables
  > = (variables) => patchGoal(variables, requestOptions);

  return { mutationFn, ...mutationOptions };
};

export const usePatchGoal = <
  TError =
    | PatchTeamIdGoalsGoalId400
    | PatchTeamIdGoalsGoalId401
    | PatchTeamIdGoalsGoalId403
    | PatchTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchGoal>>,
    TError,
    PatchGoalVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchGoal>>,
  TError,
  PatchGoalVariables,
  TContext
> => {
  const mutationOptions = getPatchGoalMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteGoalMutationOptions = <
  TError =
    | DeleteTeamIdGoalsGoalId401
    | DeleteTeamIdGoalsGoalId403
    | DeleteTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteGoal>>,
    TError,
    GoalIdVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteGoal>>,
  TError,
  GoalIdVariables,
  TContext
> => {
  const mutationKey = ["deleteGoal"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteGoal>>,
    GoalIdVariables
  > = (variables) => deleteGoal(variables, requestOptions);

  return { mutationFn, ...mutationOptions };
};

export const useDeleteGoal = <
  TError =
    | DeleteTeamIdGoalsGoalId401
    | DeleteTeamIdGoalsGoalId403
    | DeleteTeamIdGoalsGoalId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteGoal>>,
    TError,
    GoalIdVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteGoal>>,
  TError,
  GoalIdVariables,
  TContext
> => {
  const mutationOptions = getDeleteGoalMutationOptions(options);

  return useMutation(mutationOptions);
};
