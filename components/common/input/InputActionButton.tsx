import LinkIcon from "@/public/icons/input/link.svg";
import SearchIcon from "@/public/icons/input/search.svg";
import CloseIcon from "@/public/icons/input/input-delete.svg";
import EyeIcon from "@/public/icons/input/eye.svg";
import EyeOffIcon from "@/public/icons/input/eye-off.svg";
import { twMerge } from "tailwind-merge";

interface InputActionButtonProps {
  variant: "text" | "link" | "search" | "password";
  value: string;
  onClear: () => void;
  isPasswordVisible: boolean;
  onTogglePassword: () => void;
}

export function InputActionButton({
  variant,
  value,
  onClear,
  isPasswordVisible,
  onTogglePassword,
}: InputActionButtonProps) {
  if (variant === "link" && value) {
    return (
      <button type="button" onClick={onClear} className="absolute right-4">
        <CloseIcon className="shrink-0 text-gray-400 h-5 w-5 md:h-6 md:w-6" />
      </button>
    );
  }

  if (variant === "link") {
    return (
      <span className="pointer-events-none absolute left-4 text-gray-500">
        <LinkIcon className="h-5 w-5 md:h-6 md:w-6" />
      </span>
    );
  }

  if (variant === "search") {
    return (
      <button
        type="submit"
        disabled={!value}
        className={twMerge(
          "absolute right-5 top-1/2 -translate-y-1/2",
          value ? "cursor-pointer" : "cursor-default",
        )}
        aria-label="검색"
      >
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </button>
    );
  }

  if (variant === "password") {
    return (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
      >
        {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
      </button>
    );
  }

  return null;
}
