import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetTeamIdTodosParams } from "@/apis/model";
import type {
  PatchTodoVariables,
  PostTodosVariables,
  TodoIdVariables,
} from "@/apis/todos/todosBff";
import {
  deleteTodo,
  getTodo,
  getTodos,
  patchTodo,
  postTodos,
} from "@/apis/todos/todosBff";
import { todosKeys } from "./todos.key";
import { favoritesKeys } from "../favorites/favorites.key";
import { notificationsKeys } from "../notifications/notifications.key";

export const getTodosQueryKey = (params?: GetTeamIdTodosParams) => {
  return ["/api/todos", ...(params ? [params] : [])] as const;
};

export const useGetTodos = (params?: GetTeamIdTodosParams) => {
  return useQuery({
    queryKey: todosKeys.list(params),
    queryFn: ({ signal }) => getTodos(params, undefined, signal),
  });
};

export const useGetTodo = ({ todoId }: TodoIdVariables, enabled = true) => {
  return useQuery({
    queryKey: todosKeys.detail(todoId),
    queryFn: ({ signal }) => getTodo({ todoId }, undefined, signal),
    enabled: !!todoId && enabled,
  });
};

export const usePostTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["postTodos"],
    mutationFn: (variables: PostTodosVariables) => postTodos(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
    },
  });
};

export const usePatchTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["patchTodo"],
    mutationFn: (variables: PatchTodoVariables) => patchTodo(variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all() });

      if (variables.data.done !== undefined) {
        queryClient.invalidateQueries({ queryKey: notificationsKeys.all() });
      }
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (variables: TodoIdVariables) => deleteTodo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all() });
    },
  });
};
