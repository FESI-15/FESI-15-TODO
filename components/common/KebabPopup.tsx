import TaskFormModal from "./Modal/TaskFormModal/TaskFormModal";

interface KebabPopupProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function KebabPopup({ onEdit, onDelete }: KebabPopupProps) {
  return (
    <div className="absolute w-[102px] z-10 top-7 right-0 bg-white rounded-[8px] shadow-md overflow-hidden">
      <TaskFormModal isModify={true}>
        <p className="px-1.5 py-1 text-sm text-gray-700 font-medium whitespace-nowrap hover:bg-orange-200 w-full py-2">
          수정하기
        </p>
      </TaskFormModal>
      <button
        type="button"
        onClick={onDelete}
        className="px-1.5 py-1 text-sm text-gray-700 font-medium whitespace-nowrap hover:bg-orange-200 w-full py-2"
      >
        삭제하기
      </button>
    </div>
  );
}
