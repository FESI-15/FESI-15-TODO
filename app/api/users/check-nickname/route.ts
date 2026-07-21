import { getTeamIdUsersCheckNickname } from "@/apis/users/users";
import type { GetTeamIdUsersCheckNicknameParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdUsersCheckNicknameParams = {
    name: searchParams.get("name") ?? "",
  };

  return handleRouteRequest((teamId, headers) =>
    getTeamIdUsersCheckNickname(teamId, params, { headers }),
  );
}
