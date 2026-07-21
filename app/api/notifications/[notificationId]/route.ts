import {
  deleteTeamIdNotificationsNotificationId,
  patchTeamIdNotificationsNotificationId,
} from "@/apis/notifications/notifications";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    notificationId: string;
  }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const { notificationId } = await context.params;
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdNotificationsNotificationId(
      teamId,
      Number(notificationId),
      data,
      { headers },
    ),
  );
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { notificationId } = await context.params;

  return handleEmptyRouteRequest((teamId, headers) =>
    deleteTeamIdNotificationsNotificationId(teamId, Number(notificationId), {
      headers,
    }),
  );
}
