import { patchTeamIdUsersMePassword } from "@/apis/users/users";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// 비밀번호 변경
export async function PATCH(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdUsersMePassword(teamId, data, { headers }),
  );
}
