import { deleteTeamIdUsersMe, patchTeamIdUsersMe } from "@/apis/users/users";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

// 내 프로필 수정
export async function PATCH(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdUsersMe(teamId, data, { headers }),
  );
}

// 회원 탈퇴
export async function DELETE() {
  return handleEmptyRouteRequest((teamId, headers) =>
    deleteTeamIdUsersMe(teamId, { headers }),
  );
}
