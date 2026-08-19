"use client";
import { useGetPost } from "@/hooks/queries/posts/posts.bff.hook";
import { CommunityDetailHeader } from "./CommunityDetailHeader/CommunityDetailHeader";
import { CommunityDetailContent } from "./CommunityDetailContent/CommunityDetailContent";
import { CommunityDetailMeta } from "./CommunityDetailMeta/CommunityDetailMeta";
import { Comment } from "./Comment/Comment";
import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import { m } from "motion/react";
interface CommunityDetailProps {
  id: number;
}

export function CommunityDetail({ id }: CommunityDetailProps) {
  const { data: postData } = useGetPost({ postId: id });
  const { data: userMeData } = useGetUserMe();

  if (!postData) return null;
  return (
    <div className="px-4 my-4 md:my-12 lg:my-20 w-full">
      <div className="max-w-[768px] mx-auto w-full bg-white dark:bg-card rounded-[24px] py-6 px-4 md:p-10">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CommunityDetailHeader
            post={postData.data}
            userId={userMeData?.data.id || 0}
          />
          <CommunityDetailContent post={postData.data} />
          <CommunityDetailMeta post={postData.data} />
        </m.div>
        <Comment postId={id} userId={userMeData?.data.id || 0} />
      </div>
    </div>
  );
}
