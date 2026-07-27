import { FormInput } from "@/components/common/input/FormInput";
import Title from "../../../Title";
import type { Control } from "react-hook-form";
import { PostTeamIdTodosBody } from "@/apis/model";

interface LinkSectionProps {
  control: Control<PostTeamIdTodosBody>;
}

export default function LinkSection({ control }: LinkSectionProps) {
  return (
    <FormInput
      label={<Title>링크</Title>}
      control={control}
      name="linkUrl"
      variant="link"
    />
  );
}
