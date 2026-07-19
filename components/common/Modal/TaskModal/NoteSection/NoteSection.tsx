import Image from "next/image";
import Link from "next/link";

interface NoteSectionProps {
  noteId: string;
  noteTitle: string;
}

export default function NoteSection({ noteId, noteTitle }: NoteSectionProps) {
  if (!noteId || !noteTitle) return null;
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-gray-700 md:text-base mb-2">
        작성된 노트
      </p>
      <Link
        className="p-4 flex items-center gap-2 border border-gray-200 rounded-md"
        href={`/notes/${noteId}`}
      >
        <Image src="/icons/common/note.svg" alt="note" width={32} height={32} />
        <p className="font-medium text-gray-700">{noteTitle}</p>
      </Link>
    </div>
  );
}
