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

// 게시글 댓글 좋아요 생성
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

// 게시글 댓글 좋아요 삭제
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
