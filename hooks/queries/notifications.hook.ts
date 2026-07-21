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
  DeleteTeamIdNotifications401,
  DeleteTeamIdNotificationsNotificationId401,
  DeleteTeamIdNotificationsNotificationId403,
  DeleteTeamIdNotificationsNotificationId404,
  GetTeamIdNotifications401,
  GetTeamIdNotificationsParams,
  PatchTeamIdNotifications401,
  PatchTeamIdNotificationsNotificationId400,
  PatchTeamIdNotificationsNotificationId401,
  PatchTeamIdNotificationsNotificationId403,
  PatchTeamIdNotificationsNotificationId404,
  PatchTeamIdNotificationsNotificationIdBody,
} from "@/apis/model";

import {
  getTeamIdNotifications,
  patchTeamIdNotifications,
  deleteTeamIdNotifications,
  patchTeamIdNotificationsNotificationId,
  deleteTeamIdNotificationsNotificationId,
} from "@/apis/notifications/notifications";

import { customInstance } from "@/apis/axiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getGetTeamIdNotificationsQueryKey = (
  teamId?: string,
  params?: GetTeamIdNotificationsParams,
) => {
  return [`/${teamId}/notifications`, ...(params ? [params] : [])] as const;
};

export const getGetTeamIdNotificationsQueryOptions = <
  TData = Awaited<ReturnType<typeof getTeamIdNotifications>>,
  TError = GetTeamIdNotifications401,
