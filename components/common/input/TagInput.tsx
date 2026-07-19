"use client";

import { KeyboardEvent, useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Badge } from "@/components/common/Badge";

type BadgeVariant = "default" | "red" | "green" | "yellow" | "purple";

const BADGE_VARIANTS: BadgeVariant[] = [
  "default",
  "red",
  "green",
  "yellow",
  "purple",
];

interface TagInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  id?: string;
  placeholder?: string;
}

export function TagInput<T extends FieldValues>({
  control,
  name,
  label,
  id,
  placeholder = "입력 후 Enter",
}: TagInputProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const inputId = id ?? name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const tags: string[] = Array.isArray(field.value) ? field.value : [];

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            event.preventDefault();

            const trimmedValue = inputValue.trim();

            if (trimmedValue && !tags.includes(trimmedValue)) {
              field.onChange([...tags, trimmedValue]);
            }

            setInputValue("");
            return;
          }

          if (
            event.key === "Backspace" &&
            inputValue === "" &&
            tags.length > 0
          ) {
            field.onChange(tags.slice(0, -1));
          }
        };

        const handleRemoveTag = (indexToRemove: number) => {
          field.onChange(tags.filter((_, index) => index !== indexToRemove));
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel
                htmlFor={inputId}
                className="pl-1 text-base font-semibold text-gray-700"
              >
                {label}
              </FieldLabel>
            )}
            <div className="p-3 text-sm md:text-base md:p-4 flex flex-wrap items-center gap-2 rounded-[12px] md:rounded-[16px] border border-gray-300 bg-white transition-colors focus-within:border-orange-500">
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
                ref={field.ref}
                id={inputId}
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : ""}
                className="min-w-[80px] flex-1 bg-transparent text-gray-700 placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
