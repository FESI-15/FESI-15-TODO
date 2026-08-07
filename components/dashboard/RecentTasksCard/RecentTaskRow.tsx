import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";
interface RecentTaskRowProps {
  todo: GetTeamIdTodos200TodosItem;
}

export default function RecentTaskRow({ todo }: RecentTaskRowProps) {
  return (
    <li className="flex min-w-0 items-center justify-between gap-4 px-1 py-1.5 lg:py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <DashboardCheckbox checked={todo.done} taskId={todo.id} />
        <TaskModal todo={todo}>
          <p className="truncate text-left text-sm font-semibold text-white pr-4 lg:text-base">
            {todo.title}
          </p>
        </TaskModal>
      </div>
      <TaskIcons todo={todo} recentTodo={true} />
    </li>
  );
}
