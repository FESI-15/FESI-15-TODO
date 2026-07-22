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

// 알림 수정
export async function PATCH(request: Request, context: RouteContext) {
  const { notificationId } = await context.params;
  const data = await request.json();

  return handleRouteRequest((headers) =>
    patchTeamIdNotificationsNotificationId(Number(notificationId), data, {
      headers,
    }),
  );
}

// 알림 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const { notificationId } = await context.params;

  return handleEmptyRouteRequest((headers) =>
    deleteTeamIdNotificationsNotificationId(Number(notificationId), {
      headers,
    }),
  );
}
