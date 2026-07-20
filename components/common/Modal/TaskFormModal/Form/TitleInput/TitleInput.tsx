import Title from "@/components/common/Modal/Title";
import type { Control } from "react-hook-form";
import type { TaskFormValues } from "../../TaskFormModal";
import { FormInput } from "@/components/common/input/FormInput";

interface TitleInputProps {
  control: Control<TaskFormValues>;
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
