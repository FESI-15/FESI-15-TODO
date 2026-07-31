import { GetTeamIdTodos200TodosItem } from "@/apis/model";
import GoalTaskRow from "@/components/dashboard/TaskColumn/GoalTaskRow/GoalTaskRow";
import ListCard from "@/components/common/ListCard";
import Image from "next/image";

export function TodoListBody({
  todos,
  emptyMessage = "아직 등록한 할 일이 없어요",
}: {
  todos: GetTeamIdTodos200TodosItem[];
  emptyMessage?: string;
}) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Image
          className="md:w-[130px] md:h-[140px] "
          src="/icons/common/no_data.svg"
          alt="no data"
          width={80}
          height={85}
        />
        <p className="text-gray-500 text-sm font-medium md:text-base mt-2.5 md:mt-4 md:text-base">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <GoalTaskRow key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default function TodoList({
  todos,
  emptyMessage,
}: {
  todos: GetTeamIdTodos200TodosItem[];
  emptyMessage?: string;
}) {
  return (
    <ListCard>
      <TodoListBody todos={todos} emptyMessage={emptyMessage} />
    </ListCard>
  );
}
