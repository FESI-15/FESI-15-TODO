"use client";

import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";

const calendarEventChipVariants = cva(
  "flex w-full items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold",
  {
    variants: {
      done: {
        true: "border-gray-300 bg-gray-50 text-gray-400",
        false: "border-orange-300 bg-orange-100 text-orange-600",
      },
    },
  },
);

interface CalendarEventChipProps {
  todo: GetTeamIdTodos200TodosItem;
}

export default function CalendarEventChip({ todo }: CalendarEventChipProps) {
  return (
    <div className={calendarEventChipVariants({ done: todo.done })}>
      {todo.done && <Check className="size-4 shrink-0" />}
      <TaskModal todo={todo}>
        <span className="block w-full truncate text-left">{todo.title}</span>
      </TaskModal>
    </div>
  );
}
