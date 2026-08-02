"use client";
import { useGetPost } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityDetailHeader } from "./CommunityDetailHeader/CommunityDetailHeader";

interface CommunityDetailProps {
  id: number;
}

export function CommunityDetail({ id }: CommunityDetailProps) {
  const { data: postData } = useGetPost({ postId: id });

  if (!postData) return null;
  return (
    <div className="p-4">
      <div className="max-w-[768px] mx-auto w-full bg-white rounded-[24px] py-6 px-4">
        <CommunityDetailHeader post={postData.data} id={id} />
      </div>
    </div>
  );
}
