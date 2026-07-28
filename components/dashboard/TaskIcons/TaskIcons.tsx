"use client";

import FileIcon from "@/public/icons/dashboard/file.svg";
import StarIcon from "@/public/icons/dashboard/star.svg";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import KebabButton from "../../common/KebabButton/KebabButton";
import {
  useDeleteTodoFavorite,
  usePostTodoFavorite,
} from "@/hooks/queries/favorites/favorites.bff.hook";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { useDeleteTodo } from "@/hooks/queries/todos/todos.bff.hook";
import { useState } from "react";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";

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
  todo: GetTeamIdTodos200TodosItem;
  recentTodo: boolean;
}

export default function TaskIcons({
  todo,
  recentTodo = false,
}: TaskIconsProps) {
  const { mutate: updateFavorite } = usePostTodoFavorite();
  const { mutate: deleteFavorite } = useDeleteTodoFavorite();
  const { mutate: deleteTodo } = useDeleteTodo();
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  const handleDeleteTodo = () => {
    deleteTodo(
      { todoId: todo.id },
      {
        onSuccess: () => {
          setTaskFormOpen(false);
        },
      },
    );
  };

  const handleEditTodo = () => {
    setTaskFormOpen(true);
  };

  const handleFavorite = () => {
    if (todo.isFavorite) {
      deleteFavorite({ todoId: todo.id });
    } else {
      updateFavorite({ todoId: todo.id });
    }
  };

  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-2">
      {todo.noteIds.length > 0 && (
        <button type="button" className={cn(IconVariants({ recentTodo }))}>
          <FileIcon />
        </button>
      )}
      <KebabButton
        variant={recentTodo ? "recentTodo" : "default"}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />
      {!recentTodo && (
        <button type="button" onClick={handleFavorite}>
          <StarIcon
            className={cn(
              starIconVariants({
                favorite: todo.isFavorite,
              }),
            )}
          />
        </button>
      )}
      {taskFormOpen && (
        <TaskFormModal
          isModify={true}
          defaultValues={{
            title: todo.title,
            goalId: todo.goalId ?? undefined,
            dueDate: todo.dueDate ?? "",
            linkUrl: todo.linkUrl ?? "",
            tags: todo.tags.map((tag) => tag.name),
            fileUrl: todo.fileUrl ?? "",
          }}
          todoId={todo.id}
          open={taskFormOpen}
          onOpenChange={setTaskFormOpen}
        />
      )}
    </div>
  );
}
