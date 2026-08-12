"use client";

import { useCallback } from "react";
import { DayPicker, type DayProps } from "react-day-picker";
import { ko } from "date-fns/locale";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { CALENDAR_WEEK_STARTS_ON } from "../calendarGrid.utils";
import CalendarMonthDay from "./CalendarMonthDay";
import CalendarMonthDayButton from "./CalendarMonthDayButton";
import CalendarChevron from "./CalendarChevron";

interface CalendarGridProps {
  month: Date;
  onMonthChange: (month: Date) => void;
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
  todosByDate: Record<string, GetTeamIdTodos200TodosItem[]>;
}

export default function CalendarGrid({
  month,
  onMonthChange,
  selectedDate,
  onSelectedDateChange,
  todosByDate,
}: CalendarGridProps) {
  const Day = useCallback(
    (props: DayProps) => (
      <CalendarMonthDay
        {...props}
        todosByDate={todosByDate}
        onSelectedDateChange={onSelectedDateChange}
      />
    ),
    [todosByDate, onSelectedDateChange],
  );

  return (
    <DayPicker
      mode="single"
      required
      selected={selectedDate}
      onSelect={onSelectedDateChange}
      month={month}
      onMonthChange={onMonthChange}
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
        Day,
        DayButton: CalendarMonthDayButton,
        Chevron: CalendarChevron,
      }}
    />
  );
}
