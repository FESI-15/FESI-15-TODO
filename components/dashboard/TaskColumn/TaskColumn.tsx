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
        "min-w-0 flex-1 rounded-3xl p-4 lg:p-6 flex flex-col",
        done ? "bg-white dark:bg-card" : "bg-orange-100 dark:bg-[#2e2720]",
      )}
    >
      <h4
        className={cn(
          "mb-2 lg:mb-4 lg:px-2 text-base font-bold",
          done
            ? "text-gray-400 dark:text-muted-foreground"
            : "text-orange-600 dark:text-[#fb7d39]",
        )}
      >
        {title}
      </h4>
      {tasks.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-400 dark:text-muted-foreground">
            할일이 없습니다.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1">
          {tasks.map((todo) => (
            <GoalTaskRow key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
