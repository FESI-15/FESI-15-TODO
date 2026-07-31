"use client";

import { Check } from "lucide-react";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";
import { cn } from "@/utils/cn";

interface CalendarEventChipProps {
  todo: GetTeamIdTodos200TodosItem;
}

export default function CalendarEventChip({ todo }: CalendarEventChipProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold",
        todo.done
          ? "border-gray-300 bg-gray-50 text-gray-400"
          : "border-orange-300 bg-orange-100 text-orange-600",
      )}
    >
      {todo.done && <Check className="size-4 shrink-0" />}
      <TaskModal todo={todo}>
        <span className="block w-full truncate text-left">{todo.title}</span>
      </TaskModal>
    </div>
  );
}
