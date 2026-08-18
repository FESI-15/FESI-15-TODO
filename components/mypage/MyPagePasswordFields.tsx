import { Control, FieldErrors } from "react-hook-form";
import { m } from "motion/react";
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
      <m.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-1 text-base font-semibold text-gray-700 dark:text-foreground"
      >
        비밀번호 변경
      </m.p>
      <div className="flex w-full flex-col gap-3">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <FormInput
            control={control}
            name="currentPassword"
            variant="password"
            placeholder="현재 비밀번호를 입력해주세요"
            hideError
          />
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <FormInput
            control={control}
            name="newPassword"
            variant="password"
            placeholder="새 비밀번호를 입력해주세요"
            hideError
          />
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        >
          <FormInput
            control={control}
            name="confirmPassword"
            variant="password"
            placeholder="새 비밀번호를 다시 입력해주세요"
            hideError
          />
        </m.div>
        <p className="min-h-5 px-1 text-sm font-medium text-red-500">
          {passwordError ?? null}
        </p>
      </div>
    </div>
  );
}
