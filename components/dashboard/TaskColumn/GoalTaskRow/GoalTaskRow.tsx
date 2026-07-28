import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";
import { cva } from "class-variance-authority";

interface GoalTaskRowProps {
  todo: GetTeamIdTodos200TodosItem;
}
const taskTitleVariant = cva(
  "truncate text-left text-sm font-medium lg:text-base group-hover:text-orange-600 group-hover:font-semibold pr-4",
  {
    variants: {
      done: {
        true: "text-gray-500",
        false: "text-gray-800",
      },
    },
  },
);

export default function GoalTaskRow({ todo }: GoalTaskRowProps) {
  return (
    <li
      className={cn(
        "flex min-w-0 items-center justify-between gap-4 rounded-[12px] px-1.5 py-1.5 hover:bg-orange-alpha-20 group",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <DashboardCheckbox checked={todo.done} taskId={todo.id} />
        <TaskModal todo={todo}>
          <p className={taskTitleVariant({ done: todo.done })}>{todo.title}</p>
        </TaskModal>
      </div>
      <TaskIcons todo={todo} recentTodo={false} />
    </li>
  );
}
