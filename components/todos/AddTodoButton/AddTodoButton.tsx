import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
import PlusIcon from "@/public/icons/common/plus.svg";

export default function AddTodoButton() {
  return (
    <TaskFormModal>
      <div className="inline-flex items-center gap-2 text-gray-500 py-2.5 px-3 border border-gray-300 rounded-full hover:text-gray-600 hover:border-[#bbb]">
        <PlusIcon />
        <p className="text-sm font-semibold">할 일 추가</p>
      </div>
    </TaskFormModal>
  );
}
