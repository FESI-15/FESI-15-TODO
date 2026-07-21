import {
  deleteTeamIdPostsPostIdCommentsCommentId,
  patchTeamIdPostsPostIdCommentsCommentId,
} from "@/apis/comments/comments";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    postId: string;
    commentId: string;
  }>;
}

// 댓글 수정
export async function PATCH(request: Request, context: RouteContext) {
  const { postId, commentId } = await context.params;
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdPostsPostIdCommentsCommentId(
      teamId,
      Number(postId),
      Number(commentId),
      data,
      { headers },
    ),
  );
}

// 댓글 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const { postId, commentId } = await context.params;

  return handleEmptyRouteRequest((teamId, headers) =>
    deleteTeamIdPostsPostIdCommentsCommentId(
      teamId,
      Number(postId),
      Number(commentId),
      { headers },
    ),
  );
}
