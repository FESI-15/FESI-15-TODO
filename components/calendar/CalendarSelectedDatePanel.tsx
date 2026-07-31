"use client";

import { format } from "date-fns";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import CalendarEventChip from "./CalendarEventChip";

interface CalendarSelectedDatePanelProps {
  date: Date;
  todos: GetTeamIdTodos200TodosItem[];
}

export default function CalendarSelectedDatePanel({
  date,
  todos,
}: CalendarSelectedDatePanelProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 px-2 pt-4 lg:hidden">
      <p className="text-sm font-semibold text-gray-700">
        {format(date, "yyyy. MM. dd")}
      </p>
      <div className="flex flex-col gap-2">
        {todos.length === 0 ? (
          <p className="text-sm text-gray-400">등록된 할일이 없어요</p>
        ) : (
          todos.map((todo) => <CalendarEventChip key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
}
