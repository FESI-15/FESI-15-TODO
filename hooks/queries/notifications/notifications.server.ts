import type { GetTeamIdNotificationsParams } from "@/apis/model";
import { getTeamIdNotifications } from "@/apis/notifications/notifications";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { notificationsKeys } from "./notifications.key";

export const getNotificationsQueryOptionsServer = (
  params?: GetTeamIdNotificationsParams,
) => ({
  queryKey: notificationsKeys.list(params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdNotifications(params, { headers }, signal);

    return { data: response.data };
  },
});
