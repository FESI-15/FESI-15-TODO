import { getTeamIdUsersCheckNickname } from "@/apis/users/users";
import type { GetTeamIdUsersCheckNicknameParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// 닉네임 중복 체크
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdUsersCheckNicknameParams = {
    name: searchParams.get("name") ?? "",
  };

  return handleRouteRequest((headers) =>
    getTeamIdUsersCheckNickname(params, { headers }),
  );
}
