import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import DeleteIcon from "@/public/icons/common/ic_delete_gray.svg";

const deleteButtonVariants = cva(
  "flex items-center justify-center rounded-full border border-slate-300 bg-white transition-colors",
  {
    variants: {
      size: {
        small: "h-[18px] w-[18px]",
        large: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
);

const deleteIconVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      small: "h-[13px] w-[13px]",
      large: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "large",
  },
});

interface DeleteButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof deleteButtonVariants> {}

export function DeleteButton({ size, className, ...props }: DeleteButtonProps) {
  return (
    <button
      type="button"
      aria-label="삭제"
      className={cn(deleteButtonVariants({ size }), className)}
      {...props}
    >
      <span className={deleteIconVariants({ size })}>
        <DeleteIcon className="h-full w-full" />
      </span>
    </button>
  );
}
