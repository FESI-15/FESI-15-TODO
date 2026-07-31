"use client";

import { useMemo, useState } from "react";
import { useGetTodoFavorites } from "@/hooks/queries/favorites/favorites.bff.hook";
import TodoList from "@/components/todos/TodoList/TodoList";
import FavoritesTab, { FavoritesTabValue } from "./FavoritesTab";
import FavoritesGoalFilter from "./FavoritesGoalFilter";

const FAVORITES_LIMIT = 100;

export default function Favorites() {
  const [tab, setTab] = useState<FavoritesTabValue>("all");
  const [goalId, setGoalId] = useState<number | undefined>(undefined);

  const { data } = useGetTodoFavorites({ limit: FAVORITES_LIMIT });

  const filteredTodos = useMemo(() => {
    return (data?.data.favorites ?? [])
      .filter((favorite) => {
        const statusMatch =
          tab === "all"
            ? true
            : tab === "done"
              ? favorite.todo.done
              : !favorite.todo.done;
        const goalMatch = !goalId || favorite.todo.goal?.id === goalId;
        return statusMatch && goalMatch;
      })
      .map((favorite) => favorite.todo);
  }, [data, tab, goalId]);

  return (
    <div className="max-w-[720px] mx-auto w-full mt-6 px-4 md:mt-12 pb-12">
      <h2 className="font-semibold md:text-xl lg:text-2xl">
        찜한 할 일
        <span className="text-orange-600 ml-1 lg:ml-2">
          {data?.data.totalCount}
        </span>
      </h2>
      <div className="px-2 flex justify-between items-center mt-4 lg:mt-6">
        <FavoritesTab value={tab} onChange={setTab} />
      </div>
      <TodoList
        todos={filteredTodos}
        emptyMessage="아직 찜한 할 일이 없어요"
        filterSlot={
          <FavoritesGoalFilter goalId={goalId} onGoalIdChange={setGoalId} />
        }
      />
    </div>
  );
}
