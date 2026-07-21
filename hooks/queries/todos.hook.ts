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
  DeleteTeamIdTodosTodoId401,
  DeleteTeamIdTodosTodoId403,
  DeleteTeamIdTodosTodoId404,
  GetTeamIdTodos400,
  GetTeamIdTodos401,
  GetTeamIdTodosParams,
  GetTeamIdTodosTodoId401,
  GetTeamIdTodosTodoId403,
  GetTeamIdTodosTodoId404,
  PatchTeamIdTodosTodoId400,
  PatchTeamIdTodosTodoId401,
  PatchTeamIdTodosTodoId403,
  PatchTeamIdTodosTodoId404,
  PatchTeamIdTodosTodoIdBody,
  PostTeamIdTodos400,
  PostTeamIdTodos401,
  PostTeamIdTodos403,
  PostTeamIdTodos404,
  PostTeamIdTodosBody,
} from "@/apis/model";

import {
  getTeamIdTodos,
  postTeamIdTodos,
  getTeamIdTodosTodoId,
  patchTeamIdTodosTodoId,
  deleteTeamIdTodosTodoId,
} from "@/apis/todos/todos";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGetTeamIdTodosQueryKey = (
  teamId?: string,
  params?: GetTeamIdTodosParams,
) => {
  return [`/${teamId}/todos`, ...(params ? [params] : [])] as const;
};

export const getGetTeamIdTodosQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdTodos>>,
  TError = GetTeamIdTodos400 | GetTeamIdTodos401,
