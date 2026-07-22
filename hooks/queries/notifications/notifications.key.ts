import type { GetTeamIdNotificationsParams } from "@/apis/model";

export const notificationsKeys = {
  list: (params?: GetTeamIdNotificationsParams) =>
    ["/api/notifications", params] as const,
};
