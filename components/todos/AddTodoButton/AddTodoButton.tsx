import PlusIcon from "@/public/icons/common/plus.svg";
import dynamic from "next/dynamic";
import { useState } from "react";

const TaskFormModal = dynamic(
  () => import("@/components/common/Modal/TaskFormModal/TaskFormModal"),
  {
    ssr: false,
    loading: () => null,
  },
);
export default function AddTodoButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 text-gray-500 dark:text-muted-foreground py-2.5 px-3 border border-gray-300 dark:border-border rounded-full hover:text-gray-600 hover:border-[#bbb] dark:hover:text-foreground dark:hover:border-muted-foreground"
        onClick={() => setOpen(false)}
      >
        <PlusIcon className="size-5" />
        <p className="text-sm font-semibold">할 일 추가</p>
      </button>
      {open && <TaskFormModal open={open} onOpenChange={setOpen} />}
    </>
  );
}
