"use client";
import { useGetPost, usePatchPost } from "@/hooks/queries/posts/posts.bff.hook";
import { WriteTitleInput } from "../CommunityWrite/WriteTitleInput/WriteTitleInput";
import WriteEditor from "../CommunityWrite/WriteEditor/WriteEditor";
import { ImageUploadInput } from "@/components/common/input/ImageUploadInput/ImageUploadInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WRITE_FORM_SCHEMA,
  type WriteFormValues,
} from "@/types/communityWriteSchema";
import { WriteHeader } from "../CommunityWrite/WriteHeader/WriteHeader";
import { useRouter } from "next/navigation";

interface CommunityEditProps {
  id: number;
}

export function CommunityEdit({ id }: CommunityEditProps) {
  const { data: postData } = useGetPost({ postId: id });
  const { mutate: patchPost } = usePatchPost(id);
  const { register, handleSubmit, watch, setValue, formState, control } =
    useForm<WriteFormValues>({
      defaultValues: {
        title: postData?.data.title || "",
        content: postData?.data.content || "",
        image: postData?.data.image || undefined,
      },
      resolver: zodResolver(WRITE_FORM_SCHEMA),
    });
  const router = useRouter();
  const onSubmit = (data: WriteFormValues) => {
    patchPost(
      {
        postId: id,
        data: data,
      },
      {
        onSuccess: () => {
          router.replace(`/community/${id}`);
        },
      },
    );
  };
  return (
    <div className="max-w-[768px] mx-auto w-full flex flex-col flex-1 p-4 pb-15 md:mt-8 lg:mt-[60px]">
      <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
        <WriteHeader isValid={formState.isValid} isEdit />
        <div className="p-4 bg-white rounded-[24px] flex-1 flex flex-col">
          <WriteTitleInput register={register} watch={watch} />
          <WriteEditor setValue={setValue} content={watch("content")} />
          <ImageUploadInput control={control} name="image" />
        </div>
      </form>
    </div>
  );
}
