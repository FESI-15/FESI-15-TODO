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
  DeleteTeamIdPostsPostIdCommentsCommentId401,
  DeleteTeamIdPostsPostIdCommentsCommentId403,
  DeleteTeamIdPostsPostIdCommentsCommentId404,
  DeleteTeamIdPostsPostIdCommentsCommentIdLikes401,
  DeleteTeamIdPostsPostIdCommentsCommentIdLikes404,
  GetTeamIdPostsPostIdComments400,
  GetTeamIdPostsPostIdComments401,
  GetTeamIdPostsPostIdComments404,
  GetTeamIdPostsPostIdCommentsParams,
  PatchTeamIdPostsPostIdCommentsCommentId400,
  PatchTeamIdPostsPostIdCommentsCommentId401,
  PatchTeamIdPostsPostIdCommentsCommentId403,
  PatchTeamIdPostsPostIdCommentsCommentId404,
  PatchTeamIdPostsPostIdCommentsCommentIdBody,
  PostTeamIdPostsPostIdComments400,
  PostTeamIdPostsPostIdComments401,
  PostTeamIdPostsPostIdComments404,
  PostTeamIdPostsPostIdCommentsBody,
  PostTeamIdPostsPostIdCommentsCommentIdLikes401,
  PostTeamIdPostsPostIdCommentsCommentIdLikes404,
} from "@/apis/model";

