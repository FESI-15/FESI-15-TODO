import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const dropdownListItemVariants = cva("flex w-full items-center", {
  variants: {
    size: {
      large: "gap-[10px] p-2 rounded-xl",
      small: "gap-[10px] px-[6px] py-[3px] rounded-lg",
    },
    selected: {
      true: "bg-orange-200",
      false: "bg-white hover:bg-orange-200",
    },
  },
  defaultVariants: {
    size: "large",
    selected: false,
  },
});

const dropdownListLabelVariants = cva(
  "font-pretendard font-medium tracking-[-0.03em] text-gray-700",
  {
    variants: {
      size: {
        large: "text-base leading-6",
        small: "text-sm leading-5",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
);

const dropdownListWrapperVariants = cva("", {
  variants: {
    size: {
      large: "p-[6px]",
      small: "p-[5px]",
    },
  },
  defaultVariants: {
    size: "large",
  },
});

interface DropdownListOption {
  id: string;
  label: string;
}

interface DropdownListProps {
  options: DropdownListOption[];
  selectedId?: string;
  onSelect?: (option: DropdownListOption) => void;
  size?: "small" | "large";
  className?: string;
}

export function DropdownList({
  options,
  selectedId,
  onSelect,
  size = "large",
  className,
}: DropdownListProps) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {options.map((option) => {
        const isSelected = option.id === selectedId;

        return (
          <li key={option.id} className={dropdownListWrapperVariants({ size })}>
            <div
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect?.(option)}
              className={dropdownListItemVariants({
                size,
                selected: isSelected,
              })}
            >
              <span className={dropdownListLabelVariants({ size })}>
                {option.label}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
