"use client";

import type { DashboardTask } from "@/components/dashboard/types";
import FileIcon from "@/public/icons/dashboard/file.svg";
import LinkIcon from "@/public/icons/dashboard/link.svg";
import MoreIcon from "@/public/icons/dashboard/more.svg";
import StarIcon from "@/public/icons/dashboard/star.svg";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const IconVariants = cva(
  "bg-orange-200 rounded-full size-6 items-center justify-center flex",
  {
    variants: {
      recentTodo: {
        true: "bg-white/40",
        false: "bg-[#ff9e59]/20",
      },
    },
  },
);

const moreIconVariants = cva(
  "bg-orange-200 rounded-full size-6 items-center justify-center flex ",
  {
    variants: {
      moreActive: {
        true: "bg-white",
        false: "bg-white/40",
      },
      recentTodo: {
        true: "bg-white/40",
        false: "bg-[#ff9e59]/20",
      },
    },
    compoundVariants: [
      {
        recentTodo: false,
        moreActive: false,
        class: "bg-[#ff9e59]/20",
      },
    ],
  },
);

const starIconVariants = cva("size-6", {
  variants: {
    recentTodo: {
      true: "fill-none text-orange-300",
      false: "fill-none text-orange-alpha-30",
    },
    favorite: {
      true: "fill-orange-500 text-orange-300",
      false: "fill-white/40 text-orange-300",
    },
  },
});

interface TaskIconsProps {
  task: DashboardTask;
  dense?: boolean;
  recentTodo: boolean;
  favorite: boolean;
}

export default function TaskIcons({
  task,
  dense = false,
  recentTodo = false,
  favorite = true,
}: TaskIconsProps) {
  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-2">
      <button type="button" className={cn(IconVariants({ recentTodo }))}>
        <FileIcon />
      </button>
      <button type="button" className={cn(IconVariants({ recentTodo }))}>
        <LinkIcon />
      </button>
      <button
        type="button"
        className={cn(moreIconVariants({ recentTodo, moreActive: false }))}
      >
        <MoreIcon />
      </button>
      <button type="button">
        <StarIcon
          className={cn(
            starIconVariants({
              recentTodo,
              favorite,
            }),
          )}
        />
      </button>
    </div>
  );
}
