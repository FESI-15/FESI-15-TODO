"use client";

import { InputHTMLAttributes, useState } from "react";
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
import { usePostImages } from "@/hooks/queries/uploads/uploads.bff.hook";

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
  const { mutateAsync: postImages } = usePostImages();
  const { field, fieldState } = useController({
    control,
    name,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fieldPreviewUrl =
    typeof field.value === "string" ? field.value : undefined;

  const handleFileChange = async (file: File | null) => {
    setSelectedFile(file);

    if (!file) {
      field.onChange(undefined);
      return;
    }

    try {
      const { data } = await postImages({
        data: {
          fileName: file.name,
        },
      });

      const response = await fetch(data.uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      field.onChange(data.url);
    } catch {
      setSelectedFile(null);
      field.onChange(undefined);
    }
  };

  const { inputRef, previewUrl, handleBoxClick, handleChange, handleRemove } =
    useImageUpload({
      file: selectedFile,
      onFileChange: handleFileChange,
    });

  const handlePreviewImageRemove = () => {
    handleRemove();
    field.onChange(null);
  };

  const imagePreviewUrl = previewUrl ?? fieldPreviewUrl ?? "";

  return (
    <Field data-invalid={fieldState.invalid}>
      {imagePreviewUrl && (
        <PreviewImage
          previewUrl={imagePreviewUrl}
          handleRemove={handlePreviewImageRemove}
        />
      )}
      {!imagePreviewUrl && (
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
            className="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border border-dashed border-gray-300 dark:border-border bg-gray-50 dark:bg-card py-6 transition-colors"
          >
            <UploadIcon className="h-6 w-6 text-gray-400 dark:text-muted-foreground" />
            <span className="text-base font-medium text-gray-400 dark:text-muted-foreground">
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
