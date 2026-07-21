import { getTeamIdTodosFavorites } from "@/apis/favorites/favorites";
import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// 즐겨찾기한 할 일 목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdTodosFavoritesParams = {
    cursor: searchParams.has("cursor")
      ? Number(searchParams.get("cursor"))
      : undefined,
    limit: searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
  };

  return handleRouteRequest((teamId, headers) =>
    getTeamIdTodosFavorites(teamId, params, { headers }),
  );
}
