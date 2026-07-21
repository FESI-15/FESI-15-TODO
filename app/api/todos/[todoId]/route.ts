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

// 할 일 상세 조회
export async function GET(_request: Request, context: RouteContext) {
  const todoId = await getTodoId(context);

  return handleRouteRequest((teamId, headers) =>
    getTeamIdTodosTodoId(teamId, todoId, { headers }),
  );
}

// 할 일 수정
export async function PATCH(request: Request, context: RouteContext) {
  const todoId = await getTodoId(context);
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdTodosTodoId(teamId, todoId, data, { headers }),
  );
}

// 할 일 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const todoId = await getTodoId(context);

  return handleEmptyRouteRequest((teamId, headers) =>
    deleteTeamIdTodosTodoId(teamId, todoId, { headers }),
  );
}
