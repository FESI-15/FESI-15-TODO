"use client";

import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import TodosTab from "./TodosTab/TodosTab";

export default function Todos() {
  const { data: todos } = useGetTodos();
  console.log(todos);

  return (
    <div className="max-w-[720px] mx-auto w-full mt-6 px-4">
      <h2 className="font-semibold">
        모든 할 일{" "}
        <span className="text-orange-600 ml-1">{todos?.data.todos.length}</span>
      </h2>
      <div className="px-2 flex justify-between items-center">
        <TodosTab />
      </div>
    </div>
  );
}
