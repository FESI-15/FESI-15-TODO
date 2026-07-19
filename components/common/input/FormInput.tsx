"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
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
  label?: ReactNode;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  variant = "text",
  label,
  type = "text",
  ...props
}: FormInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
  console.log(hasLeftIcon);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const isError = fieldState.invalid;
        const currentValue = String(field.value ?? "");

        return (
          <Field data-invalid={isError} className="gap-2">
            {label && (
              <FieldLabel
                htmlFor={name}
                className="pl-1 text-sm md:text-base font-semibold text-gray-700"
              >
                {label}
              </FieldLabel>
            )}
            <div className="relative flex items-center">
              <ShadcnInput
                {...field}
                {...props}
                ref={field.ref}
                id={name}
                type={inputType}
                value={currentValue}
                aria-invalid={isError}
                className={twMerge(
                  inputVariants({ hasLeftIcon, hasRightAction }),
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
      }}
    />
  );
}
