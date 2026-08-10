"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/utils/cn";
import ChevronDownIcon from "@/public/icons/common/chevron-down.svg";
import {
  triggerVariants,
  iconVariants,
  popupVariants,
  itemVariants,
} from "@/components/common/Dropdown.variants";
import { LANGUAGE_OPTIONS, type LanguageCode } from "@/constants/setting";

interface LanguageSelectProps {
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
}

export default function LanguageSelect({
  value,
  onChange,
}: LanguageSelectProps) {
  const items = Object.fromEntries(
    LANGUAGE_OPTIONS.map((option) => [option.code, option.label]),
  );

  return (
    <div className="mt-8">
      <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-foreground md:text-base">
        언어
      </p>
      <SelectPrimitive.Root
        items={items}
        value={value}
        onValueChange={(code) => onChange(code as LanguageCode)}
      >
        <SelectPrimitive.Trigger className={cn(triggerVariants())}>
          <SelectPrimitive.Value className="flex flex-1 text-left" />
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
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectPrimitive.Item
                    key={option.code}
                    value={option.code}
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
    </div>
  );
}
