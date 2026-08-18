import { useState } from "react";
import { GetTeamIdTodos200TodosItem } from "@/apis/model";
import GoalTaskRow from "@/components/dashboard/TaskColumn/GoalTaskRow/GoalTaskRow";
import ListCard from "@/components/common/ListCard";
import Image from "next/image";
import { m, type Variants } from "motion/react";

const taskListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

interface TodoListProps {
  todos: GetTeamIdTodos200TodosItem[];
  emptyMessage?: string;
  filterSlot?: React.ReactNode;
  animated?: boolean;
}

export default function TodoList({
  todos,
  emptyMessage = "아직 등록한 할 일이 없어요",
  filterSlot,
  animated = false,
}: TodoListProps) {
  const [initialIds, setInitialIds] = useState<Set<number> | null>(null);

  if (initialIds === null && todos.length > 0) {
    setInitialIds(new Set(todos.map((todo) => todo.id)));
  }

  return (
    <ListCard>
      {filterSlot && <div className="mb-5 shrink-0">{filterSlot}</div>}
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <Image
            className="md:w-[130px] md:h-[140px] "
            src="/icons/common/no_data.svg"
            alt="no data"
            width={80}
            height={85}
          />
          <p className="text-gray-500 dark:text-muted-foreground text-sm font-medium md:text-base mt-2.5 md:mt-4 md:text-base">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <m.ul
          className="flex flex-col gap-2"
          variants={animated ? taskListVariants : undefined}
          initial={animated ? "hidden" : undefined}
          animate={animated ? "visible" : undefined}
        >
          {todos.map((todo) => (
            <GoalTaskRow
              key={todo.id}
              todo={todo}
              skipEnterAnimation={
                animated && initialIds !== null && !initialIds.has(todo.id)
              }
            />
          ))}
        </m.ul>
      )}
    </ListCard>
  );
}
