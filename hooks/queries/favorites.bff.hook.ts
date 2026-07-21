import { useMutation, useQuery } from "@tanstack/react-query";

import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";
import type { FavoriteTodoVariables } from "@/apis/favorites/favoritesBff";
import {
  deleteTodoFavorite,
  getTodoFavorites,
  postTodoFavorite,
} from "@/apis/favorites/favoritesBff";

export const useGetTodoFavorites = (params?: GetTeamIdTodosFavoritesParams) => {
  return useQuery({
    queryKey: ["/api/todos/favorites", params],
    queryFn: ({ signal }) => getTodoFavorites(params, undefined, signal),
  });
};

export const usePostTodoFavorite = () => {
  return useMutation({
    mutationKey: ["postTodoFavorite"],
    mutationFn: (variables: FavoriteTodoVariables) =>
      postTodoFavorite(variables),
  });
};

export const useDeleteTodoFavorite = () => {
  return useMutation({
    mutationKey: ["deleteTodoFavorite"],
    mutationFn: (variables: FavoriteTodoVariables) =>
      deleteTodoFavorite(variables),
  });
};
