"use client";

import { format } from "date-fns";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarEventChip from "./CalendarEventChip";

interface CalendarDayOverflowProps {
  date: Date;
  todos: GetTeamIdTodos200TodosItem[];
  hiddenCount: number;
}

export default function CalendarDayOverflow({
  date,
  todos,
  hiddenCount,
}: CalendarDayOverflowProps) {
  return (
    <Popover>
      <PopoverTrigger
        className="text-left text-xs font-medium text-gray-500 hover:text-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        +{hiddenCount}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56">
        <p className="px-1 pb-1 text-xs font-semibold text-gray-500">
          {format(date, "yyyy.MM.dd")}
        </p>
        <div className="flex flex-col gap-1">
          {todos.map((todo) => (
            <CalendarEventChip key={todo.id} todo={todo} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
