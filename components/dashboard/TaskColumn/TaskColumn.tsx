import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import GoalTaskRow from "@/components/dashboard/TaskColumn/GoalTaskRow/GoalTaskRow";
import { cn } from "@/utils/cn";

interface TaskColumnProps {
  title: string;
  tasks: GetTeamIdTodos200TodosItem[];
  done?: boolean;
}

export default function TaskColumn({
  title,
  tasks,
  done = false,
}: TaskColumnProps) {
  return (
    <div
      className={cn(
        "h-[324px] min-w-0 flex-1 overflow-hidden rounded-3xl p-6",
        done ? "bg-white" : "bg-orange-100",
      )}
    >
      <h4
        className={cn(
          "mb-4 px-2 text-base font-bold",
          done ? "text-gray-400" : "text-orange-600",
        )}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-1">
        {tasks.map((task) => (
          <GoalTaskRow key={task.id} task={task} done={done} />
        ))}
      </ul>
    </div>
  );
}
