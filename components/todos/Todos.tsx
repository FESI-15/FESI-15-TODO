"use client";

import { useEffect } from "react";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import TodosTab from "./TodosTab/TodosTab";
import AddTodoButton from "./AddTodoButton/AddTodoButton";
import TodoList from "./TodoList/TodoList";
import { useSearchParams } from "next/navigation";
import { GetTeamIdTodosParams } from "@/apis/model";
import useHeaderStore from "@/store/useHeaderStore";
import { TODOS_LIMIT } from "@/constants/pagination";

export default function Todos() {
  const searchParams = useSearchParams();
  const doneParam = searchParams.get("done");
  const isGetTeamIdTodosDone = (value: string | null) => {
    return value === "true" || value === "false";
  };
  const params: GetTeamIdTodosParams | undefined = isGetTeamIdTodosDone(
    doneParam,
  )
    ? { done: doneParam, limit: TODOS_LIMIT }
    : { done: undefined, limit: TODOS_LIMIT };

  const { data: todos } = useGetTodos(params);
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    setTitle(
      <>
        모든 할 일
        <span className="text-orange-600 ml-1">
          {todos?.data.todos.length ?? 0}
        </span>
      </>,
    );
  }, [todos?.data.todos.length, setTitle]);

  return (
    <div className="my-6 px-4 md:my-12 md:px-6 lg:my-20 w-full">
      <div className="max-w-[720px] mx-auto w-full">
        <h2 className="font-semibold md:text-xl lg:text-2xl hidden lg:block dark:text-foreground">
          모든 할 일
          <span className="text-orange-600 ml-1 lg:ml-2">
            {todos?.data.todos.length}
          </span>
        </h2>
        <div className="px-2 flex justify-between items-center lg:mt-6">
          <TodosTab />
          <div>
            <AddTodoButton />
          </div>
        </div>
        <TodoList todos={todos?.data.todos || []} />
      </div>
    </div>
  );
}
