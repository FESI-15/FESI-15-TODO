import type { GetTeamIdTodosParams } from "@/apis/model";

export const todosKeys = {
  list: (params?: GetTeamIdTodosParams) => ["/api/todos", params] as const,
  detail: (id: number) => [`/api/todos/${id}`] as const,
  favorites: () => ["/api/todos/favorites"] as const,
};
