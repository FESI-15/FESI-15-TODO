import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
import PlusIcon from "@/public/icons/common/plus.svg";

interface AddGoalTodoButtonProps {
  goalId: number;
}

export default function AddGoalTodoButton({ goalId }: AddGoalTodoButtonProps) {
  return (
    <div>
      <TaskFormModal
        defaultValues={{
          title: "",
          goalId,
          dueDate: "",
          linkUrl: "",
          tags: [],
          fileUrl: "",
        }}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
          <PlusIcon className="size-4" />할 일 추가
        </div>
      </TaskFormModal>
    </div>
  );
}
