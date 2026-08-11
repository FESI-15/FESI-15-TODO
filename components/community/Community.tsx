"use client";

import { useGetPostsInfinite } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityHeader } from "./CommunityHeader/CommunityHeader";
import { CommunityBestView } from "./CommunityBestView/CommunityBestView";
import { useSearchParams } from "next/navigation";
import { CommunityList } from "./CommunityList/CommunityPostList";
import { CreatePostButton } from "./CreatePostButton/CreatePostButton";
import { useEffect, useRef } from "react";
import { COMMUNITY_LIMIT } from "@/constants/CommunityLimit";
import useHeaderStore from "@/store/useHeaderStore";

export function Community() {
  const searchParams = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const setTitle = useHeaderStore((s) => s.setTitle);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPostsInfinite({
      search: searchParams.get("search") ?? "",
      limit: COMMUNITY_LIMIT,
    });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

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

  useEffect(() => {
    setTitle("소통 게시판");
  }, [setTitle]);
  return (
    <div className="max-w-[1200px] w-full my-6 md:my-12 lg:my-20 mx-auto min-w-0">
      <div className="px-4 md:px-6">
        <h2 className="hidden lg:block text-xl font-semibold mb-9 lg:mb-10 lg:text-2xl lg:font-semibold ml-2 dark:text-foreground">
          소통 게시판
        </h2>
        <CommunityBestView />
      </div>
      <div className="w-full px-4 md:px-6 flex flex-col flex-1">
        <CommunityHeader />
        <CommunityList posts={posts} />
        <CreatePostButton />
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}
