import Title from "../../../Title";
import { ImageUploadInput } from "@/components/common/input/ImageUploadInput/ImageUploadInput";
import type { Control } from "react-hook-form";
import type { TaskFormValues } from "../../TaskFormModal";

interface ImageSectionProps {
  control: Control<TaskFormValues>;
}

export default function ImageSection({ control }: ImageSectionProps) {
  return (
    <div>
      <Title marginBottom>이미지</Title>
      <ImageUploadInput control={control} name="image" />
    </div>
  );
}
