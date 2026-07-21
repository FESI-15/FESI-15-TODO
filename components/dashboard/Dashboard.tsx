"use client";

import { Flag } from "lucide-react";
import GoalCard from "@/components/dashboard/GoalCard/GoalCard";
import ProgressCard from "@/components/dashboard/ProgressCard/ProgressCard";
import RecentTasksCard from "@/components/dashboard/RecentTasksCard/RecentTasksCard";
import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";
import { useGetTodos } from "@/hooks/queries/todos.bff.hook";
import { usePostAuthLogin } from "@/hooks/queries/auth.bff.hook";
import { useGetGoals } from "@/hooks/queries/goals.bff.hook";

export default function Dashboard() {
  const { data: goals, isLoading: goalsLoading } = useGetGoals();
  const { data: todos, isLoading: todosLoading } = useGetTodos();
  const { mutate: login } = usePostAuthLogin();

  if (todosLoading || goalsLoading) {
    return <main className="min-w-0 flex-1 px-5 py-10">Loading...</main>;
  }

  return (
    <main className="min-w-0 flex-1 px-5 py-10 md:px-8 lg:px-12 xl:px-[88px]">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-8">
        <h1 className="px-2 text-2xl font-semibold text-gray-900">
          체다치즈님의 대시보드
        </h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <RecentTasksCard todos={todos?.data.todos ?? []} />
          <ProgressCard />
        </div>
        <section className="flex flex-col gap-2.5">
          <SectionTitle
            icon={<Flag className="size-6 fill-orange-500 text-orange-500" />}
            iconClassName="bg-[#ffe5b7]"
          >
            목표 별 할일
          </SectionTitle>
          <div className="flex flex-col gap-8">
            {goals?.data.goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      </div>
      <button
        type="button"
        onClick={() =>
          login({
            data: {
              email: "ilhai3@naver.com",
              password: "sks98sk11",
            },
          })
        }
      >
        Login
      </button>
    </main>
  );
}
