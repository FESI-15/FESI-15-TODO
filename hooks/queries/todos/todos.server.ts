import type { GetTeamIdTodosParams } from "@/apis/model";
import { getTeamIdTodos, getTeamIdTodosTodoId } from "@/apis/todos/todos";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { todosKeys } from "./todos.key";

export const getTodosQueryOptionsServer = (params?: GetTeamIdTodosParams) => ({
  queryKey: todosKeys.list(params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdTodos(params, { headers }, signal);

    return { data: response.data };
  },
});

export const getTodoQueryOptionsServer = (todoId: number) => ({
  queryKey: todosKeys.detail(todoId),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdTodosTodoId(todoId, { headers }, signal);

    return { data: response.data };
  },
  enabled: !!todoId,
});
