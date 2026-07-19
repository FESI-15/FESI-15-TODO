"use client";
import LinkModal from "@/components/common/Modal/LinkModal";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";

export default function Home() {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      <TaskFormModal />
      <TaskModal />
      <LinkModal />
    </div>
  );
}
