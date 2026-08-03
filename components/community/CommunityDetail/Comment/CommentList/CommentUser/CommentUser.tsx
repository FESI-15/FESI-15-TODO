import { GetTeamIdPostsPostIdComments200CommentsItem } from "@/apis/model";
import { Badge } from "@/components/common/Badge";
import KebabButton from "@/components/common/KebabButton/KebabButton";
import { useDeleteComment } from "@/hooks/queries/comments/comments.bff.hook";
import { Author } from "@/components/common/Author";

interface CommentUserProps {
  comment: GetTeamIdPostsPostIdComments200CommentsItem;
  userId: number;
  onModify: () => void;
}

export function CommentUser({ comment, userId, onModify }: CommentUserProps) {
  const { mutate: deleteComment } = useDeleteComment(comment.postId);
  const isAuthor = userId === comment.writer.id;
  const handleDelete = () => {
    deleteComment({ postId: comment.postId, commentId: comment.id });
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Author
          image={comment.writer.image || ""}
          name={comment.writer.name}
          size="sm"
        />
        {isAuthor && <Badge variant="yellow">내 댓글</Badge>}
      </div>
      {isAuthor && (
        <KebabButton
          variant="goal"
          onEdit={onModify}
          onDelete={handleDelete}
          className="size-5 md:size-6"
        />
      )}
    </div>
  );
}
