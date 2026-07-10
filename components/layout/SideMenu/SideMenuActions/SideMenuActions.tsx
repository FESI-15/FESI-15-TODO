import Image from "next/image";
export default function SideMenuActions() {
  return (
    <div className="flex items-center gap-2 mt-[94px]">
      <button
        type="button"
        className="flex items-center justify-center gap-1 text-white py-3 flex-1 bg-orange-500 rounded-full"
      >
        <Image
          src="/icons/sidemenu/new_goals.svg"
          alt="new_goals"
          width={24}
          height={24}
        />
        <span className="font-semibold">새 목표</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-1 text-orange-500 py-3 flex-1 bg-white border border-orange-500 rounded-full"
      >
        <Image
          src="/icons/sidemenu/new_todo.svg"
          alt="new_todo"
          width={24}
          height={24}
        />
        <span className="font-semibold">새 할일</span>
      </button>
    </div>
  );
}
