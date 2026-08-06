import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import type {
  GetTeamIdNotifications200,
  GetTeamIdNotificationsParams,
} from "@/apis/model";
import type { NotificationIdVariables } from "@/apis/notifications/notificationsBff";
import {
  deleteNotification,
  deleteNotifications,
  getNotifications,
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

export const useDeleteNotifications = () => {
  return useMutation({
    mutationKey: ["deleteNotifications"],
    mutationFn: () => deleteNotifications(),
  });
};

export const useDeleteNotification = () => {
  return useMutation({
    mutationKey: ["deleteNotification"],
    mutationFn: (variables: NotificationIdVariables) =>
      deleteNotification(variables),
  });
};
