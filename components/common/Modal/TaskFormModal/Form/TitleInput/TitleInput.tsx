import Title from "@/components/common/Modal/Title";
import type { Control } from "react-hook-form";
import { PostTeamIdTodosBody } from "@/apis/model";
import { FormInput } from "@/components/common/input/FormInput";

interface TitleInputProps {
  control: Control<PostTeamIdTodosBody>;
}
export default function TitleInput({ control }: TitleInputProps) {
  return (
    <div>
      <FormInput
        label={<Title essential>제목</Title>}
        control={control}
        name="title"
        placeholder="할 일의 제목을 입력해주세요."
      />
    </div>
  );
}
