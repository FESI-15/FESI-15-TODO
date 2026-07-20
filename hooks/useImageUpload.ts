"use client";

import { ChangeEvent, useEffect, useMemo, useRef } from "react";

interface UseImageUploadParams {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function useImageUpload({ file, onFileChange }: UseImageUploadParams) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

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
    const selectedFile = event.target.files?.[0] ?? null;
    onFileChange(selectedFile);
  };

  const handleRemove = () => {
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return {
    inputRef,
    previewUrl,
    handleBoxClick,
    handleChange,
    handleRemove,
  };
}
