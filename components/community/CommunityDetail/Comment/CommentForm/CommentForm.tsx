import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/input/FormInput";
import { usePostComments } from "@/hooks/queries/comments/comments.bff.hook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const zodSchema = z.object({
  comment: z.string().min(1, "댓글을 입력해주세요."),
});

type CommentFormValues = z.infer<typeof zodSchema>;

export function CommentForm({ postId }: { postId: number }) {
  const { mutate, isPending } = usePostComments(postId);
  const { control, handleSubmit, reset } = useForm<CommentFormValues>({
    mode: "onSubmit",
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(zodSchema),
  });
  const onSubmit = (data: CommentFormValues) => {
    mutate({
      postId: postId,
      data: {
        content: data.comment,
      },
    });
    reset();
  };
  return (
    <div className="mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-baseline gap-3 md:gap-4"
      >
        <FormInput
          name="comment"
          control={control}
          placeholder="댓글을 입력해주세요."
        />
        <Button
          type="submit"
          className="px-5 shrink-0 md:px-6.5 md:py-3"
          disabled={isPending}
        >
          등록
        </Button>
      </form>
    </div>
  );
}
