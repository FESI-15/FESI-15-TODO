import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import AddGoalTodoButton from "../AddGoalTodoButton/AddGoalTodoButton";
import GoalTodoColumn from "../GoalTodoColumn/GoalTodoColumn";

interface GoalTodoListProps {
  goalId: number;
  todos: GetTeamIdTodos200TodosItem[];
}

export default function GoalTodoList({ goalId, todos }: GoalTodoListProps) {
  const todoItems = todos.filter((todo) => !todo.done);
  const doneItems = todos.filter((todo) => todo.done);

  return (
    <div className="mt-12 flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
      <div className="min-w-0">
        <div className="mb-3 flex h-10 items-center justify-between px-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-foreground">
            TO DO
          </h3>
          <div className="flex items-center gap-2">
            <AddGoalTodoButton goalId={goalId} />
          </div>
        </div>
        <GoalTodoColumn
          title="TO DO"
          todos={todoItems}
          showMobileTitle={false}
        />
      </div>
      <div className="min-w-0">
        <div className="mb-3 hidden h-10 items-center px-2 lg:flex">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-foreground">
            DONE
          </h3>
        </div>
        <GoalTodoColumn title="DONE" todos={doneItems} />
      </div>
    </div>
  );
}
