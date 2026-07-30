import type { GetTeamIdPosts200PostsItem } from "@/apis/model";
import { getRelativeCreatedTime } from "@/utils/getRelativeCreatedTime";
import { cva } from "class-variance-authority";
import Image from "next/image";

interface CardInformationProps {
  post: GetTeamIdPosts200PostsItem;
  variant?: "default" | "best";
}

const cardInformationVariant = cva("flex items-center gap-[2px]", {
  variants: {
    variant: {
      default: "",
      best: "ml-auto",
    },
    afterContentDot: {
      default: "after-content-dot",
      best: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function CardInformation({
  post,
  variant = "default",
}: CardInformationProps) {
  return (
    <div className="flex items-center text-xs text-gray-500 gap-2 md:text-base md:gap-3">
      <div className="flex items-center gap-1 after-content-dot md:gap-2">
        <Image
          className="md:w-6 md:h-6"
          src={post.writer.image ?? "/images/sidemenu/profile.png"}
          alt={post.writer.name}
          width={20}
          height={20}
        />
        <p>{post.writer.name}</p>
      </div>
      {variant === "default" && (
        <p className="after-content-dot">
          {getRelativeCreatedTime(post.createdAt)}
        </p>
      )}
      <p
        className={cardInformationVariant({
          variant: "default",
          afterContentDot: variant,
        })}
      >
        조회 {post.viewCount}
      </p>
      <p className={cardInformationVariant({ variant })}>
        <Image
          src={"/icons/community/message-circle.svg"}
          alt="message-circle"
          width={16}
          height={16}
        />
        {post.commentCount}
      </p>
    </div>
  );
}
