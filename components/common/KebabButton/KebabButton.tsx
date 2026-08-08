import { cn } from "@/utils/cn";
import More from "@/public/icons/dashboard/more.svg";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import KebabPopup from "./KebabPopup";

const kebabButtonVariants = cva(
  "rounded-full size-6 items-center justify-center flex",
  {
    variants: {
      open: {
        true: "",
        false: "",
      },
      variant: {
        default: "bg-[#ff9e59]/20",
        recentTodo: "bg-white/40",
        goal: "bg-transparent",
      },
    },
    compoundVariants: [
      {
        open: true,
        variant: ["default", "recentTodo"],
        class: "bg-white dark:bg-card",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  },
);

const kebabButtonIconVariants = cva("size-[14px] text-orange-600", {
  variants: {
    variant: {
      default: "",
      recentTodo: "",
      goal: "text-gray-400 dark:text-muted-foreground size-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface KebabButtonProps {
  variant?: "recentTodo" | "goal" | "default";
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export default function KebabButton({
  variant = "default",
  onEdit,
  onDelete,
  className,
}: KebabButtonProps) {
  const [open, setOpen] = useState(false);
  const moreIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isDialogContent = target.closest('[data-slot="dialog-content"]');

      if (isDialogContent) {
        return;
      }

      if (!moreIconRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMoreActive = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div ref={moreIconRef} className="relative">
      <button
        type="button"
        className={cn(kebabButtonVariants({ variant, open }))}
        onClick={handleMoreActive}
      >
        <More className={cn(kebabButtonIconVariants({ variant }), className)} />
      </button>
      {open && (
        <KebabPopup setOpen={setOpen} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
}
