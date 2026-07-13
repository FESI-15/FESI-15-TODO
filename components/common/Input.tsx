"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { inputVariants, inputFieldVariants } from "./Input.variants";

type InputSize = "desktop" | "mobile";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  isError?: boolean;
  errorMessage?: string;
  fieldClassName?: string; // 외부 커스텀
  label?: string; // 라벨 필요시
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      inputSize = "desktop",
      isError = false,
      errorMessage,
      className,
      fieldClassName,
      label,
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <Field
        data-invalid={isError}
        className={twMerge(
          inputFieldVariants({ size: inputSize }),
          fieldClassName,
        )}
      >
        {label && (
          <FieldLabel htmlFor={id} className="text-gray-900">
            {label}
          </FieldLabel>
        )}
        <ShadcnInput
          ref={ref}
          id={id} // 라벨-인풋 연결
          aria-invalid={isError}
          className={twMerge(inputVariants({ size: inputSize }), className)}
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
