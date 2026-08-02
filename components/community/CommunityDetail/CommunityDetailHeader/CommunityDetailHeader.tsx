import type { GetTeamIdPostsPostId200 } from "@/apis/model";
import KebabButton from "@/components/common/KebabButton/KebabButton";
import Image from "next/image";

interface CommunityDetailHeaderProps {
  post: GetTeamIdPostsPostId200;
  id: number;
}

export function CommunityDetailHeader({
  post,
  id,
}: CommunityDetailHeaderProps) {
  const handleEdit = () => {
    console.log("edit");
  };
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">{post.title}</h1>
        <div>
          <KebabButton
            variant="goal"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {post.image && (
          <Image
            className="rounded-full w-5 h-5 object-cover"
            src={post.image}
            alt={post.title}
            width={20}
            height={20}
          />
        )}
        <span className="text-xs">{post.writer.name}</span>
      </div>
    </div>
  );
}
