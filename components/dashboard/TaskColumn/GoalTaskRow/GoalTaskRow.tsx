import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import { m, type Variants } from "motion/react";
import { useState } from "react";

export const taskRowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const TaskModal = dynamic(
  () => import("@/components/common/Modal/TaskModal/TaskModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

interface GoalTaskRowProps {
  todo: GetTeamIdTodos200TodosItem;
  skipEnterAnimation?: boolean;
}
const taskTitleVariant = cva(
  "truncate max-w-[550px] text-left text-sm font-medium lg:text-base group-hover:text-orange-600 group-hover:font-semibold pr-4",
  {
    variants: {
      done: {
        true: "text-gray-500 line-through dark:text-muted-foreground",
        false: "text-gray-800 dark:text-foreground",
      },
    },
  },
);

export default function GoalTaskRow({
  todo,
  skipEnterAnimation = false,
}: GoalTaskRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <m.li
      variants={taskRowVariants}
      initial={skipEnterAnimation ? false : undefined}
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
          onOpenChange={(open) => setIsOpen(open)}
        />
      )}
      <TaskIcons todo={todo} recentTodo={false} />
    </m.li>
  );
}
