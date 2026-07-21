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
  DeleteTeamIdNotesNoteId401,
  DeleteTeamIdNotesNoteId403,
  DeleteTeamIdNotesNoteId404,
  GetTeamIdNotes400,
  GetTeamIdNotes401,
  GetTeamIdNotesNoteId401,
  GetTeamIdNotesNoteId403,
  GetTeamIdNotesNoteId404,
  GetTeamIdNotesParams,
  PatchTeamIdNotesNoteId400,
  PatchTeamIdNotesNoteId401,
  PatchTeamIdNotesNoteId403,
  PatchTeamIdNotesNoteId404,
  PatchTeamIdNotesNoteIdBody,
  PostTeamIdNotes400,
  PostTeamIdNotes401,
  PostTeamIdNotes403,
  PostTeamIdNotes404,
  PostTeamIdNotesBody,
} from "@/apis/model";

import {
  getTeamIdNotes,
  postTeamIdNotes,
  getTeamIdNotesNoteId,
  patchTeamIdNotesNoteId,
  deleteTeamIdNotesNoteId,
} from "@/apis/notes/notes";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGetTeamIdNotesQueryKey = (
  teamId?: string,
  params?: GetTeamIdNotesParams,
) => {
  return [`/${teamId}/notes`, ...(params ? [params] : [])] as const;
};

export const getGetTeamIdNotesQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdNotes>>,
  TError = GetTeamIdNotes400 | GetTeamIdNotes401,
