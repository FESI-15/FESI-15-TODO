import { useMutation, useQuery } from "@tanstack/react-query";

import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";
import type { FavoriteTodoVariables } from "@/apis/favorites/favoritesBff";
import {
  deleteTodoFavorite,
  getTodoFavorites,
  postTodoFavorite,
} from "@/apis/favorites/favoritesBff";
import { favoritesKeys } from "./favorites.key";
import { useQueryClient } from "@tanstack/react-query";
import { todosKeys } from "../todos/todos.key";

export const useGetTodoFavorites = (params?: GetTeamIdTodosFavoritesParams) => {
  return useQuery({
    queryKey: favoritesKeys.todos(params),
    queryFn: ({ signal }) => getTodoFavorites(params, undefined, signal),
  });
};

export const usePostTodoFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["postTodoFavorite"],
    mutationFn: (variables: FavoriteTodoVariables) =>
      postTodoFavorite(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
    },
  });
};

export const useDeleteTodoFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTodoFavorite"],
    mutationFn: (variables: FavoriteTodoVariables) =>
      deleteTodoFavorite(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
    },
  });
};
