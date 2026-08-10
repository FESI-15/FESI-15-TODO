import {
  GetTeamIdGoals200GoalsItem,
  GetTeamIdTodos200TodosItem,
} from "@/apis/model";
import GoalCard from "../GoalCard/GoalCard";
import Image from "next/image";

interface GoalCardListProps {
  goals: GetTeamIdGoals200GoalsItem[];
  todos: GetTeamIdTodos200TodosItem[];
}

export default function GoalCardList({ goals, todos }: GoalCardListProps) {
  return goals.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-[185px] gap-2.5 bg-white dark:bg-card rounded-[26px] md:h-[363px] md:gap-4 md:rounded-[32px] lg:h-[428px] lg:rounded-[40px]">
      <Image
        className="md:w-[130px] md:h-[140px]"
        src="/icons/common/no_data.svg"
        alt="flag"
        width={80}
        height={85}
      />
      <p className="text-gray-500 dark:text-muted-foreground text-sm font-medium md:text-base">
        최근에 등록한 목표가 없어요
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-8">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          todos={todos.filter((todo) => todo.goal?.id === goal.id)}
        />
      ))}
    </div>
  );
}
