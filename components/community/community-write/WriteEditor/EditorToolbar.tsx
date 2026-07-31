import type { Editor } from "@tiptap/react";
import { cn } from "@/utils/cn";
import { TOOLBAR_GROUPS } from "@/utils/toolbarGroups";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-1 py-1 px-2 md:px-4 bg-gray-50 rounded-full mt-3"
      aria-label="게시글 편집 도구"
    >
      {TOOLBAR_GROUPS.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="flex items-center gap-1 pr-1 last:border-r-0"
        >
          {group.map(({ label, icon: Icon, isActive, onClick }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              title={label}
              onClick={() => onClick(editor)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700",
                isActive(editor) &&
                  "bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600",
              )}
            >
              <Icon size={16} strokeWidth={2.2} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
