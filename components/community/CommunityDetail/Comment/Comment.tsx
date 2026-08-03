import { useGetComments } from "@/hooks/queries/comments/comments.bff.hook";
import { CommentForm } from "./CommentForm/CommentForm";

interface CommentProps {
  postId: number;
}

export function Comment({ postId }: CommentProps) {
  const { data: commentData } = useGetComments(postId);
  return (
    <div className="mt-10">
      <div className="font-semibold text-gray-800 flex items-center gap-[2px]">
        댓글 <p className="text-orange-600">{commentData?.data.totalCount}</p>
      </div>
      <CommentForm postId={postId} />
    </div>
  );
}
