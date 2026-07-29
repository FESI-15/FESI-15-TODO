import Link from "next/link";
import ChevronRightIcon from "@/public/icons/common/chevron-right.svg";

export default function NoteLinkButton({ goalId }: { goalId: number }) {
  return (
    <Link
      className="inline-flex items-center gap-2 rounded-full bg-[#00D4BE] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00D4BE]/80"
      href={`/goals/notes/${goalId}`}
    >
      노트 모아보기
      <ChevronRightIcon className="size-5" />
    </Link>
  );
}
