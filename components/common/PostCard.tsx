import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/utils";
import CommentIcon from "@/public/icons/card/ic_message-circle.svg";

const cardVariants = cva("bg-white flex flex-col items-start transition-all", {
  variants: {
    size: {
      lg: "w-[384px] h-auto p-8 gap-4 rounded-[32px]",
      sm: "w-[260px] h-[204px] p-[16px_24px] gap-[10px] rounded-[24px]",
    },
  },
});

const titleVariants = cva(
  "w-full font-semibold tracking-[-0.03em] text-slate-900 truncate",
  {
    variants: {
      size: {
        lg: "text-xl leading-[30px]",
        sm: "text-base leading-6",
      },
    },
  },
);

const imageRowVariants = cva("flex flex-row items-center w-full h-25", {
  variants: {
    size: {
      lg: "gap-4",
      sm: "gap-3",
    },
  },
});

const authorRowVariants = cva("flex flex-row items-center", {
  variants: {
    size: {
      lg: "gap-2",
      sm: "gap-1",
    },
  },
});

const metaTextVariants = cva("text-slate-500", {
  variants: {
    size: {
      lg: "text-base leading-6 tracking-[-0.02em]",
      sm: "text-xs leading-4",
    },
  },
});

const avatarVariants = cva("rounded-full object-cover", {
  variants: {
    size: {
      lg: "w-6 h-6",
      sm: "w-5 h-5",
    },
  },
});

const iconVariants = cva("text-slate-600", {
  variants: {
    size: {
      lg: "w-5 h-5",
      sm: "w-4 h-4",
    },
  },
});

interface PostCardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  title: string;
  author: string;
  authorAvatarUrl?: string;
  viewCount: number;
  commentCount: number;
  images?: string[];
}

const DEFAULT_AVATAR = "/images/Profile1.png";

export function PostCard({
  size = "lg",
  title,
  author,
  authorAvatarUrl,
  viewCount,
  commentCount,
  images,
  className,
  ...props
}: PostCardProps) {
  return (
    <div className={cn(cardVariants({ size }), className)} {...props}>
      <h3 className={titleVariants({ size })}>{title}</h3>

      <div className={imageRowVariants({ size })}>
        {images?.slice(0, 2).map((imgUrl, idx) => (
          <Image
            key={idx}
            src={imgUrl}
            alt="post"
            width={100}
            height={100}
            className="w-25 h-25 rounded-2xl object-cover border border-slate-200"
          />
        ))}
      </div>

      <div className="flex flex-row justify-between items-center w-full mt-auto">
        <div className={authorRowVariants({ size })}>
          <Image
            src={authorAvatarUrl || DEFAULT_AVATAR}
            alt={author}
            width={24}
            height={24}
            className={avatarVariants({ size })}
          />
          <span className={metaTextVariants({ size })}>
            {author} · 조회 {viewCount}
          </span>
        </div>

        <div className="flex flex-row items-center gap-1">
          <CommentIcon className={iconVariants({ size })} />
          <span className={metaTextVariants({ size })}>{commentCount}</span>
        </div>
      </div>
    </div>
  );
}
