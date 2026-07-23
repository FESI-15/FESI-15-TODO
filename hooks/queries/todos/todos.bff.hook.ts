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
  return useMutation({
    mutationKey: ["postTodos"],
    mutationFn: (variables: PostTodosVariables) => postTodos(variables),
  });
};

export const usePatchTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["patchTodo"],
    mutationFn: (variables: PatchTodoVariables) => patchTodo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
    },
  });
};

export const useDeleteTodo = () => {
  return useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (variables: TodoIdVariables) => deleteTodo(variables),
  });
};
