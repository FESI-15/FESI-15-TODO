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
  DeleteTeamIdPostsPostId401,
  DeleteTeamIdPostsPostId403,
  DeleteTeamIdPostsPostId404,
  GetTeamIdPosts400,
  GetTeamIdPosts401,
  GetTeamIdPostsParams,
  GetTeamIdPostsPostId401,
  GetTeamIdPostsPostId404,
  PatchTeamIdPostsPostId400,
  PatchTeamIdPostsPostId401,
  PatchTeamIdPostsPostId403,
  PatchTeamIdPostsPostId404,
  PatchTeamIdPostsPostIdBody,
  PostTeamIdPosts400,
  PostTeamIdPosts401,
  PostTeamIdPostsBody,
} from "@/apis/model";

import {
  getTeamIdPosts,
  postTeamIdPosts,
  getTeamIdPostsPostId,
  patchTeamIdPostsPostId,
  deleteTeamIdPostsPostId,
} from "@/apis/posts/posts";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGetTeamIdPostsQueryKey = (
  teamId?: string,
  params?: GetTeamIdPostsParams,
) => {
  return [`/${teamId}/posts`, ...(params ? [params] : [])] as const;
};

export const getGetTeamIdPostsQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdPosts>>,
  TError = GetTeamIdPosts400 | GetTeamIdPosts401,
>(
  teamId: string,
  params?: GetTeamIdPostsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdPosts>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdPostsQueryKey(teamId, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTeamIdPosts>>> = ({
    signal,
  }) => getTeamIdPosts(teamId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdPosts>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdPostsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdPosts>>
>;
export type GetTeamIdPostsQueryError = GetTeamIdPosts400 | GetTeamIdPosts401;

/**
 * @summary 게시글 목록 조회
 */

export function useGetTeamIdPosts<
  TData = Awaited<ReturnType<typeof getTeamIdPosts>>,
  TError = GetTeamIdPosts400 | GetTeamIdPosts401,
>(
  teamId: string,
  params?: GetTeamIdPostsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdPosts>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdPostsQueryOptions(teamId, params, options);

  const query = useQuery(queryOptions);

  return {
    ...query,

    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };
}

export const getPostTeamIdPostsMutationOptions = <
  TError = PostTeamIdPosts400 | PostTeamIdPosts401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdPosts>>,
    TError,
    { teamId: string; data: PostTeamIdPostsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdPosts>>,
  TError,
  { teamId: string; data: PostTeamIdPostsBody },
  TContext
> => {
  const mutationKey = ["postTeamIdPosts"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdPosts>>,
    { teamId: string; data: PostTeamIdPostsBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdPosts(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdPostsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdPosts>>
>;
export type PostTeamIdPostsMutationBody = PostTeamIdPostsBody;
export type PostTeamIdPostsMutationError =
  PostTeamIdPosts400 | PostTeamIdPosts401;

/**
 * @summary 게시글 생성
 */
export const usePostTeamIdPosts = <
  TError = PostTeamIdPosts400 | PostTeamIdPosts401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdPosts>>,
    TError,
    { teamId: string; data: PostTeamIdPostsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdPosts>>,
  TError,
  { teamId: string; data: PostTeamIdPostsBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdPostsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getGetTeamIdPostsPostIdQueryKey = (
  teamId?: string,
  postId?: number,
) => {
  return [`/${teamId}/posts/${postId}`] as const;
};

export const getGetTeamIdPostsPostIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdPostsPostId>>,
  TError = GetTeamIdPostsPostId401 | GetTeamIdPostsPostId404,
>(
  teamId: string,
  postId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdPostsPostId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdPostsPostIdQueryKey(teamId, postId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdPostsPostId>>
  > = ({ signal }) =>
    getTeamIdPostsPostId(teamId, postId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!(teamId && postId),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdPostsPostId>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdPostsPostIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdPostsPostId>>
>;
export type GetTeamIdPostsPostIdQueryError =
  GetTeamIdPostsPostId401 | GetTeamIdPostsPostId404;

/**
 * @summary 게시글 상세 조회
 */

export function useGetTeamIdPostsPostId<
  TData = Awaited<ReturnType<typeof getTeamIdPostsPostId>>,
  TError = GetTeamIdPostsPostId401 | GetTeamIdPostsPostId404,
>(
  teamId: string,
  postId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdPostsPostId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdPostsPostIdQueryOptions(
    teamId,
    postId,
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

export const getPatchTeamIdPostsPostIdMutationOptions = <
  TError =
    | PatchTeamIdPostsPostId400
    | PatchTeamIdPostsPostId401
    | PatchTeamIdPostsPostId403
    | PatchTeamIdPostsPostId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdPostsPostId>>,
    TError,
    { teamId: string; postId: number; data: PatchTeamIdPostsPostIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdPostsPostId>>,
  TError,
  { teamId: string; postId: number; data: PatchTeamIdPostsPostIdBody },
  TContext
> => {
  const mutationKey = ["patchTeamIdPostsPostId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdPostsPostId>>,
    { teamId: string; postId: number; data: PatchTeamIdPostsPostIdBody }
  > = (props) => {
    const { teamId, postId, data } = props ?? {};

    return patchTeamIdPostsPostId(teamId, postId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdPostsPostIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdPostsPostId>>
>;
export type PatchTeamIdPostsPostIdMutationBody = PatchTeamIdPostsPostIdBody;
export type PatchTeamIdPostsPostIdMutationError =
  | PatchTeamIdPostsPostId400
  | PatchTeamIdPostsPostId401
  | PatchTeamIdPostsPostId403
  | PatchTeamIdPostsPostId404;

/**
 * @summary 게시글 수정
 */
export const usePatchTeamIdPostsPostId = <
  TError =
    | PatchTeamIdPostsPostId400
    | PatchTeamIdPostsPostId401
    | PatchTeamIdPostsPostId403
    | PatchTeamIdPostsPostId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdPostsPostId>>,
    TError,
    { teamId: string; postId: number; data: PatchTeamIdPostsPostIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdPostsPostId>>,
  TError,
  { teamId: string; postId: number; data: PatchTeamIdPostsPostIdBody },
  TContext
> => {
  const mutationOptions = getPatchTeamIdPostsPostIdMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdPostsPostIdMutationOptions = <
  TError =
    | DeleteTeamIdPostsPostId401
    | DeleteTeamIdPostsPostId403
    | DeleteTeamIdPostsPostId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostId>>,
    TError,
    { teamId: string; postId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdPostsPostId>>,
  TError,
  { teamId: string; postId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdPostsPostId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostId>>,
    { teamId: string; postId: number }
  > = (props) => {
    const { teamId, postId } = props ?? {};

    return deleteTeamIdPostsPostId(teamId, postId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdPostsPostIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdPostsPostId>>
>;

export type DeleteTeamIdPostsPostIdMutationError =
  | DeleteTeamIdPostsPostId401
  | DeleteTeamIdPostsPostId403
  | DeleteTeamIdPostsPostId404;

/**
 * @summary 게시글 삭제
 */
export const useDeleteTeamIdPostsPostId = <
  TError =
    | DeleteTeamIdPostsPostId401
    | DeleteTeamIdPostsPostId403
    | DeleteTeamIdPostsPostId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostId>>,
    TError,
    { teamId: string; postId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdPostsPostId>>,
  TError,
  { teamId: string; postId: number },
  TContext
> => {
  const mutationOptions = getDeleteTeamIdPostsPostIdMutationOptions(options);

  return useMutation(mutationOptions);
};
