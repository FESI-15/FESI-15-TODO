import { cn } from "@/utils";
import ChevronDownIcon from "@/public/icons/common/chevron-down.svg";
import ChevronUpIcon from "@/public/icons/common/chevron-up.svg";

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
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white",
        className,
      )}
      {...props}
    >
      {isOpen ? (
        <ChevronUpIcon className="h-6 w-6" />
      ) : (
        <ChevronDownIcon className="h-6 w-6" />
      )}
    </button>
  );
}
