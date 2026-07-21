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

// 할 일 즐겨찾기 추가
export async function POST(_request: Request, context: RouteContext) {
  const { todoId } = await context.params;

  return handleRouteRequest((teamId, headers) =>
    postTeamIdTodosTodoIdFavorites(teamId, Number(todoId), { headers }),
  );
}

// 할 일 즐겨찾기 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const { todoId } = await context.params;

  return handleRouteRequest((teamId, headers) =>
    deleteTeamIdTodosTodoIdFavorites(teamId, Number(todoId), { headers }),
  );
}
