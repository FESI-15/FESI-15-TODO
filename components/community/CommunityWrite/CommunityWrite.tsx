"use client";
import { WriteHeader } from "./WriteHeader/WriteHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WriteTitleInput } from "./WriteTitleInput/WriteTitleInput";
import WriteEditor from "./WriteEditor/WriteEditor";
import { ImageUploadInput } from "@/components/common/input/ImageUploadInput/ImageUploadInput";
import { usePostPosts } from "@/hooks/queries/posts/posts.bff.hook";
import { useRouter } from "next/navigation";
import {
  WRITE_FORM_SCHEMA,
  type WriteFormValues,
} from "@/types/communityWriteSchema";
import { showSaveFailureToast, showSaveSuccessToast } from "@/utils/toast";
import { m } from "motion/react";
export function CommunityWrite() {
  const router = useRouter();
  const { mutate } = usePostPosts();
  const { register, handleSubmit, watch, setValue, formState, control } =
    useForm<WriteFormValues>({
      defaultValues: {
        title: "",
        content: "",
        image: null,
      },
      resolver: zodResolver(WRITE_FORM_SCHEMA),
    });

  const onSubmit = (data: WriteFormValues) => {
    mutate(
      {
        data: {
          title: data.title,
          content: data.content,
          image: data.image ?? undefined,
        },
      },
      {
        onSuccess: () => {
          router.push(`/community`);
          showSaveSuccessToast("게시물이 성공적으로 등록되었습니다.");
        },
        onError: () => {
          showSaveFailureToast("게시물 등록에 실패하였습니다.");
        },
      },
    );
  };

  return (
    <div className="max-w-[768px] mx-auto w-full flex flex-col flex-1 p-4 pb-15 md:mt-8 lg:mt-[60px]">
      <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
        <WriteHeader isValid={formState.isValid} />
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-4 bg-white dark:bg-card rounded-[24px] flex-1 flex flex-col"
        >
          <WriteTitleInput register={register} watch={watch} />
          <WriteEditor setValue={setValue} content={watch("content")} />
          <ImageUploadInput control={control} name="image" />
        </m.div>
      </form>
    </div>
  );
}
