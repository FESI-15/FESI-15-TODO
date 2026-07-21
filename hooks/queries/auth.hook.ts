import { useMutation } from "@tanstack/react-query";

import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import type {
  PostTeamIdAuthLogin400,
  PostTeamIdAuthLogin401,
  PostTeamIdAuthLoginBody,
  PostTeamIdAuthLogout400,
  PostTeamIdAuthLogoutBody,
  PostTeamIdAuthRefresh400,
  PostTeamIdAuthRefresh401,
  PostTeamIdAuthRefreshBody,
  PostTeamIdAuthSignup400,
  PostTeamIdAuthSignup409,
  PostTeamIdAuthSignupBody,
  PostTeamIdOauthProvider400,
  PostTeamIdOauthProvider401,
  PostTeamIdOauthProviderBody,
} from "@/apis/model";

import {
  postTeamIdAuthSignup,
  postTeamIdAuthLogin,
  postTeamIdAuthRefresh,
  postTeamIdAuthLogout,
  postTeamIdOauthProvider,
} from "@/apis/auth/auth";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getPostTeamIdAuthSignupMutationOptions = <
  TError = PostTeamIdAuthSignup400 | PostTeamIdAuthSignup409,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthSignup>>,
    TError,
    { teamId: string; data: PostTeamIdAuthSignupBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdAuthSignup>>,
  TError,
  { teamId: string; data: PostTeamIdAuthSignupBody },
  TContext
> => {
  const mutationKey = ["postTeamIdAuthSignup"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdAuthSignup>>,
    { teamId: string; data: PostTeamIdAuthSignupBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdAuthSignup(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdAuthSignupMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdAuthSignup>>
>;
export type PostTeamIdAuthSignupMutationBody = PostTeamIdAuthSignupBody;
export type PostTeamIdAuthSignupMutationError =
  PostTeamIdAuthSignup400 | PostTeamIdAuthSignup409;

/**
 * @summary 회원가입
 */
export const usePostTeamIdAuthSignup = <
  TError = PostTeamIdAuthSignup400 | PostTeamIdAuthSignup409,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthSignup>>,
    TError,
    { teamId: string; data: PostTeamIdAuthSignupBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdAuthSignup>>,
  TError,
  { teamId: string; data: PostTeamIdAuthSignupBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdAuthSignupMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPostTeamIdAuthLoginMutationOptions = <
  TError = PostTeamIdAuthLogin400 | PostTeamIdAuthLogin401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthLogin>>,
    TError,
    { teamId: string; data: PostTeamIdAuthLoginBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdAuthLogin>>,
  TError,
  { teamId: string; data: PostTeamIdAuthLoginBody },
  TContext
> => {
  const mutationKey = ["postTeamIdAuthLogin"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdAuthLogin>>,
    { teamId: string; data: PostTeamIdAuthLoginBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdAuthLogin(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdAuthLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdAuthLogin>>
>;
export type PostTeamIdAuthLoginMutationBody = PostTeamIdAuthLoginBody;
export type PostTeamIdAuthLoginMutationError =
  PostTeamIdAuthLogin400 | PostTeamIdAuthLogin401;

/**
 * @summary 로그인
 */
export const usePostTeamIdAuthLogin = <
  TError = PostTeamIdAuthLogin400 | PostTeamIdAuthLogin401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthLogin>>,
    TError,
    { teamId: string; data: PostTeamIdAuthLoginBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdAuthLogin>>,
  TError,
  { teamId: string; data: PostTeamIdAuthLoginBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdAuthLoginMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPostTeamIdAuthRefreshMutationOptions = <
  TError = PostTeamIdAuthRefresh400 | PostTeamIdAuthRefresh401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthRefresh>>,
    TError,
    { teamId: string; data: PostTeamIdAuthRefreshBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdAuthRefresh>>,
  TError,
  { teamId: string; data: PostTeamIdAuthRefreshBody },
  TContext
> => {
  const mutationKey = ["postTeamIdAuthRefresh"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdAuthRefresh>>,
    { teamId: string; data: PostTeamIdAuthRefreshBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdAuthRefresh(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdAuthRefreshMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdAuthRefresh>>
>;
export type PostTeamIdAuthRefreshMutationBody = PostTeamIdAuthRefreshBody;
export type PostTeamIdAuthRefreshMutationError =
  PostTeamIdAuthRefresh400 | PostTeamIdAuthRefresh401;

/**
 * @summary 토큰 재발급
 */
export const usePostTeamIdAuthRefresh = <
  TError = PostTeamIdAuthRefresh400 | PostTeamIdAuthRefresh401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthRefresh>>,
    TError,
    { teamId: string; data: PostTeamIdAuthRefreshBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdAuthRefresh>>,
  TError,
  { teamId: string; data: PostTeamIdAuthRefreshBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdAuthRefreshMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPostTeamIdAuthLogoutMutationOptions = <
  TError = PostTeamIdAuthLogout400,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthLogout>>,
    TError,
    { teamId: string; data: PostTeamIdAuthLogoutBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdAuthLogout>>,
  TError,
  { teamId: string; data: PostTeamIdAuthLogoutBody },
  TContext
> => {
  const mutationKey = ["postTeamIdAuthLogout"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdAuthLogout>>,
    { teamId: string; data: PostTeamIdAuthLogoutBody }
  > = (props) => {
    const { teamId, data } = props ?? {};

    return postTeamIdAuthLogout(teamId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdAuthLogoutMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdAuthLogout>>
>;
export type PostTeamIdAuthLogoutMutationBody = PostTeamIdAuthLogoutBody;
export type PostTeamIdAuthLogoutMutationError = PostTeamIdAuthLogout400;

/**
 * @summary 로그아웃
 */
export const usePostTeamIdAuthLogout = <
  TError = PostTeamIdAuthLogout400,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdAuthLogout>>,
    TError,
    { teamId: string; data: PostTeamIdAuthLogoutBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdAuthLogout>>,
  TError,
  { teamId: string; data: PostTeamIdAuthLogoutBody },
  TContext
> => {
  const mutationOptions = getPostTeamIdAuthLogoutMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPostTeamIdOauthProviderMutationOptions = <
  TError = PostTeamIdOauthProvider400 | PostTeamIdOauthProvider401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdOauthProvider>>,
    TError,
    {
      teamId: string;
      provider: "google" | "kakao";
      data: PostTeamIdOauthProviderBody;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postTeamIdOauthProvider>>,
  TError,
  {
    teamId: string;
    provider: "google" | "kakao";
    data: PostTeamIdOauthProviderBody;
  },
  TContext
> => {
  const mutationKey = ["postTeamIdOauthProvider"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postTeamIdOauthProvider>>,
    {
      teamId: string;
      provider: "google" | "kakao";
      data: PostTeamIdOauthProviderBody;
    }
  > = (props) => {
    const { teamId, provider, data } = props ?? {};

    return postTeamIdOauthProvider(teamId, provider, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostTeamIdOauthProviderMutationResult = NonNullable<
  Awaited<ReturnType<typeof postTeamIdOauthProvider>>
>;
export type PostTeamIdOauthProviderMutationBody = PostTeamIdOauthProviderBody;
export type PostTeamIdOauthProviderMutationError =
  PostTeamIdOauthProvider400 | PostTeamIdOauthProvider401;

/**
 * @summary OAuth 로그인
 */
export const usePostTeamIdOauthProvider = <
  TError = PostTeamIdOauthProvider400 | PostTeamIdOauthProvider401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTeamIdOauthProvider>>,
    TError,
    {
      teamId: string;
      provider: "google" | "kakao";
      data: PostTeamIdOauthProviderBody;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postTeamIdOauthProvider>>,
  TError,
  {
    teamId: string;
    provider: "google" | "kakao";
    data: PostTeamIdOauthProviderBody;
  },
  TContext
> => {
  const mutationOptions = getPostTeamIdOauthProviderMutationOptions(options);

  return useMutation(mutationOptions);
};
