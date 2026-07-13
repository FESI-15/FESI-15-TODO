import Image from "next/image";
import NewTodo from "@/public/icons/sidemenu/new_todo.svg";
export default function SideMenuActions() {
  return (
    <div className="flex items-center gap-2 mt-[94px] md:gap-4">
      <button
        type="button"
        className="flex items-center justify-center gap-1 text-white py-3 flex-1 bg-orange-500 rounded-full md:aspect-square md:rounded-4xl md:flex-col hover:bg-orange-600"
      >
        <Image
          src="/icons/sidemenu/new_goals.svg"
          alt="new_goals"
          className="md:w-10 md:h-10"
          width={24}
          height={24}
        />
        <span className="font-semibold md:text-lg">새 목표</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-1 text-orange-500 py-3 flex-1 bg-white border border-orange-300 rounded-full md:aspect-square md:rounded-4xl md:flex-col hover:bg-gray-50 hover:text-orange-600 hover:border-orange-500"
      >
        <NewTodo className="md:w-10 md:h-10 w-6 h-6" />
        <span className="font-semibold md:text-lg">새 할일</span>
      </button>
    </div>
  );
}
