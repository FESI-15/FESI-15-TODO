import { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import CommentIcon from "@/public/icons/card/ic_message-circle.svg";

interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  author: string;
  authorAvatarUrl?: string;
  viewCount: number;
  commentCount: number;
  images?: string[];
}

const DEFAULT_AVATAR = "/images/Profile1.png";

export function PostCard({
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
    <div
      className={cn(
        "flex w-full flex-col items-start gap-2.5 rounded-3xl bg-white px-6 py-4 transition-all md:gap-4 md:rounded-9.5 md:p-8",
        className,
      )}
      {...props}
    >
      <h3 className="w-full truncate text-base leading-6 font-semibold tracking-[-0.03em] text-slate-900 md:text-xl md:leading-7.5">
        {title}
      </h3>

      {images && images.length > 0 && (
        <div className="flex w-full flex-row items-center gap-3 md:gap-4">
          {images.slice(0, 2).map((imgUrl, idx) => (
            <Image
              key={idx}
              src={imgUrl}
              alt="post"
              width={100}
              height={100}
              className="h-25 w-25 shrink-0 rounded-2xl border border-slate-200 object-cover"
            />
          ))}
        </div>
      )}

      <div className="mt-auto flex w-full flex-row items-center justify-between gap-2">
        <div className="flex min-w-0 flex-row items-center gap-1 md:gap-2">
          <Image
            src={authorAvatarUrl || DEFAULT_AVATAR}
            alt={author}
            width={24}
            height={24}
            className="h-5 w-5 shrink-0 rounded-full object-cover md:h-6 md:w-6"
          />
          <span className="truncate text-xs leading-4 text-slate-500 md:text-base md:leading-6 md:tracking-[-0.02em]">
            {author} · 조회 {viewCount}
          </span>
        </div>

        <div className="flex shrink-0 flex-row items-center gap-1">
          <CommentIcon className="h-4 w-4 text-slate-600 md:h-5 md:w-5" />
          <span className="truncate text-xs leading-4 text-slate-500 md:text-base md:leading-6 md:tracking-[-0.02em]">
            {commentCount}
          </span>
        </div>
      </div>
    </div>
  );
}