>(
  teamId: string,
  params?: GetTeamIdNotesParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdNotes>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdNotesQueryKey(teamId, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getTeamIdNotes>>> = ({
    signal,
  }) => getTeamIdNotes(teamId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdNotes>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdNotesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdNotes>>
>;
export type GetTeamIdNotesQueryError = GetTeamIdNotes400 | GetTeamIdNotes401;

/**
 * @summary 노트 목록 조회
 */

export function useGetTeamIdNotes<
  TData = Awaited<ReturnType<typeof getTeamIdNotes>>,
  TError = GetTeamIdNotes400 | GetTeamIdNotes401,
>(
  teamId: string,
  params?: GetTeamIdNotesParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdNotes>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdNotesQueryOptions(teamId, params, options);

  const query = useQuery(queryOptions);

  return {
    ...query,

    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };
}

export const getPostTeamIdNotesMutationOptions = <
  TError =
    | PostTeamIdNotes400
    | PostTeamIdNotes401
    | PostTeamIdNotes403
    | PostTeamIdNotes404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdNotes>>,
    TError,
    { teamId: string; data: PostTeamIdNotesBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdNotes>>,
  TError,
  { teamId: string; data: PostTeamIdNotesBody },
  TContext
> => {
  const mutationKey = ["postTeamIdNotes"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdNotes>>,
    { teamId: string; data: PostTeamIdNotesBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdNotes(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdNotesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdNotes>>
>;
export type PostTeamIdNotesMutationBody = PostTeamIdNotesBody;
export type PostTeamIdNotesMutationError =
  | PostTeamIdNotes400
  | PostTeamIdNotes401
  | PostTeamIdNotes403
  | PostTeamIdNotes404;

/**
 * @summary 노트 생성
 */
export const usePostTeamIdNotes = <
  TError =
    | PostTeamIdNotes400
    | PostTeamIdNotes401
    | PostTeamIdNotes403
    | PostTeamIdNotes404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdNotes>>,
    TError,
    { teamId: string; data: PostTeamIdNotesBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdNotes>>,
  TError,
  { teamId: string; data: PostTeamIdNotesBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdNotesMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getGetTeamIdNotesNoteIdQueryKey = (
  teamId?: string,
  noteId?: number,
) => {
  return [`/${teamId}/notes/${noteId}`] as const;
};

export const getGetTeamIdNotesNoteIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdNotesNoteId>>,
  TError =
    GetTeamIdNotesNoteId401 | GetTeamIdNotesNoteId403 | GetTeamIdNotesNoteId404,
>(
  teamId: string,
  noteId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdNotesNoteId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdNotesNoteIdQueryKey(teamId, noteId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdNotesNoteId>>
  > = ({ signal }) =>
    getTeamIdNotesNoteId(teamId, noteId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!(teamId && noteId),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdNotesNoteId>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdNotesNoteIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdNotesNoteId>>
>;
export type GetTeamIdNotesNoteIdQueryError =
  GetTeamIdNotesNoteId401 | GetTeamIdNotesNoteId403 | GetTeamIdNotesNoteId404;

/**
 * @summary 노트 상세 조회
 */

export function useGetTeamIdNotesNoteId<
  TData = Awaited<ReturnType<typeof getTeamIdNotesNoteId>>,
  TError =
    GetTeamIdNotesNoteId401 | GetTeamIdNotesNoteId403 | GetTeamIdNotesNoteId404,
>(
  teamId: string,
  noteId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdNotesNoteId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdNotesNoteIdQueryOptions(
    teamId,
    noteId,
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

export const getPatchTeamIdNotesNoteIdMutationOptions = <
  TError =
    | PatchTeamIdNotesNoteId400
    | PatchTeamIdNotesNoteId401
    | PatchTeamIdNotesNoteId403
    | PatchTeamIdNotesNoteId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdNotesNoteId>>,
    TError,
    { teamId: string; noteId: number; data: PatchTeamIdNotesNoteIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdNotesNoteId>>,
  TError,
  { teamId: string; noteId: number; data: PatchTeamIdNotesNoteIdBody },
  TContext
> => {
  const mutationKey = ["patchTeamIdNotesNoteId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdNotesNoteId>>,
    { teamId: string; noteId: number; data: PatchTeamIdNotesNoteIdBody }
  > = (props) => {
    const { teamId, noteId, data } = props ?? {};

    return patchTeamIdNotesNoteId(teamId, noteId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdNotesNoteIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdNotesNoteId>>
>;
export type PatchTeamIdNotesNoteIdMutationBody = PatchTeamIdNotesNoteIdBody;
export type PatchTeamIdNotesNoteIdMutationError =
  | PatchTeamIdNotesNoteId400
  | PatchTeamIdNotesNoteId401
  | PatchTeamIdNotesNoteId403
  | PatchTeamIdNotesNoteId404;

/**
 * @summary 노트 수정
 */
export const usePatchTeamIdNotesNoteId = <
  TError =
    | PatchTeamIdNotesNoteId400
    | PatchTeamIdNotesNoteId401
    | PatchTeamIdNotesNoteId403
    | PatchTeamIdNotesNoteId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdNotesNoteId>>,
    TError,
    { teamId: string; noteId: number; data: PatchTeamIdNotesNoteIdBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdNotesNoteId>>,
  TError,
  { teamId: string; noteId: number; data: PatchTeamIdNotesNoteIdBody },
  TContext
> => {
  const mutationOptions = getPatchTeamIdNotesNoteIdMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdNotesNoteIdMutationOptions = <
  TError =
    | DeleteTeamIdNotesNoteId401
    | DeleteTeamIdNotesNoteId403
    | DeleteTeamIdNotesNoteId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdNotesNoteId>>,
    TError,
    { teamId: string; noteId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdNotesNoteId>>,
  TError,
  { teamId: string; noteId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdNotesNoteId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdNotesNoteId>>,
    { teamId: string; noteId: number }
  > = (props) => {
    const { teamId, noteId } = props ?? {};

    return deleteTeamIdNotesNoteId(teamId, noteId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdNotesNoteIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdNotesNoteId>>
>;

export type DeleteTeamIdNotesNoteIdMutationError =
  | DeleteTeamIdNotesNoteId401
  | DeleteTeamIdNotesNoteId403
  | DeleteTeamIdNotesNoteId404;

/**
 * @summary 노트 삭제
 */
export const useDeleteTeamIdNotesNoteId = <
  TError =
    | DeleteTeamIdNotesNoteId401
    | DeleteTeamIdNotesNoteId403
    | DeleteTeamIdNotesNoteId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdNotesNoteId>>,
    TError,
    { teamId: string; noteId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdNotesNoteId>>,
  TError,
  { teamId: string; noteId: number },
  TContext
> => {
  const mutationOptions = getDeleteTeamIdNotesNoteIdMutationOptions(options);

  return useMutation(mutationOptions);
};
