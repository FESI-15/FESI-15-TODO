import Title from "../../../Title";
import { DateInput } from "@/components/common/input/DateInput";
import type { Control } from "react-hook-form";
import type { TaskFormValues } from "../../TaskFormModal";

interface DeadLineProps {
  control: Control<TaskFormValues>;
}

export default function DeadLine({ control }: DeadLineProps) {
  return (
    <div>
      <Title essential marginBottom>
        마감일
      </Title>
      <div>
        <DateInput control={control} name="deadline" />
      </div>
    </div>
  );
}
