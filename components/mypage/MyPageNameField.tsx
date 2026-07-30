"use client";

import { useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormInput } from "@/components/common/input/FormInput";
import { useGetUsersCheckNickname } from "@/hooks/queries/users/users.bff.hook";
import type { MyPageFormValues } from "./myPageForm.types";

const NICKNAME_CHECK_DEBOUNCE_MS = 400;

interface MyPageNameFieldProps {
  control: Control<MyPageFormValues>;
  savedName?: string;
}

export function MyPageNameField({ control, savedName }: MyPageNameFieldProps) {
  const nameValue = useWatch({ control, name: "name" });
  const [debouncedName, setDebouncedName] = useState(nameValue);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedName(nameValue),
      NICKNAME_CHECK_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [nameValue]);

  const isNameChanged = savedName !== undefined && debouncedName !== savedName;
  const { data: nicknameCheck } = useGetUsersCheckNickname({
    name: isNameChanged ? debouncedName : "",
  });
  const isNameAvailable = nicknameCheck?.data.available;

  return (
    <div className="flex w-full flex-col gap-2">
      <FormInput control={control} name="name" label="이름" />
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
