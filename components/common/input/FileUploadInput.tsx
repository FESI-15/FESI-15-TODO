"use client";

import {
  InputHTMLAttributes,
  forwardRef,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { twMerge } from "tailwind-merge";
import { Field, FieldLabel } from "@/components/ui/field";
import UploadIcon from "@/public/icons/input/upload.svg";
import CloseIcon from "@/public/icons/common/delete.svg";
import {
  fileInputFieldVariants,
  fileInputBoxVariants,
  fileInputIconVariants,
  fileInputTextVariants,
  inputLabelClassName,
} from "./Input.variants";

type InputSize = "desktop" | "mobile";

interface FileUploadInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value"
> {
  inputSize?: InputSize;
  fieldClassName?: string;
  placeholder?: string;
  label?: string;
  onFileChange?: (file: File | null) => void;
}

export const FileUploadInput = forwardRef<
  HTMLInputElement,
  FileUploadInputProps
>(
  (
    {
      inputSize = "desktop",
      fieldClassName,
      placeholder = "파일을 선택해주세요",
      label,
      id,
      onFileChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleBoxClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      setFileName(file?.name ?? null);
      onFileChange?.(file);
    };

    const handleRemove = () => {
      setFileName(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      onFileChange?.(null);
    };

    return (
      <Field
        className={twMerge(
          fileInputFieldVariants({ size: inputSize }),
          fieldClassName,
        )}
      >
        {label && (
          <FieldLabel htmlFor={id} className={inputLabelClassName}>
            {label}
          </FieldLabel>
        )}
        <div
          id={id}
          role="button"
          tabIndex={0}
          onClick={handleBoxClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleBoxClick();
            }
          }}
          className={fileInputBoxVariants({ size: inputSize })}
        >
          <UploadIcon className={fileInputIconVariants({ size: inputSize })} />
          <span
            className={fileInputTextVariants({
              size: inputSize,
              hasFile: Boolean(fileName),
            })}
          >
            {fileName ?? placeholder}
          </span>
          {fileName && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleRemove();
              }}
              className="ml-auto shrink-0 cursor-pointer"
              aria-label="파일 삭제"
            >
              <CloseIcon
                className={fileInputIconVariants({ size: inputSize })}
              />
            </button>
          )}
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="file"
            className="hidden"
            onChange={handleChange}
            {...props}
          />
        </div>
      </Field>
    );
  },
);

FileUploadInput.displayName = "FileUploadInput";
