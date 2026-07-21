import { getTeamIdPosts, postTeamIdPosts } from "@/apis/posts/posts";
import type { GetTeamIdPostsParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdPostsParams = {
    cursor: searchParams.get("cursor") ?? undefined,
    limit: searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
    search: searchParams.get("search") ?? undefined,
    type: searchParams.has("type")
      ? (searchParams.get("type") as GetTeamIdPostsParams["type"])
      : undefined,
  };

  return handleRouteRequest((teamId, headers) =>
    getTeamIdPosts(teamId, params, { headers }),
  );
}

export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    postTeamIdPosts(teamId, data, { headers }),
  );
}
