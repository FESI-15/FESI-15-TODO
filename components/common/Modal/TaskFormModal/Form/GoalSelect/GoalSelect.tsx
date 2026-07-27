import Title from "../../../Title";
import { Dropdown } from "@/components/common/Dropdown";
import type { Control } from "react-hook-form";
import { PostTeamIdTodosBody } from "@/apis/model";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";

interface GoalSelectProps {
  control: Control<PostTeamIdTodosBody>;
}

export default function GoalSelect({ control }: GoalSelectProps) {
  const { data: goals, isLoading } = useGetGoals();
  if (isLoading) return null;
  return (
    <div>
      <Title marginBottom>목표</Title>
      <div>
        <Dropdown
          control={control}
          name="goalId"
          options={
            goals?.data.goals.map((goal) => ({
              id: goal.id,
              label: goal.title,
            })) || []
          }
        />
      </div>
    </div>
  );
}
