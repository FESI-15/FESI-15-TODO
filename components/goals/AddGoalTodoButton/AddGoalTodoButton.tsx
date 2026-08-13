import PlusIcon from "@/public/icons/common/plus.svg";
import dynamic from "next/dynamic";
import { useState } from "react";

interface AddGoalTodoButtonProps {
  goalId: number;
}

const TaskFormModal = dynamic(
  () => import("@/components/common/Modal/TaskFormModal/TaskFormModal"),
  {
    ssr: false,
  },
);

export default function AddGoalTodoButton({ goalId }: AddGoalTodoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
      >
        <PlusIcon className="size-4" />할 일 추가
      </button>
      {isOpen && (
        <TaskFormModal
          open={isOpen}
          onOpenChange={setIsOpen}
          defaultValues={{
            title: "",
            goalId,
            dueDate: "",
            linkUrl: "",
            tags: [],
            fileUrl: "",
          }}
        />
      )}
    </div>
  );
}
