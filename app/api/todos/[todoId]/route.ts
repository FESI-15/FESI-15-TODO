import {
  deleteTeamIdTodosTodoId,
  getTeamIdTodosTodoId,
  patchTeamIdTodosTodoId,
} from "@/apis/todos/todos";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    todoId: string;
  }>;
}

const getTodoId = async (context: RouteContext) => {
  const { todoId } = await context.params;

  return Number(todoId);
};

// 투두 세부 조회
export async function GET(_request: Request, context: RouteContext) {
  const todoId = await getTodoId(context);

  return handleRouteRequest((headers) =>
    getTeamIdTodosTodoId(todoId, { headers }),
  );
}

// 투두 수정
export async function PATCH(request: Request, context: RouteContext) {
  const todoId = await getTodoId(context);
  const data = await request.json();

  return handleRouteRequest((headers) =>
    patchTeamIdTodosTodoId(todoId, data, { headers }),
  );
}

// 투두 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const todoId = await getTodoId(context);

  return handleEmptyRouteRequest((headers) =>
    deleteTeamIdTodosTodoId(todoId, { headers }),
  );
}
