"use client";

import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import GoalCard from "./GoalCard/GoalCard";
import GoalProgress from "./GoalProgress/GoalProgress";
import GoalTodoList from "./GoalTodoList/GoalTodoList";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import { getGoalProgress } from "@/utils/getGoalProgress";
import useHeaderStore from "@/store/useHeaderStore";
import { useEffect } from "react";
import { TODOS_LIMIT } from "@/constants/pagination";
import { m } from "framer-motion";

export default function Goals({ goalId }: { goalId: number }) {
  const { data: userMe } = useGetUserMe();
  const { data: todosData } = useGetTodos({ goalId, limit: TODOS_LIMIT });

  const todos = todosData?.data.todos ?? [];
  const progress = getGoalProgress(todos);
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    if (userMe?.data.name) setTitle(`${userMe.data.name}님의 목표`);
  }, [userMe?.data.name, setTitle]);

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-[1312px] p-4 pt-8 md:pt-12 lg:pt-20"
    >
      <h2 className="mb-5 hidden px-2 text-xl font-semibold text-black dark:text-foreground lg:block lg:text-2xl">
        {userMe?.data.name}님의 목표
      </h2>
      <div className="flex flex-col gap-4 lg:flex-row md:gap-6 lg:gap-8">
        <GoalCard goalId={goalId} />
        <GoalProgress progress={progress} />
      </div>
      <GoalTodoList goalId={goalId} todos={todos} />
    </m.div>
  );
}
