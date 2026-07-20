import { TagInput } from "@/components/common/input/TagInput";
import Title from "../../../Title";
import type { Control } from "react-hook-form";
import type { TaskFormValues } from "../../TaskFormModal";

interface TagSectionProps {
  control: Control<TaskFormValues>;
}

export default function TagSection({ control }: TagSectionProps) {
  return (
    <div>
      <Title marginBottom>태그</Title>
      <TagInput control={control} name="tags" />
    </div>
  );
}
