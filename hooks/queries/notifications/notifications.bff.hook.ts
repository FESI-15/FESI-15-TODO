import { useMutation, useQuery } from "@tanstack/react-query";

import type { GetTeamIdNotificationsParams } from "@/apis/model";
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

export const useGetNotifications = (params?: GetTeamIdNotificationsParams) => {
  return useQuery({
    queryKey: notificationsKeys.list(params),
    queryFn: ({ signal }) => getNotifications(params, undefined, signal),
  });
};

export const usePatchNotifications = () => {
  return useMutation({
    mutationKey: ["patchNotifications"],
    mutationFn: () => patchNotifications(),
  });
};

export const useDeleteNotifications = () => {
  return useMutation({
    mutationKey: ["deleteNotifications"],
    mutationFn: () => deleteNotifications(),
  });
};

export const usePatchNotification = () => {
  return useMutation({
    mutationKey: ["patchNotification"],
    mutationFn: (variables: PatchNotificationVariables) =>
      patchNotification(variables),
  });
};

export const useDeleteNotification = () => {
  return useMutation({
    mutationKey: ["deleteNotification"],
    mutationFn: (variables: NotificationIdVariables) =>
      deleteNotification(variables),
  });
};
