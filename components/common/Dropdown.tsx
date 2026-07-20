"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/utils";
import { cva } from "class-variance-authority";
import ChevronDownIcon from "@/public/icons/common/chevron-down.svg";

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  size?: "small" | "large";
  className?: string;
  placeholder?: string;
}

const triggerVariants = cva(
  "group flex items-center justify-between font-pretendard font-medium tracking-[-0.03em] text-gray-700 rounded-2xl bg-white border-2 border-gray-200 select-none transition-colors data-popup-open:border-orange-500 data-popup-open:shadow-md",
  {
    variants: {
      size: {
        large:
          "w-[311px] px-[16px] py-[16px] text-base md:w-[572px] lg:w-[656px]",
        small: "w-[102px] h-[36px] px-[6px] py-[8px] text-sm",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
);

const iconVariants = cva(
  "shrink-0 text-gray-600 transition-transform duration-200 group-data-popup-open:rotate-180",
  {
    variants: {
      size: {
        large: "size-6",
        small: "size-4",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
);

const popupVariants = cva("bg-white shadow-lg outline-none", {
  variants: {
    size: {
      large: "w-[var(--anchor-width)] p-[6px] rounded-2xl",
      small: "w-[var(--anchor-width)] p-[5px] rounded-xl",
    },
  },
  defaultVariants: { size: "large" },
});

const itemVariants = cva(
  "flex items-center w-full outline-none font-pretendard font-medium tracking-[-0.03em] text-gray-700 cursor-pointer transition-colors duration-200 bg-transparent data-highlighted:bg-orange-200 data-selected:bg-orange-200",
  {
    variants: {
      size: {
        large: "px-[8px] py-[8px] text-base leading-6 rounded-xl h-[52px]",
        small:
          "px-[6px] py-[3px] text-sm leading-5 rounded-lg h-[36px] justify-center text-center",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
);

export function Dropdown({
  options,
  onSelect,
  size = "large",
  className,
  placeholder = "선택해주세요",
}: DropdownProps) {
  const items = Object.fromEntries(options.map((opt) => [opt.id, opt.label]));

  return (
    <SelectPrimitive.Root
      items={items}
      onValueChange={(id) => {
        const selected = options.find((opt) => opt.id === id);
        if (selected) {
          onSelect?.(selected);
        }
      }}
    >
      <SelectPrimitive.Trigger
        className={cn(triggerVariants({ size }), className)}
      >
        <SelectPrimitive.Value
          className="flex flex-1 text-left data-placeholder:text-gray-400"
          placeholder={placeholder}
        />
        <ChevronDownIcon className={cn(iconVariants({ size }))} aria-hidden />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={12}
          alignItemWithTrigger={false}
          className="z-50"
        >
          <SelectPrimitive.Popup className={cn(popupVariants({ size }))}>
            <SelectPrimitive.List>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.id}
                  value={option.id}
                  className={cn(itemVariants({ size }))}
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
