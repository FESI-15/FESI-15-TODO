"use client";

import dynamic from "next/dynamic";
import type { WriteEditorClientProps } from "./WriteEditorClient";

const WriteEditorClient = dynamic(() => import("./WriteEditorClient"), {
  ssr: false,
  loading: () => <div className="min-h-[420px]" />,
});

export default function WriteEditor(props: WriteEditorClientProps) {
  return <WriteEditorClient {...props} />;
}
