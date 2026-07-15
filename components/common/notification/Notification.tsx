"use client";

import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationItemType } from "@/types/notification";
import { NotificationItem } from "./NotificationItem";
import {
  notificationHeaderTextClassName,
  notificationMarkAllClassName,
} from "./Notification.variants";

type PopoverAlign = "start" | "center" | "end";
type PopoverSide = "top" | "bottom" | "left" | "right";

interface NotificationProps {
  trigger: ReactElement;
  notifications: NotificationItemType[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  align?: PopoverAlign;
  side?: PopoverSide;
  sideOffset?: number;
  alignOffset?: number;
}

export function Notification({
  trigger,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  align = "end",
  side = "bottom",
  sideOffset = 5,
  alignOffset = 0,
}: NotificationProps) {
  const hasUnread = notifications.some((notification) => !notification.isRead);

  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="flex w-[295px] flex-col rounded-3xl border border-gray-200 bg-white py-5 pl-3 pr-1 shadow-lg"
      >
        <div className="mb-4 flex h-5 shrink-0 items-center justify-between px-2 pr-3">
          <h2 className={notificationHeaderTextClassName}>알림</h2>
          <button
            type="button"
            onClick={hasUnread ? onMarkAllAsRead : undefined}
            className={notificationMarkAllClassName({ hasUnread })}
          >
            모두 읽기
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="flex h-[124px] w-[265px] items-center justify-center text-sm font-medium text-gray-500">
            아직 알림이 없어요
          </div>
        ) : (
          <div
            className={twMerge(
              "max-h-[384px] overflow-y-auto pr-2",
              "[&::-webkit-scrollbar]:w-1",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-gray-300",
              "[&::-webkit-scrollbar-track]:bg-transparent",
            )}
          >
            <div className="flex flex-col gap-1">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={onMarkAsRead}
                />
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
