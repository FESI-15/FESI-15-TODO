"use client";

import { useEffect } from "react";
import { m, type Variants } from "motion/react";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import TodosTab from "./TodosTab/TodosTab";
import AddTodoButton from "./AddTodoButton/AddTodoButton";
import TodoList from "./TodoList/TodoList";
import { useSearchParams } from "next/navigation";
import { GetTeamIdTodosParams } from "@/apis/model";
import useHeaderStore from "@/store/useHeaderStore";
import { TODOS_LIMIT } from "@/constants/pagination";

const todosContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const todosItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
      <m.div
        className="max-w-[720px] mx-auto w-full"
        variants={todosContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.h2
          variants={todosItemVariants}
          className="font-semibold md:text-xl lg:text-2xl hidden lg:block dark:text-foreground"
        >
          모든 할 일
          <span className="text-orange-600 ml-1 lg:ml-2">
            {todos?.data.todos.length}
          </span>
        </m.h2>
        <m.div
          variants={todosItemVariants}
          className="px-2 flex justify-between items-center lg:mt-6"
        >
          <TodosTab />
          <div>
            <AddTodoButton />
          </div>
        </m.div>
        <m.div variants={todosItemVariants}>
          <TodoList todos={todos?.data.todos || []} />
        </m.div>
      </m.div>
    </div>
  );
}
