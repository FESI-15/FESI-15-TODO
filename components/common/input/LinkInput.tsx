"use client";

import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import LinkIcon from "@/public/icons/input/link.svg";
import CloseIcon from "@/public/icons/input/input-delete.svg";
import {
  inputVariants,
  inputFieldVariants,
  inputLabelClassName,
  linkIconVariants,
  linkDeleteIconVariants,
} from "./Input.variants";

type InputSize = "desktop" | "mobile";

interface LinkInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value"
> {
  inputSize?: InputSize;
  fieldClassName?: string;
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const LinkInput = forwardRef<HTMLInputElement, LinkInputProps>(
  (
    {
      inputSize = "desktop",
      fieldClassName,
      label,
      id,
      value,
      onValueChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const currentValue = value ?? internalValue;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      onValueChange?.(event.target.value);
    };

    const handleClear = () => {
      setInternalValue("");
      onValueChange?.("");
    };

    return (
      <Field
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
        <div className="relative flex items-center">
          <LinkIcon
            className={twMerge(
              "pointer-events-none absolute left-4",
              linkIconVariants({ size: inputSize }),
            )}
          />
          <ShadcnInput
            ref={ref}
            id={id}
            type="text"
            value={currentValue}
            onChange={handleChange}
            className={twMerge(
              inputVariants({ size: inputSize }),
              "pl-12 pr-12",
              className,
            )}
            {...props}
          />
          {currentValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 cursor-pointer"
              aria-label="링크 삭제"
            >
              <CloseIcon
                className={linkDeleteIconVariants({ size: inputSize })}
              />
            </button>
          )}
        </div>
      </Field>
    );
  },
);

LinkInput.displayName = "LinkInput";
