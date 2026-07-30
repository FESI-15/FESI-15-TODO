"use client";
import { useGetPosts } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityHeader } from "./CommunityHeader/CommunityHeader";
import { CommunityCard } from "./CommunityCard/CommunityCard";
import { CommunityBestView } from "./CommunityBestView/CommunityBestView";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export function Community() {
  const searchParams = useSearchParams();
  const { data } = useGetPosts({
    search: searchParams.get("search") ?? "",
  });
  return (
    <div className="w-full min-w-0 px-4 my-6 md:my-12 lg:my-20 flex flex-col flex-1">
      <h2 className="hidden md:block text-xl font-semibold mb-9 lg:mb-10 lg:text-2xl lg:font-semibold ml-2">
        소통 게시판
      </h2>
      <CommunityBestView />
      <CommunityHeader />
      {data?.data.posts.length ? (
        <ul>
          {data?.data.posts.map((post) => (
            <CommunityCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
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
      )}
    </div>
  );
}