import {
  getTeamIdPostsPostIdComments,
  postTeamIdPostsPostIdComments,
  patchTeamIdPostsPostIdCommentsCommentId,
  deleteTeamIdPostsPostIdCommentsCommentId,
  postTeamIdPostsPostIdCommentsCommentIdLikes,
  deleteTeamIdPostsPostIdCommentsCommentIdLikes,
} from "@/apis/comments/comments";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGetTeamIdPostsPostIdCommentsQueryKey = (
  teamId?: string,
  postId?: number,
  params?: GetTeamIdPostsPostIdCommentsParams,
) => {
  return [
    `/${teamId}/posts/${postId}/comments`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetTeamIdPostsPostIdCommentsQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdPostsPostIdComments>>,
  TError =
    | GetTeamIdPostsPostIdComments400
    | GetTeamIdPostsPostIdComments401
    | GetTeamIdPostsPostIdComments404,
>(
  teamId: string,
  postId: number,
  params?: GetTeamIdPostsPostIdCommentsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdPostsPostIdComments>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetTeamIdPostsPostIdCommentsQueryKey(teamId, postId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdPostsPostIdComments>>
  > = ({ signal }) =>
    getTeamIdPostsPostIdComments(
      teamId,
      postId,
      params,
      requestOptions,
      signal,
    );

  return {
    queryKey,
    queryFn,
    enabled: !!(teamId && postId),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdPostsPostIdComments>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdPostsPostIdCommentsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdPostsPostIdComments>>
>;
export type GetTeamIdPostsPostIdCommentsQueryError =
  | GetTeamIdPostsPostIdComments400
  | GetTeamIdPostsPostIdComments401
  | GetTeamIdPostsPostIdComments404;

/**
 * @summary 댓글 목록 조회
 */

export function useGetTeamIdPostsPostIdComments<
  TData = Awaited<ReturnType<typeof getTeamIdPostsPostIdComments>>,
  TError =
    | GetTeamIdPostsPostIdComments400
    | GetTeamIdPostsPostIdComments401
    | GetTeamIdPostsPostIdComments404,
>(
  teamId: string,
  postId: number,
  params?: GetTeamIdPostsPostIdCommentsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdPostsPostIdComments>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdPostsPostIdCommentsQueryOptions(
    teamId,
    postId,
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

export const getPostTeamIdPostsPostIdCommentsMutationOptions = <
  TError =
    | PostTeamIdPostsPostIdComments400
    | PostTeamIdPostsPostIdComments401
    | PostTeamIdPostsPostIdComments404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdPostsPostIdComments>>,
    TError,
    { teamId: string; postId: number; data: PostTeamIdPostsPostIdCommentsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdPostsPostIdComments>>,
  TError,
  { teamId: string; postId: number; data: PostTeamIdPostsPostIdCommentsBody },
  TContext
> => {
  const mutationKey = ["postTeamIdPostsPostIdComments"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdPostsPostIdComments>>,
    { teamId: string; postId: number; data: PostTeamIdPostsPostIdCommentsBody }
  > = (props) => {
    const { teamId, postId, data } = props ?? {};

    return postTeamIdPostsPostIdComments(teamId, postId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdPostsPostIdCommentsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdPostsPostIdComments>>
>;
export type PostTeamIdPostsPostIdCommentsMutationBody =
  PostTeamIdPostsPostIdCommentsBody;
export type PostTeamIdPostsPostIdCommentsMutationError =
  | PostTeamIdPostsPostIdComments400
  | PostTeamIdPostsPostIdComments401
  | PostTeamIdPostsPostIdComments404;

/**
 * @summary 댓글 생성
 */
export const usePostTeamIdPostsPostIdComments = <
  TError =
    | PostTeamIdPostsPostIdComments400
    | PostTeamIdPostsPostIdComments401
    | PostTeamIdPostsPostIdComments404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdPostsPostIdComments>>,
    TError,
    { teamId: string; postId: number; data: PostTeamIdPostsPostIdCommentsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdPostsPostIdComments>>,
  TError,
  { teamId: string; postId: number; data: PostTeamIdPostsPostIdCommentsBody },
  TContext
> => {
  const mutationOptions =
    getPostTeamIdPostsPostIdCommentsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPatchTeamIdPostsPostIdCommentsCommentIdMutationOptions = <
  TError =
    | PatchTeamIdPostsPostIdCommentsCommentId400
    | PatchTeamIdPostsPostIdCommentsCommentId401
    | PatchTeamIdPostsPostIdCommentsCommentId403
    | PatchTeamIdPostsPostIdCommentsCommentId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdPostsPostIdCommentsCommentId>>,
    TError,
    {
      teamId: string;
      postId: number;
      commentId: number;
      data: PatchTeamIdPostsPostIdCommentsCommentIdBody;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdPostsPostIdCommentsCommentId>>,
  TError,
  {
    teamId: string;
    postId: number;
    commentId: number;
    data: PatchTeamIdPostsPostIdCommentsCommentIdBody;
  },
  TContext
> => {
  const mutationKey = ["patchTeamIdPostsPostIdCommentsCommentId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdPostsPostIdCommentsCommentId>>,
    {
      teamId: string;
      postId: number;
      commentId: number;
      data: PatchTeamIdPostsPostIdCommentsCommentIdBody;
    }
  > = (props) => {
    const { teamId, postId, commentId, data } = props ?? {};

    return patchTeamIdPostsPostIdCommentsCommentId(
      teamId,
      postId,
      commentId,
      data,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdPostsPostIdCommentsCommentIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdPostsPostIdCommentsCommentId>>
>;
export type PatchTeamIdPostsPostIdCommentsCommentIdMutationBody =
  PatchTeamIdPostsPostIdCommentsCommentIdBody;
export type PatchTeamIdPostsPostIdCommentsCommentIdMutationError =
  | PatchTeamIdPostsPostIdCommentsCommentId400
  | PatchTeamIdPostsPostIdCommentsCommentId401
  | PatchTeamIdPostsPostIdCommentsCommentId403
  | PatchTeamIdPostsPostIdCommentsCommentId404;

/**
 * @summary 댓글 수정
 */
export const usePatchTeamIdPostsPostIdCommentsCommentId = <
  TError =
    | PatchTeamIdPostsPostIdCommentsCommentId400
    | PatchTeamIdPostsPostIdCommentsCommentId401
    | PatchTeamIdPostsPostIdCommentsCommentId403
    | PatchTeamIdPostsPostIdCommentsCommentId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdPostsPostIdCommentsCommentId>>,
    TError,
    {
      teamId: string;
      postId: number;
      commentId: number;
      data: PatchTeamIdPostsPostIdCommentsCommentIdBody;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdPostsPostIdCommentsCommentId>>,
  TError,
  {
    teamId: string;
    postId: number;
    commentId: number;
    data: PatchTeamIdPostsPostIdCommentsCommentIdBody;
  },
  TContext
> => {
  const mutationOptions =
    getPatchTeamIdPostsPostIdCommentsCommentIdMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdPostsPostIdCommentsCommentIdMutationOptions = <
  TError =
    | DeleteTeamIdPostsPostIdCommentsCommentId401
    | DeleteTeamIdPostsPostIdCommentsCommentId403
    | DeleteTeamIdPostsPostIdCommentsCommentId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentId>>,
    TError,
    { teamId: string; postId: number; commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentId>>,
  TError,
  { teamId: string; postId: number; commentId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdPostsPostIdCommentsCommentId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentId>>,
    { teamId: string; postId: number; commentId: number }
  > = (props) => {
    const { teamId, postId, commentId } = props ?? {};

    return deleteTeamIdPostsPostIdCommentsCommentId(
      teamId,
      postId,
      commentId,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdPostsPostIdCommentsCommentIdMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentId>>
  >;

export type DeleteTeamIdPostsPostIdCommentsCommentIdMutationError =
  | DeleteTeamIdPostsPostIdCommentsCommentId401
  | DeleteTeamIdPostsPostIdCommentsCommentId403
  | DeleteTeamIdPostsPostIdCommentsCommentId404;

/**
 * @summary 댓글 삭제
 */
export const useDeleteTeamIdPostsPostIdCommentsCommentId = <
  TError =
    | DeleteTeamIdPostsPostIdCommentsCommentId401
    | DeleteTeamIdPostsPostIdCommentsCommentId403
    | DeleteTeamIdPostsPostIdCommentsCommentId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentId>>,
    TError,
    { teamId: string; postId: number; commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentId>>,
  TError,
  { teamId: string; postId: number; commentId: number },
  TContext
> => {
  const mutationOptions =
    getDeleteTeamIdPostsPostIdCommentsCommentIdMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPostTeamIdPostsPostIdCommentsCommentIdLikesMutationOptions = <
  TError =
    | PostTeamIdPostsPostIdCommentsCommentIdLikes401
    | PostTeamIdPostsPostIdCommentsCommentIdLikes404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdPostsPostIdCommentsCommentIdLikes>>,
    TError,
    { teamId: string; postId: number; commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdPostsPostIdCommentsCommentIdLikes>>,
  TError,
  { teamId: string; postId: number; commentId: number },
  TContext
> => {
  const mutationKey = ["postTeamIdPostsPostIdCommentsCommentIdLikes"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdPostsPostIdCommentsCommentIdLikes>>,
    { teamId: string; postId: number; commentId: number }
  > = (props) => {
    const { teamId, postId, commentId } = props ?? {};

    return postTeamIdPostsPostIdCommentsCommentIdLikes(
      teamId,
      postId,
      commentId,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdPostsPostIdCommentsCommentIdLikesMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof postTeamIdPostsPostIdCommentsCommentIdLikes>>
  >;

export type PostTeamIdPostsPostIdCommentsCommentIdLikesMutationError =
  | PostTeamIdPostsPostIdCommentsCommentIdLikes401
  | PostTeamIdPostsPostIdCommentsCommentIdLikes404;

/**
 * @summary 댓글 좋아요
 */
export const usePostTeamIdPostsPostIdCommentsCommentIdLikes = <
  TError =
    | PostTeamIdPostsPostIdCommentsCommentIdLikes401
    | PostTeamIdPostsPostIdCommentsCommentIdLikes404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdPostsPostIdCommentsCommentIdLikes>>,
    TError,
    { teamId: string; postId: number; commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdPostsPostIdCommentsCommentIdLikes>>,
  TError,
  { teamId: string; postId: number; commentId: number },
  TContext
> => {
  const mutationOptions =
    getPostTeamIdPostsPostIdCommentsCommentIdLikesMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdPostsPostIdCommentsCommentIdLikesMutationOptions = <
  TError =
    | DeleteTeamIdPostsPostIdCommentsCommentIdLikes401
    | DeleteTeamIdPostsPostIdCommentsCommentIdLikes404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentIdLikes>>,
    TError,
    { teamId: string; postId: number; commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentIdLikes>>,
  TError,
  { teamId: string; postId: number; commentId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdPostsPostIdCommentsCommentIdLikes"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentIdLikes>>,
    { teamId: string; postId: number; commentId: number }
  > = (props) => {
    const { teamId, postId, commentId } = props ?? {};

    return deleteTeamIdPostsPostIdCommentsCommentIdLikes(
      teamId,
      postId,
      commentId,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdPostsPostIdCommentsCommentIdLikesMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentIdLikes>>
  >;

export type DeleteTeamIdPostsPostIdCommentsCommentIdLikesMutationError =
  | DeleteTeamIdPostsPostIdCommentsCommentIdLikes401
  | DeleteTeamIdPostsPostIdCommentsCommentIdLikes404;

/**
 * @summary 댓글 좋아요 취소
 */
export const useDeleteTeamIdPostsPostIdCommentsCommentIdLikes = <
  TError =
    | DeleteTeamIdPostsPostIdCommentsCommentIdLikes401
    | DeleteTeamIdPostsPostIdCommentsCommentIdLikes404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentIdLikes>>,
    TError,
    { teamId: string; postId: number; commentId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdPostsPostIdCommentsCommentIdLikes>>,
  TError,
  { teamId: string; postId: number; commentId: number },
  TContext
> => {
  const mutationOptions =
    getDeleteTeamIdPostsPostIdCommentsCommentIdLikesMutationOptions(options);

  return useMutation(mutationOptions);
};
