import Image from "next/image";
import Link from "next/link";

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
      <p className="text-sm font-semibold text-gray-700 dark:text-white md:text-base">
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
          <Link
            href={link}
            className="text-gray-700 dark:text-foreground hover:underline"
            target="_blank"
          >
            {link}
          </Link>
        </div>
      )}
      {imageUrl && (
        <div className="mt-2 aspect-2/1 overflow-hidden rounded-lg border border-gray-200 dark:border-border">
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
