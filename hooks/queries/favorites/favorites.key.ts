import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";

export const favoritesKeys = {
  todos: (params?: GetTeamIdTodosFavoritesParams) =>
    ["/api/todos/favorites", params] as const,
};
