"use client";

import { Control, useController } from "react-hook-form";
import { cva } from "class-variance-authority";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/input/FormInput";
import type { MyPageFormValues } from "./myPageForm.types";

const nameAvailabilityTextVariants = cva("min-h-5 px-1 text-sm font-medium", {
  variants: {
    isAvailable: {
      true: "text-[#009D97]",
      false: "text-red-500",
    },
  },
});

interface MyPageNameFieldProps {
  control: Control<MyPageFormValues>;
  isNameChanged: boolean;
  checkedName: string | null;
  isNameAvailable: boolean | undefined;
  onCheck: (name: string) => void;
}

export function MyPageNameField({
  control,
  isNameChanged,
  checkedName,
  isNameAvailable,
  onCheck,
}: MyPageNameFieldProps) {
  const { field } = useController({ control, name: "name" });
  const isChecked = checkedName !== null && checkedName === field.value;
  const canCheck = isNameChanged && field.value.length > 0 && !isChecked;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-end gap-2">
        <FormInput
          control={control}
          name="name"
          label="이름"
          className="flex-1"
        />
        <Button
          type="button"
          hierarchy="secondary"
          className="shrink-0 whitespace-nowrap rounded-[12px] p-3 text-sm md:rounded-[16px] md:p-4 md:text-base lg:text-base"
          disabled={!canCheck}
          onClick={() => onCheck(field.value)}
        >
          중복확인
        </Button>
      </div>
      <p
        className={nameAvailabilityTextVariants({
          isAvailable:
            isChecked && isNameAvailable !== undefined
              ? isNameAvailable
              : undefined,
        })}
      >
        {isChecked && isNameAvailable !== undefined
          ? isNameAvailable
            ? "사용 가능한 이름입니다."
            : "이미 사용 중인 이름입니다."
          : null}
      </p>
    </div>
  );
}
