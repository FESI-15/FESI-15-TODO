import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import GoalTaskRow from "@/components/dashboard/TaskColumn/GoalTaskRow/GoalTaskRow";

interface GoalTodoColumnProps {
  title: "TO DO" | "DONE";
  todos: GetTeamIdTodos200TodosItem[];
  showMobileTitle?: boolean;
}

export default function GoalTodoColumn({
  title,
  todos,
  showMobileTitle = true,
}: GoalTodoColumnProps) {
  return (
    <section className="min-w-0 flex-1">
      {showMobileTitle && (
        <div className="mb-3 flex h-10 items-center px-2 lg:hidden">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div
        className={cn(
          "flex min-h-[360px] flex-col rounded-[24px] bg-white p-4 md:min-h-[480px] lg:min-h-[576px] lg:rounded-[32px] lg:px-7 lg:py-8",
          title === "TO DO" && "bg-[#fff8e7]",
        )}
      >
        {todos.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <GoalTaskRow todo={todo} key={todo.id} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm font-medium text-gray-400">
            할 일이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
