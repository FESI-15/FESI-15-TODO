import { imagePreviewClassName } from "../../Input.variants";
import CloseIcon from "@/public/icons/input/img-delete.svg";

interface PreviewImageProps {
  previewUrl: string;
  handleRemove: () => void;
}
export default function PreviewImage({
  previewUrl,
  handleRemove,
}: PreviewImageProps) {
  if (!previewUrl) return null;
  return (
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
          className="absolute right-[10px] top-[10px] flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full bg-white/80"
          aria-label="이미지 삭제"
        >
          <CloseIcon className="h-full w-full text-gray-500" />
        </button>
      </div>
    </div>
  );
}
