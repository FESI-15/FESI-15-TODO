"use client";

import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import GoalCard from "./GoalCard/GoalCard";
import MoreIcon from "../dashboard/TaskIcons/MoreIcon/MoreIcon";

export default function Goals({ goalId }: { goalId: number }) {
  const { data: userMe } = useGetUserMe();

  return (
    <div className="p-4">
      <h2 className="text-gray-700 font-semibold mb-3">
        {userMe?.data.name}님의 목표
      </h2>
      <GoalCard goalId={goalId} />
    </div>
  );
}
