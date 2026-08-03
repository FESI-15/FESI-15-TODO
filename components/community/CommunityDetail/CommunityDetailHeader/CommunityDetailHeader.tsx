import type { GetTeamIdPostsPostId200 } from "@/apis/model";
import KebabButton from "@/components/common/KebabButton/KebabButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDeletePost } from "@/hooks/queries/posts/posts.bff.hook";

interface CommunityDetailHeaderProps {
  post: GetTeamIdPostsPostId200;
  id: number;
  userId: number;
}

export function CommunityDetailHeader({
  post,
  id,
  userId,
}: CommunityDetailHeaderProps) {
  const router = useRouter();
  const { mutate: deletePost } = useDeletePost();
  const handleEdit = () => {
    router.push(`/community/${id}/edit`);
  };
  const handleDelete = () => {
    deletePost(
      { postId: id },
      {
        onSuccess: () => {
          router.replace("/community");
        },
      },
    );
  };
  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-gray-200">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <h1 className="font-semibold md:text-2xl">{post.title}</h1>
        {userId === post.writer.id && (
          <KebabButton
            variant="goal"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <div className="flex items-center gap-1">
        <Image
          className="rounded-full w-5 h-5 object-cover md:w-6 md:h-6"
          src={post.writer.image || "/images/sidemenu/profile.png"}
          alt={post.title}
          width={20}
          height={20}
        />
        <span className="text-xs text-gray-500 md:text-base md:font-medium">
          {post.writer.name}
        </span>
      </div>
    </div>
  );
}
