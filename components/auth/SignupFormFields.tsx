import { Control } from "react-hook-form";

import { FormInput } from "@/components/common/input/FormInput";
import type { SignupFormValues } from "@/components/auth/authForm.types";

interface SignupFormFieldsProps {
  control: Control<SignupFormValues>;
}

export function SignupFormFields({ control }: SignupFormFieldsProps) {
  return (
    <div className="flex w-full flex-col gap-3 md:gap-4">
      <FormInput
        control={control}
        name="name"
        label="이름"
        placeholder="이름을 입력해주세요"
      />
      <FormInput
        control={control}
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
      />
      <FormInput
        control={control}
        name="password"
        variant="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
      />
      <FormInput
        control={control}
        name="passwordConfirm"
        variant="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 한 번 더 입력해주세요"
      />
    </div>
  );
}
