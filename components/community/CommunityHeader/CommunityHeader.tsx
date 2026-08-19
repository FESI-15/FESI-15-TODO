"use client";
import { FormInput } from "@/components/common/input/FormInput";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { m } from "motion/react";

export function CommunityHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  });
  const onSubmit = (data: FieldValues) => {
    router.push(`/community?search=${data.search}`);
  };
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          variant="search"
          placeholder="검색어를 입력해주세요."
          control={control}
          name="search"
        />
      </form>
    </m.div>
  );
}
