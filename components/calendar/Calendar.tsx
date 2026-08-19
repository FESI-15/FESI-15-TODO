"use client";

import { useState } from "react";
import { format } from "date-fns";
import { m } from "motion/react";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import { TODOS_LIMIT } from "@/constants/pagination";
import CalendarHeader from "./CalendarHeader";
import CalendarNav from "./CalendarNav";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import CalendarSelectedDatePanel from "./CalendarSelectedDatePanel";
import { getCalendarGridRange, groupTodosByDate } from "./calendarGrid.utils";

interface CalendarProps {
  initialDate: Date;
}

export default function Calendar({ initialDate }: CalendarProps) {
  const [month, setMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [goalId, setGoalId] = useState<number | undefined>(undefined);

  const { start, end } = getCalendarGridRange(month);
  const { data: todosData } = useGetTodos({
    from: format(start, "yyyy-MM-dd"),
    to: format(end, "yyyy-MM-dd"),
    goalId,
    limit: TODOS_LIMIT,
  });

  const todos = todosData?.data.todos ?? [];
  const todosByDate = groupTodosByDate(todos);
  const selectedDateTodos =
    todosByDate[format(selectedDate, "yyyy-MM-dd")] ?? [];

  return (
    <main className="min-w-0 flex-1 px-4 py-8 pb-30 md:px-6 md:py-12 md:pb-12 lg:py-20">
      <div className="mx-auto flex w-full flex-col gap-6 lg:max-w-[1280px]">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CalendarHeader />
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col gap-4 rounded-3xl bg-white dark:bg-card p-4 md:p-6 lg:h-[912px]"
        >
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
        </m.div>
      </div>
    </main>
  );
}
