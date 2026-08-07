"use client";

import GoalCard from "@/components/dashboard/GoalCard/GoalCard";
import ProgressCard from "@/components/dashboard/ProgressCard/ProgressCard";
import RecentTasksCard from "@/components/dashboard/RecentTasksCard/RecentTasksCard";
import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";
import { useGetTodos } from "@/hooks/queries/todos/todos.bff.hook";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";
import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import { getGoalProgress } from "@/utils/getGoalProgress";
import useHeaderStore from "@/store/useHeaderStore";
import Image from "next/image";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: goals } = useGetGoals();
  const { data: todos } = useGetTodos();
  const { data: user } = useGetUserMe();
  const progress = getGoalProgress(todos?.data.todos ?? []);
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    if (user?.data.name) setTitle(`${user.data.name}님의 대시보드`);
  }, [user?.data.name, setTitle]);

  return (
    <main className="min-w-0 flex-1 py-8 lg:py-20 px-4 md:px-6">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-8">
        <h1 className="px-2 text-2xl font-semibold text-gray-900 hidden lg:block">
          {user?.data.name}님의 대시보드
        </h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <RecentTasksCard todos={todos?.data.todos ?? []} />
          <ProgressCard title={user?.data.name ?? ""} progress={progress} />
        </div>
        <section className="flex flex-col gap-2.5">
          <SectionTitle
            icon={
              <Image
                className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px]"
                src="/icons/dashboard/goal.svg"
                alt="flag"
                width={40}
                height={40}
              />
            }
          >
            목표 별 할일
          </SectionTitle>
          {goals?.data.goals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[185px] gap-2.5 bg-white rounded-[26px] md:h-[363px] md:gap-4 md:rounded-[32px] lg:h-[428px] lg:rounded-[40px]">
              <Image
                className="md:w-[130px] md:h-[140px]"
                src="/icons/common/no_data.svg"
                alt="flag"
                width={80}
                height={85}
              />
              <p className="text-gray-500 text-sm font-medium md:text-base">
                최근에 등록한 목표가 없어요
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {goals?.data.goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
