"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { inputVariants } from "./Input.variants";
import { InputActionButton } from "./InputActionButton";

type FormInputVariant = "text" | "link" | "search" | "password";

interface FormInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "name" | "onBlur" | "onChange" | "value"
> {
  control: Control<T>;
  name: FieldPath<T>;
  variant?: FormInputVariant;
  fieldClassName?: string;
  label?: ReactNode;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  variant = "text",
  label,
  className,
  fieldClassName,
  type = "text",
  ...props
}: FormInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { field, fieldState } = useController({
    control,
    name,
  });

  const isLink = variant === "link";
  const isSearch = variant === "search";
  const isPassword = variant === "password";
  const hasLeftIcon = isLink;
  const hasRightAction = isLink || isSearch || isPassword;
  const inputType = isPassword
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;
  const isError = fieldState.invalid;
  const currentValue = String(field.value ?? "");

  return (
    <Field data-invalid={isError} className={twMerge("gap-2", fieldClassName)}>
      {label && (
        <FieldLabel
          htmlFor={name}
          className="text-sm md:text-base font-semibold text-gray-700"
        >
          {label}
        </FieldLabel>
      )}
      <div className="relative flex items-center">
        <ShadcnInput
          {...props}
          {...field}
          id={name}
          type={inputType}
          value={currentValue}
          aria-invalid={isError}
          className={twMerge(
            inputVariants({ hasLeftIcon, hasRightAction }),
            className,
          )}
        />
        <InputActionButton
          variant={variant}
          value={currentValue}
          onClear={() => field.onChange("")}
          isPasswordVisible={isPasswordVisible}
          onTogglePassword={() => setIsPasswordVisible((prev) => !prev)}
        />
      </div>
      {isError && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
