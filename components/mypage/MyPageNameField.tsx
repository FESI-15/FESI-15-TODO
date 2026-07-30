"use client";

import { Control } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/input/FormInput";
import type { MyPageFormValues } from "./myPageForm.types";

interface MyPageNameFieldProps {
  control: Control<MyPageFormValues>;
  isNameChanged: boolean;
  canCheck: boolean;
  isNameAvailable: boolean | undefined;
  onCheck: () => void;
}

export function MyPageNameField({
  control,
  isNameChanged,
  canCheck,
  isNameAvailable,
  onCheck,
}: MyPageNameFieldProps) {
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
          onClick={onCheck}
        >
          중복확인
        </Button>
      </div>
      {isNameChanged && (
        <p
          className={twMerge(
            "min-h-5 px-1 text-sm font-medium",
            isNameAvailable === undefined
              ? ""
              : isNameAvailable
                ? "text-[#009D97]"
                : "text-red-500",
          )}
        >
          {isNameAvailable === undefined
            ? null
            : isNameAvailable
              ? "사용 가능한 이름입니다."
              : "이미 사용 중인 이름입니다."}
        </p>
      )}
    </div>
  );
}
