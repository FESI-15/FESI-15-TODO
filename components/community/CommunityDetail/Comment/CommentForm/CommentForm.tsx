import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/input/FormInput";
import { usePostComments } from "@/hooks/queries/comments/comments.bff.hook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const zodSchema = z.object({
  comment: z.string().min(1),
});

type CommentFormValues = z.infer<typeof zodSchema>;

export function CommentForm({ postId }: { postId: number }) {
  const mutate = usePostComments(postId);
  const { control, handleSubmit } = useForm<CommentFormValues>({
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(zodSchema),
  });
  const onSubmit = (data: CommentFormValues) => {
    mutate.mutate({
      postId: postId,
      data: {
        content: data.comment,
      },
    });
  };
  return (
    <div className="mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3"
      >
        <FormInput
          name="comment"
          control={control}
          placeholder="댓글을 입력해주세요."
        />
        <div className="w-16 shrink-0">
          <Button type="submit" className="w-full">
            등록
          </Button>
        </div>
      </form>
    </div>
  );
}
