"use client";

import { KeyboardEvent, forwardRef, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Badge } from "@/components/common/Badge";

type BadgeVariant = "default" | "red" | "green" | "yellow" | "purple";

const BADGE_VARIANTS: BadgeVariant[] = [
  "default",
  "red",
  "green",
  "yellow",
  "purple",
];

interface TagInputProps {
  label?: string;
  id?: string;
  placeholder?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ label, id, placeholder = "입력 후 Enter", tags, onTagsChange }, ref) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault(); // form 안에 있을 때 폼 제출 방지

        const trimmedValue = inputValue.trim();

        // 중복 태그 방지
        if (trimmedValue && !tags.includes(trimmedValue)) {
          onTagsChange([...tags, trimmedValue]);
        }

        setInputValue("");
        return;
      }

      // 입력창이 비어있을 때 Backspace 누르면 마지막 태그 삭제
      if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
        onTagsChange(tags.slice(0, -1));
      }
    };

    const handleRemoveTag = (indexToRemove: number) => {
      onTagsChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
      <Field>
        {label && (
          <FieldLabel
            htmlFor={id}
            className="pl-1 text-base font-semibold text-gray-700"
          >
            {label}
          </FieldLabel>
        )}
        <div className="px-3 py-2.5 text-sm md:text-base md:p-4 flex flex-wrap items-center gap-2 rounded-[12px] md:rounded-[16px] border border-gray-300 bg-white transition-colors focus-within:border-orange-500">
          {tags.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant={BADGE_VARIANTS[index % BADGE_VARIANTS.length]}
              remove
              onRemove={() => handleRemoveTag(index)}
            >
              {tag}
            </Badge>
          ))}
          <input
            ref={ref}
            id={id}
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="min-w-[80px] flex-1 bg-transparent text-gray-700 placeholder:text-gray-500 focus:outline-none"
          />
        </div>
      </Field>
    );
  },
);

TagInput.displayName = "TagInput";
