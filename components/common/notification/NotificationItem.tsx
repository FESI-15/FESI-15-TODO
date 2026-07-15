"use client";

import Image from "next/image";
import { NotificationItemType } from "@/types/notification";
import { formatRelativeTime, getDefaultAvatar } from "@/utils";
import { notificationItemVariants } from "./Notification.variants";

interface NotificationItemProps {
  notification: NotificationItemType;
  onRead: (id: number) => void;
}

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const { id, message, data, isRead, createdAt } = notification;
  const userImage = data?.userImage ?? getDefaultAvatar(id);

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
      <div className="mt-1 flex h-3 w-3 shrink-0 items-center justify-center">
        {!isRead && <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-sm font-medium text-gray-700">{message}</p>
        <p className="mt-0.5 text-sm font-normal text-gray-500">
          {getSubText(notification)}
        </p>
        <p className="mt-1 text-xs font-normal text-gray-400">
          {formatRelativeTime(createdAt)}
        </p>
      </div>

      <Image
        src={userImage}
        alt=""
        width={40}
        height={40}
        className="ml-3 h-10 w-10 shrink-0 self-center rounded-full border border-gray-200 object-cover"
      />
    </div>
  );
}

function getSubText(notification: NotificationItemType): string {
  if (
    notification.type === "comment" &&
    "commentContent" in (notification.data ?? {})
  ) {
    return (notification.data as { commentContent: string }).commentContent;
  }
  return "서브텍스트";
}
