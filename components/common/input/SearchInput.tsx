"use client";

import {
  InputHTMLAttributes,
  forwardRef,
  KeyboardEvent,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import SearchIcon from "@/public/icons/input/search.svg";
import {
  searchInputVariants,
  searchInputFieldClassName,
} from "./Input.variants";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldClassName?: string;
  onSearch?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      fieldClassName,
      onSearch,
      onKeyDown,
      onChange,
      defaultValue,
      value,
      ...props
    },
    ref,
  ) => {
    const [hasValue, setHasValue] = useState(
      Boolean(defaultValue ?? value ?? ""),
    );

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && hasValue) {
        onSearch?.();
      }
      onKeyDown?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(event.target.value.length > 0);
      onChange?.(event);
    };

    const handleSearchClick = () => {
      if (hasValue) {
        onSearch?.();
      }
    };

    return (
      <Field className={twMerge(searchInputFieldClassName, fieldClassName)}>
        <div className="relative">
          <ShadcnInput
            ref={ref}
            type="text"
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={twMerge(searchInputVariants(), className)}
            {...props}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={!hasValue}
            className={twMerge(
              "absolute right-5 top-1/2 -translate-y-1/2",
              hasValue ? "cursor-pointer" : "cursor-default",
            )}
            aria-label="검색"
          >
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </Field>
    );
  },
);

SearchInput.displayName = "SearchInput";
