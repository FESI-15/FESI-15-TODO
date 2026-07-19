import CheckboxBasic from "@/components/common/CheckboxBasic";
import Title from "@/components/common/Modal/Title";
import type { Control } from "react-hook-form";
import type { TaskFormValues } from "../../TaskFormModal";

interface StatusProps {
  control: Control<TaskFormValues>;
}

export default function Status({ control }: StatusProps) {
  return (
    <div>
      <Title essential marginBottom>
        상태
      </Title>
      <div className="flex gap-3 items-center ">
        <CheckboxBasic
          control={control}
          name="status"
          value="to do"
          label="To do"
        />
        <CheckboxBasic
          control={control}
          name="status"
          value="done"
          label="done"
        />
      </div>
    </div>
  );
}
