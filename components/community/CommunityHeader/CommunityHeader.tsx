"use client";
import { FormInput } from "@/components/common/input/FormInput";
import { useForm } from "react-hook-form";

export function CommunityHeader() {
  const { control } = useForm();
  return (
    <div>
      <FormInput
        variant="search"
        placeholder="검색어를 입력해주세요."
        control={control}
        name="search"
      />
    </div>
  );
}
