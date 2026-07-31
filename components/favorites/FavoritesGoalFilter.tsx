"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Dropdown } from "@/components/common/Dropdown";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";

const ALL_GOALS_ID = 0;

interface FavoritesGoalFilterValues {
  goalId: number;
}

interface FavoritesGoalFilterProps {
  goalId: number | undefined;
  onGoalIdChange: (goalId: number | undefined) => void;
}

export default function FavoritesGoalFilter({
  goalId,
  onGoalIdChange,
}: FavoritesGoalFilterProps) {
  const { data: goals } = useGetGoals();
  const { control } = useForm<FavoritesGoalFilterValues>({
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
    <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2 ">
      <Image
        src="/icons/dashboard/goal.svg"
        alt="목표"
        width={32}
        height={32}
        className="size-8 shrink-0"
      />
      <Dropdown
        control={control}
        name="goalId"
        options={options}
        className="flex-1 rounded-2xl border-none bg-transparent p-0 text-sm shadow-none md:rounded-2xl md:p-0 md:text-sm"
      />
    </div>
  );
}
