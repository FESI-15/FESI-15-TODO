"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetTodoFavorites } from "@/hooks/queries/favorites/favorites.bff.hook";
import TodoList from "@/components/todos/TodoList/TodoList";
import GoalFilter from "@/components/common/GoalFilter";
import FavoritesTab, { FavoritesTabValue } from "./FavoritesTab";
import useHeaderStore from "@/store/useHeaderStore";

const FAVORITES_LIMIT = 100;

export default function Favorites() {
  const [tab, setTab] = useState<FavoritesTabValue>("all");
  const [goalId, setGoalId] = useState<number | undefined>(undefined);

  const { data } = useGetTodoFavorites({ limit: FAVORITES_LIMIT });
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    setTitle(
      <>
        찜한 할 일
        <span className="text-orange-600 ml-1">
          {data?.data.totalCount ?? 0}
        </span>
      </>,
    );
  }, [data?.data.totalCount, setTitle]);

  const filteredTodos = useMemo(() => {
    return (data?.data.favorites ?? [])
      .filter(
        ({ todo }) =>
          (tab === "all" || todo.done === (tab === "done")) &&
          (!goalId || todo.goal?.id === goalId),
      )
      .map((favorite) => favorite.todo);
  }, [data, tab, goalId]);

  return (
    <div className="my-6 px-4 md:my-12 md:px-6 lg:my-20 w-full">
      <div className="max-w-[720px] mx-auto w-full">
        <h2 className="font-semibold md:text-xl lg:text-2xl hidden lg:block dark:text-foreground">
          찜한 할 일
          <span className="text-orange-600 ml-1 lg:ml-2">
            {data?.data.totalCount}
          </span>
        </h2>
        <div className="px-2 flex justify-between items-center lg:mt-6">
          <FavoritesTab value={tab} onChange={setTab} />
        </div>
        <TodoList
          todos={filteredTodos}
          emptyMessage="아직 찜한 할 일이 없어요"
          filterSlot={<GoalFilter goalId={goalId} onGoalIdChange={setGoalId} />}
        />
      </div>
    </div>
  );
}
