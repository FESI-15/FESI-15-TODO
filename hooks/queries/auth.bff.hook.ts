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

import type { PostAuthLoginVariables } from "@/apis/auth/authBff";
import { getAuthMe, postAuthLogin, postAuthLogout } from "@/apis/auth/authBff";
import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getAuthMeQueryKey = () => {
  return ["/api/auth/me"] as const;
};

export const getAuthMeQueryOptions = <
  TData = Awaited<ReturnType<typeof getAuthMe>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAuthMe>>, TError, TData>;
  request?: SecondParameter<typeof bffInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAuthMeQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAuthMe>>> = ({
    signal,
  }) => getAuthMe(requestOptions, signal);

  return {
    queryKey,
    queryFn,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof getAuthMe>>, TError, TData> & {
    queryKey: QueryKey;
  };
};

/**
 * @summary 내 프로필 조회
 */
export function useGetAuthMe<
  TData = Awaited<ReturnType<typeof getAuthMe>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAuthMe>>, TError, TData>;
  request?: SecondParameter<typeof bffInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAuthMeQueryOptions(options);
  const query = useQuery(queryOptions);

  return {
    ...query,
    queryKey: queryOptions.queryKey,
  } as UseQueryResult<TData, TError> & { queryKey: QueryKey };
}

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
