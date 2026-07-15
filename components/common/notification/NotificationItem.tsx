"use client";

import Image from "next/image";
import { NotificationItemType } from "@/types/notification";
import {
  formatRelativeTime,
  getNotificationImage,
  getNotificationSubText,
} from "@/utils";
import { notificationItemVariants } from "./Notification.variants";

interface NotificationItemProps {
  notification: NotificationItemType;
  onRead: (id: number) => void;
}

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const { id, message, isRead, createdAt } = notification;

  const imageSrc = getNotificationImage(notification);
  const subText = getNotificationSubText(notification);

  const handleClick = () => {
    if (!isRead) {
      onRead(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClick();
        }
      }}
      className={notificationItemVariants()}
    >
      <div className="flex h-3 w-3 shrink-0 items-center justify-center self-start pt-0.5">
        <span
          className={`h-1.5 w-1.5 rounded-full bg-orange-500 transition-opacity ${
            isRead ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* 두 줄까지 보여주고 말줄임표 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <p className="line-clamp-2 text-sm font-medium leading-snug text-slate-700 break-keep">
          {message}
        </p>

        {/* 한 줄까지 보여주고 말줄임표 */}
        {subText && (
          <p className="truncate mt-0.5 text-sm font-normal text-slate-500">
            {subText}
          </p>
        )}

        <p className="mt-1 text-xs font-normal text-slate-400">
          {formatRelativeTime(createdAt)}
        </p>
      </div>

      <Image
        src={imageSrc}
        alt=""
        width={40}
        height={40}
        className="ml-3 h-10 w-10 shrink-0 self-center rounded-full border border-slate-200 object-cover"
      />
    </div>
  );
}
