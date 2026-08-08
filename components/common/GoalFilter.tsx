"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Dropdown } from "@/components/common/Dropdown";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";
import { cn } from "@/utils/cn";

const ALL_GOALS_ID = 0;

interface GoalFilterValues {
  goalId: number;
}

interface GoalFilterProps {
  goalId: number | undefined;
  onGoalIdChange: (goalId: number | undefined) => void;
  className?: string;
}

export default function GoalFilter({
  goalId,
  onGoalIdChange,
  className,
}: GoalFilterProps) {
  const { data: goals } = useGetGoals();
  const { control } = useForm<GoalFilterValues>({
    defaultValues: { goalId: goalId ?? ALL_GOALS_ID },
  });
  const selectedGoalId = useWatch({ control, name: "goalId" });

  useEffect(() => {
    onGoalIdChange(
      selectedGoalId === ALL_GOALS_ID ? undefined : selectedGoalId,
    );
  }, [selectedGoalId, onGoalIdChange]);

  const options = [
    { id: ALL_GOALS_ID, label: "전체 목표" },
    ...(goals?.data.goals.map((goal) => ({ id: goal.id, label: goal.title })) ??
      []),
  ];

  return (
    <div
      className={cn(
        "relative flex w-full items-center rounded-2xl border border-gray-100 dark:border-border bg-gray-50 dark:bg-card",
        className,
      )}
    >
      <Image
        src="/icons/dashboard/goal.svg"
        alt="목표"
        width={32}
        height={32}
        className="pointer-events-none absolute top-1/2 left-4 size-8 -translate-y-1/2"
      />
      <Dropdown
        control={control}
        name="goalId"
        options={options}
        className="flex-1 rounded-2xl border-none bg-transparent py-4 pr-4 pl-[60px] text-sm shadow-none data-popup-open:border-none data-popup-open:shadow-none md:rounded-2xl md:py-4 md:pr-4 md:pl-[60px] md:text-sm"
      />
    </div>
  );
}
