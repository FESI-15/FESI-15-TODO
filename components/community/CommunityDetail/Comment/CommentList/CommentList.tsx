import type { GetTeamIdPostsPostIdComments200CommentsItem } from "@/apis/model";
import { CommentItem } from "./CommentItem/CommentItem";

interface CommentListProps {
  comments: GetTeamIdPostsPostIdComments200CommentsItem[];
  userId: number;
}

export function CommentList({ comments, userId }: CommentListProps) {
  if (comments.length === 0) return null;
  return (
    <ul className="flex flex-col gap-8 mt-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={userId} />
      ))}
    </ul>
  );
}
