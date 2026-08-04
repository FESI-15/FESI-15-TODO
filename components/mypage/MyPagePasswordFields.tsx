import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "@/components/common/input/FormInput";
import type { MyPageFormValues } from "./myPageForm.types";

interface MyPagePasswordFieldsProps {
  control: Control<MyPageFormValues>;
  errors: FieldErrors<MyPageFormValues>;
}

export function MyPagePasswordFields({
  control,
  errors,
}: MyPagePasswordFieldsProps) {
  const passwordError =
    errors.currentPassword?.message ??
    errors.newPassword?.message ??
    errors.confirmPassword?.message;

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="px-1 text-base font-semibold text-gray-700">
        비밀번호 변경
      </p>
      <div className="flex w-full flex-col gap-3">
        <FormInput
          control={control}
          name="currentPassword"
          variant="password"
          placeholder="현재 비밀번호를 입력해주세요"
          hideError
        />
        <FormInput
          control={control}
          name="newPassword"
          variant="password"
          placeholder="새 비밀번호를 입력해주세요"
          hideError
        />
        <FormInput
          control={control}
          name="confirmPassword"
          variant="password"
          placeholder="새 비밀번호를 다시 입력해주세요"
          hideError
        />
        <p className="min-h-5 px-1 text-sm font-medium text-red-500">
          {passwordError ?? null}
        </p>
      </div>
    </div>
  );
}
