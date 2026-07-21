import { useMutation } from "@tanstack/react-query";

import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import type {
  PostTeamIdFiles400,
  PostTeamIdFiles401,
  PostTeamIdFilesBody,
  PostTeamIdImages400,
  PostTeamIdImages401,
  PostTeamIdImagesBody,
} from "@/apis/model";

import { postTeamIdImages, postTeamIdFiles } from "@/apis/uploads/uploads";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getPostTeamIdImagesMutationOptions = <
  TError = PostTeamIdImages400 | PostTeamIdImages401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdImages>>,
    TError,
    { teamId: string; data: PostTeamIdImagesBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdImages>>,
  TError,
  { teamId: string; data: PostTeamIdImagesBody },
  TContext
> => {
  const mutationKey = ["postTeamIdImages"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdImages>>,
    { teamId: string; data: PostTeamIdImagesBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdImages(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdImagesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdImages>>
>;
export type PostTeamIdImagesMutationBody = PostTeamIdImagesBody;
export type PostTeamIdImagesMutationError =
  PostTeamIdImages400 | PostTeamIdImages401;

/**
 * @summary 이미지 업로드 presigned URL 발급
 */
export const usePostTeamIdImages = <
  TError = PostTeamIdImages400 | PostTeamIdImages401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdImages>>,
    TError,
    { teamId: string; data: PostTeamIdImagesBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdImages>>,
  TError,
  { teamId: string; data: PostTeamIdImagesBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdImagesMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPostTeamIdFilesMutationOptions = <
  TError = PostTeamIdFiles400 | PostTeamIdFiles401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdFiles>>,
    TError,
    { teamId: string; data: PostTeamIdFilesBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdFiles>>,
  TError,
  { teamId: string; data: PostTeamIdFilesBody },
  TContext
> => {
  const mutationKey = ["postTeamIdFiles"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdFiles>>,
    { teamId: string; data: PostTeamIdFilesBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdFiles(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdFilesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdFiles>>
>;
export type PostTeamIdFilesMutationBody = PostTeamIdFilesBody;
export type PostTeamIdFilesMutationError =
  PostTeamIdFiles400 | PostTeamIdFiles401;

/**
 * @summary 파일 업로드 presigned URL 발급
 */
export const usePostTeamIdFiles = <
  TError = PostTeamIdFiles400 | PostTeamIdFiles401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdFiles>>,
    TError,
    { teamId: string; data: PostTeamIdFilesBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdFiles>>,
  TError,
  { teamId: string; data: PostTeamIdFilesBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdFilesMutationOptions(options);

  return useMutation(mutationOptions);
};
