"use client";
import { useForm } from "react-hook-form";
import { WriteTitleInput } from "./WriteTitleInput/WriteTitleInput";
export function WriteFormContainer() {
  const { register, handleSubmit, watch } = useForm<{ title: string }>({
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (data: { title: string }) => {
    console.log(data);
  };
  return (
    <div className="p-4 bg-white rounded-[24px] flex-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <WriteTitleInput register={register} watch={watch} />
      </form>
    </div>
  );
}
