"use client";

import {
  DayPicker,
  type DayProps,
  type DayButtonProps,
} from "react-day-picker";
import { ko } from "date-fns/locale";
import { isSameDay, isToday } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import {
  CALENDAR_WEEK_STARTS_ON,
  groupTodosByDate,
} from "./calendarGrid.utils";
import CalendarEventChip from "./CalendarEventChip";
import CalendarDayDot from "./CalendarDayDot";
import CalendarDayOverflow from "./CalendarDayOverflow";

const MAX_VISIBLE_TODOS = 3;

interface CalendarGridProps {
  month: Date;
  onMonthChange: (month: Date) => void;
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
  todos: GetTeamIdTodos200TodosItem[];
}

export default function CalendarGrid({
  month,
  onMonthChange,
  selectedDate,
  onSelectedDateChange,
  todos,
}: CalendarGridProps) {
  const todosByDate = groupTodosByDate(todos);

  const CalendarMonthDayButton = ({
    day,
    className,
    ...buttonProps
  }: DayButtonProps) => (
    <button
      type="button"
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium",
        isToday(day.date) && "bg-orange-500 text-white",
        !isToday(day.date) && day.outside && "text-gray-300",
        !isToday(day.date) && !day.outside && "text-gray-800",
        className,
      )}
      {...buttonProps}
    />
  );

  const CalendarMonthDay = ({
    day,
    className,
    children,
    ...tdProps
  }: DayProps) => {
    const dayTodos = todosByDate[day.isoDate] ?? [];
    const visible = dayTodos.slice(0, MAX_VISIBLE_TODOS);
    const hiddenCount = dayTodos.length - visible.length;

    return (
      <td
        onClick={() => onSelectedDateChange(day.date)}
        className={cn(
          "h-24 min-w-0 flex-1 cursor-pointer border border-gray-100 align-top lg:h-full",
          isSameDay(day.date, selectedDate) && "bg-orange-alpha-20",
          className,
        )}
        {...tdProps}
      >
        <div className="flex h-full flex-col gap-1 p-1.5">
          {children}
          <div className="hidden flex-col gap-1 overflow-hidden lg:flex">
            {visible.map((todo) => (
              <CalendarEventChip key={todo.id} todo={todo} />
            ))}
            {hiddenCount > 0 && (
              <CalendarDayOverflow
                date={day.date}
                todos={dayTodos}
                hiddenCount={hiddenCount}
              />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1 lg:hidden">
            {visible.map((todo) => (
              <CalendarDayDot key={todo.id} done={todo.done} />
            ))}
            {hiddenCount > 0 && (
              <span className="text-[10px] font-medium text-gray-400">
                +{hiddenCount}
              </span>
            )}
          </div>
        </div>
      </td>
    );
  };

  return (
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
        weekday: "flex-1 py-2 text-center text-sm font-medium text-gray-500",
        week: "flex w-full flex-1",
        month_caption: "hidden",
        nav: "hidden",
      }}
      components={{
        Day: CalendarMonthDay,
        DayButton: CalendarMonthDayButton,
        Chevron: ({
          orientation,
          className: chevronClassName,
          ...chevronProps
        }) =>
          orientation === "left" ? (
            <ChevronLeftIcon
              className={cn("size-4", chevronClassName)}
              {...chevronProps}
            />
          ) : (
            <ChevronRightIcon
              className={cn("size-4", chevronClassName)}
              {...chevronProps}
            />
          ),
      }}
    />
  );
}
