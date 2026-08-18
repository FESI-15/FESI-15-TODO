"use client";

import { format } from "date-fns";
import { AnimatePresence, m } from "motion/react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import {
  CALENDAR_WEEK_STARTS_ON,
  groupTodosByDate,
} from "../calendarGrid.utils";
import CalendarMonthDay from "./CalendarMonthDay";
import CalendarMonthDayButton from "./CalendarMonthDayButton";
import CalendarChevron from "./CalendarChevron";

interface CalendarGridProps {
  month: Date;
  onMonthChange: (month: Date) => void;
  direction: number;
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
  todos: GetTeamIdTodos200TodosItem[];
}

export default function CalendarGrid({
  month,
  onMonthChange,
  direction,
  selectedDate,
  onSelectedDateChange,
  todos,
}: CalendarGridProps) {
  const todosByDate = groupTodosByDate(todos);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <m.div
          key={format(month, "yyyy-MM")}
          custom={direction}
          initial={{ x: direction >= 0 ? 24 : -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction >= 0 ? -24 : 24, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="h-full w-full"
        >
          <DayPicker
            month={month}
            onMonthChange={onMonthChange}
            onDayClick={(date) => onSelectedDateChange(date)}
            showOutsideDays
            weekStartsOn={CALENDAR_WEEK_STARTS_ON}
            locale={ko}
            className="flex h-full w-full flex-col"
            classNames={{
              months: "flex h-full flex-col",
              month: "flex h-full w-full flex-col",
              month_grid: "flex h-full w-full flex-1 flex-col border-collapse",
              weeks: "flex h-full flex-1 flex-col",
              weekdays: "flex w-full",
              weekday:
                "flex-1 py-2 text-center text-sm font-medium text-gray-500 dark:text-muted-foreground",
              week: "flex w-full flex-1",
              month_caption: "hidden",
              nav: "hidden",
            }}
            components={{
              Day: (props) => (
                <CalendarMonthDay
                  {...props}
                  todosByDate={todosByDate}
                  selectedDate={selectedDate}
                  onSelectedDateChange={onSelectedDateChange}
                />
              ),
              DayButton: CalendarMonthDayButton,
              Chevron: CalendarChevron,
            }}
          />
        </m.div>
      </AnimatePresence>
    </div>
  );
}
