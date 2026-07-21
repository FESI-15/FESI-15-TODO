import { patchTeamIdUsersMePassword } from "@/apis/users/users";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

export async function PATCH(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdUsersMePassword(teamId, data, { headers }),
  );
}
