"use client";

import {
  InputHTMLAttributes,
  forwardRef,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { twMerge } from "tailwind-merge";
import { Field } from "@/components/ui/field";
import UploadIcon from "@/public/icons/input/upload.svg";
import CloseIcon from "@/public/icons/common/delete.svg";
import {
  fileInputFieldVariants,
  fileInputBoxVariants,
  fileInputIconVariants,
  fileInputTextVariants,
} from "./Input.variants";

type InputSize = "desktop" | "mobile";

interface FileUploadInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value"
> {
  inputSize?: InputSize;
  fieldClassName?: string;
  placeholder?: string;
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
        inputRef.current.value = ""; // 초기화
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
        <div
          role="button"
          tabIndex={0} // Tab으로 포커스 가능
          onClick={handleBoxClick}
          onKeyDown={(event) => {
            // Enter/Space로 선택 가능
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
                event.stopPropagation(); // 부모(파일 선택)로 전파 방지
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
            type="file" // 실제 파일 선택 및 업로드 동작
            className="hidden" // 화면에는 보이지 않음
            onChange={handleChange}
            {...props}
          />
        </div>
      </Field>
    );
  },
);

FileUploadInput.displayName = "FileUploadInput";
