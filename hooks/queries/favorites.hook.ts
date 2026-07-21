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
  DeleteTeamIdTodosTodoIdFavorites400,
  DeleteTeamIdTodosTodoIdFavorites401,
  DeleteTeamIdTodosTodoIdFavorites404,
  GetTeamIdTodosFavorites400,
  GetTeamIdTodosFavorites401,
  GetTeamIdTodosFavoritesParams,
  PostTeamIdTodosTodoIdFavorites400,
  PostTeamIdTodosTodoIdFavorites401,
  PostTeamIdTodosTodoIdFavorites403,
  PostTeamIdTodosTodoIdFavorites404,
  PostTeamIdTodosTodoIdFavorites409,
} from "@/apis/model";

import {
  postTeamIdTodosTodoIdFavorites,
  deleteTeamIdTodosTodoIdFavorites,
  getTeamIdTodosFavorites,
} from "@/apis/favorites/favorites";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getPostTeamIdTodosTodoIdFavoritesMutationOptions = <
  TError =
    | PostTeamIdTodosTodoIdFavorites400
    | PostTeamIdTodosTodoIdFavorites401
    | PostTeamIdTodosTodoIdFavorites403
    | PostTeamIdTodosTodoIdFavorites404
    | PostTeamIdTodosTodoIdFavorites409,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdTodosTodoIdFavorites>>,
    TError,
    { teamId: string; todoId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdTodosTodoIdFavorites>>,
  TError,
  { teamId: string; todoId: number },
  TContext
> => {
  const mutationKey = ["postTeamIdTodosTodoIdFavorites"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdTodosTodoIdFavorites>>,
    { teamId: string; todoId: number }
  > = (props) => {
    const { teamId, todoId } = props ?? {};

    return postTeamIdTodosTodoIdFavorites(teamId, todoId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdTodosTodoIdFavoritesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdTodosTodoIdFavorites>>
>;

export type PostTeamIdTodosTodoIdFavoritesMutationError =
  | PostTeamIdTodosTodoIdFavorites400
  | PostTeamIdTodosTodoIdFavorites401
  | PostTeamIdTodosTodoIdFavorites403
  | PostTeamIdTodosTodoIdFavorites404
  | PostTeamIdTodosTodoIdFavorites409;

/**
 * @summary 할 일 찜하기
 */
export const usePostTeamIdTodosTodoIdFavorites = <
  TError =
    | PostTeamIdTodosTodoIdFavorites400
    | PostTeamIdTodosTodoIdFavorites401
    | PostTeamIdTodosTodoIdFavorites403
    | PostTeamIdTodosTodoIdFavorites404
    | PostTeamIdTodosTodoIdFavorites409,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdTodosTodoIdFavorites>>,
    TError,
    { teamId: string; todoId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdTodosTodoIdFavorites>>,
  TError,
  { teamId: string; todoId: number },
  TContext
> => {
  const mutationOptions =
    getPostTeamIdTodosTodoIdFavoritesMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdTodosTodoIdFavoritesMutationOptions = <
  TError =
    | DeleteTeamIdTodosTodoIdFavorites400
    | DeleteTeamIdTodosTodoIdFavorites401
    | DeleteTeamIdTodosTodoIdFavorites404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdTodosTodoIdFavorites>>,
    TError,
    { teamId: string; todoId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdTodosTodoIdFavorites>>,
  TError,
  { teamId: string; todoId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdTodosTodoIdFavorites"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdTodosTodoIdFavorites>>,
    { teamId: string; todoId: number }
  > = (props) => {
    const { teamId, todoId } = props ?? {};

    return deleteTeamIdTodosTodoIdFavorites(teamId, todoId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdTodosTodoIdFavoritesMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdTodosTodoIdFavorites>>
>;

export type DeleteTeamIdTodosTodoIdFavoritesMutationError =
  | DeleteTeamIdTodosTodoIdFavorites400
  | DeleteTeamIdTodosTodoIdFavorites401
  | DeleteTeamIdTodosTodoIdFavorites404;

/**
 * @summary 찜 해제
 */
export const useDeleteTeamIdTodosTodoIdFavorites = <
  TError =
    | DeleteTeamIdTodosTodoIdFavorites400
    | DeleteTeamIdTodosTodoIdFavorites401
    | DeleteTeamIdTodosTodoIdFavorites404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdTodosTodoIdFavorites>>,
    TError,
    { teamId: string; todoId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdTodosTodoIdFavorites>>,
  TError,
  { teamId: string; todoId: number },
  TContext
> => {
  const mutationOptions =
    getDeleteTeamIdTodosTodoIdFavoritesMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getGetTeamIdTodosFavoritesQueryKey = (
  teamId?: string,
  params?: GetTeamIdTodosFavoritesParams,
) => {
  return [`/${teamId}/todos/favorites`, ...(params ? [params] : [])] as const;
};

export const getGetTeamIdTodosFavoritesQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdTodosFavorites>>,
  TError = GetTeamIdTodosFavorites400 | GetTeamIdTodosFavorites401,
>(
  teamId: string,
  params?: GetTeamIdTodosFavoritesParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdTodosFavorites>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetTeamIdTodosFavoritesQueryKey(teamId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdTodosFavorites>>
  > = ({ signal }) =>
    getTeamIdTodosFavorites(teamId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdTodosFavorites>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdTodosFavoritesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdTodosFavorites>>
>;
export type GetTeamIdTodosFavoritesQueryError =
  GetTeamIdTodosFavorites400 | GetTeamIdTodosFavorites401;

/**
 * @summary 찜한 할 일 목록 조회
 */

export function useGetTeamIdTodosFavorites<
  TData = Awaited<ReturnType<typeof getTeamIdTodosFavorites>>,
  TError = GetTeamIdTodosFavorites400 | GetTeamIdTodosFavorites401,
>(
  teamId: string,
  params?: GetTeamIdTodosFavoritesParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdTodosFavorites>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdTodosFavoritesQueryOptions(
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
