import { cn } from "@/utils/cn";
import More from "@/public/icons/dashboard/more.svg";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import KebabPopup from "@/components/common/KebabPopup";
import { useDeleteTodo } from "@/hooks/queries/todos/todos.bff.hook";
import { GetTeamIdTodos200TodosItem } from "@/apis/model";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";

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
  todo: GetTeamIdTodos200TodosItem;
}

export default function MoreIcon({ recentTodo = false, todo }: MoreIconProps) {
  const [moreActive, setMoreActive] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const moreIconRef = useRef<HTMLDivElement>(null);
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDeleteTodo = () => {
    deleteTodo(
      { todoId: todo.id },
      {
        onSuccess: () => {
          setMoreActive(false);
        },
      },
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isDialogContent = target.closest('[data-slot="dialog-content"]');

      if (isDialogContent) {
        return;
      }

      if (!moreIconRef.current?.contains(target)) {
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

  const handleEditTodo = () => {
    setTaskFormOpen(true);
    setMoreActive(false);
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
        <KebabPopup onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
      )}
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
      >
        <span className="hidden" />
      </TaskFormModal>
    </div>
  );
}
