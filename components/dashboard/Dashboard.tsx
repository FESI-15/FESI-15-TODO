"use client";

import { Flag } from "lucide-react";
import GoalCard from "@/components/dashboard/GoalCard/GoalCard";
import ProgressCard from "@/components/dashboard/ProgressCard/ProgressCard";
import RecentTasksCard from "@/components/dashboard/RecentTasksCard/RecentTasksCard";
import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";
import { usePostAuthLogin } from "@/hooks/queries/auth/auth.bff.hook";
import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import Image from "next/image";

export default function Dashboard() {
  const { data: goals, isLoading: goalsLoading } = useGetGoals();
  const { data: todos, isLoading: todosLoading } = useGetTodos();
  const { data: user, isLoading: userLoading } = useGetUserMe();
  const { mutate: login } = usePostAuthLogin();

  return (
    <main className="min-w-0 flex-1 px-5 py-10 md:px-8 lg:px-12 xl:px-[88px]">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-8">
        <h1 className="px-2 text-2xl font-semibold text-gray-900">
          {user?.data.name}님의 대시보드
        </h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <RecentTasksCard todos={todos?.data.todos ?? []} />
          <ProgressCard title={user?.data.name ?? ""} />
        </div>
        <section className="flex flex-col gap-2.5">
          <SectionTitle
            icon={
              <Image
                src="/icons/dashboard/goal.svg"
                alt="flag"
                width={40}
                height={40}
              />
            }
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
