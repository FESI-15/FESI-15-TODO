import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import dynamic from "next/dynamic";
import { useState } from "react";

const TaskModal = dynamic(
  () => import("@/components/common/Modal/TaskModal/TaskModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

interface RecentTaskRowProps {
  todo: GetTeamIdTodos200TodosItem;
}

export default function RecentTaskRow({ todo }: RecentTaskRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <li className="flex min-w-0 items-center justify-between gap-4 px-1 py-1.5 lg:py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <DashboardCheckbox checked={todo.done} taskId={todo.id} />
        <button
          type="button"
          className="truncate text-left text-sm font-semibold text-white pr-4 lg:text-base"
          onClick={() => setIsOpen(true)}
        >
          {todo.title}
        </button>
        {isOpen && (
          <TaskModal
            todo={todo}
            isOpen={isOpen}
            onOpenChange={handleOpenChange}
          />
        )}
      </div>
      <TaskIcons todo={todo} recentTodo={true} />
    </li>
  );
}
