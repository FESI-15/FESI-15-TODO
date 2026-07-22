import {
  deleteTeamIdPostsPostId,
  getTeamIdPostsPostId,
  patchTeamIdPostsPostId,
} from "@/apis/posts/posts";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    postId: string;
  }>;
}

const getPostId = async (context: RouteContext) => {
  const { postId } = await context.params;

  return Number(postId);
};

// 게시글 세부 조회
export async function GET(_request: Request, context: RouteContext) {
  const postId = await getPostId(context);

  return handleRouteRequest((headers) =>
    getTeamIdPostsPostId(postId, { headers }),
  );
}

// 게시글 수정
export async function PATCH(request: Request, context: RouteContext) {
  const postId = await getPostId(context);
  const data = await request.json();

  return handleRouteRequest((headers) =>
    patchTeamIdPostsPostId(postId, data, { headers }),
  );
}

// 게시글 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const postId = await getPostId(context);

  return handleEmptyRouteRequest((headers) =>
    deleteTeamIdPostsPostId(postId, { headers }),
  );
}
