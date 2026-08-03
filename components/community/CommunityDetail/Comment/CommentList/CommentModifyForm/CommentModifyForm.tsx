import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/input/FormInput";
import { usePatchComment } from "@/hooks/queries/comments/comments.bff.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetTeamIdPostsPostIdComments200CommentsItem } from "@/apis/model";

const zodSchema = z.object({
  content: z.string().min(1),
});

interface CommentModifyFormProps {
  postId: number;
  comment: GetTeamIdPostsPostIdComments200CommentsItem;
  onCancel: () => void;
}

export function CommentModifyForm({
  postId,
  comment,
  onCancel,
}: CommentModifyFormProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      content: comment.content,
    },
  });
  const { mutate: updateComment, isPending } = usePatchComment(postId);

  const onSubmit = (data: z.infer<typeof zodSchema>) => {
    updateComment(
      {
        postId: postId,
        commentId: comment.id,
        data: { content: data.content },
      },
      {
        onSuccess: () => {
          onCancel();
        },
      },
    );
  };
  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput name="content" control={control} />
      <div className="flex gap-2 justify-end mt-2">
        <Button
          hierarchy="tertiary"
          className="py-2.5 px-5 text-gray-500"
          type="button"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button className="py-2.5 px-5" type="submit" disabled={isPending}>
          수정
        </Button>
      </div>
    </form>
  );
}
