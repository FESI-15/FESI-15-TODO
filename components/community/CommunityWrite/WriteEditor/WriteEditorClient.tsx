"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import type { UseFormSetValue } from "react-hook-form";
import type { WriteFormValues } from "@/types/communityWriteSchema";
import { EditorToolbar } from "./EditorToolbar";
import { useEffect, useRef } from "react";

export interface WriteEditorClientProps {
  setValue: UseFormSetValue<WriteFormValues>;
  content: string;
}

export default function WriteEditorClient({
  setValue,
  content,
}: WriteEditorClientProps) {
  const hasInitializedContent = useRef(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "이 곳을 통해 내용을 작성해주세요.",
      }),
    ],
    onUpdate({ editor }) {
      setValue("content", editor.isEmpty ? "" : editor.getHTML(), {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor || hasInitializedContent.current) return;
    if (!content) return;

    editor.commands.setContent(content, {
      emitUpdate: false,
      parseOptions: {
        preserveWhitespace: "full",
      },
    });

    hasInitializedContent.current = true;
  }, [editor, content]);

  return (
    <div className="flex flex-col flex-1">
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex-1 [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-4 [&_.ProseMirror]:text-sm [&_.ProseMirror]:text-gray-700 [&_.ProseMirror]:outline-none [&_.ProseMirror_.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6"
      />
    </div>
  );
}
