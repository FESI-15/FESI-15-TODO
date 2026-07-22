import {
  deleteTeamIdNotifications,
  getTeamIdNotifications,
  patchTeamIdNotifications,
} from "@/apis/notifications/notifications";
import type { GetTeamIdNotificationsParams } from "@/apis/model";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

// 알림 목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdNotificationsParams = {
    cursor: searchParams.has("cursor")
      ? Number(searchParams.get("cursor"))
      : undefined,
    limit: searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
  };

  return handleRouteRequest((headers) =>
    getTeamIdNotifications(params, { headers }),
  );
}

// 알림 읽음 처리
export async function PATCH() {
  return handleRouteRequest((headers) => patchTeamIdNotifications({ headers }));
}

// 알림 삭제
export async function DELETE() {
  return handleEmptyRouteRequest((headers) =>
    deleteTeamIdNotifications({ headers }),
  );
}
