import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import type {
  PostAuthLoginVariables,
  PostAuthOauthVariables,
  PostAuthSignupVariables,
} from "@/apis/auth/authBff";
import {
  postAuthLogin,
  postAuthLogout,
  postAuthOauth,
  postAuthSignup,
} from "@/apis/auth/authBff";
import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

/**
 * @summary 로그인
 */
export const getPostAuthLoginMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthLogin>>,
    TError,
    PostAuthLoginVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postAuthLogin>>,
  TError,
  PostAuthLoginVariables,
  TContext
> => {
  const mutationKey = ["postAuthLogin"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthLogin>>,
    PostAuthLoginVariables
  > = (variables) => postAuthLogin(variables, requestOptions);

  return { mutationFn, ...mutationOptions };
};

/**
 * @summary 로그인
 */
export const usePostAuthLogin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthLogin>>,
    TError,
    PostAuthLoginVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postAuthLogin>>,
  TError,
  PostAuthLoginVariables,
  TContext
> => {
  const mutationOptions = getPostAuthLoginMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * @summary 로그아웃
 */
export const getPostAuthLogoutMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthLogout>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postAuthLogout>>,
  TError,
  void,
  TContext
> => {
  const mutationKey = ["postAuthLogout"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthLogout>>,
    void
  > = () => postAuthLogout(requestOptions);

  return { mutationFn, ...mutationOptions };
};

/**
 * @summary 로그아웃
 */
export const usePostAuthLogout = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthLogout>>,
    TError,
    void,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postAuthLogout>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getPostAuthLogoutMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * @summary 회원가입
 */
export const getPostAuthSignupMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthSignup>>,
    TError,
    PostAuthSignupVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postAuthSignup>>,
  TError,
  PostAuthSignupVariables,
  TContext
> => {
  const mutationKey = ["postAuthSignup"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthSignup>>,
    PostAuthSignupVariables
  > = (variables) => postAuthSignup(variables, requestOptions);

  return { mutationFn, ...mutationOptions };
};

/**
 * @summary 회원가입
 */
export const usePostAuthSignup = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthSignup>>,
    TError,
    PostAuthSignupVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postAuthSignup>>,
  TError,
  PostAuthSignupVariables,
  TContext
> => {
  const mutationOptions = getPostAuthSignupMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * @summary OAuth 로그인
 */
export const getPostAuthOauthMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthOauth>>,
    TError,
    PostAuthOauthVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postAuthOauth>>,
  TError,
  PostAuthOauthVariables,
  TContext
> => {
  const mutationKey = ["postAuthOauth"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthOauth>>,
    PostAuthOauthVariables
  > = (variables) => postAuthOauth(variables, requestOptions);

  return { mutationFn, ...mutationOptions };
};

/**
 * @summary OAuth 로그인
 */
export const usePostAuthOauth = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthOauth>>,
    TError,
    PostAuthOauthVariables,
    TContext
  >;
  request?: SecondParameter<typeof bffInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postAuthOauth>>,
  TError,
  PostAuthOauthVariables,
  TContext
> => {
  const mutationOptions = getPostAuthOauthMutationOptions(options);

  return useMutation(mutationOptions);
};
