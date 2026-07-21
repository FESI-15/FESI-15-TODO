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

// 댓글 좋아요 추가
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

// 댓글 좋아요 삭제
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