>(
  teamId: string,
  params?: GetTeamIdTodosParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdTodos>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdTodosQueryKey(teamId, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTeamIdTodos>>> = ({
    signal,
  }) => getTeamIdTodos(teamId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdTodos>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdTodosQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdTodos>>
>;
export type GetTeamIdTodosQueryError = GetTeamIdTodos400 | GetTeamIdTodos401;

/**
 * @summary 할 일 목록 조회
 */

export function useGetTeamIdTodos<
  TData = Awaited<ReturnType<typeof getTeamIdTodos>>,
  TError = GetTeamIdTodos400 | GetTeamIdTodos401,
>(
  teamId: string,
  params?: GetTeamIdTodosParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdTodos>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdTodosQueryOptions(teamId, params, options);

  const query = useQuery(queryOptions);

  return {
    ...query,

    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };
}

export const getPostTeamIdTodosMutationOptions = <
  TError =
    | PostTeamIdTodos400
    | PostTeamIdTodos401
    | PostTeamIdTodos403
    | PostTeamIdTodos404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdTodos>>,
    TError,
    { teamId: string; data: PostTeamIdTodosBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdTodos>>,
  TError,
  { teamId: string; data: PostTeamIdTodosBody },
  TContext
> => {
  const mutationKey = ["postTeamIdTodos"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdTodos>>,
    { teamId: string; data: PostTeamIdTodosBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdTodos(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdTodosMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdTodos>>
>;
export type PostTeamIdTodosMutationBody = PostTeamIdTodosBody;
export type PostTeamIdTodosMutationError =
  | PostTeamIdTodos400
  | PostTeamIdTodos401
  | PostTeamIdTodos403
  | PostTeamIdTodos404;

/**
 * @summary 할 일 생성
 */
export const usePostTeamIdTodos = <
  TError =
    | PostTeamIdTodos400
    | PostTeamIdTodos401
    | PostTeamIdTodos403
    | PostTeamIdTodos404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdTodos>>,
    TError,
    { teamId: string; data: PostTeamIdTodosBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdTodos>>,
  TError,
  { teamId: string; data: PostTeamIdTodosBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdTodosMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getGetTeamIdTodosTodoIdQueryKey = (
  teamId?: string,
  todoId?: number,
) => {
  return [`/${teamId}/todos/${todoId}`] as const;
};

export const getGetTeamIdTodosTodoIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdTodosTodoId>>,
  TError =
    GetTeamIdTodosTodoId401 | GetTeamIdTodosTodoId403 | GetTeamIdTodosTodoId404,
>(
  teamId: string,
  todoId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdTodosTodoId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdTodosTodoIdQueryKey(teamId, todoId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdTodosTodoId>>
  > = ({ signal }) =>
    getTeamIdTodosTodoId(teamId, todoId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!(teamId && todoId),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdTodosTodoId>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdTodosTodoIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdTodosTodoId>>
>;
export type GetTeamIdTodosTodoIdQueryError =
  GetTeamIdTodosTodoId401 | GetTeamIdTodosTodoId403 | GetTeamIdTodosTodoId404;

/**
 * @summary 할 일 상세 조회
 */

export function useGetTeamIdTodosTodoId<
  TData = Awaited<ReturnType<typeof getTeamIdTodosTodoId>>,
  TError =
    GetTeamIdTodosTodoId401 | GetTeamIdTodosTodoId403 | GetTeamIdTodosTodoId404,
>(
  teamId: string,
  todoId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdTodosTodoId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdTodosTodoIdQueryOptions(
    teamId,
    todoId,
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

export const getPatchTeamIdTodosTodoIdMutationOptions = <
  TError =
    | PatchTeamIdTodosTodoId400
    | PatchTeamIdTodosTodoId401
    | PatchTeamIdTodosTodoId403
    | PatchTeamIdTodosTodoId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdTodosTodoId>>,
    TError,
    { teamId: string; todoId: number; data: PatchTeamIdTodosTodoIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdTodosTodoId>>,
  TError,
  { teamId: string; todoId: number; data: PatchTeamIdTodosTodoIdBody },
  TContext
> => {
  const mutationKey = ["patchTeamIdTodosTodoId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdTodosTodoId>>,
    { teamId: string; todoId: number; data: PatchTeamIdTodosTodoIdBody }
  > = (props) => {
    const { teamId, todoId, data } = props ?? {};

    return patchTeamIdTodosTodoId(teamId, todoId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdTodosTodoIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdTodosTodoId>>
>;
export type PatchTeamIdTodosTodoIdMutationBody = PatchTeamIdTodosTodoIdBody;
export type PatchTeamIdTodosTodoIdMutationError =
  | PatchTeamIdTodosTodoId400
  | PatchTeamIdTodosTodoId401
  | PatchTeamIdTodosTodoId403
  | PatchTeamIdTodosTodoId404;

/**
 * @summary 할 일 수정
 */
export const usePatchTeamIdTodosTodoId = <
  TError =
    | PatchTeamIdTodosTodoId400
    | PatchTeamIdTodosTodoId401
    | PatchTeamIdTodosTodoId403
    | PatchTeamIdTodosTodoId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdTodosTodoId>>,
    TError,
    { teamId: string; todoId: number; data: PatchTeamIdTodosTodoIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdTodosTodoId>>,
  TError,
  { teamId: string; todoId: number; data: PatchTeamIdTodosTodoIdBody },
  TContext
> => {
  const mutationOptions = getPatchTeamIdTodosTodoIdMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdTodosTodoIdMutationOptions = <
  TError =
    | DeleteTeamIdTodosTodoId401
    | DeleteTeamIdTodosTodoId403
    | DeleteTeamIdTodosTodoId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdTodosTodoId>>,
    TError,
    { teamId: string; todoId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdTodosTodoId>>,
  TError,
  { teamId: string; todoId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdTodosTodoId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdTodosTodoId>>,
    { teamId: string; todoId: number }
  > = (props) => {
    const { teamId, todoId } = props ?? {};

    return deleteTeamIdTodosTodoId(teamId, todoId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdTodosTodoIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdTodosTodoId>>
>;

export type DeleteTeamIdTodosTodoIdMutationError =
  | DeleteTeamIdTodosTodoId401
  | DeleteTeamIdTodosTodoId403
  | DeleteTeamIdTodosTodoId404;

/**
 * @summary 할 일 삭제
 */
export const useDeleteTeamIdTodosTodoId = <
  TError =
    | DeleteTeamIdTodosTodoId401
    | DeleteTeamIdTodosTodoId403
    | DeleteTeamIdTodosTodoId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdTodosTodoId>>,
    TError,
    { teamId: string; todoId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdTodosTodoId>>,
  TError,
  { teamId: string; todoId: number },
  TContext
> => {
  const mutationOptions = getDeleteTeamIdTodosTodoIdMutationOptions(options);

  return useMutation(mutationOptions);
};
