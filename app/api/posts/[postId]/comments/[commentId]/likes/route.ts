import {
  deleteTeamIdPostsPostIdCommentsCommentIdLikes,
  postTeamIdPostsPostIdCommentsCommentIdLikes,
} from "@/apis/comments/comments";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    postId: string;
    commentId: string;
  }>;
}

export async function POST(_request: Request, context: RouteContext) {
  const { postId, commentId } = await context.params;

  return handleRouteRequest((teamId, headers) =>
    postTeamIdPostsPostIdCommentsCommentIdLikes(
      teamId,
      Number(postId),
      Number(commentId),
      { headers },
    ),
  );
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { postId, commentId } = await context.params;

  return handleRouteRequest((teamId, headers) =>
    deleteTeamIdPostsPostIdCommentsCommentIdLikes(
      teamId,
      Number(postId),
      Number(commentId),
      { headers },
    ),
  );
}
