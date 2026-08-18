import { format } from "date-fns";
import { CommentUser } from "../CommentUser/CommentUser";
import { GetTeamIdPostsPostIdComments200CommentsItem } from "@/apis/model";
import { useState } from "react";
import { CommentModifyForm } from "../CommentModifyForm/CommentModifyForm";

interface CommentItemProps {
  comment: GetTeamIdPostsPostIdComments200CommentsItem;
  userId: number;
}

export function CommentItem({ comment, userId }: CommentItemProps) {
  const [isModify, setIsModify] = useState(false);
  const handleModify = () => {
    setIsModify(true);
  };
  return (
    <>
      <CommentUser comment={comment} userId={userId} onModify={handleModify} />
      {isModify ? (
        <CommentModifyForm
          postId={comment.postId}
          comment={comment}
          onCancel={() => setIsModify(false)}
        />
      ) : (
        <div>
          <p className="text-gray-700 dark:text-foreground mt-3 text-sm md:text-base">
            {comment.content}
          </p>
          <p className="mt-2 text-gray-400 dark:text-muted-foreground text-xs md:text-sm">
            {format(comment.createdAt, "yyyy.MM.dd")}
          </p>
        </div>
      )}
    </>
  );
}
