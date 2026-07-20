"use client";

import { InputHTMLAttributes } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import UploadIcon from "@/public/icons/input/upload.svg";
import { useImageUpload } from "@/hooks/useImageUpload";
import PreviewImage from "./PreviewImage/PreviewImage";

interface ImageUploadInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "name" | "onBlur" | "onChange" | "size" | "value"
> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function ImageUploadInput<T extends FieldValues>({
  control,
  name,
  id,
  ...props
}: ImageUploadInputProps<T>) {
  const inputId = id ?? name;
  const { field, fieldState } = useController({
    control,
    name,
  });
  const fieldValue = field.value as File | null;
  const { inputRef, previewUrl, handleBoxClick, handleChange, handleRemove } =
    useImageUpload({
      file: fieldValue,
      onFileChange: field.onChange,
    });

  return (
    <Field data-invalid={fieldState.invalid}>
      <PreviewImage previewUrl={previewUrl ?? ""} handleRemove={handleRemove} />
      {!previewUrl && (
        <>
          <div
            id={inputId}
            role="button"
            tabIndex={0}
            onClick={handleBoxClick}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleBoxClick();
              }
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-6 transition-colors"
          >
            <UploadIcon className="h-6 w-6 text-gray-400" />
            <span className="text-base font-medium text-gray-400">
              이미지 첨부
            </span>
          </div>

          <input
            ref={(element) => {
              inputRef.current = element;
              field.ref(element);
            }}
            id={`${inputId}-input`}
            name={field.name}
            type="file"
            accept="image/*"
            className="hidden"
            onBlur={field.onBlur}
            onChange={handleChange}
            {...props}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </>
      )}
    </Field>
  );
}
