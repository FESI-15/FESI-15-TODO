"use client";

import FileIcon from "@/public/icons/dashboard/file.svg";
import StarIcon from "@/public/icons/dashboard/star.svg";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import MoreIcon from "./MoreIcon/MoreIcon";
import {
  useDeleteTodoFavorite,
  usePostTodoFavorite,
} from "@/hooks/queries/favorites/favorites.bff.hook";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";

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

const starIconVariants = cva("size-6 fill-none text-orange-300", {
  variants: {
    favorite: {
      true: "fill-orange-500",
      false: "fill-none",
    },
  },
});

interface TaskIconsProps {
  task: GetTeamIdTodos200TodosItem;
  recentTodo: boolean;
}

export default function TaskIcons({
  task,
  recentTodo = false,
}: TaskIconsProps) {
  const { mutate: updateFavorite } = usePostTodoFavorite();
  const { mutate: deleteFavorite } = useDeleteTodoFavorite();

  const handleFavorite = () => {
    if (task.isFavorite) {
      deleteFavorite({ todoId: task.id });
    } else {
      updateFavorite({ todoId: task.id });
    }
  };

  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-2">
      {task.noteIds.length > 0 && (
        <button type="button" className={cn(IconVariants({ recentTodo }))}>
          <FileIcon />
        </button>
      )}
      <MoreIcon recentTodo={recentTodo} todoId={task.id} />
      {!recentTodo && (
        <button type="button" onClick={handleFavorite}>
          <StarIcon
            className={cn(
              starIconVariants({
                favorite: task.isFavorite,
              }),
            )}
          />
        </button>
      )}
    </div>
  );
}
