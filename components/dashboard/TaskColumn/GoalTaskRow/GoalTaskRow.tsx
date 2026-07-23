import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { DashboardTask } from "@/components/dashboard/types";
import { cn } from "@/utils/cn";

interface GoalTaskRowProps {
  task: DashboardTask;
  done?: boolean;
}

export default function GoalTaskRow({ task, done = false }: GoalTaskRowProps) {
  return (
    <li
      className={cn(
        "flex h-11 items-center justify-between gap-4 rounded-xl px-2 py-2.5",
        task.active && "bg-orange-300/45",
      )}
    >
      <DashboardCheckbox
        checked={done}
        label={task.title}
        labelClassName={cn(
          "max-w-[360px] font-medium",
          done
            ? "text-gray-500"
            : task.active
              ? "font-semibold text-orange-600"
              : "text-gray-800",
        )}
      />
      <TaskIcons task={task} dense recentTodo={false} favorite={true} />
    </li>
  );
}
