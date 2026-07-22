import {
  deleteTeamIdTodosTodoIdFavorites,
  postTeamIdTodosTodoIdFavorites,
} from "@/apis/favorites/favorites";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    todoId: string;
  }>;
}

// 투두 즐겨찾기 추가
export async function POST(_request: Request, context: RouteContext) {
  const { todoId } = await context.params;

  return handleRouteRequest((headers) =>
    postTeamIdTodosTodoIdFavorites(Number(todoId), { headers }),
  );
}

// 투두 즐겨찾기 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const { todoId } = await context.params;

  return handleRouteRequest((headers) =>
    deleteTeamIdTodosTodoIdFavorites(Number(todoId), { headers }),
  );
}
