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

  return handleRouteRequest((headers) =>
    postTeamIdPostsPostIdCommentsCommentIdLikes(
      Number(postId),
      Number(commentId),
      { headers },
    ),
  );
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { postId, commentId } = await context.params;

  return handleRouteRequest((headers) =>
    deleteTeamIdPostsPostIdCommentsCommentIdLikes(
      Number(postId),
      Number(commentId),
      { headers },
    ),
  );
}
