"use client";
import { FormInput } from "@/components/common/input/FormInput";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export function CommunityHeader() {
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    router.push(`/community?search=${data.search}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          variant="search"
          placeholder="검색어를 입력해주세요."
          control={control}
          name="search"
        />
      </form>
    </div>
  );
}
