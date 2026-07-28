"use client";

import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import TodosTab from "./TodosTab/TodosTab";
import AddTodoButton from "./AddTodoButton/AddTodoButton";
import TodoList from "./TodoList/TodoList";
import { useSearchParams } from "next/navigation";
import { GetTeamIdTodosDone } from "@/apis/model";

export default function Todos() {
  const searchParams = useSearchParams();
  const done = searchParams.get("done") as GetTeamIdTodosDone | undefined;

  const { data: todos } = useGetTodos({
    ...(done !== null && done !== undefined ? { done } : {}),
  });

  return (
    <div className="max-w-[720px] mx-auto w-full mt-6 px-4 md:mt-12 pb-12">
      <h2 className="font-semibold md:text-xl lg:text-2xl">
        모든 할 일
        <span className="text-orange-600 ml-1 lg:ml-2">
          {todos?.data.todos.length}
        </span>
      </h2>
      <div className="px-2 flex justify-between items-center mt-4 lg:mt-6">
        <TodosTab />
        <div>
          <AddTodoButton />
        </div>
      </div>
      <TodoList todos={todos?.data.todos || []} />
    </div>
  );
}
