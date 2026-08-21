"use client";

import { InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import PencilIcon from "@/public/icons/modal/ic_pencil.svg";
import { useImageUpload } from "@/hooks/useImageUpload";
import { usePostImages } from "@/hooks/queries/uploads/uploads.bff.hook";

interface ProfileImageInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "name" | "onBlur" | "onChange" | "value"
> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function ProfileImageInput<T extends FieldValues>({
  control,
  name,
  ...props
}: ProfileImageInputProps<T>) {
  const { mutateAsync: postImages } = usePostImages();
  const { field } = useController({ control, name });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (file: File | null) => {
    setSelectedFile(file);

    if (!file) {
      field.onChange(undefined);
      return;
    }

    try {
      const { data } = await postImages({ data: { fileName: file.name } });

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

  const { inputRef, previewUrl, handleBoxClick, handleChange } = useImageUpload(
    { file: selectedFile, onFileChange: handleFileChange },
  );

  const fieldValue = typeof field.value === "string" ? field.value : undefined;
  const displayUrl =
    previewUrl ?? fieldValue ?? "/images/mypage/profile_lg.png";

  return (
    <div className="relative size-[132px] shrink-0">
      <div className="size-[132px] overflow-hidden rounded-full border border-gray-200 bg-white dark:border-border dark:bg-muted">
        <Image
          src={displayUrl}
          alt="프로필 이미지 미리보기"
          width={132}
          height={132}
          unoptimized={displayUrl.startsWith("blob:")}
          className="size-full object-cover"
          preload
        />
      </div>
      <button
        type="button"
        onClick={handleBoxClick}
        aria-label="프로필 이미지 변경"
        className="absolute bottom-0 right-0 flex size-[35.5px] items-center justify-center rounded-full bg-orange-500 p-[5px]"
      >
        <PencilIcon className="size-[20.3px] text-white" />
      </button>
      <input
        ref={(element) => {
          inputRef.current = element;
          field.ref(element);
        }}
        id={name}
        name={field.name}
        type="file"
        accept="image/*"
        className="hidden"
        onBlur={field.onBlur}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
