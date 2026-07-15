"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { inputLabelClassName } from "./Input.variants";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorMessage?: string;
  fieldClassName?: string; // 외부 커스텀
  label?: string; // 라벨 필요시
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ isError = false, errorMessage, label, id, ...props }, ref) => {
    return (
      <Field data-invalid={isError}>
        {label && (
          <FieldLabel htmlFor={id} className={inputLabelClassName}>
            {label}
          </FieldLabel>
        )}
        <ShadcnInput
          ref={ref}
          id={id} // 라벨-인풋 연결
          aria-invalid={isError}
          className="w-full 
          p-3 text-sm md:p-4 md:text-base rounded-[12px] md:rounded-[16px] border bg-white text-gray-700 placeholder:text-gray-500 transition-colors placeholder:text-sm md:placeholder:text-base border-gray-300 focus-visible:border-orange-500 focus-visible:ring-0 aria-invalid:border-red-500 aria-invalid:ring-0"
          {...props}
        />
        {isError && errorMessage && (
          <FieldError className="ml-1 text-sm font-medium text-red-500">
            {errorMessage}
          </FieldError>
        )}
      </Field>
    );
  },
);

TextInput.displayName = "TextInput";
