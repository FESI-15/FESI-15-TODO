interface KebabPopupProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function KebabPopup({ onEdit, onDelete }: KebabPopupProps) {
  return (
    <div className="absolute w-[102px] z-10 top-7 right-0 bg-white rounded-[8px] shadow-md overflow-hidden">
      <button
        type="button"
        onClick={onEdit}
        className="px-1.5 py-1 text-sm text-gray-700 font-medium whitespace-nowrap hover:bg-orange-200 w-full py-2"
      >
        수정하기
      </button>
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
