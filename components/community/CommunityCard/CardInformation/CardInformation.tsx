import type { GetTeamIdPosts200PostsItem } from "@/apis/model";
import { getRelativeCreatedTime } from "@/utils/getRelativeCreatedTime";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { Author } from "@/components/common/Author";

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
      <div className="after-content-dot">
        <Author image={post.writer.image || ""} name={post.writer.name} />
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
