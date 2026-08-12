"use client";

import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";
import { useState } from "react";

const calendarEventChipVariants = cva(
  "flex w-full items-center gap-1 rounded-md border text-xs font-semibold px-2 py-1",
  {
    variants: {
      done: {
        true: "border-gray-300 dark:border-border bg-gray-50 dark:bg-muted text-gray-400 dark:text-muted-foreground",
        false: "border-orange-300 bg-orange-100 text-orange-600",
      },
    },
  },
);

interface CalendarEventChipProps {
  todo: GetTeamIdTodos200TodosItem;
}

export default function CalendarEventChip({ todo }: CalendarEventChipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={calendarEventChipVariants({ done: todo.done })}
      >
        {todo.done && <Check className="size-4 shrink-0" />}
        <span className="block w-full truncate text-left">{todo.title}</span>
      </button>
      {isOpen && (
        <TaskModal
          todo={todo}
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
        ></TaskModal>
      )}
    </div>
  );
}
