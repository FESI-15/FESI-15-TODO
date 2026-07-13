"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import SearchIcon from "@/public/icons/input/search.svg";
import {
  searchInputFieldClassName,
  searchInputVariants,
} from "./Input.variants";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, fieldClassName, ...props }, ref) => {
    return (
      <Field className={twMerge(searchInputFieldClassName, fieldClassName)}>
        <div className="relative">
          <ShadcnInput
            ref={ref}
            type="search"
            className={twMerge(searchInputVariants(), className)}
            {...props}
          />
          <SearchIcon className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </Field>
    );
  },
);

SearchInput.displayName = "SearchInput";
