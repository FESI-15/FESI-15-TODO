import { GetTeamIdTodos200TodosItem } from "@/apis/model";
import GoalFilter from "@/components/common/GoalFilter";
import ListCard from "@/components/common/ListCard";
import { TodoListBody } from "@/components/todos/TodoList/TodoList";

interface FavoritesTodoListProps {
  todos: GetTeamIdTodos200TodosItem[];
  goalId: number | undefined;
  onGoalIdChange: (goalId: number | undefined) => void;
}

export default function FavoritesTodoList({
  todos,
  goalId,
  onGoalIdChange,
}: FavoritesTodoListProps) {
  return (
    <ListCard>
      <div className="mb-5 shrink-0">
        <GoalFilter goalId={goalId} onGoalIdChange={onGoalIdChange} />
      </div>
      <TodoListBody todos={todos} emptyMessage="아직 찜한 할 일이 없어요" />
    </ListCard>
  );
}
