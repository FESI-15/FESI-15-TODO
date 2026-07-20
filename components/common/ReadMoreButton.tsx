import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import ChevronDownIcon from "@/public/icons/common/chevron-down.svg";

const buttonVariants = cva(
  "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white",
);

const iconVariants = cva("h-6 w-6 transition-transform duration-200");

interface ReadMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export function ReadMoreButton({
  isOpen,
  className,
  ...props
}: ReadMoreButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "접기" : "더보기"}
      aria-expanded={isOpen}
      className={cn(buttonVariants(), className)}
      {...props}
    >
      <ChevronDownIcon className={cn(iconVariants(), isOpen && "rotate-180")} />
    </button>
  );
}
