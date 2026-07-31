"use client";

import { isSameDay } from "date-fns";
import type { DayProps } from "react-day-picker";
import { cn } from "@/utils/cn";
import { useCalendarGridContext } from "./CalendarGridContext";
import CalendarEventChip from "../CalendarEventChip";
import CalendarDayDot from "../CalendarDayDot";
import CalendarDayOverflow from "../CalendarDayOverflow";

const MAX_VISIBLE_TODOS = 3;

export default function CalendarMonthDay({
  day,
  className,
  children,
  ...tdProps
}: DayProps) {
  const { todosByDate, selectedDate, onSelectedDateChange } =
    useCalendarGridContext();
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
}
