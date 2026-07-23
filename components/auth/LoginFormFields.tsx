import { Control } from "react-hook-form";

import { FormInput } from "@/components/common/input/FormInput";
import type { LoginFormValues } from "@/components/auth/authForm.types";

interface LoginFormFieldsProps {
  control: Control<LoginFormValues>;
}

export function LoginFormFields({ control }: LoginFormFieldsProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <FormInput
        control={control}
        name="email"
        placeholder="이메일을 입력해주세요"
      />
      <FormInput
        control={control}
        name="password"
        variant="password"
        placeholder="비밀번호를 입력해주세요"
      />
    </div>
  );
}
