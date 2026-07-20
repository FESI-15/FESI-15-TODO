"use client";

import {
  InputHTMLAttributes,
  forwardRef,
  useRef,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { twMerge } from "tailwind-merge";
import { Field, FieldLabel } from "@/components/ui/field";
import UploadIcon from "@/public/icons/input/upload.svg";
import CloseIcon from "@/public/icons/input/img-delete.svg";
import {
  imageInputFieldVariants,
  imageInputBoxVariants,
  imagePreviewClassName,
  inputLabelClassName,
} from "./Input.variants";

type InputSize = "desktop" | "mobile";

interface ImageUploadInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value"
> {
  inputSize?: InputSize;
  fieldClassName?: string;
  label?: string;
  onFileChange?: (file: File | null) => void;
}

export const ImageUploadInput = forwardRef<
  HTMLInputElement,
  ImageUploadInputProps
>(
  (
    {
      inputSize = "desktop",
      fieldClassName,
      label,
      id,
      onFileChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // 컴포넌트가 사라지거나 이미지가 바뀔 때, 이전에 만든 미리보기 URL을 정리
    useEffect(() => {
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }, [previewUrl]);

    const handleBoxClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(file ? URL.createObjectURL(file) : null); // 브라우저 내에서 임시 미리보기
      onFileChange?.(file);
    };

    const handleRemove = () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      onFileChange?.(null);
    };

    return (
      <Field
        className={twMerge(
          imageInputFieldVariants({ size: inputSize }),
          fieldClassName,
        )}
      >
        {label && (
          <FieldLabel htmlFor={id} className={inputLabelClassName}>
            {label}
          </FieldLabel>
        )}
        {previewUrl ? (
          <div className="w-fit">
            <div className={imagePreviewClassName}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="첨부 이미지 미리보기"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute right-[10px] top-[10px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 cursor-pointer"
                aria-label="이미지 삭제"
              >
                <CloseIcon className="h-full w-full text-gray-500" />
              </button>
            </div>
          </div>
        ) : (
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
            className={imageInputBoxVariants({ size: inputSize })}
          >
            <UploadIcon className="h-6 w-6 text-gray-400" />
            <span className="text-base font-medium text-gray-400">
              이미지 첨부
            </span>
          </div>
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
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          {...props}
        />
      </Field>
    );
  },
);

ImageUploadInput.displayName = "ImageUploadInput";
