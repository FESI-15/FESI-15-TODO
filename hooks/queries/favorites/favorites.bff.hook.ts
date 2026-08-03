import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
  type QueryKey,
} from "@tanstack/react-query";

import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";
import type {
  GetTeamIdTodos200,
  GetTeamIdTodosFavorites200,
} from "@/apis/model";
import type { FavoriteTodoVariables } from "@/apis/favorites/favoritesBff";
import {
  deleteTodoFavorite,
  getTodoFavorites,
  postTodoFavorite,
} from "@/apis/favorites/favoritesBff";
import { favoritesKeys } from "./favorites.key";
import { todosKeys } from "../todos/todos.key";
import {
  removeTodoFromFavoritesCache,
  updateTodosFavoriteCache,
} from "./favoritesOptimisticUpdate";

interface FavoriteMutationContext {
  previousTodos: [QueryKey, unknown][];
  previousFavorites: [QueryKey, unknown][];
}

interface TodosCache {
  data: GetTeamIdTodos200;
}

interface FavoritesCache {
  data: GetTeamIdTodosFavorites200;
}

const rollbackFavoriteMutation = (
  queryClient: QueryClient,
  context?: FavoriteMutationContext,
) => {
  context?.previousTodos.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data);
  });

  context?.previousFavorites.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data);
  });
};

const applyFavoriteOptimisticUpdate = async (
  queryClient: QueryClient,
  todoId: number,
  isFavorite: boolean,
) => {
  await queryClient.cancelQueries({ queryKey: todosKeys.all() });
  await queryClient.cancelQueries({ queryKey: favoritesKeys.all() });

  const previousTodos = queryClient.getQueriesData({
    queryKey: todosKeys.all(),
  });
  const previousFavorites = queryClient.getQueriesData({
    queryKey: favoritesKeys.all(),
  });

  queryClient.setQueriesData<TodosCache | undefined>(
    { queryKey: todosKeys.all() },
    (oldData) => updateTodosFavoriteCache(oldData, todoId, isFavorite),
  );

  if (!isFavorite) {
    queryClient.setQueriesData<FavoritesCache | undefined>(
      { queryKey: favoritesKeys.all() },
      (oldData) => removeTodoFromFavoritesCache(oldData, todoId),
    );
  }

  return {
    previousTodos,
    previousFavorites,
  };
};

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

    onMutate: (variables) =>
      applyFavoriteOptimisticUpdate(queryClient, variables.todoId, true),

    onError: (_error, _variables, context) => {
      rollbackFavoriteMutation(queryClient, context);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all() });
    },
  });
};

export const useDeleteTodoFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTodoFavorite"],
    mutationFn: (variables: FavoriteTodoVariables) =>
      deleteTodoFavorite(variables),

    onMutate: (variables) =>
      applyFavoriteOptimisticUpdate(queryClient, variables.todoId, false),

    onError: (_error, _variables, context) => {
      rollbackFavoriteMutation(queryClient, context);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all() });
    },
  });
};
