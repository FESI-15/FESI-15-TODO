"use client";

import { useEffect } from "react";
import { useGetPosts } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityHeader } from "./CommunityHeader/CommunityHeader";
import { CommunityBestView } from "./CommunityBestView/CommunityBestView";
import { useSearchParams } from "next/navigation";
import { CommunityList } from "./CommunityList/CommunityPostList";
import { CreatePostButton } from "./CreatePostButton/CreatePostButton";
import useHeaderStore from "@/store/useHeaderStore";

export function Community() {
  const searchParams = useSearchParams();
  const { data } = useGetPosts({
    search: searchParams.get("search") ?? "",
  });
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    setTitle("소통 게시판");
  }, [setTitle]);
  return (
    <div className="w-full min-w-0 px-4 my-6 md:my-12 lg:my-20 flex flex-col flex-1">
      <h2 className="hidden md:block text-xl font-semibold mb-9 lg:mb-10 lg:text-2xl lg:font-semibold ml-2">
        소통 게시판
      </h2>
      <CommunityBestView />
      <CommunityHeader />
      <CommunityList posts={data?.data.posts ?? []} />
      <CreatePostButton />
    </div>
  );
}
