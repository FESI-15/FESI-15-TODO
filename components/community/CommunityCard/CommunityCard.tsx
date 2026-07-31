import { GetTeamIdPosts200PostsItem } from "@/apis/model";
import { CardInformation } from "./CardInformation/CardInformation";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";

export function CommunityCard({ post }: { post: GetTeamIdPosts200PostsItem }) {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  return (
    <li>
      <Link
        className="flex justify-between items-center gap-6 px-2 py-6 border-b border-gray-300 hover:shadow-md transition-all duration-300 md:px-4 md:py-10"
        href={`/community/${post.id}`}
      >
        <div>
          <p className="text-sm font-semibold mb-1 text-gray-900 truncate md:text-xl md:font-semibold md:mb-4">
            {post.title}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="text-sm text-gray-700 line-clamp-2"
          />
          <div className="mt-3 md:mt-6">
            <CardInformation post={post} />
          </div>
        </div>
        {post.image && (
          <Image
            className="md:w-[120px] md:h-[120px]"
            objectFit="cover"
            src={post.image}
            alt={post.title}
            width={72}
            height={72}
          />
        )}
      </Link>
    </li>
  );
}
