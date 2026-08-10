"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import CalendarHeader from "./CalendarHeader";
import CalendarNav from "./CalendarNav";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import CalendarSelectedDatePanel from "./CalendarSelectedDatePanel";
import { getCalendarGridRange, groupTodosByDate } from "./calendarGrid.utils";

export default function Calendar() {
  const [month, setMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [goalId, setGoalId] = useState<number | undefined>(undefined);

  const { start, end } = getCalendarGridRange(month);
  const { data: todosData } = useGetTodos({
    from: format(start, "yyyy-MM-dd"),
    to: format(end, "yyyy-MM-dd"),
    goalId,
    limit: 100,
  });

  const todos = todosData?.data.todos ?? [];
  const todosByDate = groupTodosByDate(todos);
  const selectedDateTodos =
    todosByDate[format(selectedDate, "yyyy-MM-dd")] ?? [];

  return (
    <main className="min-w-0 flex-1 px-4 py-8 pb-30 md:px-6 md:py-12 md:pb-12 lg:py-10">
      <div className="mx-auto flex w-full flex-col gap-6 lg:max-w-[1280px]">
        <CalendarHeader />
        <div className="flex flex-col gap-4 rounded-3xl bg-white dark:bg-card p-4 md:p-6 lg:h-[912px]">
          <CalendarNav
            month={month}
            onMonthChange={setMonth}
            goalId={goalId}
            onGoalIdChange={setGoalId}
          />
          <div className="min-h-0 flex-1">
            <CalendarGrid
              month={month}
              onMonthChange={setMonth}
              selectedDate={selectedDate}
              onSelectedDateChange={setSelectedDate}
              todos={todos}
            />
          </div>
          <CalendarSelectedDatePanel
            date={selectedDate}
            todos={selectedDateTodos}
          />
        </div>
      </div>
    </main>
  );
}
