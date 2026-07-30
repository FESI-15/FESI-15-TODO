"use client";
import { useGetPosts } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityHeader } from "./CommunityHeader/CommunityHeader";
import { CommunityCard } from "./CommunityCard/CommunityCard";
import { CommunityBestView } from "./CommunityBestView/CommunityBestView";

export function Community() {
  const { data } = useGetPosts();
  return (
    <div className="w-full min-w-0 px-4 my-6 md:my-12 lg:my-20">
      <h2 className="hidden md:block text-xl font-semibold mb-9 lg:mb-10 lg:text-2xl lg:font-semibold ml-2">
        소통 게시판
      </h2>
      <CommunityBestView />
      <CommunityHeader />
      <ul>
        {data?.data.posts.map((post) => (
          <CommunityCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
