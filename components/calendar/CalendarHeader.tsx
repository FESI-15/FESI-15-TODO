"use client";

import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import TaskFormModal from "@/components/common/Modal/TaskFormModal/TaskFormModal";
import { buttonVariants } from "@/components/common/Button";
import { cn } from "@/utils/cn";
import PlusIcon from "@/public/icons/common/plus.svg";
import useHeaderStore from "@/store/useHeaderStore";
import { useEffect } from "react";

export default function CalendarHeader() {
  const { data: user } = useGetUserMe();
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    if (user?.data.name) setTitle(`${user.data.name}님의 캘린더`);
  }, [user?.data.name, setTitle]);

  return (
    <div className="flex items-center justify-end lg:justify-between px-2">
      <h1 className="py-2 text-2xl font-semibold text-gray-900 dark:text-foreground hidden lg:block">
        {user?.data.name}님의 캘린더
      </h1>
      <div>
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
