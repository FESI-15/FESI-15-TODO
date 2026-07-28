import { GetTeamIdTodos200TodosItem } from "@/apis/model";
import GoalTaskRow from "@/components/dashboard/TaskColumn/GoalTaskRow/GoalTaskRow";

export default function TodoList({
  todos,
}: {
  todos: GetTeamIdTodos200TodosItem[];
}) {
  return (
    <div className="bg-white rounded-[24px] p-4 mt-3 min-h-[640px]">
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <GoalTaskRow key={todo.id} task={todo} />
        ))}
      </ul>
    </div>
  );
}
