import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetTeamIdTodos200, GetTeamIdTodosParams } from "@/apis/model";
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
import { showSaveSuccessToast } from "@/utils/toast";

interface TodosCache {
  data: GetTeamIdTodos200;
}

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
    onMutate: async (variables) => {
      if (variables.data.done === undefined) return;
      await queryClient.cancelQueries({ queryKey: todosKeys.all() });
      const previousTodos = queryClient.getQueriesData({
        queryKey: todosKeys.all(),
      });
      queryClient.setQueriesData(
        { queryKey: todosKeys.all() },
        (oldData: TodosCache | undefined) => {
          if (!oldData) return oldData;

          const todo = oldData.data.todos.map((todo) =>
            todo.id === variables.todoId
              ? { ...todo, done: variables.data.done }
              : todo,
          );
          return { ...oldData, data: { ...oldData.data, todos: todo } };
        },
      );
      return { previousTodos };
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: todosKeys.all() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all() });
      if (variables.data.done) {
        showSaveSuccessToast("할 일을 완료했습니다.");
      }
      if (variables.data.done !== undefined) {
        queryClient.invalidateQueries({ queryKey: notificationsKeys.all() });
      }
    },
    onError: (error, variables, context) => {
      context?.previousTodos.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: (_data, error, variables) => {
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
