import { GetTeamIdPosts200PostsItem } from "@/apis/model";
import { getRelativeCreatedTime } from "@/utils/getRelativeCreatedTime";
import Image from "next/image";
import Link from "next/link";

export function CommunityCard({ post }: { post: GetTeamIdPosts200PostsItem }) {
  return (
    <li>
      <Link
        className="flex justify-between items-center gap-6 px-2 py-6 border-b border-gray-300 hover:shadow-md transition-all duration-300"
        href={`/community/${post.id}`}
      >
        <div>
          <p className="text-sm font-semibold mb-1 text-gray-900 truncate ">
            {post.title}
          </p>
          <p className="text-sm text-gray-700 truncate">{post.content}</p>
          <div className="flex items-center mt-3 text-xs text-gray-500 gap-2">
            <div className="flex items-center gap-1 after-content-dot">
              <Image
                src={post.writer.image ?? "/images/sidemenu/profile.png"}
                alt={post.writer.name}
                width={20}
                height={20}
              />
              <p>{post.writer.name}</p>
            </div>
            <p className="after-content-dot">
              {getRelativeCreatedTime(post.createdAt)}
            </p>
            <p className="after-content-dot">조회 {post.viewCount}</p>
            <p className="flex items-center gap-[2px]">
              <Image
                src={"/icons/community/message-circle.svg"}
                alt="message-circle"
                width={16}
                height={16}
              />
              {post.commentCount}
            </p>
          </div>
        </div>
        {post.image && (
          <Image
            src={"/images/test_image.png"}
            alt={post.title}
            width={72}
            height={72}
          />
        )}
      </Link>
    </li>
  );
}
