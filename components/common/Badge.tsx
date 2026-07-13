import { cva } from "class-variance-authority";
import CloseIcon from "@/public/icons/badge/close.svg";

interface BadgeProps {
  children: React.ReactNode;
  variant: "default" | "red" | "green" | "yellow" | "purple";
  remove?: boolean;
  onRemove?: () => void;
}

const badgeVariants = cva(
  "inline-flex items-center gap-0.5 px-2 py-1 rounded-full text-xs border font-medium",
  {
    variants: {
      variant: {
        default: "bg-[#fafafa] text-[#414651] border-[#E9EAEB]",
        red: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
        green: "bg-[#ECFDF3] text-[#067647] border-[#ABEFC6]",
        yellow: "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]",
        purple: "bg-[#F9F5FF] text-[#6941C6] border-[#E9D7FE]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const badgeIconVariants = cva("", {
  variants: {
    variant: {
      default: "text-[#A4A7AE]",
      red: "text-[#F97066]",
      green: "text-[#47CD89]",
      yellow: "text-[#FDB022]",
      purple: "text-[#B692F6]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Badge({
  children,
  variant,
  remove = false,
  onRemove,
}: BadgeProps) {
  return (
    <div className={badgeVariants({ variant })}>
      {children}
      {remove && (
        <button type="button" onClick={onRemove}>
          <CloseIcon className={badgeIconVariants({ variant })} />
        </button>
      )}
    </div>
  );
}
