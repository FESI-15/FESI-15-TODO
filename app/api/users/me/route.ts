import { deleteTeamIdUsersMe, patchTeamIdUsersMe } from "@/apis/users/users";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

export async function PATCH(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdUsersMe(teamId, data, { headers }),
  );
}

export async function DELETE() {
  return handleEmptyRouteRequest((teamId, headers) =>
    deleteTeamIdUsersMe(teamId, { headers }),
  );
}
