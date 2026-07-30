import Image from "next/image";
import { CommunityCard } from "../CommunityCard/CommunityCard";
import { GetTeamIdPosts200PostsItem } from "@/apis/model";

interface CommunityListProps {
  posts: GetTeamIdPosts200PostsItem[];
}

export function CommunityList({ posts }: CommunityListProps) {
  if (!posts.length)
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 md:gap-4 flex-1">
        <Image
          className="md:w-[130px] md:h-[140px]"
          src="/icons/common/no_data.svg"
          alt="no-data"
          width={80}
          height={85}
        />
        <p className="text-gray-500 text-sm font-medium md:text-base">
          아직 등록된 게시물이 없어요.
        </p>
      </div>
    );
  return (
    <ul>
      {posts.map((post) => (
        <CommunityCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
