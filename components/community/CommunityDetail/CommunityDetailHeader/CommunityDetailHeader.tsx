import type { GetTeamIdPostsPostId200 } from "@/apis/model";
import KebabButton from "@/components/common/KebabButton/KebabButton";
import { useRouter } from "next/navigation";
import { useDeletePost } from "@/hooks/queries/posts/posts.bff.hook";
import { Author } from "@/components/common/Author";

interface CommunityDetailHeaderProps {
  post: GetTeamIdPostsPostId200;
  userId: number;
}

export function CommunityDetailHeader({
  post,
  userId,
}: CommunityDetailHeaderProps) {
  const router = useRouter();
  const { mutate: deletePost } = useDeletePost();
  const handleEdit = () => {
    router.push(`/community/${post.id}/edit`);
  };
  const handleDelete = () => {
    deletePost(
      { postId: post.id },
      {
        onSuccess: () => {
          router.replace("/community");
        },
      },
    );
  };
  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-gray-200 dark:border-border">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <h1 className="font-semibold md:text-2xl dark:text-foreground">
          {post.title}
        </h1>
        {userId === post.writer.id && (
          <KebabButton
            variant="goal"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <Author image={post.writer.image || ""} name={post.writer.name} />
    </div>
  );
}
