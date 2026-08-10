import NewTodo from "@/public/icons/sidemenu/new_todo.svg";
import GoalsModal from "@/components/common/Modal/GoalsModal/GoalsModal";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
import NewGoalButton from "./NewGoalButton/NewGoalButton";
import { useState } from "react";
export default function SideMenuActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 lg:gap-4 lg:mt-0 mt-10">
      <GoalsModal open={open} onOpenChange={setOpen}>
        <NewGoalButton />
      </GoalsModal>
      <TaskFormModal>
        <div className="flex items-center w-full lg:w-[120px] justify-center gap-1 text-orange-500 dark:text-foreground py-3 flex-1 bg-white dark:bg-card border border-orange-300 dark:border-border rounded-full lg:aspect-square lg:rounded-4xl lg:flex-col hover:bg-gray-50 dark:hover:bg-accent hover:text-orange-600 hover:border-orange-500">
          <NewTodo className="lg:w-10 lg:h-10 w-6 h-6" />
          <span className="font-semibold md:text-lg">새 할일</span>
        </div>
      </TaskFormModal>
    </div>
  );
}
