import Image from "next/image";
import KebabMenuIcon from "@/public/icons/card/ic_kebab.svg";
import Chips from "@/components/common/Chips";
import imgNoteLarge from "@/public/images/card/img_note_large.png";

interface NoteCardProps {
  title: string;
  status: "to do" | "done";
  subText: string;
  date: string;
  onMenuClick?: () => void;
}

export function NoteCard({
  title,
  status,
  subText,
  date,
  onMenuClick,
}: NoteCardProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 md:gap-4 md:rounded-3xl md:px-9.5 md:pt-7 md:pb-8">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2 md:gap-4">
          <Image
            src={imgNoteLarge}
            alt=""
            width={40}
            height={40}
            className="h-8 w-8 shrink-0 md:h-10 md:w-10"
          />
          <h3 className="truncate text-sm font-semibold tracking-[-0.03em] text-[#1E293B] md:text-xl">
            {title}
          </h3>
        </div>
        <button type="button" onClick={onMenuClick} className="shrink-0">
          <KebabMenuIcon className="h-4 w-4 md:h-6 md:w-6" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Chips variant={status} />
          <span className="truncate text-xs tracking-[-0.03em] text-gray-700 md:text-sm">
            {subText}
          </span>
        </div>
        <span className="shrink-0 text-xs text-gray-400">{date}</span>
      </div>
    </div>
  );
}
