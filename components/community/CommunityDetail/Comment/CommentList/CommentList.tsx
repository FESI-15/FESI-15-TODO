import type { GetTeamIdPostsPostIdComments200CommentsItem } from "@/apis/model";
import { CommentItem } from "./CommentItem/CommentItem";
import { m } from "motion/react";
interface CommentListProps {
  comments: GetTeamIdPostsPostIdComments200CommentsItem[];
  userId: number;
}

export function CommentList({ comments, userId }: CommentListProps) {
  if (comments.length === 0) return null;
  return (
    <ul className="flex flex-col gap-8 mt-6">
      {comments.map((comment, index) => (
        <m.li
          key={comment.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
        >
          <CommentItem comment={comment} userId={userId} />
        </m.li>
      ))}
    </ul>
  );
}
