import { useForm } from "react-hook-form";
import type {
  GetTeamIdGoals200GoalsItem,
  GetTeamIdTodos200TodosItem,
} from "@/apis/model";
import GoalHeader from "@/components/dashboard/GoalCard/GoalHeader";
import TaskColumn from "../TaskColumn/TaskColumn";
import { getGoalProgress } from "@/utils/getGoalProgress";

interface GoalCardProps {
  goal: GetTeamIdGoals200GoalsItem;
  todos: GetTeamIdTodos200TodosItem[];
}

export default function GoalCard({ goal, todos }: GoalCardProps) {
  const { control, watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });
  const keyword = watch("search");

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(keyword.toLowerCase()),
  );
  const todoTasks = filteredTodos?.filter((todo) => !todo.done);
  const doneTasks = filteredTodos?.filter((todo) => todo.done);
  const progress = getGoalProgress(todos);

  return (
    <article className="rounded-[40px] bg-white dark:bg-card px-5 py-6 lg:px-8">
      <GoalHeader title={goal.title} progress={progress} control={control} />
      <div className="mt-4 flex flex-col gap-8 md:flex-row">
        <TaskColumn title="TO DO" tasks={todoTasks || []} />
        <TaskColumn title="DONE" tasks={doneTasks || []} done />
      </div>
    </article>
  );
}
