"use client";

import { Menu } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const popupVariants = cva(
  "bg-white p-0 shadow-lg overflow-hidden outline-none",
  {
    variants: {
      size: {
        large: "w-[400px] rounded-2xl",
        small: "w-[102px] rounded-xl",
      },
    },
    defaultVariants: { size: "large" },
  },
);

const itemVariants = cva(
  "flex font-pretendard font-medium tracking-[-0.03em] text-gray-700 outline-none",
  {
    variants: {
      size: {
        large: "px-5 py-3 text-base leading-6",
        small: "px-[6px] py-[3px] text-sm leading-5 justify-center text-center",
      },
    },
    defaultVariants: { size: "large" },
  },
);

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps extends VariantProps<typeof popupVariants> {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  className?: string;
}

export function Dropdown({
  trigger,
  options,
  onSelect,
  size,
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
                className={itemVariants({ size })}
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