>(
  teamId: string,
  params?: GetTeamIdNotificationsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdNotifications>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetTeamIdNotificationsQueryKey(teamId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getTeamIdNotifications>>
  > = ({ signal }) =>
    getTeamIdNotifications(teamId, params, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!teamId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getTeamIdNotifications>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetTeamIdNotificationsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTeamIdNotifications>>
>;
export type GetTeamIdNotificationsQueryError = GetTeamIdNotifications401;

/**
 * @summary 알림 목록 조회
 */

export function useGetTeamIdNotifications<
  TData = Awaited<ReturnType<typeof getTeamIdNotifications>>,
  TError = GetTeamIdNotifications401,
>(
  teamId: string,
  params?: GetTeamIdNotificationsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getTeamIdNotifications>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetTeamIdNotificationsQueryOptions(
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

export const getPatchTeamIdNotificationsMutationOptions = <
  TError = PatchTeamIdNotifications401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdNotifications>>,
    TError,
    { teamId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdNotifications>>,
  TError,
  { teamId: string },
  TContext
> => {
  const mutationKey = ["patchTeamIdNotifications"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdNotifications>>,
    { teamId: string }
  > = (props) => {
    const { teamId } = props ?? {};

    return patchTeamIdNotifications(teamId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdNotificationsMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdNotifications>>
>;

export type PatchTeamIdNotificationsMutationError = PatchTeamIdNotifications401;

/**
 * @summary 전체 알림 읽음 처리
 */
export const usePatchTeamIdNotifications = <
  TError = PatchTeamIdNotifications401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdNotifications>>,
    TError,
    { teamId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdNotifications>>,
  TError,
  { teamId: string },
  TContext
> => {
  const mutationOptions = getPatchTeamIdNotificationsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdNotificationsMutationOptions = <
  TError = DeleteTeamIdNotifications401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdNotifications>>,
    TError,
    { teamId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdNotifications>>,
  TError,
  { teamId: string },
  TContext
> => {
  const mutationKey = ["deleteTeamIdNotifications"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdNotifications>>,
    { teamId: string }
  > = (props) => {
    const { teamId } = props ?? {};

    return deleteTeamIdNotifications(teamId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdNotificationsMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdNotifications>>
>;

export type DeleteTeamIdNotificationsMutationError =
  DeleteTeamIdNotifications401;

/**
 * @summary 전체 알림 삭제
 */
export const useDeleteTeamIdNotifications = <
  TError = DeleteTeamIdNotifications401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdNotifications>>,
    TError,
    { teamId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdNotifications>>,
  TError,
  { teamId: string },
  TContext
> => {
  const mutationOptions = getDeleteTeamIdNotificationsMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getPatchTeamIdNotificationsNotificationIdMutationOptions = <
  TError =
    | PatchTeamIdNotificationsNotificationId400
    | PatchTeamIdNotificationsNotificationId401
    | PatchTeamIdNotificationsNotificationId403
    | PatchTeamIdNotificationsNotificationId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdNotificationsNotificationId>>,
    TError,
    {
      teamId: string;
      notificationId: number;
      data: PatchTeamIdNotificationsNotificationIdBody;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchTeamIdNotificationsNotificationId>>,
  TError,
  {
    teamId: string;
    notificationId: number;
    data: PatchTeamIdNotificationsNotificationIdBody;
  },
  TContext
> => {
  const mutationKey = ["patchTeamIdNotificationsNotificationId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchTeamIdNotificationsNotificationId>>,
    {
      teamId: string;
      notificationId: number;
      data: PatchTeamIdNotificationsNotificationIdBody;
    }
  > = (props) => {
    const { teamId, notificationId, data } = props ?? {};

    return patchTeamIdNotificationsNotificationId(
      teamId,
      notificationId,
      data,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchTeamIdNotificationsNotificationIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchTeamIdNotificationsNotificationId>>
>;
export type PatchTeamIdNotificationsNotificationIdMutationBody =
  PatchTeamIdNotificationsNotificationIdBody;
export type PatchTeamIdNotificationsNotificationIdMutationError =
  | PatchTeamIdNotificationsNotificationId400
  | PatchTeamIdNotificationsNotificationId401
  | PatchTeamIdNotificationsNotificationId403
  | PatchTeamIdNotificationsNotificationId404;

/**
 * @summary 알림 읽음 상태 변경
 */
export const usePatchTeamIdNotificationsNotificationId = <
  TError =
    | PatchTeamIdNotificationsNotificationId400
    | PatchTeamIdNotificationsNotificationId401
    | PatchTeamIdNotificationsNotificationId403
    | PatchTeamIdNotificationsNotificationId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchTeamIdNotificationsNotificationId>>,
    TError,
    {
      teamId: string;
      notificationId: number;
      data: PatchTeamIdNotificationsNotificationIdBody;
    },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchTeamIdNotificationsNotificationId>>,
  TError,
  {
    teamId: string;
    notificationId: number;
    data: PatchTeamIdNotificationsNotificationIdBody;
  },
  TContext
> => {
  const mutationOptions =
    getPatchTeamIdNotificationsNotificationIdMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getDeleteTeamIdNotificationsNotificationIdMutationOptions = <
  TError =
    | DeleteTeamIdNotificationsNotificationId401
    | DeleteTeamIdNotificationsNotificationId403
    | DeleteTeamIdNotificationsNotificationId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdNotificationsNotificationId>>,
    TError,
    { teamId: string; notificationId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTeamIdNotificationsNotificationId>>,
  TError,
  { teamId: string; notificationId: number },
  TContext
> => {
  const mutationKey = ["deleteTeamIdNotificationsNotificationId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTeamIdNotificationsNotificationId>>,
    { teamId: string; notificationId: number }
  > = (props) => {
    const { teamId, notificationId } = props ?? {};

    return deleteTeamIdNotificationsNotificationId(
      teamId,
      notificationId,
      requestOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTeamIdNotificationsNotificationIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTeamIdNotificationsNotificationId>>
>;

export type DeleteTeamIdNotificationsNotificationIdMutationError =
  | DeleteTeamIdNotificationsNotificationId401
  | DeleteTeamIdNotificationsNotificationId403
  | DeleteTeamIdNotificationsNotificationId404;

/**
 * @summary 알림 단건 삭제
 */
export const useDeleteTeamIdNotificationsNotificationId = <
  TError =
    | DeleteTeamIdNotificationsNotificationId401
    | DeleteTeamIdNotificationsNotificationId403
    | DeleteTeamIdNotificationsNotificationId404,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTeamIdNotificationsNotificationId>>,
    TError,
    { teamId: string; notificationId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteTeamIdNotificationsNotificationId>>,
  TError,
  { teamId: string; notificationId: number },
  TContext
> => {
  const mutationOptions =
    getDeleteTeamIdNotificationsNotificationIdMutationOptions(options);

  return useMutation(mutationOptions);
};
