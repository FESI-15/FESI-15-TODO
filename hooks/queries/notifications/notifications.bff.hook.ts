import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  GetTeamIdNotifications200,
  GetTeamIdNotificationsParams,
} from "@/apis/model";
import type {
  NotificationIdVariables,
  PatchNotificationVariables,
} from "@/apis/notifications/notificationsBff";
import {
  deleteNotification,
  deleteNotifications,
  getNotifications,
  patchNotification,
  patchNotifications,
} from "@/apis/notifications/notificationsBff";
import { notificationsKeys } from "./notifications.key";

export const useGetNotificationsInfinite = (
  params?: GetTeamIdNotificationsParams,
) => {
  return useInfiniteQuery({
    queryKey: notificationsKeys.list(params),
    queryFn: async ({ pageParam }) => {
      const response = await getNotifications(
        { ...params, cursor: pageParam ?? undefined },
        undefined,
      );

      return response.data;
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage: GetTeamIdNotifications200) =>
      lastPage.nextCursor ?? undefined,
  });
};

export const usePatchNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["patchNotifications"],
    mutationFn: () => patchNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all() });
    },
  });
};

export const useDeleteNotifications = () => {
  return useMutation({
    mutationKey: ["deleteNotifications"],
    mutationFn: () => deleteNotifications(),
  });
};

export const usePatchNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["patchNotification"],
    mutationFn: (variables: PatchNotificationVariables) =>
      patchNotification(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all() });
    },
  });
};

export const useDeleteNotification = () => {
  return useMutation({
    mutationKey: ["deleteNotification"],
    mutationFn: (variables: NotificationIdVariables) =>
      deleteNotification(variables),
  });
};
