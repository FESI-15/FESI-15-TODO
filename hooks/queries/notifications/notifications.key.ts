import type { GetTeamIdNotificationsParams } from "@/apis/model";

export const notificationsKeys = {
  all: () => ["/api/notifications"] as const,
  list: (params?: GetTeamIdNotificationsParams) =>
    ["/api/notifications", params] as const,
};
