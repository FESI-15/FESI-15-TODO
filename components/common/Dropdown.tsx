"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/utils/cn";
import ChevronDownIcon from "@/public/icons/common/chevron-down.svg";
import {
  triggerVariants,
  iconVariants,
  popupVariants,
  itemVariants,
} from "./Dropdown.variants";

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  className?: string;
  placeholder?: string;
}

export function Dropdown({
  options,
  onSelect,
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
      <SelectPrimitive.Trigger className={cn(triggerVariants(), className)}>
        <SelectPrimitive.Value
          className="flex flex-1 text-left data-placeholder:text-gray-400"
          placeholder={placeholder}
        />
        <ChevronDownIcon className={cn(iconVariants())} aria-hidden />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={12}
          alignItemWithTrigger={false}
          className="z-50"
        >
          <SelectPrimitive.Popup className={cn(popupVariants())}>
            <SelectPrimitive.List>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.id}
                  value={option.id}
                  className={cn(itemVariants())}
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
