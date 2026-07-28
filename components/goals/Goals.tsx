"use client";

import { useGetGoal } from "@/hooks/queries/goals/goals.bff.hook";

export default function Goals({ goalId }: { goalId: number }) {
  const { data: goals } = useGetGoal(goalId);
  return <div>{goals?.data.title}</div>;
}
