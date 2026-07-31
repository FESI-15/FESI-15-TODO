import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";

export const favoritesKeys = {
  all: () => ["/api/todos/favorites"] as const,
  todos: (params?: GetTeamIdTodosFavoritesParams) =>
    ["/api/todos/favorites", params] as const,
};
