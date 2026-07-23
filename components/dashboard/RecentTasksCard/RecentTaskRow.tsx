import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { DashboardTask } from "@/components/dashboard/types";

interface RecentTaskRowProps {
  task: DashboardTask;
}

export default function RecentTaskRow({ task }: RecentTaskRowProps) {
  return (
    <li className="flex h-11 items-center justify-between gap-4 px-2 py-2.5">
      <DashboardCheckbox
        checked={task.done}
        label={task.title}
        labelClassName="max-w-[390px] text-sm font-semibold text-white"
      />
      <TaskIcons task={task} favorite={false} recentTodo={true} />
    </li>
  );
}
