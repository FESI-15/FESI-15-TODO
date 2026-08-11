import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import GoalTaskRow from "@/components/dashboard/TaskColumn/GoalTaskRow/GoalTaskRow";
import Image from "next/image";

interface GoalTodoColumnProps {
  title: "TO DO" | "DONE";
  todos: GetTeamIdTodos200TodosItem[];
  showMobileTitle?: boolean;
}

const emptyMessage = {
  "TO DO": "해야할 일이 아직 없어요.",
  DONE: "완료한 일이 아직 없어요.",
};

export default function GoalTodoColumn({
  title,
  todos,
  showMobileTitle = true,
}: GoalTodoColumnProps) {
  return (
    <section className="min-w-0 flex-1">
      {showMobileTitle && (
        <div className="mb-2 md:mb-3 flex h-10 items-center px-2 lg:hidden">
          <h3 className="md:text-lg font-semibold text-gray-800 dark:text-foreground">
            {title}
          </h3>
        </div>
      )}
      <div
        className={cn(
          "flex min-h-[360px] flex-col rounded-[24px] bg-white dark:bg-card p-4 md:min-h-[480px] lg:min-h-[576px] lg:rounded-[32px] lg:px-7 lg:py-8",
          title === "TO DO" && "bg-[#fff8e7] dark:bg-[#2e2720]",
        )}
      >
        {todos.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <GoalTaskRow todo={todo} key={todo.id} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2.5 text-sm font-medium text-gray-400 dark:text-muted-foreground md:text-base md:gap-4">
            <Image
              className="md:w-[130px] md:h-[140px]"
              src="/icons/common/no_data.svg"
              alt="flag"
              width={80}
              height={85}
            />
            {emptyMessage[title]}
          </div>
        )}
      </div>
    </section>
  );
}
