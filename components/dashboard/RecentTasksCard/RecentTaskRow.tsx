import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { useGetTodo } from "@/hooks/queries/todos/todos.bff.hook";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";
interface RecentTaskRowProps {
  task: GetTeamIdTodos200TodosItem;
}

export default function RecentTaskRow({ task }: RecentTaskRowProps) {
  const { data: todo } = useGetTodo({ todoId: task.id });
  if (!todo) return null;
  return (
    <li className="flex min-w-0 items-center justify-between gap-4 px-2 py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <DashboardCheckbox checked={task.done} taskId={task.id} />
        <TaskModal todo={todo.data}>
          <p className="truncate text-left text-sm font-semibold text-white">
            {task.title}
          </p>
        </TaskModal>
      </div>
      <TaskIcons task={task} recentTodo={true} />
    </li>
  );
}
