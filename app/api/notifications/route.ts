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

// ?�림 목록 조회
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

// ?�체 ?�림 ?�음 처리
export async function PATCH() {
  return handleRouteRequest((headers) => patchTeamIdNotifications({ headers }));
}

// ?�체 ?�림 ??��
export async function DELETE() {
  return handleEmptyRouteRequest((headers) =>
    deleteTeamIdNotifications({ headers }),
  );
}
