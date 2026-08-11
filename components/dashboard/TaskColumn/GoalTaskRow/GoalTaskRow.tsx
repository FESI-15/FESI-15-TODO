import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import { useState } from "react";

const TaskModal = dynamic(
  () => import("@/components/common/Modal/TaskModal/TaskModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

interface GoalTaskRowProps {
  todo: GetTeamIdTodos200TodosItem;
}
const taskTitleVariant = cva(
  "truncate max-w-[550px] text-left text-sm font-medium lg:text-base group-hover:text-orange-600 group-hover:font-semibold pr-4",
  {
    variants: {
      done: {
        true: "text-gray-500 dark:text-muted-foreground",
        false: "text-gray-800 dark:text-foreground",
      },
    },
  },
);

export default function GoalTaskRow({ todo }: GoalTaskRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <li
      className={cn(
        "flex min-w-0 items-center justify-between gap-4 rounded-[12px] px-1.5 py-1.5 hover:bg-orange-alpha-20 group",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <DashboardCheckbox checked={todo.done} taskId={todo.id} />
        <button
          type="button"
          className={taskTitleVariant({ done: todo.done })}
          onClick={() => setIsOpen(true)}
        >
          {todo.title}
        </button>
      </div>
      {isOpen && (
        <TaskModal
          todo={todo}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
        />
      )}
      <TaskIcons todo={todo} recentTodo={false} />
    </li>
  );
}
