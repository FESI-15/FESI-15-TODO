import NewTodo from "@/public/icons/sidemenu/new_todo.svg";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const TaskFormModal = dynamic(
  () => import("@/components/common/Modal/TaskFormModal/TaskFormModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

const GoalsModal = dynamic(
  () => import("@/components/common/Modal/GoalsModal/GoalsModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function SideMenuActions() {
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [todoModalOpen, setTodoModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 lg:gap-4 lg:mt-0 mt-10">
      <button
        type="button"
        onClick={() => setGoalModalOpen(true)}
        className="flex w-full lg:w-[140px] items-center justify-center gap-1 text-white py-3 flex-1 bg-orange-500 rounded-full hover:bg-orange-600"
      >
        <Image
          src="/icons/sidemenu/new_goals.svg"
          alt="new_goals"
          width={24}
          height={24}
        />
        <span className="font-semibold md:text-lg">새 목표</span>
      </button>
      <button
        type="button"
        onClick={() => setTodoModalOpen(true)}
        className="flex items-center w-full lg:w-[140px] justify-center gap-1 text-orange-500 dark:text-foreground py-3 flex-1 bg-white dark:bg-card border border-orange-300 dark:border-border rounded-full hover:bg-gray-50 dark:hover:bg-accent hover:text-orange-600 hover:border-orange-500"
      >
        <NewTodo className="w-6 h-6" />
        <span className="font-semibold md:text-lg">새 할일</span>
      </button>
      {goalModalOpen && (
        <GoalsModal open={goalModalOpen} onOpenChange={setGoalModalOpen} />
      )}
      {todoModalOpen && (
        <TaskFormModal open={todoModalOpen} onOpenChange={setTodoModalOpen} />
      )}
    </div>
  );
}
