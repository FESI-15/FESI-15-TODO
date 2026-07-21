import {
  getTeamIdPostsPostIdComments,
  postTeamIdPostsPostIdComments,
} from "@/apis/comments/comments";
import type { GetTeamIdPostsPostIdCommentsParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    postId: string;
  }>;
}

// 댓글 목록 조회
export async function GET(request: Request, context: RouteContext) {
  const { postId } = await context.params;
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdPostsPostIdCommentsParams = {
    cursor: searchParams.get("cursor") ?? undefined,
    limit: searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
  };

  return handleRouteRequest((teamId, headers) =>
    getTeamIdPostsPostIdComments(teamId, Number(postId), params, { headers }),
  );
}

// 댓글 생성
export async function POST(request: Request, context: RouteContext) {
  const { postId } = await context.params;
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    postTeamIdPostsPostIdComments(teamId, Number(postId), data, { headers }),
  );
}
