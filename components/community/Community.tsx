"use client";
import { useGetPosts } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityHeader } from "./CommunityHeader/CommunityHeader";
import { CommunityCard } from "./CommunityCard/CommunityCard";

export function Community() {
  const { data } = useGetPosts();
  return (
    <div className="py-6 px-4 w-full">
      <CommunityHeader />
      <ul>
        {data?.data.posts.map((post) => (
          <CommunityCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
