import { FormInput } from "@/components/common/input/FormInput";
import Title from "../../../Title";
import type { Control } from "react-hook-form";
import type { TaskFormValues } from "../../TaskFormModal";

interface LinkSectionProps {
  control: Control<TaskFormValues>;
}

export default function LinkSection({ control }: LinkSectionProps) {
  return (
    <FormInput
      label={<Title>링크</Title>}
      control={control}
      name="link"
      variant="link"
    />
  );
}
