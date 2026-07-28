import { GetTeamIdTodos200TodosItem } from "@/apis/model";
import GoalTaskRow from "@/components/dashboard/TaskColumn/GoalTaskRow/GoalTaskRow";
import Image from "next/image";

export default function TodoList({
  todos,
}: {
  todos: GetTeamIdTodos200TodosItem[];
}) {
  return (
    <div className="bg-white rounded-[24px] p-4 mt-3 min-h-[640px] md:min-h-[800px] flex flex-col">
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <Image
            className="md:w-[130px] md:h-[140px] "
            src="/icons/common/no_data.svg"
            alt="no data"
            width={80}
            height={85}
          />
          <p className="text-gray-500 text-sm font-medium md:text-base mt-2.5 md:mt-4 md:text-base">
            아직 등록한 할 일이 없어요
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <GoalTaskRow key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
