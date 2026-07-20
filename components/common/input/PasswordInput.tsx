"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import EyeIcon from "@/public/icons/input/eye.svg";
import EyeOffIcon from "@/public/icons/input/eye-off.svg";
import {
  inputVariants,
  inputFieldVariants,
  eyeIconVariants,
  inputLabelClassName,
} from "./Input.variants";

type InputSize = "desktop" | "mobile";

// 아예 type 외부에서 못 받도록 막음
interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  inputSize?: InputSize;
  isError?: boolean;
  errorMessage?: string;
  fieldClassName?: string;
  label?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
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
    const [isVisible, setIsVisible] = useState(false);

    const handleToggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <Field
        data-invalid={isError}
        className={twMerge(
          inputFieldVariants({ size: inputSize }),
          fieldClassName,
        )}
      >
        {label && (
          <FieldLabel htmlFor={id} className={inputLabelClassName}>
            {label}
          </FieldLabel>
        )}
        <div className="relative">
          <ShadcnInput
            ref={ref}
            id={id}
            type={isVisible ? "text" : "password"}
            aria-invalid={isError}
            className={twMerge(
              inputVariants({ size: inputSize }),
              "pr-10",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            onClick={handleToggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {isVisible ? (
              <EyeIcon className={eyeIconVariants({ size: inputSize })} />
            ) : (
              <EyeOffIcon className={eyeIconVariants({ size: inputSize })} />
            )}
          </button>
        </div>
        {isError && errorMessage && (
          <FieldError className="ml-1 text-sm font-medium text-red-500">
            {errorMessage}
          </FieldError>
        )}
      </Field>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
