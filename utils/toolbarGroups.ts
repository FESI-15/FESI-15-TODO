import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import type { Editor } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";

type ToolbarButton = {
  label: string;
  icon: LucideIcon;
  isActive: (editor: Editor) => boolean;
  onClick: (editor: Editor) => boolean;
};

export const TOOLBAR_GROUPS: ToolbarButton[][] = [
  [
    {
      label: "굵게",
      icon: Bold,
      isActive: (editor) => editor.isActive("bold"),
      onClick: (editor) => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "기울임",
      icon: Italic,
      isActive: (editor) => editor.isActive("italic"),
      onClick: (editor) => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "밑줄",
      icon: Underline,
      isActive: (editor) => editor.isActive("underline"),
      onClick: (editor) => editor.chain().focus().toggleUnderline().run(),
    },
  ],
  [
    {
      label: "제목 1",
      icon: Heading1,
      isActive: (editor) => editor.isActive("heading", { level: 1 }),
      onClick: (editor) =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "제목 2",
      icon: Heading2,
      isActive: (editor) => editor.isActive("heading", { level: 2 }),
      onClick: (editor) =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
  ],
  [
    {
      label: "글머리 목록",
      icon: List,
      isActive: (editor) => editor.isActive("bulletList"),
      onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "번호 목록",
      icon: ListOrdered,
      isActive: (editor) => editor.isActive("orderedList"),
      onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },
  ],
  [
    {
      label: "왼쪽 정렬",
      icon: AlignLeft,
      isActive: (editor) => editor.isActive({ textAlign: "left" }),
      onClick: (editor) => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      label: "가운데 정렬",
      icon: AlignCenter,
      isActive: (editor) => editor.isActive({ textAlign: "center" }),
      onClick: (editor) => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      label: "오른쪽 정렬",
      icon: AlignRight,
      isActive: (editor) => editor.isActive({ textAlign: "right" }),
      onClick: (editor) => editor.chain().focus().setTextAlign("right").run(),
    },
  ],
];
