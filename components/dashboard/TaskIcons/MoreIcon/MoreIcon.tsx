import { cn } from "@/utils/cn";
import More from "@/public/icons/dashboard/more.svg";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import KebabPopup from "@/components/common/KebabPopup";

const moreButtonVariants = cva(
  "rounded-full size-6 items-center justify-center flex",
  {
    variants: {
      open: {
        true: "",
        false: "",
      },
      recentTodo: {
        true: "",
        false: "",
      },
      goal: {
        true: "",
      },
    },
    compoundVariants: [
      {
        open: true,
        class: "bg-white",
      },
      {
        open: false,
        recentTodo: true,
        class: "bg-white/40",
      },
      {
        open: false,
        recentTodo: false,
        class: "bg-[#ff9e59]/20",
      },
      {
        goal: true,
        class: "bg-transparent",
      },
    ],
  },
);

const moreIconVariants = cva("size-[14px] text-orange-600", {
  variants: {
    goal: {
      true: "text-gray-400 size-6",
    },
  },
});

interface MoreIconProps {
  recentTodo?: boolean;
  goal?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MoreIcon({
  recentTodo = false,
  goal = false,
  onEdit,
  onDelete,
}: MoreIconProps) {
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
        className={cn(moreButtonVariants({ recentTodo, open, goal }))}
        onClick={handleMoreActive}
      >
        <More className={cn(moreIconVariants({ goal }))} />
      </button>
      {open && (
        <KebabPopup setOpen={setOpen} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
}
