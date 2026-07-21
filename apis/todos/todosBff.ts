import type {
  GetTeamIdTodos200,
  GetTeamIdTodosParams,
  GetTeamIdTodosTodoId200,
  PatchTeamIdTodosTodoId200,
  PatchTeamIdTodosTodoIdBody,
  PostTeamIdTodos201,
  PostTeamIdTodosBody,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface TodoIdVariables {
  todoId: number;
}

export interface PostTodosVariables {
  data: PostTeamIdTodosBody;
}

export interface PatchTodoVariables extends TodoIdVariables {
  data: PatchTeamIdTodosTodoIdBody;
}

// 할 일 목록 조회
export const getTodos = (
  params?: GetTeamIdTodosParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdTodos200>(
    { url: "/api/todos", method: "GET", params, signal },
    options,
  );
};

// 할 일 생성
export const postTodos = (
  { data }: PostTodosVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdTodos201>(
    {
      url: "/api/todos",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

// 할 일 상세 조회
export const getTodo = (
  { todoId }: TodoIdVariables,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdTodosTodoId200>(
    { url: `/api/todos/${todoId}`, method: "GET", signal },
    options,
  );
};

// 할 일 수정
export const patchTodo = (
  { todoId, data }: PatchTodoVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdTodosTodoId200>(
    {
      url: `/api/todos/${todoId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

// 할 일 삭제
export const deleteTodo = (
  { todoId }: TodoIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    { url: `/api/todos/${todoId}`, method: "DELETE" },
    options,
  );
};
