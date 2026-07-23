import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";

interface GoalTaskRowProps {
  task: GetTeamIdTodos200TodosItem;
  done?: boolean;
}

export default function GoalTaskRow({ task, done = false }: GoalTaskRowProps) {
  const taskIconData = {
    id: task.id,
    note: Array.isArray(task.noteIds) && task.noteIds.length > 0,
    favorite: task.isFavorite,
  };

  return (
    <li
      className={cn(
        "flex h-11 items-center justify-between gap-4 rounded-xl px-2 py-2.5",
        // task.active && "bg-orange-300/45",
      )}
    >
      <DashboardCheckbox
        checked={done}
        label={task.title}
        labelClassName={cn(
          "max-w-[360px] font-medium",
          done ? "text-gray-500" : "text-gray-800",
        )}
      />
      <TaskIcons task={taskIconData} recentTodo={false} />
    </li>
  );
}
