import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { GetTeamIdPostsPostId200 } from "@/apis/model";

interface CommunityDetailContentProps {
  post: GetTeamIdPostsPostId200;
}

export function CommunityDetailContent({ post }: CommunityDetailContentProps) {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  return (
    <div className="pt-4">
      <div
        className="editor-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
      {post.image && (
        <div className="rounded-lg border border-gray-200 dark:border-border overflow-hidden w-[150px] h-[150px] mt-4 md:w-[232px] md:h-[232px]">
          <Image
            className="w-full h-full object-cover"
            src={post.image}
            alt="community-image"
            width={150}
            height={150}
            fetchPriority="high"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
}
