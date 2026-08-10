import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
import PlusIcon from "@/public/icons/common/plus.svg";

export default function AddTodoButton() {
  return (
    <TaskFormModal>
      <div className="inline-flex items-center gap-2 text-gray-500 dark:text-muted-foreground py-2.5 px-3 border border-gray-300 dark:border-border rounded-full hover:text-gray-600 hover:border-[#bbb] dark:hover:text-foreground dark:hover:border-muted-foreground">
        <PlusIcon className="size-5" />
        <p className="text-sm font-semibold">할 일 추가</p>
      </div>
    </TaskFormModal>
  );
}
