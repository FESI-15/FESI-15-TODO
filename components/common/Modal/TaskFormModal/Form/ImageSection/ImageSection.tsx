import Title from "../../../Title";
import { ImageUploadInput } from "@/components/common/input/ImageUploadInput/ImageUploadInput";
import type { Control } from "react-hook-form";
import { PostTeamIdTodosBody } from "@/apis/model";

interface ImageSectionProps {
  control: Control<PostTeamIdTodosBody>;
}

export default function ImageSection({ control }: ImageSectionProps) {
  return (
    <div>
      <Title marginBottom>이미지</Title>
      <ImageUploadInput control={control} name="fileUrl" />
    </div>
  );
}
