"use client";

import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
import { buttonVariants } from "@/components/common/Button";
import { cn } from "@/utils/cn";
import PlusIcon from "@/public/icons/common/plus.svg";

export default function CalendarHeader() {
  const { data: user } = useGetUserMe();

  return (
    <div className="flex items-center justify-between px-2">
      <h1 className="py-2 text-2xl font-semibold text-gray-900">
        {user?.data.name}님의 캘린더
      </h1>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 py-3 md:static md:inset-auto md:border-t-0 md:bg-transparent md:p-0">
        <TaskFormModal>
          <span
            className={cn(
              buttonVariants({ hierarchy: "secondary", size: "md" }),
              "h-10 w-full md:w-auto",
            )}
          >
            <PlusIcon className="size-5" />
            할일 추가
          </span>
        </TaskFormModal>
      </div>
    </div>
  );
}
