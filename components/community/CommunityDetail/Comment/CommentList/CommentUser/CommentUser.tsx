import { GetTeamIdPostsPostIdComments200CommentsItem } from "@/apis/model";
import { Badge } from "@/components/common/Badge";
import KebabButton from "@/components/common/KebabButton/KebabButton";
import { useDeleteComment } from "@/hooks/queries/comments/comments.bff.hook";
import Image from "next/image";

interface CommentUserProps {
  comment: GetTeamIdPostsPostIdComments200CommentsItem;
  userId: number;
  onModify: () => void;
}

export function CommentUser({ comment, userId, onModify }: CommentUserProps) {
  const { mutate: deleteComment } = useDeleteComment(comment.postId);
  const handleDelete = () => {
    deleteComment({ postId: comment.postId, commentId: comment.id });
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="size-5 rounded-full overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            src={comment.writer.image || "/images/sidemenu/profile.png"}
            alt={comment.writer.name}
            width={20}
            height={20}
          />
        </div>
        <p className="text-xs text-gray-500">{comment.writer.name}</p>
        {userId === comment.writer.id && (
          <Badge variant="yellow">내 댓글</Badge>
        )}
      </div>
      <KebabButton
        variant="goal"
        onEdit={onModify}
        onDelete={handleDelete}
        className="size-5"
      />
    </div>
  );
}
