"use client";

import { KeyboardEvent, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Field, FieldLabel } from "@/components/ui/field";
import { Badge } from "@/components/common/Badge";
import {
  tagInputBoxVariants,
  tagInputFieldVariants,
  inputLabelClassName,
} from "./Input.variants";

type InputSize = "desktop" | "mobile";
type BadgeVariant = "default" | "red" | "green" | "yellow" | "purple";

const BADGE_VARIANTS: BadgeVariant[] = [
  "default",
  "red",
  "green",
  "yellow",
  "purple",
];

interface TagInputProps {
  inputSize?: InputSize;
  fieldClassName?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      inputSize = "desktop",
      fieldClassName,
      label,
      id,
      placeholder = "입력 후 Enter",
      tags,
      onTagsChange,
    },
    ref,
  ) => {
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
      <Field
        className={twMerge(
          tagInputFieldVariants({ size: inputSize }),
          fieldClassName,
        )}
      >
        {label && (
          <FieldLabel htmlFor={id} className={inputLabelClassName}>
            {label}
          </FieldLabel>
        )}
        <div className={tagInputBoxVariants({ size: inputSize })}>
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
