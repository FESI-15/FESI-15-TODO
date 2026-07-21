import type {
  GetTeamIdNotifications200,
  GetTeamIdNotificationsParams,
  PatchTeamIdNotificationsNotificationId200,
  PatchTeamIdNotificationsNotificationIdBody,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface NotificationIdVariables {
  notificationId: number;
}

export interface PatchNotificationVariables extends NotificationIdVariables {
  data: PatchTeamIdNotificationsNotificationIdBody;
}

export const getNotifications = (
  params?: GetTeamIdNotificationsParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdNotifications200>(
    { url: "/api/notifications", method: "GET", params, signal },
    options,
  );
};

export const patchNotifications = (
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    { url: "/api/notifications", method: "PATCH" },
    options,
  );
};

export const deleteNotifications = (
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    { url: "/api/notifications", method: "DELETE" },
    options,
  );
};

export const patchNotification = (
  { notificationId, data }: PatchNotificationVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdNotificationsNotificationId200>(
    {
      url: `/api/notifications/${notificationId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const deleteNotification = (
  { notificationId }: NotificationIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    { url: `/api/notifications/${notificationId}`, method: "DELETE" },
    options,
  );
};
