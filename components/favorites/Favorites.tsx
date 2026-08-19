"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { useGetTodoFavorites } from "@/hooks/queries/favorites/favorites.bff.hook";
import TodoList from "@/components/todos/TodoList/TodoList";
import GoalFilter from "@/components/common/GoalFilter";
import FavoritesTab, { FavoritesTabValue } from "./FavoritesTab";
import useHeaderStore from "@/store/useHeaderStore";
import { FAVORITES_LIMIT } from "@/constants/pagination";

export default function Favorites() {
  const [tab, setTab] = useState<FavoritesTabValue>("all");
  const [goalId, setGoalId] = useState<number | undefined>(undefined);

  const { data } = useGetTodoFavorites({ limit: FAVORITES_LIMIT });
  const setTitle = useHeaderStore((s) => s.setTitle);

  const filteredTodos = (data?.data.favorites ?? [])
    .filter(
      ({ todo }) =>
        (tab === "all" || todo.done === (tab === "done")) &&
        (!goalId || todo.goal?.id === goalId),
    )
    .map((favorite) => favorite.todo);

  useEffect(() => {
    setTitle(
      <>
        찜한 할 일
        <span className="text-orange-600 ml-1">{filteredTodos.length}</span>
      </>,
    );
  }, [filteredTodos.length, setTitle]);

  return (
    <div className="my-6 px-4 md:my-12 md:px-6 lg:my-20 w-full">
      <div className="max-w-[720px] mx-auto w-full">
        <m.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-semibold md:text-xl lg:text-2xl hidden lg:block dark:text-foreground"
        >
          찜한 할 일
          <span className="text-orange-600 ml-1 lg:ml-2">
            {filteredTodos.length}
          </span>
        </m.h2>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="px-2 flex justify-between items-center lg:mt-6"
        >
          <FavoritesTab value={tab} onChange={setTab} />
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          <TodoList
            todos={filteredTodos}
            emptyMessage="아직 찜한 할 일이 없어요"
            filterSlot={
              <GoalFilter goalId={goalId} onGoalIdChange={setGoalId} />
            }
          />
        </m.div>
      </div>
    </div>
  );
}
