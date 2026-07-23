import DashboardCheckbox from "@/components/dashboard/DashBoardCheckbox/DashBoardCheckbox";
import TaskIcons from "@/components/dashboard/TaskIcons/TaskIcons";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";
import { useGetTodo } from "@/hooks/queries/todos/todos.bff.hook";
import { cva } from "class-variance-authority";

interface GoalTaskRowProps {
  task: GetTeamIdTodos200TodosItem;
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

export default function GoalTaskRow({ task }: GoalTaskRowProps) {
  const {
    data: todo,
    isFetching,
    refetch,
  } = useGetTodo({ todoId: task.id }, false);

  const handleLoadTaskModal = () => {
    if (todo || isFetching) {
      return;
    }

    refetch();
  };

  return (
    <li
      className={cn(
        "flex min-w-0 items-center justify-between gap-4 rounded-xl px-2 py-2.5 hover:bg-orange-alpha-20 group",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <DashboardCheckbox checked={task.done} taskId={task.id} />
        <TaskModal
          todo={todo?.data}
          isLoading={isFetching}
          onTriggerMouseEnter={handleLoadTaskModal}
        >
          <p className={taskTitleVariant({ done: task.done })}>{task.title}</p>
        </TaskModal>
      </div>
      <TaskIcons task={task} recentTodo={false} />
    </li>
  );
}
