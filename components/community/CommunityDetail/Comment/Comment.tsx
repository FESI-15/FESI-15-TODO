import { useGetComments } from "@/hooks/queries/comments/comments.bff.hook";
import { CommentForm } from "./CommentForm/CommentForm";
import { CommentList } from "./CommentList/CommentList";

interface CommentProps {
  postId: number;
  userId: number;
}

export function Comment({ postId, userId }: CommentProps) {
  const { data: commentData } = useGetComments(postId);

  return (
    <div className="mt-10 md:mt-14">
      <div className="font-semibold text-gray-800 flex items-center gap-[2px] md:text-lg md:gap-1">
        댓글 <p className="text-orange-600">{commentData?.data.totalCount}</p>
      </div>
      <CommentForm postId={postId} />
      <CommentList
        comments={commentData?.data.comments || []}
        userId={userId}
      />
    </div>
  );
}
