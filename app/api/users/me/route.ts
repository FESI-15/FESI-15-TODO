import { deleteTeamIdUsersMe, patchTeamIdUsersMe } from "@/apis/users/users";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

// ???�로???�정
export async function PATCH(request: Request) {
  const data = await request.json();

  return handleRouteRequest((headers) => patchTeamIdUsersMe(data, { headers }));
}

// ?�원 ?�퇴
export async function DELETE() {
  return handleEmptyRouteRequest((headers) => deleteTeamIdUsersMe({ headers }));
}
