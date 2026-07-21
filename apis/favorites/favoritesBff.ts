import type {
  GetTeamIdTodosFavorites200,
  GetTeamIdTodosFavoritesParams,
  PostTeamIdTodosTodoIdFavorites201,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface FavoriteTodoVariables {
  todoId: number;
}

export const getTodoFavorites = (
  params?: GetTeamIdTodosFavoritesParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdTodosFavorites200>(
    { url: "/api/todos/favorites", method: "GET", params, signal },
    options,
  );
};

export const postTodoFavorite = (
  { todoId }: FavoriteTodoVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdTodosTodoIdFavorites201>(
    { url: `/api/todos/${todoId}/favorites`, method: "POST" },
    options,
  );
};

export const deleteTodoFavorite = (
  { todoId }: FavoriteTodoVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    { url: `/api/todos/${todoId}/favorites`, method: "DELETE" },
    options,
  );
};
