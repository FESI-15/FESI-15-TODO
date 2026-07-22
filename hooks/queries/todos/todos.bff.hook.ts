import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from "@tanstack/react-query";

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

export const getTodosQueryKey = (params?: GetTeamIdTodosParams) => {
  return ["/api/todos", ...(params ? [params] : [])] as const;
};

export const useGetTodos = (params?: GetTeamIdTodosParams) => {
  return useQuery({
    queryKey: getTodosQueryKey(params),
    queryFn: ({ signal }) => getTodos(params, undefined, signal),
    enabled: !!params,
  });
};

export const useGetTodo = ({ todoId }: TodoIdVariables) => {
  return useQuery({
    queryKey: [`/api/todos/${todoId}`],
    queryFn: ({ signal }) => getTodo({ todoId }, undefined, signal),
    enabled: !!todoId,
  });
};

export const usePostTodos = () => {
  return useMutation({
    mutationKey: ["postTodos"],
    mutationFn: (variables: PostTodosVariables) => postTodos(variables),
  });
};

export const usePatchTodo = () => {
  return useMutation({
    mutationKey: ["patchTodo"],
    mutationFn: (variables: PatchTodoVariables) => patchTodo(variables),
  });
};

export const useDeleteTodo = () => {
  return useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (variables: TodoIdVariables) => deleteTodo(variables),
  });
};
