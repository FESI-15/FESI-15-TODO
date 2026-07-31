"use client";
import { WriteHeader } from "./WriteHeader/WriteHeader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WriteTitleInput } from "./WriteTitleInput/WriteTitleInput";
import WriteEditor from "./WriteEditor/WriteEditor";
import { ImageUploadInput } from "@/components/common/input/ImageUploadInput/ImageUploadInput";
import { usePostPosts } from "@/hooks/queries/posts/posts.bff.hook";
import { useRouter } from "next/navigation";
import {
  showSaveSuccessToast,
  showSaveFailureToast,
} from "@/components/mypage/toast";

export const WRITE_FORM_SCHEMA = z.object({
  title: z.string().min(1).max(30),
  content: z.string().min(1),
  image: z.string().optional(),
});

export function CommunityWrite() {
  const router = useRouter();
  const { mutate } = usePostPosts();
  const { register, handleSubmit, watch, setValue, formState, control } =
    useForm<z.infer<typeof WRITE_FORM_SCHEMA>>({
      defaultValues: {
        title: "",
        content: "",
        image: undefined,
      },
      resolver: zodResolver(WRITE_FORM_SCHEMA),
    });

  const onSubmit = (data: z.infer<typeof WRITE_FORM_SCHEMA>) => {
    mutate(
      {
        data: {
          title: data.title,
          content: data.content,
          image: data.image,
        },
      },
      {
        onSuccess: () => {
          router.push(`/community`);
          showSaveSuccessToast();
        },
        onError: () => {
          showSaveFailureToast();
        },
      },
    );
  };
  return (
    <div className="max-w-[768px] mx-auto w-full flex flex-col flex-1 p-4 pb-15 md:mt-8 lg:mt-[60px]">
      <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
        <WriteHeader isValid={formState.isValid} />
        <div className="p-4 bg-white rounded-[24px] flex-1 flex flex-col">
          <WriteTitleInput register={register} watch={watch} />
          <WriteEditor setValue={setValue} />
          <ImageUploadInput control={control} name="image" />
        </div>
      </form>
    </div>
  );
}
