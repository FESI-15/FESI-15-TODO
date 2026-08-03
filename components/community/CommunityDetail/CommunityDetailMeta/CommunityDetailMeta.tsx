import { GetTeamIdPostsPostId200 } from "@/apis/model";
import { format } from "date-fns";

interface CommunityDetailMetaProps {
  post: GetTeamIdPostsPostId200;
}

export function CommunityDetailMeta({ post }: CommunityDetailMetaProps) {
  const formatDate = format(post.createdAt, "yyyy.MM.dd");
  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-xs text-gray-400 after-content-dot">
        {formatDate}
      </span>
      <span className="text-xs text-gray-400">조회수 {post.viewCount}</span>
    </div>
  );
}
