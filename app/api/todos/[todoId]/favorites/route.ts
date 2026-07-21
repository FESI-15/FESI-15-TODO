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

export async function POST(_request: Request, context: RouteContext) {
  const { todoId } = await context.params;

  return handleRouteRequest((teamId, headers) =>
    postTeamIdTodosTodoIdFavorites(teamId, Number(todoId), { headers }),
  );
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { todoId } = await context.params;

  return handleRouteRequest((teamId, headers) =>
    deleteTeamIdTodosTodoIdFavorites(teamId, Number(todoId), { headers }),
  );
}
