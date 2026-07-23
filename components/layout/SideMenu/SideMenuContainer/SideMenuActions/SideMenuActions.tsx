import NewTodo from "@/public/icons/sidemenu/new_todo.svg";
import GoalsModal from "@/components/common/Modal/GoalsModal/GoalsModal";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
export default function SideMenuActions() {
  return (
    <div className="flex items-center gap-2 md:gap-4 md:mt-0 mt-10">
      <GoalsModal />
      <TaskFormModal>
        <div className="flex items-center justify-center gap-1 text-orange-500 py-3 flex-1 bg-white border border-orange-300 rounded-full md:aspect-square md:rounded-4xl md:flex-col hover:bg-gray-50 hover:text-orange-600 hover:border-orange-500">
          <NewTodo className="md:w-10 md:h-10 w-6 h-6" />
          <span className="font-semibold md:text-lg">새 할일</span>
        </div>
      </TaskFormModal>
    </div>
  );
}
