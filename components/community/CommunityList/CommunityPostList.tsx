import Image from "next/image";
import { CommunityCard } from "../CommunityCard/CommunityCard";
import { GetTeamIdPosts200PostsItem } from "@/apis/model";
import { m } from "motion/react";

interface CommunityListProps {
  posts: GetTeamIdPosts200PostsItem[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const listVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, delayChildren: 0.45 },
  },
};
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
          fetchPriority="high"
          loading="eager"
        />
        <p className="text-gray-500 dark:text-muted-foreground text-sm font-medium md:text-base">
          아직 등록된 게시물이 없어요.
        </p>
      </div>
    );
  return (
    <m.ul variants={listVariants} initial="hidden" animate="visible">
      {posts.map((post, index) => (
        <m.li key={post.id} variants={itemVariants}>
          <CommunityCard post={post} />
        </m.li>
      ))}
    </m.ul>
  );
}
