import { format } from "date-fns";
import { CommentUser } from "../CommentUser/CommentUser";
import { GetTeamIdPostsPostIdComments200CommentsItem } from "@/apis/model";
import { useState } from "react";

interface CommentItemProps {
  comment: GetTeamIdPostsPostIdComments200CommentsItem;
  userId: number;
}

export function CommentItem({ comment, userId }: CommentItemProps) {
  const [isModify, setIsModify] = useState(false);
  const handleModify = () => {
    setIsModify(true);
  };
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <li>
      <CommentUser comment={comment} userId={userId} />
      <p className="text-gray-700 mt-3 text-sm">{comment.content}</p>
      <p className="mt-2 text-gray-400 text-xs">
        {format(comment.createdAt, "yyyy.MM.dd")}
      </p>
    </li>
  );
}
