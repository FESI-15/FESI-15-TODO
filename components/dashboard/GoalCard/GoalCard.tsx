import type { GetTeamIdGoals200GoalsItem } from "@/apis/model";
import GoalHeader from "@/components/dashboard/GoalCard/GoalHeader";
import TaskColumn from "../TaskColumn/TaskColumn";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";

interface GoalCardProps {
  goal: GetTeamIdGoals200GoalsItem;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const { data: todos, isLoading: todosLoading } = useGetTodos({
    goalId: goal.id,
  });

  if (todosLoading) return <div>Loading...</div>;

  const todoTasks = todos?.data.todos.filter((todo) => !todo.done);
  const doneTasks = todos?.data.todos.filter((todo) => todo.done);

  return (
    <article className="rounded-[40px] bg-white px-5 py-6 lg:px-8">
      <GoalHeader title={goal.title} />
      <div className="mt-4 flex flex-col gap-8 md:flex-row">
        <TaskColumn
          title="TO DO"
          tasks={todoTasks || []}
          goalTitle={goal.title}
        />
        <TaskColumn
          title="DONE"
          tasks={doneTasks || []}
          goalTitle={goal.title}
          done
        />
      </div>
    </article>
  );
}
