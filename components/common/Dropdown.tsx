"use client";

import { Menu } from "@base-ui/react/menu";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  size?: "small" | "large";
  className?: string;
}

const popupVariants = cva("bg-white shadow-lg overflow-hidden outline-none", {
  variants: {
    size: {
      large:
        "w-[311px] h-auto p-[5px] rounded-2xl md:w-[572px] md:p-[6px] lg:w-[656px] lg:p-[6px]",
      small: "w-[102px] h-auto p-[5px] rounded-xl",
    },
  },
  defaultVariants: {
    size: "large",
  },
});

const itemVariants = cva(
  "flex items-center w-full outline-none font-pretendard font-medium tracking-[-0.03em] text-gray-700 cursor-pointer transition-colors duration-200 hover:bg-[#FEEFDC]",
  {
    variants: {
      size: {
        large:
          "gap-[10px] px-[8px] py-[8px] text-base leading-6 rounded-xl h-[52px]",
        small:
          "gap-[10px] px-[6px] py-[3px] text-sm leading-5 rounded-lg h-[36px] justify-center text-center",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
);
export function Dropdown({
  trigger,
  options,
  onSelect,
  size = "large",
  className,
}: DropdownProps) {
  return (
    <Menu.Root>
      <Menu.Trigger render={<button type="button" />}>{trigger}</Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className={cn(popupVariants({ size }), className)}>
            {options.map((option) => (
              <Menu.Item
                key={option.id}
                onClick={() => onSelect?.(option)}
                className={cn(itemVariants({ size }))}
              >
                {option.label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
