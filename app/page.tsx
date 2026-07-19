"use client";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";

export default function Home() {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      <TaskFormModal />
    </div>
  );
}
