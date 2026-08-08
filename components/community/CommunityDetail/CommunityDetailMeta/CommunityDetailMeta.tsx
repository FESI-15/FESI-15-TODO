import { GetTeamIdPostsPostId200 } from "@/apis/model";
import { format } from "date-fns";

interface CommunityDetailMetaProps {
  post: GetTeamIdPostsPostId200;
}

export function CommunityDetailMeta({ post }: CommunityDetailMetaProps) {
  const formatDate = format(post.createdAt, "yyyy.MM.dd");
  return (
    <div className="flex items-center gap-2 mt-4 md:gap-3">
      <span className="text-xs text-gray-400 dark:text-muted-foreground after-content-dot md:text-sm">
        {formatDate}
      </span>
      <span className="text-xs text-gray-400 dark:text-muted-foreground md:text-sm">
        조회수 {post.viewCount}
      </span>
    </div>
  );
}
