"use client";

import { useGetPostsInfinite } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityHeader } from "./CommunityHeader/CommunityHeader";
import { CommunityBestView } from "./CommunityBestView/CommunityBestView";
import { useSearchParams } from "next/navigation";
import { CommunityList } from "./CommunityList/CommunityPostList";
import { CreatePostButton } from "./CreatePostButton/CreatePostButton";
import { useEffect, useRef } from "react";
import { COMMUNITY_LIMIT } from "@/constants/CommunityLimit";

export function Community() {
  const searchParams = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPostsInfinite({
      search: searchParams.get("search") ?? "",
      limit: COMMUNITY_LIMIT,
    });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  console.log(posts);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full min-w-0 px-4 my-6 md:my-12 lg:my-20 flex flex-col flex-1">
      <h2 className="hidden md:block text-xl font-semibold mb-9 lg:mb-10 lg:text-2xl lg:font-semibold ml-2">
        소통 게시판
      </h2>
      <CommunityBestView />
      <CommunityHeader />
      <CommunityList posts={posts} />
      <CreatePostButton />
      <div ref={loadMoreRef} />
    </div>
  );
}
