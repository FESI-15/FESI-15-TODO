"use client";

import type { DashboardTask } from "@/components/dashboard/types";
import FileIcon from "@/public/icons/dashboard/file.svg";
import StarIcon from "@/public/icons/dashboard/star.svg";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import MoreIcon from "./MoreIcon/MoreIcon";

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
  recentTodo: boolean;
}

export default function TaskIcons({
  task,
  recentTodo = false,
}: TaskIconsProps) {
  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-2">
      {task.note && (
        <button type="button" className={cn(IconVariants({ recentTodo }))}>
          <FileIcon />
        </button>
      )}
      <MoreIcon recentTodo={recentTodo} todoId={task.id} />
      <button type="button">
        <StarIcon
          className={cn(
            starIconVariants({
              recentTodo,
              favorite: task.favorite,
            }),
          )}
        />
      </button>
    </div>
  );
}
