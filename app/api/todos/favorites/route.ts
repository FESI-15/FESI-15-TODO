import { getTeamIdTodosFavorites } from "@/apis/favorites/favorites";
import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

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
