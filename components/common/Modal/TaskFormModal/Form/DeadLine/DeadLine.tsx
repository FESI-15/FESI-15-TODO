import Title from "../../../Title";
import { DateInput } from "@/components/common/input/DateInput";
import type { Control } from "react-hook-form";
import { PostTeamIdTodosBody } from "@/apis/model";

interface DeadLineProps {
  control: Control<PostTeamIdTodosBody>;
}

export default function DeadLine({ control }: DeadLineProps) {
  return (
    <div>
      <Title marginBottom>마감일</Title>
      <div>
        <DateInput control={control} name="dueDate" />
      </div>
    </div>
  );
}
