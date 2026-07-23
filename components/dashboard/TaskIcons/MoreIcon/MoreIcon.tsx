import { cn } from "@/utils/cn";
import More from "@/public/icons/dashboard/more.svg";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import KebabPopup from "@/components/common/KebabPopup";
import { useDeleteTodo } from "@/hooks/queries/todos/todos.bff.hook";
import { useQueryClient } from "@tanstack/react-query";
import { todosKeys } from "@/hooks/queries/todos/todos.key";

const moreIconVariants = cva(
  "rounded-full size-6 items-center justify-center flex",
  {
    variants: {
      moreActive: {
        true: "",
        false: "",
      },
      recentTodo: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        moreActive: true,
        class: "bg-white",
      },
      {
        moreActive: false,
        recentTodo: true,
        class: "bg-white/40",
      },
      {
        moreActive: false,
        recentTodo: false,
        class: "bg-[#ff9e59]/20",
      },
    ],
  },
);

interface MoreIconProps {
  recentTodo: boolean;
  todoId: number;
}

export default function MoreIcon({
  recentTodo = false,
  todoId,
}: MoreIconProps) {
  const [moreActive, setMoreActive] = useState(false);
  const moreIconRef = useRef<HTMLDivElement>(null);
  const { mutate: deleteTodo } = useDeleteTodo();
  const queryClient = useQueryClient();

  const handleDeleteTodo = () => {
    deleteTodo(
      { todoId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: todosKeys.all() });
          setMoreActive(false);
        },
      },
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!moreIconRef.current?.contains(event.target as Node)) {
        setMoreActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMoreActive = () => {
    setMoreActive((prevMoreActive) => !prevMoreActive);
  };

  return (
    <div ref={moreIconRef} className="relative">
      <button
        type="button"
        className={cn(moreIconVariants({ recentTodo, moreActive }))}
        onClick={handleMoreActive}
      >
        <More />
      </button>
      {moreActive && (
        <KebabPopup onEdit={() => {}} onDelete={handleDeleteTodo} />
      )}
    </div>
  );
}
