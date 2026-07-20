import Image from "next/image";

interface AttachmentSectionProps {
  link: string;
  imageUrl?: string;
}

export default function AttachmentSection({
  link,
  imageUrl,
}: AttachmentSectionProps) {
  if (!link && !imageUrl) return null;
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-gray-700 md:text-base">
        첨부 자료
      </p>
      {link && (
        <div className="flex items-center gap-1 mt-2">
          <Image
            src="/icons/modal/link.svg"
            alt="link"
            width={24}
            height={24}
          />
          <p className="text-gray-700">{link}</p>
        </div>
      )}
      {imageUrl && (
        <div className="mt-2 aspect-2/1 overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={imageUrl}
            alt="image"
            width={376}
            height={205}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
