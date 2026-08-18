import Link from "next/link";
import PlusIcon from "@/public/icons/common/plus.svg";
import { m } from "motion/react";

export function CreatePostButton() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-6 right-4 lg:top-1/2 lg:-translate-y-1/2 z-10 lg:bottom-auto"
    >
      <Link
        href="/community/write"
        className="flex gap-1 items-center text-white rounded-full bg-orange-500 p-3.5 shadow-md hover:bg-orange-600 md:py-3.5 md:px-6"
      >
        <PlusIcon className="size-6" />
        <span className="hidden md:block text-lg font-semibold">
          게시물 작성하기
        </span>
      </Link>
    </m.div>
  );
}
